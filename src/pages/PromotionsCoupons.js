"use client"

import { useEffect, useState } from "react"

const PromotionsCoupons = () => {
  const [showCouponModal, setShowCouponModal] = useState(false)

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
          <h5>Promotions & Coupons</h5>
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
                <button className="btn btn-primary" onClick={() => setShowCouponModal(true)}>
                  <i className="fa fa-plus-circle me-2"></i>Generate Coupon
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
                      <th>Code</th>
                      <th>Discount</th>
                      <th>Usage Limit</th>
                      <th>Expiry Date</th>
                      <th>Applies To</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>WELCOME10</td>
                      <td>10%</td>
                      <td>100 uses</td>
                      <td>2025-12-31</td>
                      <td>
                        <span className="badge badge-service">Hosting</span>
                      </td>
                      <td>
                        <span className="badge badge-active">Active</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>BLACKFRI50</td>
                      <td>50%</td>
                      <td>50 uses</td>
                      <td>2024-11-30</td>
                      <td>
                        <span className="badge badge-service">All Services</span>
                      </td>
                      <td>
                        <span className="badge badge-expired">Expired</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>DOMAIN20</td>
                      <td>20%</td>
                      <td>Unlimited</td>
                      <td>2025-06-30</td>
                      <td>
                        <span className="badge badge-service">Domains</span>
                      </td>
                      <td>
                        <span className="badge badge-active">Active</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>RENEW5</td>
                      <td>5%</td>
                      <td>500 uses</td>
                      <td>2025-07-15</td>
                      <td>
                        <span className="badge badge-service">Renewals</span>
                      </td>
                      <td>
                        <span className="badge badge-active">Active</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning">
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button className="btn btn-sm btn-danger">
                          <i className="bi bi-trash3"></i>
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>NEWYEAR30</td>
                      <td>30%</td>
                      <td>200 uses</td>
                      <td>2025-01-10</td>
                      <td>
                        <span className="badge badge-service">All Services</span>
                      </td>
                      <td>
                        <span className="badge badge-expired">Expired</span>
                      </td>
                      <td>
                        <button className="btn btn-sm btn-warning">
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

      {/* Generate Coupon Modal */}
      {showCouponModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog">
            <form className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Generate New Coupon</h5>
                <button type="button" className="btn-close" onClick={() => setShowCouponModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label>Coupon Code</label>
                  <input type="text" className="form-control" placeholder="e.g. NEWYEAR50" />
                </div>
                <div className="row mb-3">
                  <div className="form-group mb-3 col-md-6">
                    <label>Discount (%)</label>
                    <input type="number" className="form-control" placeholder="e.g. 20" />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <label>Usage Limit</label>
                    <input type="text" className="form-control" placeholder="e.g. 100 or Unlimited" />
                  </div>
                  <div className="form-group col-md-12">
                    <label>Expiry Date</label>
                    <input type="date" className="form-control" />
                  </div>
                </div>
                <div className="form-group mb-3">
                  <label>Applicable Services</label>
                  <select className="form-control">
                    <option>All Services</option>
                    <option>Hosting</option>
                    <option>Domains</option>
                    <option>Renewals</option>
                    <option>Backups</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default PromotionsCoupons
