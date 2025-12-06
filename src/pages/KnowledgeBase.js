"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const KnowledgeBase = () => {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "Accounts",
    content: "",
    visibility: "Public",
    comments: "Enabled",
  })

  useEffect(() => {
    // Initialize DataTable after component mounts
    const initializeDataTable = () => {
      try {
        if (window.$ && window.$.fn.DataTable) {
          const table = window.$("#knowledgeTable")
          if (table.length && !window.$.fn.DataTable.isDataTable("#knowledgeTable")) {
            table.DataTable({
              responsive: true,
              pageLength: 10,
              order: [[0, "asc"]],
            })
          }
        }
      } catch (error) {
        console.error("Error initializing DataTable:", error)
      }
    }

    setTimeout(initializeDataTable, 1000)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Saving article:", formData)
    setShowModal(false)
    // Reset form
    setFormData({
      title: "",
      category: "Accounts",
      content: "",
      visibility: "Public",
      comments: "Enabled",
    })
  }

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Knowledge Base Articles</h5>
          <div className="list-btn" style={{ justifySelf: "end" }}>
            <ul className="filter-list">
              <li>
                <div className="dropdown dropdown-action" data-bs-placement="bottom">
                  <Link to="#" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>
                      <i className="fe fe-download me-2"></i>
                    </span>
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
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card-table card p-2">
            <div className="card-body">
              <div className="table-responsive">
                <table id="knowledgeTable" className="table table-striped" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Visibility</th>
                      <th>Comments</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>How to reset your password</td>
                      <td>
                        <span className="badge badge-category">Accounts</span>
                      </td>
                      <td>
                        <span className="badge badge-public">Public</span>
                      </td>
                      <td>Enabled</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-1">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Billing cycle explanation</td>
                      <td>
                        <span className="badge badge-category">Billing</span>
                      </td>
                      <td>
                        <span className="badge badge-internal">Internal</span>
                      </td>
                      <td>Disabled</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-1">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Connecting via SSH</td>
                      <td>
                        <span className="badge badge-category">Hosting</span>
                      </td>
                      <td>
                        <span className="badge badge-public">Public</span>
                      </td>
                      <td>Enabled</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-1">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>How to add domain to cPanel</td>
                      <td>
                        <span className="badge badge-category">Domains</span>
                      </td>
                      <td>
                        <span className="badge badge-public">Public</span>
                      </td>
                      <td>Enabled</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-1">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Understanding DNS propagation</td>
                      <td>
                        <span className="badge badge-category">Domains</span>
                      </td>
                      <td>
                        <span className="badge badge-internal">Internal</span>
                      </td>
                      <td>Disabled</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-1">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
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

      {/* Add New Article Button */}
      <div className="position-fixed" style={{ bottom: "20px", right: "20px" }}>
        <button
          className="btn btn-primary btn-lg rounded-circle"
          onClick={() => setShowModal(true)}
          style={{ width: "60px", height: "60px" }}
        >
          <i className="fa fa-plus"></i>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Add New Article</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body">
                <div className="form-group mb-3">
                  <label>Article Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g., How to connect via SSH"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Category</label>
                  <select
                    className="form-control"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="Accounts">Accounts</option>
                    <option value="Billing">Billing</option>
                    <option value="Hosting">Hosting</option>
                    <option value="Domains">Domains</option>
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>Content</label>
                  <textarea
                    className="form-control"
                    rows="5"
                    placeholder="Write the article content here..."
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="row mb-3">
                  <div className="form-group col-md-6">
                    <label>Visibility</label>
                    <select
                      className="form-control"
                      name="visibility"
                      value={formData.visibility}
                      onChange={handleInputChange}
                    >
                      <option value="Public">Public</option>
                      <option value="Internal">Internal</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Comments</label>
                    <select
                      className="form-control"
                      name="comments"
                      value={formData.comments}
                      onChange={handleInputChange}
                    >
                      <option value="Enabled">Enabled</option>
                      <option value="Disabled">Disabled</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default KnowledgeBase
