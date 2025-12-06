"use client"

import { useEffect, useState } from "react"
import { staffAPI } from "../api/staff"
import Swal from "sweetalert2"
import { Link } from "react-router-dom"
const defaultForm = {
  id: null,
  full_name: "",
  email: "",
  role: "Support Staff",
  status: "Active",
}

const roleBadgeClass = (role) => {
  const r = String(role || "").toLowerCase()
  if (r.includes("super")) return "badge badge-super"
  if (r.includes("support")) return "badge badge-support"
  if (r.includes("billing")) return "badge badge-billing"
  if (r.includes("sales")) return "badge badge-sales"
  return "badge bg-secondary"
}

const StaffAdmin = () => {
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [showLogsModal, setShowLogsModal] = useState(false)
  const [staff, setStaff] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [form, setForm] = useState(defaultForm)
  const [isEditing, setIsEditing] = useState(false)

  // Fetch staff list once
  const fetchStaff = async () => {
    setLoading(true)
    setError(null)
    const res = await staffAPI.getStaff()
    if (res.success) {
      setStaff(res.staff)
    } else {
      setError(res.error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  // Initialize DataTable when staff changes
  useEffect(() => {
    const initializeDataTable = () => {
      try {
        if (window.$ && window.$.fn.DataTable) {
          if (window.$.fn.DataTable.isDataTable("#example")) {
            window.$("#example").DataTable().destroy()
          }
          window.$("#example").DataTable({
            responsive: true,
            pageLength: 10,
            order: [[0, "asc"]],
          })
        }
      } catch (err) {
        console.error("Error initializing DataTable:", err)
      }
    }
    const t = setTimeout(initializeDataTable, 100)
    return () => {
      clearTimeout(t)
      try {
        if (window.$ && window.$.fn.DataTable && window.$.fn.DataTable.isDataTable("#example")) {
          window.$("#example").DataTable().destroy()
        }
      } catch (err) {
        console.error("Error destroying DataTable:", err)
      }
    }
  }, [staff])

  const openAddModal = () => {
    setIsEditing(false)
    setForm(defaultForm)
    setShowAdminModal(true)
  }

  const openEditModal = (row) => {
    setIsEditing(true)
    setForm({
      id: row.id,
      full_name: row.full_name || "",
      email: row.email || "",
      role: row.role || "Support Staff",
      status: row.status || "Active",
    })
    setShowAdminModal(true)
  }

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Staff/Admin?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    })
    if (!confirm.isConfirmed) return

    const res = await staffAPI.deleteStaff(id)
    if (res.success) {
      Swal.fire("Deleted", res.message, "success")
      fetchStaff()
    } else {
      Swal.fire("Error", res.error || "Failed to delete", "error")
    }
  }

  const handleResetPassword = async (id) => {
    const confirm = await Swal.fire({
      title: "Reset Password?",
      text: "New credentials will be sent to the user's email.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Reset",
      cancelButtonText: "Cancel",
    })
    if (!confirm.isConfirmed) return

    const res = await staffAPI.resetPassword(id)
    if (res.success) {
      Swal.fire("Success", res.message, "success")
    } else {
      Swal.fire("Error", res.error || "Failed to reset password", "error")
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    if (!form.full_name || !form.email) {
      Swal.fire("Validation", "Full name and email are required.", "warning")
      return
    }

    const payload = {
      id: form.id,
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      role: form.role,
      status: form.status,
    }

    const res = isEditing
      ? await staffAPI.updateStaff(payload)
      : await staffAPI.createStaff(payload)

    if (res.success) {
      Swal.fire("Success", res.message, "success")
      setShowAdminModal(false)
      setForm(defaultForm)
      fetchStaff()
    } else {
      Swal.fire("Error", res.error || "Operation failed", "error")
    }
  }

  const formatLastLogin = (val) => (val ? val : "-")

  if (loading) {
    return <div className="text-center p-4">Loading staff...</div>
  }
  if (error) {
    return <div className="text-center p-4 text-danger">Error: {error}</div>
  }

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Staff/Admin Management</h5>
          <div className="list-btn" style={{ justifySelf: "end" }}>
            <ul className="filter-list">
              <li>
                <div className="dropdown dropdown-action" data-bs-placement="bottom">
                  <Link to="#" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>
                      <i className="fe fe-download me-2"></i>
                    </span>{" "}
                    Downloads
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end">
                    <ul className="d-block">
                      <li>
                        <Link className="d-flex align-items-center download-item" to="#" download="">
                          <i className="far fa-file-text me-2"></i>EXCEL
                        </Link>
                      </li>
                      <li>
                        <Link className="d-flex align-items-center download-item" to="#" download="">
                          <i className="far fa-file-pdf me-2"></i>PDF
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <button className="btn btn-primary" onClick={openAddModal}>
                  <i className="fa fa-plus-circle me-2"></i>Add New
                </button>
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
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Last Login</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staff.map((row, idx) => (
                      <tr key={row.id}>
                        <td>{idx + 1}</td>
                        <td>{row.full_name}</td>
                        <td>{row.email}</td>
                        <td>
                          <span className={roleBadgeClass(row.role)}>{row.role}</span>
                        </td>
                        <td>{formatLastLogin(row.last_login)}</td>
                        <td>
                          {String(row.status).toLowerCase() === "active" ? (
                            <span className="text-success">Active</span>
                          ) : (
                            <span className="text-muted">{row.status}</span>
                          )}
                        </td>
                        <td className="d-flex gap-1">
                          <button
                            className="btn btn-sm btn-warning"
                            title="Edit"
                            onClick={() => openEditModal(row)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            title="Delete"
                            onClick={() => handleDelete(row.id)}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            title="Logs"
                            onClick={() => setShowLogsModal(true)}
                          >
                            Logs
                          </button>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            title="Reset Password"
                            onClick={() => handleResetPassword(row.id)}
                          >
                            Reset Pwd
                          </button>
                        </td>
                      </tr>
                    ))}
                    {staff.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No staff found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Admin Modal */}
      {showAdminModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleFormSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? "Edit Admin" : "Add Admin"}</h5>
                <button type="button" className="btn-close" onClick={() => setShowAdminModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. John Doe"
                    value={form.full_name}
                    onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="e.g. john@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Role</label>
                  <select
                    className="form-control"
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  >
                    <option>Super Admin</option>
                    <option>Support Staff</option>
                    <option>Billing Manager</option>
                    <option>Sales Manager</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>Status</label>
                  <select
                    className="form-control"
                    value={form.status}
                    onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                  >
                    <option>Active</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logs Modal (placeholder content) */}
      {showLogsModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Admin Activity Logs</h5>
                <button type="button" className="btn-close" onClick={() => setShowLogsModal(false)}></button>
              </div>
              <div className="modal-body">
                <ul className="list-group">
                  <li className="list-group-item">Logs integration placeholder</li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default StaffAdmin
