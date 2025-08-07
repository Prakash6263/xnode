"use client"

import { useEffect, useState } from "react"
import { usersAPI } from "../api/users"
import Swal from "sweetalert2" // Import SweetAlert

const UserList = () => {
  const [showModal, setShowModal] = useState(false)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  // Function to fetch users
  const fetchUsers = async () => {
    setLoading(true)
    setError(null)
    const result = await usersAPI.getUsers()
    if (result.success) {
      setUsers(result.users)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  // Effect to fetch users only once on component mount
  useEffect(() => {
    fetchUsers()
  }, []) // Empty dependency array means this runs only once

  // Effect to initialize/re-initialize DataTable whenever 'users' data changes
  useEffect(() => {
    const initializeDataTable = () => {
      try {
        if (window.$ && window.$.fn.DataTable) {
          // Destroy existing DataTable if it exists
          if (window.$.fn.DataTable.isDataTable("#example")) {
            window.$("#example").DataTable().destroy()
          }

          // Initialize new DataTable
          window.$("#example").DataTable({
            responsive: true,
            pageLength: 10,
            order: [[0, "asc"]],
          })
        }
      } catch (error) {
        console.error("Error initializing DataTable:", error)
      }
    }

    // Use a timeout to ensure DOM is updated with new user data before DataTable tries to initialize
    const timer = setTimeout(initializeDataTable, 100)

    return () => {
      clearTimeout(timer)
      try {
        if (window.$ && window.$.fn.DataTable && window.$.fn.DataTable.isDataTable("#example")) {
          window.$("#example").DataTable().destroy()
        }
      } catch (error) {
        console.error("Error destroying DataTable:", error)
      }
    }
  }, [users]) // This effect runs when 'users' state changes

  const handleDeleteUser = async (userId) => {
    // Use SweetAlert for confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      const apiResult = await usersAPI.deleteUser(userId)
      if (apiResult.success) {
        Swal.fire("Deleted!", apiResult.message, "success")
        fetchUsers() // Re-fetch users to update the list after deletion
      } else {
        Swal.fire("Error!", `Error deleting user: ${apiResult.error}`, "error")
      }
    }
  }

  const handleUpdateUserStatus = async (userId, newStatus) => {
    const apiResult = await usersAPI.updateUserStatus(userId, newStatus, `Status changed to ${newStatus} by admin`)
    if (apiResult.success) {
      Swal.fire("Updated!", apiResult.message, "success")
      fetchUsers() // Re-fetch users to update the list after status update
      setSelectedUser((prev) => ({ ...prev, status: newStatus })) // Update selected user in modal
    } else {
      Swal.fire("Error!", `Error updating user status: ${apiResult.error}`, "error")
    }
  }

  const openViewModal = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "badge bg-success status-badge"
      case "inactive":
        return "badge bg-danger status-badge"
      case "pending":
        return "badge bg-warning text-dark status-badge"
      default:
        return "badge bg-secondary status-badge"
    }
  }

  const getKycBadgeClass = (kycStatus) => {
    switch (kycStatus.toLowerCase()) {
      case "approved":
        return "badge bg-success"
      case "pending":
        return "badge bg-warning text-dark"
      case "rejected":
        return "badge bg-danger"
      default:
        return "badge bg-secondary"
    }
  }

  if (loading) {
    return <div className="text-center p-4">Loading users...</div>
  }

  if (error) {
    return <div className="text-center p-4 text-danger">Error: {error}</div>
  }

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>User Management</h5>
          <div className="list-btn" style={{ justifySelf: "end" }}>
            <ul className="filter-list">
              <li>
                <div className="dropdown dropdown-action" data-bs-placement="bottom">
                  <a href="#" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>
                      <i className="fe fe-download me-2"></i>
                    </span>{" "}
                    Downloads
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <ul className="d-block">
                      <li>
                        <a className="d-flex align-items-center download-item" href="#" download="">
                          <i className="far fa-file-text me-2"></i>EXCEL
                        </a>
                      </li>
                      <li>
                        <a className="d-flex align-items-center download-item" href="#" download="">
                          <i className="far fa-file-pdf me-2"></i>PDF
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                {/* <a className="btn btn-primary" href="/add-user">
                  <i className="fa fa-plus-circle me-2"></i>Add New
                </a> */}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card-table card p-2">
            <div className="card-body">
              <div className="table-responsive">
                <table id="example" className="table table-striped" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>KYC</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.user}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={getStatusBadgeClass(user.status)}>{user.status}</span>
                        </td>
                        <td>
                          <span className={getKycBadgeClass(user.kyc)}>{user.kyc}</span>
                        </td>
                        <td>{user.created_at}</td>
                        <td>
                          <button className="btn btn-sm btn-primary" onClick={() => openViewModal(user)}>
                            <i className="bi bi-eye"></i>
                          </button>
                          {/* Edit button is not explicitly linked to an API, keeping as placeholder */}
                          {/* <button className="btn btn-sm btn-warning">
                            <i className="bi bi-pencil-square"></i>
                          </button> */}
                          <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(user.id)}>
                            <i className="bi bi-trash3"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showModal && selectedUser && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Profile - {selectedUser.user}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <h6 className="mb-2">User Details</h6>
                <ul className="list-group list-group-flush mb-3" style={{ marginLeft: "-10px" }}>
                  <li className="list-group-item">ID: {selectedUser.id}</li>
                  <li className="list-group-item">Name: {selectedUser.user}</li>
                  <li className="list-group-item">Email: {selectedUser.email}</li>
                  <li className="list-group-item">
                    Status: <span className={getStatusBadgeClass(selectedUser.status)}>{selectedUser.status}</span>
                  </li>
                  <li className="list-group-item">
                    KYC: <span className={getKycBadgeClass(selectedUser.kyc)}>{selectedUser.kyc}</span>
                  </li>
                  <li className="list-group-item">Created At: {selectedUser.created_at}</li>
                </ul>

                {/* Placeholder for Services, Billing, Tickets as no API provided */}
                <h6 className="mb-2">Services (Placeholder)</h6>
                <ul className="list-group list-group-flush mb-3" style={{ marginLeft: "-10px" }}>
                  <li className="list-group-item">Web Hosting - Active</li>
                  <li className="list-group-item">Cloud VPS - Suspended</li>
                </ul>
                <h6 className="mb-2">Billing (Placeholder)</h6>
                <table className="table table-sm mb-3">
                  <thead>
                    <tr>
                      <th>Invoice #</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#INV2345</td>
                      <td>$120.00</td>
                      <td>
                        <span className="badge bg-success">Paid</span>
                      </td>
                    </tr>
                    <tr>
                      <td>#INV2346</td>
                      <td>$80.00</td>
                      <td>
                        <span className="badge bg-danger">Unpaid</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <h6 className="mb-2">Tickets (Placeholder)</h6>
                <ul className="list-group list-group-flush mb-3" style={{ marginLeft: "-10px" }}>
                  <li className="list-group-item">#3421 - Login Issue (Open)</li>
                  <li className="list-group-item">#3415 - Billing Question (Closed)</li>
                </ul>

                <h6 className="mb-2">KYC / Identity Verification</h6>
                <p className="mb-2">
                  Status: <span className={getKycBadgeClass(selectedUser.kyc)}>{selectedUser.kyc}</span>
                </p>
                {/* <a href="#" className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-file-earmark-text"></i> View Uploaded Documents
                </a> */}
              </div>
              <div className="modal-footer">
                {selectedUser.status === "Active" ? (
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleUpdateUserStatus(selectedUser.id, "Inactive")}
                  >
                    Deactivate User
                  </button>
                ) : (
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleUpdateUserStatus(selectedUser.id, "Active")}
                  >
                    Activate User
                  </button>
                )}
                {/* Removed Approve KYC and Reject KYC buttons as requested */}
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserList
