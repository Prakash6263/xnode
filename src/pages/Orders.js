"use client"

import { useEffect, useState } from "react"
import { ordersAPI } from "../api/orders"
import Swal from "sweetalert2"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [serverForm, setServerForm] = useState({
    user_id: "",
    node_id: "",
    server_id: "",
    status: "Active",
    location: "",
    ip_address: "",
    hardware_specs: "",
    software_specs: "",
    ownership: "Rented",
  })

  // Function to fetch orders
  const fetchOrders = async () => {
    setLoading(true)
    setError(null)
    const result = await ordersAPI.getOrders()
    if (result.success) {
      setOrders(result.orders)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  // Effect to fetch orders only once on component mount
  useEffect(() => {
    fetchOrders()
  }, []) // Empty dependency array means this runs only once

  // Effect to initialize/re-initialize DataTable whenever 'orders' data changes
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

    // Use a timeout to ensure DOM is updated with new order data before DataTable tries to initialize
    const timer = setTimeout(initializeDataTable, 100)

    return () => {
      clearTimeout(timer)
      try {
        if (window.$ && window.$.fn.DataTable && window.$.fn.DataTable.isDataTable("#example")) {
          window.$("#example").DataTable().destroy()
        }
      } catch (error) {
        console.error("Error destroying DataTable:", error)
      }
    }
  }, [orders]) // This effect runs when 'orders' state changes

  const getPaymentStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "badge bg-success status-badge"
      case "waiting":
        return "badge bg-warning text-dark status-badge"
      case "failed":
        return "badge bg-danger status-badge"
      default:
        return "badge bg-secondary status-badge"
    }
  }

  // Removed getProvisioningStatusBadgeClass as Provisioning column is removed

  const openAssignModal = (order) => {
    setSelectedOrder(order)
    setServerForm({
      user_id: order.user_id || "",
      node_id: order.node_id || "",
      server_id: "",
      status: "Active",
      location: "",
      ip_address: "",
      hardware_specs: "",
      software_specs: "",
      ownership: "Rented",
    })
    setShowAssignModal(true)
  }

  const handleAssignServer = async (e) => {
    e.preventDefault()

    if (!serverForm.user_id || !serverForm.server_id || !serverForm.location || !serverForm.ip_address) {
      Swal.fire("Validation Error", "Please fill in all required fields", "warning")
      return
    }

    const result = await ordersAPI.assignServer({
      user_id: Number.parseInt(serverForm.user_id) || 0,
      node_id: Number.parseInt(serverForm.node_id) || 0,
      server_id: serverForm.server_id,
      status: serverForm.status,
      location: serverForm.location,
      ip_address: serverForm.ip_address,
      hardware_specs: serverForm.hardware_specs,
      software_specs: serverForm.software_specs,
      ownership: serverForm.ownership,
    })

    if (result.success) {
      Swal.fire("Success!", result.message, "success")
      setShowAssignModal(false)
      setServerForm({
        user_id: "",
        node_id: "",
        server_id: "",
        status: "Active",
        location: "",
        ip_address: "",
        hardware_specs: "",
        software_specs: "",
        ownership: "Rented",
      })
    } else {
      Swal.fire("Error!", result.error, "error")
    }
  }

  if (loading) {
    return <div className="text-center p-4">Loading orders...</div>
  }

  if (error) {
    return <div className="text-center p-4 text-danger">Error: {error}</div>
  }

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Order Management</h5>
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
                      <th>#Order ID</th>
                      <th>Customer</th>
                      <th>Service</th>
                      <th>Price</th>
                      <th>Payment</th>
                      <th>Status</th> {/* Renamed from Provisioning to Status */}
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.order_id}>
                        <td>{order.order_id}</td>
                        <td>{order.customer}</td>
                        <td>{order.service}</td>
                        <td>{order.price}</td>
                        <td>
                          <span className={getPaymentStatusBadgeClass(order.payment_status)}>
                            {order.payment_status}
                          </span>
                        </td>
                        <td>
                          {/* Using provisioning status for the general 'Status' column */}
                          <span className={getPaymentStatusBadgeClass(order.provisioning)}>{order.provisioning}</span>
                        </td>
                        <td>
                          {order.assigned ? (
                            <span className="badge bg-success">
                              <i className="bi bi-check-circle"></i> Assigned
                            </span>
                          ) : (
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => openAssignModal(order)}
                              title="Assign Server"
                            >
                              <i className="bi bi-server"></i> Assign Server
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assign Server Modal */}
      {showAssignModal && selectedOrder && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <form className="modal-content" onSubmit={handleAssignServer}>
              <div className="modal-header">
                <h5 className="modal-title">Assign Server - Order #{selectedOrder.order_id}</h5>
                <button type="button" className="btn-close" onClick={() => setShowAssignModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>User ID *</label>
                      <input
                        type="number"
                        className="form-control"
                        value={serverForm.user_id}
                        onChange={(e) => setServerForm((prev) => ({ ...prev, user_id: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Node ID</label>
                      <input
                        type="number"
                        className="form-control"
                        value={serverForm.node_id}
                        onChange={(e) => setServerForm((prev) => ({ ...prev, node_id: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Server ID *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. XN-348723"
                        value={serverForm.server_id}
                        onChange={(e) => setServerForm((prev) => ({ ...prev, server_id: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Status</label>
                      <select
                        className="form-control"
                        value={serverForm.status}
                        onChange={(e) => setServerForm((prev) => ({ ...prev, status: e.target.value }))}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Maintenance">Maintenance</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Location *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. US East"
                        value={serverForm.location}
                        onChange={(e) => setServerForm((prev) => ({ ...prev, location: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>IP Address *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. 123.123.123.123"
                        value={serverForm.ip_address}
                        onChange={(e) => setServerForm((prev) => ({ ...prev, ip_address: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label>Hardware Specs</label>
                  <textarea
                    className="form-control"
                    rows="2"
                    placeholder="e.g. Ram: 64 Gb, 256 Gb Ssd, i5 3rd gen Processer"
                    value={serverForm.hardware_specs}
                    onChange={(e) => setServerForm((prev) => ({ ...prev, hardware_specs: e.target.value }))}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Software Specs</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Windows 11 Pro"
                    value={serverForm.software_specs}
                    onChange={(e) => setServerForm((prev) => ({ ...prev, software_specs: e.target.value }))}
                  />
                </div>

                <div className="form-group mb-3">
                  <label>Ownership</label>
                  <select
                    className="form-control"
                    value={serverForm.ownership}
                    onChange={(e) => setServerForm((prev) => ({ ...prev, ownership: e.target.value }))}
                  >
                    <option value="Rented">Rented</option>
                    <option value="Owned">Owned</option>
                    <option value="Leased">Leased</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAssignModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Assign Server
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Orders

