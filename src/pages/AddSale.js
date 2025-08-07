"use client"

import { useState } from "react"

const AddSale = () => {
  const [formData, setFormData] = useState({
    saleType: "Private",
    startTime: "",
    endTime: "",
    tokenPrice: "",
    totalTokens: "",
    minBuy: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Sale form submitted:", formData)
    // Handle form submission here
  }

  const handleReset = () => {
    setFormData({
      saleType: "Private",
      startTime: "",
      endTime: "",
      tokenPrice: "",
      totalTokens: "",
      minBuy: "",
    })
  }

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Add Sale</h5>
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
                <a className="btn btn-primary" href="/sale">
                  <i className="fa fa-eye me-2"></i>View All
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
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Sale Type</label>
                    <select
                      className="form-control"
                      name="saleType"
                      value={formData.saleType}
                      onChange={handleInputChange}
                    >
                      <option value="Private">Private</option>
                      <option value="Public">Public</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Start Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Token Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="tokenPrice"
                      value={formData.tokenPrice}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Total Tokens</label>
                    <input
                      type="number"
                      className="form-control"
                      name="totalTokens"
                      value={formData.totalTokens}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Minimum Buy Bound</label>
                    <input
                      type="number"
                      className="form-control"
                      name="minBuy"
                      value={formData.minBuy}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="text-end mt-4">
                  <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Sale
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddSale
