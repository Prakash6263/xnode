import { useState } from "react"

const CreateInvoice = () => {
  const [formData, setFormData] = useState({
    user: "",
    amount: "",
    coupon: "",
    taxRate: "10% - US",
    subscriptionType: "One-time",
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
    console.log("Creating invoice with data:", formData)
    // Add invoice creation logic here
  }

  const handleReset = () => {
    setFormData({
      user: "",
      amount: "",
      coupon: "",
      taxRate: "10% - US",
      subscriptionType: "One-time",
    })
  }

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Create Invoice</h5>
          <div className="list-btn" style={{ justifySelf: "end" }}>
            <ul className="filter-list">
              <li>
                <div className="dropdown dropdown-action" data-bs-placement="bottom">
                  <a href="#" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>
                      <i className="fe fe-download me-2"></i>
                    </span>
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
                <a className="btn btn-primary" href="/billing-invoice">
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
                    <label className="form-label">Select User</label>
                    <select
                      className="form-control"
                      name="user"
                      value={formData.user}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Choose a user...</option>
                      <option value="john-doe">John Doe</option>
                      <option value="jane-smith">Jane Smith</option>
                      <option value="emily-rose">Emily Rose</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Amount ($)</label>
                    <input
                      type="number"
                      className="form-control"
                      name="amount"
                      placeholder="Amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Coupon Code (optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="coupon"
                      placeholder="DISCOUNT10"
                      value={formData.coupon}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Tax Rate</label>
                    <select
                      className="form-control"
                      name="taxRate"
                      value={formData.taxRate}
                      onChange={handleInputChange}
                    >
                      <option value="0% (Exempt)">0% (Exempt)</option>
                      <option value="10% - US">10% - US</option>
                      <option value="18% - IN">18% - IN</option>
                      <option value="20% - EU">20% - EU</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Subscription Type</label>
                    <select
                      className="form-control"
                      name="subscriptionType"
                      value={formData.subscriptionType}
                      onChange={handleInputChange}
                    >
                      <option value="One-time">One-time</option>
                      <option value="Recurring (Auto-renew)">Recurring (Auto-renew)</option>
                    </select>
                  </div>
                </div>

                <div className="text-end mt-4">
                  <button type="button" className="btn btn-outline-secondary me-2" onClick={handleReset}>
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create Invoice
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

export default CreateInvoice
