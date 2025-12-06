"use client"

import { useEffect, useState } from "react"
import nodesPlanAPI from "../api/nodesPlanAPI" // default export

const NodePlans = () => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch node plans from API
  const fetchPlans = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await nodesPlanAPI.getPlans()
      if (result.success) {
        setPlans(result.plans)
      } else {
        setError(result.error || "Failed to fetch plans")
      }
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  // Initialize DataTable when plans change
  useEffect(() => {
    const initializeDataTable = () => {
      if (window.$ && window.$.fn.DataTable) {
        if (window.$.fn.DataTable.isDataTable("#nodeplans")) {
          window.$("#nodeplans").DataTable().destroy()
        }
        window.$("#nodeplans").DataTable({
          responsive: true,
          pageLength: 10,
          order: [[0, "asc"]],
        })
      }
    }

    const t = setTimeout(initializeDataTable, 200)
    return () => {
      clearTimeout(t)
      try {
        if (window.$ && window.$.fn.DataTable && window.$.fn.DataTable.isDataTable("#nodeplans")) {
          window.$("#nodeplans").DataTable().destroy()
        }
      } catch (err) {
        console.error("Error destroying DataTable:", err)
      }
    }
  }, [plans])

  if (loading) return <div className="text-center p-4">Loading node plans...</div>

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Node Plans</h5>
          <div className="list-btn" style={{ justifySelf: "end" }}>
            <ul className="filter-list">
              <li>
                <div className="dropdown dropdown-action" data-bs-placement="bottom">
                  <a href="#" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                    <span><i className="fe fe-download me-2"></i></span> Downloads
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
                <a
                  className="btn btn-primary"
                  href="/add-node"
                >
                  <i className="fa fa-plus-circle me-2"></i>Add New
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>Warning:</strong> {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      <div className="row">
        <div className="col-sm-12">
          <div className="card-table card p-2">
            <div className="card-body">
              <div className="table-responsive">
                <table id="nodeplans" className="table table-striped" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Subtitle</th>
                      <th>Price</th>
                      <th>Weekly Earning</th>
                      <th>Features</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plans.length > 0 ? (
                      plans.map((plan, idx) => (
                        <tr key={plan.id}>
                          <td>{idx + 1}</td>
                          <td>
                            <img src={plan.image} alt={plan.title} width="60" />
                          </td>
                          <td>{plan.title}</td>
                          <td>{plan.subtitle}</td>
                          <td>${plan.price_display}</td>
                          <td>${plan.weekly_earning}</td>
                          <td>
                            <ul className="mb-0">
                              {plan.features.map((f, i) => <li key={i}>{f}</li>)}
                            </ul>
                          </td>
                          <td>
                            {plan.is_active ? <span className="text-success">Active</span> : <span className="text-muted">Inactive</span>}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center">No node plans found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NodePlans
