"use client"

import { useEffect } from "react"

const BillingInvoice = () => {
  useEffect(() => {
    // Initialize DataTable after component mounts
    const initializeDataTable = () => {
      try {
        if (window.$ && window.$.fn.DataTable) {
          const table = window.$("#invoiceTable")
          if (table.length && !window.$.fn.DataTable.isDataTable("#invoiceTable")) {
            table.DataTable({
              responsive: true,
              pageLength: 10,
              order: [[0, "desc"]],
            })
          }
        }
      } catch (error) {
        console.error("Error initializing DataTable:", error)
      }
    }

    // Delay initialization to ensure external scripts are loaded
    setTimeout(initializeDataTable, 1000)
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="card-table card p-2">
            <div className="card-body">
              <div className="table-responsive">
                <table id="invoiceTable" className="table table-striped" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>#Invoice ID</th>
                      <th>User</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Tax</th>
                      <th>Coupon</th>
                      <th>Status</th>
                      <th>Auto-Renew</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>INV-0001</td>
                      <td>John Doe</td>
                      <td>2025-06-01</td>
                      <td>$100</td>
                      <td>10%</td>
                      <td>-</td>
                      <td>
                        <span className="badge bg-success badge-status">Paid</span>
                      </td>
                      <td>Yes</td>
                      <td>
                        <a href="/invoice-details" className="btn btn-sm btn-primary text-white">
                          <i className="bi bi-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>INV-0002</td>
                      <td>Jane Smith</td>
                      <td>2025-06-02</td>
                      <td>$250</td>
                      <td>18%</td>
                      <td>SUMMER20</td>
                      <td>
                        <span className="badge bg-warning text-dark badge-status">Pending</span>
                      </td>
                      <td>No</td>
                      <td>
                        <a href="/invoice-details" className="btn btn-sm btn-primary text-white">
                          <i className="bi bi-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>INV-0003</td>
                      <td>Mike Lin</td>
                      <td>2025-06-01</td>
                      <td>$90</td>
                      <td>5%</td>
                      <td>-</td>
                      <td>
                        <span className="badge bg-success badge-status">Paid</span>
                      </td>
                      <td>Yes</td>
                      <td>
                        <a href="/invoice-details" className="btn btn-sm btn-primary text-white">
                          <i className="bi bi-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>INV-0004</td>
                      <td>Anna Jones</td>
                      <td>2025-05-29</td>
                      <td>$120</td>
                      <td>8%</td>
                      <td>WELCOME</td>
                      <td>
                        <span className="badge bg-danger badge-status">Failed</span>
                      </td>
                      <td>No</td>
                      <td>
                        <a href="/invoice-details" className="btn btn-sm btn-primary text-white">
                          <i className="bi bi-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>INV-0005</td>
                      <td>Peter Ray</td>
                      <td>2025-05-28</td>
                      <td>$210</td>
                      <td>12%</td>
                      <td>-</td>
                      <td>
                        <span className="badge bg-success badge-status">Paid</span>
                      </td>
                      <td>Yes</td>
                      <td>
                        <a href="/invoice-details" className="btn btn-sm btn-primary text-white">
                          <i className="bi bi-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>INV-0006</td>
                      <td>Emily Rose</td>
                      <td>2025-05-25</td>
                      <td>$305</td>
                      <td>15%</td>
                      <td>JUNE10</td>
                      <td>
                        <span className="badge bg-warning text-dark badge-status">Pending</span>
                      </td>
                      <td>No</td>
                      <td>
                        <a href="/invoice-details" className="btn btn-sm btn-primary text-white">
                          <i className="bi bi-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>INV-0007</td>
                      <td>Tom King</td>
                      <td>2025-05-24</td>
                      <td>$80</td>
                      <td>0%</td>
                      <td>-</td>
                      <td>
                        <span className="badge bg-success badge-status">Paid</span>
                      </td>
                      <td>Yes</td>
                      <td>
                        <a href="/invoice-details" className="btn btn-sm btn-primary text-white">
                          <i className="bi bi-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>INV-0008</td>
                      <td>Sara Lane</td>
                      <td>2025-05-23</td>
                      <td>$150</td>
                      <td>18%</td>
                      <td>NEWYEAR</td>
                      <td>
                        <span className="badge bg-success badge-status">Paid</span>
                      </td>
                      <td>Yes</td>
                      <td>
                        <a href="/invoice-details" className="btn btn-sm btn-primary text-white">
                          <i className="bi bi-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>INV-0009</td>
                      <td>Chris Paul</td>
                      <td>2025-05-21</td>
                      <td>$60</td>
                      <td>5%</td>
                      <td>-</td>
                      <td>
                        <span className="badge bg-danger badge-status">Failed</span>
                      </td>
                      <td>No</td>
                      <td>
                        <a href="/invoice-details" className="btn btn-sm btn-primary text-white">
                          <i className="bi bi-eye"></i>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>INV-0010</td>
                      <td>Rachel Green</td>
                      <td>2025-05-20</td>
                      <td>$190</td>
                      <td>10%</td>
                      <td>OFF25</td>
                      <td>
                        <span className="badge bg-success badge-status">Paid</span>
                      </td>
                      <td>Yes</td>
                      <td>
                        <a href="/invoice-details" className="btn btn-sm btn-primary text-white">
                          <i className="bi bi-eye"></i>
                        </a>
                      </td>
                    </tr>
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

export default BillingInvoice
