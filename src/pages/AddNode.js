"use client"

import { useState } from "react"
import Swal from "sweetalert2"
import nodesPlanAPI from "../api/nodesPlanAPI"
//import { authUtils } from "../utils/auth"

const AddNodePlan = () => {
  const [formData, setFormData] = useState({
    tag: "",
    title: "",
    subtitle: "",
    weekly_earning: "",
    start_price: "",
    price_display: "",
    is_active: true,
    image: null, // file input
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }))
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleReset = () => {
    setFormData({
      tag: "",
      title: "",
      subtitle: "",
      weekly_earning: "",
      start_price: "",
      price_display: "",
      is_active: true,
      image: null,
    })
  }

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const result = await nodesPlanAPI.createPlan(formData)
    if (result.success) {
      Swal.fire("Success", result.message, "success")
      console.log("Created plan:", result.plan) // ✅ you now have the plan data
      handleReset()
    } else {
      Swal.fire("Error", result.error, "error")
    }
  } catch (err) {
    Swal.fire("Error", err.message || "Network error", "error")
  }
}


  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Add Node Plan</h5>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card-table card p-2">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input
                      type="text"
                      id="tag"
                      name="tag"
                      className="form-control"
                      placeholder="FLEXI PAY"
                      value={formData.tag}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-control"
                      placeholder="Flexi Plan"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="subtitle" className="form-label">Subtitle</label>
                    <input
                      type="text"
                      id="subtitle"
                      name="subtitle"
                      className="form-control"
                      placeholder="Pay over time"
                      value={formData.subtitle}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="weekly_earning" className="form-label">Weekly Earning</label>
                    <input
                      type="number"
                      id="weekly_earning"
                      name="weekly_earning"
                      className="form-control"
                      placeholder="5.0"
                      value={formData.weekly_earning}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="start_price" className="form-label">Start Price</label>
                    <input
                      type="number"
                      id="start_price"
                      name="start_price"
                      className="form-control"
                      placeholder="1.0"
                      value={formData.start_price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="price_display" className="form-label">Price Display</label>
                    <input
                      type="text"
                      id="price_display"
                      name="price_display"
                      className="form-control"
                      placeholder="1"
                      value={formData.price_display}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="image" className="form-label">Image</label>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      className="form-control"
                      accept="image/*"
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="col-md-6 form-check mt-4">
                    <input
                      type="checkbox"
                      id="is_active"
                      name="is_active"
                      className="form-check-input"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="is_active" className="form-check-label">Active</label>
                  </div>

                  <div className="col-12 text-end">
                    <button type="button" className="btn btn-outline-secondary me-2" onClick={handleReset}>Reset</button>
                    <button type="submit" className="btn btn-primary">Add Node Plan</button>
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

export default AddNodePlan
