import { useEffect, useState } from "react"
import { promotionsAPI } from "../api/promotions"
import jsPDF from "jspdf"
import "jspdf-autotable"
import Swal from "sweetalert2" // Added SweetAlert import

const PromotionsCoupons = () => {
  const [showCouponModal, setShowCouponModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    discount_type: "percentage",
    usage_limit: "",
    validity_days: "",
    expires_at: "",
    applies_to: "all_services",
  })

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    setLoading(true)
    setError(null)
    const result = await promotionsAPI.getCoupons(0, 10)
    if (result.success) {
      setCoupons(result.coupons || result.data || [])
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "validity_days") {
      setFormData((prev) => ({
        ...prev,
        validity_days: value,
        expires_at: value ? "" : prev.expires_at,
      }))
      return
    }

    if (name === "expires_at") {
      setFormData((prev) => ({
        ...prev,
        expires_at: value,
        validity_days: value ? "" : prev.validity_days,
      }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateCoupon = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let computedExpiresAt = null

      if (formData.validity_days) {
        const days = parseInt(formData.validity_days, 10)
        if (!Number.isNaN(days) && days > 0) {
          const expiryDate = new Date()
          expiryDate.setDate(expiryDate.getDate() + days)
          computedExpiresAt = expiryDate.toISOString().split("T")[0]
        }
      } else if (formData.expires_at) {
        computedExpiresAt = formData.expires_at
      }

      const couponPayload = {
        code: formData.code.trim().toUpperCase(),
        discount: Number.isFinite(Number(formData.discount)) ? parseInt(formData.discount, 10) : null,
        discount_type: formData.discount_type,
        usage_limit:
          formData.usage_limit === "unlimited" || formData.usage_limit === "" ? null : parseInt(formData.usage_limit, 10),
        ...(formData.validity_days && { validity_days: parseInt(formData.validity_days, 10) }),
        ...(computedExpiresAt && { expires_at: computedExpiresAt }),
        applies_to: formData.applies_to === "all_services" ? "All Services" : formData.applies_to,
        is_active: true,
      }

      const result = await promotionsAPI.createCoupon(couponPayload)

      if (result.success) {
        setFormData({
          code: "",
          discount: "",
          discount_type: "percentage",
          usage_limit: "",
          validity_days: "",
          expires_at: "",
          applies_to: "all_services",
        })
        setShowCouponModal(false)
        fetchCoupons()
      } else {
        setError(result.error || "Failed to create coupon")
      }
    } catch (err) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleEditClick = async (coupon) => {
    setFormData({
      code: "",
      discount: "",
      discount_type: "percentage",
      usage_limit: "",
      validity_days: "",
      expires_at: "",
      applies_to: "all_services",
    })
    
    setSelectedCoupon(coupon)
    setLoading(true)
    setError(null)

    const result = await promotionsAPI.getCouponById(coupon.id)
    
    if (result.success) {
      const couponData = result.coupon
      setFormData({
        code: couponData.code || "",
        discount: couponData.discount || "",
        discount_type: couponData.discount_type || "percentage",
        usage_limit: couponData.usage_limit || "",
        validity_days: couponData.validity_days || "",
        expires_at: couponData.expires_at ? couponData.expires_at.split("T")[0] : "",
        applies_to: couponData.applies_to === "All Services" ? "all_services" : (couponData.applies_to || "all_services"),
      })
      setShowEditModal(true)
    } else {
      setError(result.error || "Failed to fetch coupon details")
    }
    setLoading(false)
  }

  const handleUpdateCoupon = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let computedExpiresAt = formData.expires_at

      if (formData.validity_days) {
        const days = parseInt(formData.validity_days, 10)
        if (!Number.isNaN(days) && days > 0) {
          const expiryDate = new Date()
          expiryDate.setDate(expiryDate.getDate() + days)
          computedExpiresAt = expiryDate.toISOString().split("T")[0]
        }
      }

      const couponPayload = {
        code: formData.code.trim().toUpperCase(),
        discount: Number.isFinite(Number(formData.discount)) ? parseInt(formData.discount, 10) : null,
        discount_type: formData.discount_type,
        usage_limit:
          formData.usage_limit === "unlimited" || formData.usage_limit === "" ? null : parseInt(formData.usage_limit, 10),
        ...(formData.validity_days && { validity_days: parseInt(formData.validity_days, 10) }),
        ...(computedExpiresAt && { expires_at: computedExpiresAt }),
        applies_to: formData.applies_to === "all_services" ? "All Services" : formData.applies_to,
        is_active: true,
      }

      const result = await promotionsAPI.updateCoupon(selectedCoupon.id, couponPayload)

      if (result.success) {
        setShowEditModal(false)
        setSelectedCoupon(null)
        setFormData({
          code: "",
          discount: "",
          discount_type: "percentage",
          usage_limit: "",
          validity_days: "",
          expires_at: "",
          applies_to: "all_services",
        })
        fetchCoupons()
      } else {
        setError(result.error || "Failed to update coupon")
      }
    } catch (err) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCoupon = async (coupon) => {
    const result = await Swal.fire({
      title: "Delete Coupon?",
      text: `Are you sure you want to delete coupon "${coupon.code}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    })

    if (!result.isConfirmed) {
      return
    }

    setLoading(true)
    setError(null)

    const deleteResult = await promotionsAPI.deleteCoupon(coupon.id)

    if (deleteResult.success) {
      Swal.fire("Deleted!", `Coupon "${coupon.code}" has been deleted successfully.`, "success")
      fetchCoupons()
    } else {
      Swal.fire("Error!", deleteResult.error || "Failed to delete coupon", "error")
      setError(deleteResult.error || "Failed to delete coupon")
    }
    setLoading(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    try {
      return new Date(dateString).toLocaleDateString()
    } catch {
      return dateString
    }
  }

  const getStatusBadge = (coupon) => {
    if (!coupon.is_active) return <span className="badge badge-inactive">Inactive</span>
    if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
      return <span className="badge badge-expired">Expired</span>
    }
    return <span className="badge badge-active">Active</span>
  }

  const downloadCSV = (filename = "coupons.csv") => {
    if (!coupons || coupons.length === 0) {
      alert("No coupons to download")
      return
    }

    const header = ["#", "Code", "Discount", "Discount Type", "Usage Limit", "Expiry Date", "Applies To", "Status"]
    const rows = coupons.map((c, idx) => [
      idx + 1,
      c.code ?? "",
      c.discount ?? "",
      c.discount_type ?? "",
      c.usage_limit ?? "Unlimited",
      c.expires_at ?? "",
      c.applies_to ?? "",
      c.is_active ? (c.expires_at && new Date(c.expires_at) < new Date() ? "Expired" : "Active") : "Inactive",
    ])

    const csvContent =
      [header, ...rows]
        .map((r) =>
          r
            .map((cell) => {
              if (cell === null || typeof cell === "undefined") return ""
              const str = String(cell).replace(/"/g, '""')
              return `"${str}"`
            })
            .join(",")
        )
        .join("\r\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.setAttribute("download", filename)
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const downloadPDF = (filename = "coupons.pdf") => {
    if (!coupons || coupons.length === 0) {
      alert("No coupons to download")
      return
    }

    try {
      const pdf = new jsPDF("l", "mm", "a4")
      
      pdf.setFontSize(16)
      pdf.text("Promotions & Coupons Report", 14, 15)
      
      pdf.setFontSize(10)
      pdf.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 23)

      const tableColumn = ["#", "Code", "Discount", "Type", "Usage", "Expiry", "Applies To", "Status"]
      const tableRows = coupons.map((c, idx) => [
        String(idx + 1),
        c.code ?? "-",
        c.discount ? `${c.discount}${c.discount_type === "percentage" ? "%" : "$"}` : "-",
        c.discount_type ?? "-",
        c.usage_limit ? `${c.usage_limit} uses` : "Unlimited",
        c.expires_at ? new Date(c.expires_at).toLocaleDateString() : "-",
        c.applies_to === "All Services" ? "All Services" : (c.applies_to ?? "-"),
        c.is_active ? (c.expires_at && new Date(c.expires_at) < new Date() ? "Expired" : "Active") : "Inactive",
      ])

      if (pdf.autoTable) {
        pdf.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 30,
          theme: "grid",
          headStyles: {
            fillColor: [41, 128, 185],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 11,
          },
          bodyStyles: { fontSize: 10 },
          columnStyles: {
            0: { cellWidth: 12 },
            1: { cellWidth: 25 },
            2: { cellWidth: 20 },
            3: { cellWidth: 18 },
            4: { cellWidth: 22 },
            5: { cellWidth: 25 },
            6: { cellWidth: 28 },
            7: { cellWidth: 18 },
          },
          margin: { top: 30, right: 10, bottom: 10, left: 10 },
          didDrawPage: (data) => {
            const pageSize = pdf.internal.pageSize
            const pageHeight = pageSize.getHeight()
            const pageWidth = pageSize.getWidth()
            const pageNumber = pdf.internal.getCurrentPageInfo().pageNumber
            const pageCount = pdf.internal.getNumberOfPages()

            pdf.setFontSize(9)
            pdf.text(
              `Page ${pageNumber} of ${pageCount}`,
              pageWidth / 2,
              pageHeight - 10,
              { align: "center" }
            )
          },
        })
      }

      pdf.save(filename)
    } catch (err) {
      console.error("PDF generation error:", err)
      alert("Failed to generate PDF")
    }
  }

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Promotions & Coupons</h5>
          <div className="list-btn" style={{ justifySelf: "end" }}>
            <ul className="filter-list">
              <li>
                <div className="dropdown dropdown-action" data-bs-placement="bottom">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a href="#" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>
                      <i className="fe fe-download me-2"></i>
                    </span>{" "}
                    Downloads
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <ul className="d-block">
                      <li>
                        <button
                          type="button"
                          className="d-flex align-items-center download-item btn btn-link"
                          onClick={() => downloadCSV("coupons.csv")}
                        >
                          <i className="far fa-file-text me-2"></i>EXCEL
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="d-flex align-items-center download-item btn btn-link"
                          onClick={() => downloadPDF("coupons.pdf")}
                        >
                          <i className="far fa-file-pdf me-2"></i>PDF
                        </button>
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

      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)}></button>
        </div>
      )}

      <div className="row">
        <div className="col-sm-12">
          <div className="card-table card p-2">
            <div className="card-body">
              <div className="table-responsive">
                {loading && !showCouponModal && !showEditModal ? (
                  <div className="text-center py-4">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : coupons.length === 0 ? (
                  <div className="text-center py-4">No coupons found. Create your first coupon!</div>
                ) : (
                  <table className="table table-striped" style={{ width: "100%" }}>
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
                      {coupons.map((coupon, index) => (
                        <tr key={coupon.id || index}>
                          <td>{index + 1}</td>
                          <td>{coupon.code}</td>
                          <td>
                            {coupon.discount}
                            {coupon.discount_type === "percentage" ? "%" : "$"}
                          </td>
                          <td>{coupon.usage_limit ? `${coupon.usage_limit} uses` : "Unlimited"}</td>
                          <td>{formatDate(coupon.expires_at)}</td>
                          <td>
                            <span className="badge badge-service">
                              {coupon.applies_to === "all_services" || coupon.applies_to === "All Services" ? "All Services" : coupon.applies_to}
                            </span>
                          </td>
                          <td>{getStatusBadge(coupon)}</td>
                          <td>
                            <button 
                              className="btn btn-sm btn-warning"
                              onClick={() => handleEditClick(coupon)}
                              type="button"
                            >
                              <i className="bi bi-pencil-square"></i> Edit
                            </button>
                            <button 
                              className="btn btn-sm btn-danger ms-2"
                              onClick={() => handleDeleteCoupon(coupon)}
                              type="button"
                              disabled={loading}
                            >
                              <i className="bi bi-trash"></i> Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Backdrop */}
      {(showCouponModal || showEditModal) && (
        <div className="modal-backdrop fade show"></div>
      )}

      {/* Generate Coupon Modal */}
      {showCouponModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleCreateCoupon}>
              <div className="modal-header">
                <h5 className="modal-title">Generate New Coupon</h5>
                <button type="button" className="btn-close" onClick={() => setShowCouponModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label>Coupon Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. NEWYEAR50"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="row mb-3">
                  <div className="form-group mb-3 col-md-6">
                    <label>Discount Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 20"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <label>Discount Type</label>
                    <select
                      className="form-control"
                      name="discount_type"
                      value={formData.discount_type}
                      onChange={handleInputChange}
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount ($)</option>
                    </select>
                  </div>
                  <div className="form-group col-md-12">
                    <label>Usage Limit</label>
                    <select
                      className="form-control"
                      name="usage_limit"
                      value={formData.usage_limit}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Usage Limit</option>
                      <option value="unlimited">Unlimited</option>
                      <option value="10">10 uses</option>
                      <option value="50">50 uses</option>
                      <option value="100">100 uses</option>
                      <option value="500">500 uses</option>
                    </select>
                  </div>

                  <div className="form-group col-md-6">
                    <label>Validity Days</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 30"
                      name="validity_days"
                      value={formData.validity_days}
                      onChange={handleInputChange}
                      disabled={!!formData.expires_at}
                      min={1}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label>Expiry Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="expires_at"
                      value={formData.expires_at}
                      onChange={handleInputChange}
                      disabled={!!formData.validity_days}
                    />
                  </div>

                  <div className="col-12 mt-1">
                    <small className="text-muted">
                      Choose either <b>Validity Days</b> OR <b>Expiry Date</b>
                    </small>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label>Applicable Services</label>
                  <select
                    className="form-control"
                    name="applies_to"
                    value={formData.applies_to}
                    onChange={handleInputChange}
                  >
                    <option value="all_services">All Services</option>
                    <option value="hosting">Hosting</option>
                    <option value="domains">Domains</option>
                    <option value="renewals">Renewals</option>
                    <option value="backups">Backups</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Save Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Coupon Modal */}
      {showEditModal && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleUpdateCoupon}>
              <div className="modal-header">
                <h5 className="modal-title">Edit Coupon - {selectedCoupon?.code}</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-3">
                  <label>Coupon Code</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. NEWYEAR50"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="row mb-3">
                  <div className="form-group mb-3 col-md-6">
                    <label>Discount Amount</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 20"
                      name="discount"
                      value={formData.discount}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3 col-md-6">
                    <label>Discount Type</label>
                    <select
                      className="form-control"
                      name="discount_type"
                      value={formData.discount_type}
                      onChange={handleInputChange}
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount ($)</option>
                    </select>
                  </div>
                  <div className="form-group col-md-12">
                    <label>Usage Limit</label>
                    <select
                      className="form-control"
                      name="usage_limit"
                      value={formData.usage_limit}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Usage Limit</option>
                      <option value="unlimited">Unlimited</option>
                      <option value="10">10 uses</option>
                      <option value="50">50 uses</option>
                      <option value="100">100 uses</option>
                      <option value="500">500 uses</option>
                    </select>
                  </div>

                  <div className="form-group col-md-6">
                    <label>Validity Days</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="e.g. 30"
                      name="validity_days"
                      value={formData.validity_days}
                      onChange={handleInputChange}
                      disabled={!!formData.expires_at}
                      min={1}
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label>Expiry Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="expires_at"
                      value={formData.expires_at}
                      onChange={handleInputChange}
                      disabled={!!formData.validity_days}
                    />
                  </div>

                  <div className="col-12 mt-1">
                    <small className="text-muted">
                      Choose either <b>Validity Days</b> OR <b>Expiry Date</b>
                    </small>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label>Applicable Services</label>
                  <select
                    className="form-control"
                    name="applies_to"
                    value={formData.applies_to}
                    onChange={handleInputChange}
                  >
                    <option value="all_services">All Services</option>
                    <option value="hosting">Hosting</option>
                    <option value="domains">Domains</option>
                    <option value="renewals">Renewals</option>
                    <option value="backups">Backups</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Coupon"}
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
