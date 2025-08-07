"use client"

import { useEffect, useState } from "react"
import { ordersAPI } from "../api/orders"

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
                          <span className={getPaymentStatusBadgeClass(order.provisioning)}>
                            {order.provisioning}
                          </span>
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
    </>
  )
}

export default Orders

