"use client"

import { useState } from "react"

const AddUser = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    status: "",
    kyc: "",
    phone: "",
    address: "",
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
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      status: "",
      kyc: "",
      phone: "",
      address: "",
    })
  }

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Add User Information</h5>
          <div className="list-btn" style={{ justifySelf: "end" }}>
            <ul className="filter-list">
              <li>
                <a className="btn btn-primary" href="/user-list">
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
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="form-control"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="form-control"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="status" className="form-label">
                      Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="Active">Active</option>
                      <option value="Suspended">Suspended</option>
                      <option value="Banned">Banned</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="kyc" className="form-label">
                      KYC Status
                    </label>
                    <select
                      id="kyc"
                      name="kyc"
                      className="form-select"
                      value={formData.kyc}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose...</option>
                      <option value="Approved">Approved</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                      <option value="Not Submitted">Not Submitted</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="+1234567890"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-12">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="form-control"
                      placeholder="123 Street, City, Country"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-12 text-end">
                    <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                      Reset
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save User
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddUser
