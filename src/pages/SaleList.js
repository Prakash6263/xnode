"use client"

import { useEffect } from "react"

const SaleList = () => {
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
          <h5>Sale List</h5>
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
                <a className="btn btn-primary" href="/add-sale">
                  <i className="fa fa-plus-circle me-2"></i>Add Sale
                </a>
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
                  <thead className="thead-light">
                    <tr>
                      <th>#</th>
                      <th>Sale Type</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Token Price</th>
                      <th>Total Tokens</th>
                      <th>Min Buy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Private</td>
                      <td>2025-01-01 10:00</td>
                      <td>2025-01-15 10:00</td>
                      <td>1000</td>
                      <td>500000</td>
                      <td>100</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Public</td>
                      <td>2025-02-01 10:00</td>
                      <td>2025-02-28 10:00</td>
                      <td>1100</td>
                      <td>600000</td>
                      <td>200</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Private</td>
                      <td>2025-03-10 09:00</td>
                      <td>2025-03-25 18:00</td>
                      <td>1050</td>
                      <td>450000</td>
                      <td>150</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Public</td>
                      <td>2025-04-01 08:00</td>
                      <td>2025-04-20 22:00</td>
                      <td>1150</td>
                      <td>700000</td>
                      <td>250</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Private</td>
                      <td>2025-05-01 07:00</td>
                      <td>2025-05-15 20:00</td>
                      <td>12000</td>
                      <td>300000</td>
                      <td>90</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Public</td>
                      <td>2025-06-05 12:00</td>
                      <td>2025-06-25 12:00</td>
                      <td>12500</td>
                      <td>550000</td>
                      <td>175</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Private</td>
                      <td>2025-07-15 14:00</td>
                      <td>2025-07-30 14:00</td>
                      <td>13000</td>
                      <td>480000</td>
                      <td>130</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>Public</td>
                      <td>2025-08-01 11:00</td>
                      <td>2025-08-20 11:00</td>
                      <td>13500</td>
                      <td>620000</td>
                      <td>160</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>Private</td>
                      <td>2025-09-10 09:30</td>
                      <td>2025-09-25 18:30</td>
                      <td>14000</td>
                      <td>410000</td>
                      <td>100</td>
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

export default SaleList
