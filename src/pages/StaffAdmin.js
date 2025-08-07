"use client"

import { useEffect, useState } from "react"

const StaffAdmin = () => {
  const [showAdminModal, setShowAdminModal] = useState(false)
  const [showLogsModal, setShowLogsModal] = useState(false)

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
      } catch (error) {
        console.error("Error initializing DataTable:", error)
      }
    }

    setTimeout(initializeDataTable, 500)

    return () => {
      try {
        if (window.$ && window.$.fn.DataTable && window.$.fn.DataTable.isDataTable("#example")) {
          window.$("#example").DataTable().destroy()
        }
      } catch (error) {
        console.error("Error destroying DataTable:", error)
      }
    }
  }, [])

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Staff/Admin Management</h5>
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
                <button className="btn btn-primary" onClick={() => setShowAdminModal(true)}>
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
                    <tr>
                      <td>1</td>
                      <td>Amit Khare</td>
                      <td>amit@example.com</td>
                      <td>
                        <span className="badge badge-super">Super Admin</span>
                      </td>
                      <td>2025-06-04 10:22</td>
                      <td>
                        <span className="text-success">Active</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={() => setShowLogsModal(true)}>
                          Logs
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Priya Sharma</td>
                      <td>priya@company.com</td>
                      <td>
                        <span className="badge badge-support">Support Staff</span>
                      </td>
                      <td>2025-06-03 18:10</td>
                      <td>
                        <span className="text-success">Active</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={() => setShowLogsModal(true)}>
                          Logs
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Rahul Mehta</td>
                      <td>rahul@billing.com</td>
                      <td>
                        <span className="badge badge-billing">Billing Manager</span>
                      </td>
                      <td>2025-06-02 15:44</td>
                      <td>
                        <span className="text-muted">Disabled</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={() => setShowLogsModal(true)}>
                          Logs
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Anita Desai</td>
                      <td>anita@sales.com</td>
                      <td>
                        <span className="badge badge-sales">Sales Manager</span>
                      </td>
                      <td>2025-06-01 09:10</td>
                      <td>
                        <span className="text-success">Active</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                        <button className="btn btn-sm btn-secondary" onClick={() => setShowLogsModal(true)}>
                          Logs
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Admin Modal */}
      {showAdminModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add/Edit Admin</h5>
                <button type="button" className="btn-close" onClick={() => setShowAdminModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label>Full Name</label>
                  <input type="text" className="form-control" placeholder="e.g. John Doe" />
                </div>
                <div className="form-group mb-3">
                  <label>Email Address</label>
                  <input type="email" className="form-control" placeholder="e.g. john@example.com" />
                </div>
                <div className="form-group mb-3">
                  <label>Role</label>
                  <select className="form-control">
                    <option>Super Admin</option>
                    <option>Support Staff</option>
                    <option>Billing Manager</option>
                    <option>Sales Manager</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>Status</label>
                  <select className="form-control">
                    <option>Active</option>
                    <option>Disabled</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Logs Modal */}
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
                  <li className="list-group-item">[2025-06-04 10:22] Amit Khare created a new hosting package</li>
                  <li className="list-group-item">[2025-06-03 18:10] Priya Sharma updated a support ticket status</li>
                  <li className="list-group-item">[2025-06-02 15:45] Rahul Mehta exported billing report</li>
                  <li className="list-group-item">[2025-06-01 09:10] Anita Desai added new client from sales lead</li>
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
