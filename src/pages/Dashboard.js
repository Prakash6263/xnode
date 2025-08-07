"use client"

import { useEffect, useState } from "react"
import { dashboardAPI } from "../api/dashboard"
import { notificationsAPI } from "../api/notifications" // Import the new API
import Swal from "sweetalert2"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    active_users: 0,
    servers_deployed: 0,
    tickets: 0,
    revenue: "$0",
    monthly_revenue: {},
  })
  const [chartData, setChartData] = useState([])
  const [notifications, setNotifications] = useState([]) // State for notifications
  const [totalNotifications, setTotalNotifications] = useState(0) // State for total notifications count
  const [unreadNotifications, setUnreadNotifications] = useState(0) // State for unread notifications count
  const [isLoadingDashboard, setIsLoadingDashboard] = useState(true) // Loading state for dashboard stats
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(true) // Loading state for notifications
  const [errorDashboard, setErrorDashboard] = useState(null) // Error state for dashboard stats
  const [errorNotifications, setErrorNotifications] = useState(null) // Error state for notifications

  useEffect(() => {
    const fetchAllData = async () => {
      // Fetch Dashboard Data
      setIsLoadingDashboard(true)
      setErrorDashboard(null)
      const dashboardResult = await dashboardAPI.getDashboardStats()

      if (dashboardResult.success) {
        setDashboardData(dashboardResult.data)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        let currentYearRevenue = {}
        const years = Object.keys(dashboardResult.data.monthly_revenue).sort().reverse()
        if (years.length > 0) {
          currentYearRevenue = dashboardResult.data.monthly_revenue[years[0]]
        }

        const formattedChartData = months.map((month, index) => {
          const monthKey = (index + 1).toString()
          const received = currentYearRevenue[monthKey] || 0
          const pending = received * 0.2
          return {
            month: month,
            received: received,
            pending: pending,
          }
        })
        setChartData(formattedChartData)
      } else {
        setErrorDashboard(dashboardResult.error)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: dashboardResult.error || "Failed to load dashboard data.",
          confirmButtonColor: "#d33",
        })
      }
      setIsLoadingDashboard(false)

      // Fetch Notifications Data
      setIsLoadingNotifications(true)
      setErrorNotifications(null)
      const notificationsResult = await notificationsAPI.getNotifications(50, 0, false)

      if (notificationsResult.success) {
        setNotifications(notificationsResult.data.notifications)
        setTotalNotifications(notificationsResult.data.total_count)
        setUnreadNotifications(notificationsResult.data.unread_count)
      } else {
        setErrorNotifications(notificationsResult.error)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: notificationsResult.error || "Failed to load notifications.",
          confirmButtonColor: "#d33",
        })
      }
      setIsLoadingNotifications(false)
    }

    fetchAllData()
  }, [])

  const getNotificationIcon = (type) => {
    switch (type) {
      case "support_message":
        return "bi bi-chat-dots-fill text-primary"
      case "fraud_alert":
        return "bi bi-exclamation-triangle-fill text-danger"
      case "disk_warning":
        return "bi bi-hdd-fill text-warning"
      case "user_verified":
        return "bi bi-person-check-fill text-success"
      case "security_update":
        return "bi bi-shield-lock-fill text-secondary"
      case "revenue_spike":
        return "bi bi-graph-up-arrow text-warning"
      default:
        return "bi bi-info-circle-fill text-muted"
    }
  }

  const formatNotificationTime = (timestamp) => {
    if (!timestamp) return "N/A"
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  if (isLoadingDashboard) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 120px)" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  if (errorDashboard) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Error: {errorDashboard}
      </div>
    )
  }

  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card card-purple">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon bg-1">
                  <i className="fas fa-users"></i>
                </span>
                <div className="dash-count">
                  <div className="dash-title">Active Users</div>
                  <div className="dash-counts">
                    <p>{dashboardData.active_users}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card card-blue">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon bg-1">
                  <i className="bi bi-hdd-network"></i>
                </span>
                <div className="dash-count">
                  <div className="dash-title">Servers Deployed</div>
                  <div className="dash-counts">
                    <p>{dashboardData.servers_deployed}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card card-pink">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon bg-1">
                  <i className="bi bi-ticket-detailed"></i>
                </span>
                <div className="dash-count">
                  <div className="dash-title">Tickets</div>
                  <div className="dash-counts">
                    <p>{dashboardData.tickets}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-sm-6 col-12">
          <div className="card card-green">
            <div className="card-body">
              <div className="dash-widget-header">
                <span className="dash-widget-icon bg-1">
                  <i className="bi bi-currency-dollar"></i>
                </span>
                <div className="dash-count">
                  <div className="dash-title">Revenue</div>
                  <div className="dash-counts">
                    <p>{dashboardData.revenue}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-xl-12 d-flex">
          <div className="card flex-fill">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">Monthly Revenue</h5>
              </div>
            </div>
            <div className="card-body" style={{ height: "350px" }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barCategoryGap="20%"
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `$${value}`}
                    ticks={[0, 65, 130, 195, 250]}
                    domain={[0, 250]}
                  />
                  <Tooltip
                    formatter={(value, name) => [`$${value} thousands`, name]}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                    labelStyle={{ color: "#333" }}
                    itemStyle={{ color: "#333" }}
                  />
                  <Legend
                    wrapperStyle={{ paddingTop: "20px" }}
                    iconType="circle"
                    iconSize={8}
                    formatter={(value) => {
                      if (value === "pending") return "Pending ($ thousands)"
                      if (value === "received") return "Received ($ thousands)"
                      return value
                    }}
                  />
                  <Bar dataKey="pending" fill="#ffa500" radius={[5, 5, 0, 0]} barSize={20} />
                  <Bar dataKey="received" fill="#8a2be2" radius={[5, 5, 0, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Notifications Section */}
      <div className="row">
        <div className="col-12">
          <h5 className="mb-3 text-white">
            Admin Notifications ({totalNotifications})
            {unreadNotifications > 0 && <span className="badge bg-danger ms-2">{unreadNotifications} Unread</span>}
          </h5>
          <div className="card shadow-sm p-3">
            {isLoadingNotifications ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "150px" }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading notifications...</span>
                </div>
              </div>
            ) : errorNotifications ? (
              <div className="alert alert-danger text-center" role="alert">
                Error: {errorNotifications}
              </div>
            ) : notifications.length === 0 ? (
              <div className="alert alert-info text-center">No notifications to display.</div>
            ) : (
              <ul className="list-group list-group-flush">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className={`list-group-item d-flex align-items-start ${
                      notification.is_read === "false" ? "bg-light" : ""
                    }`}
                  >
                    <div className="me-3">
                      <i className={`${getNotificationIcon(notification.type)} fs-4`}></i>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="mb-1">{notification.title}</h6>
                        {notification.is_read === "false" && <span className="badge bg-info">New</span>}
                      </div>
                      <small className="text-muted">{notification.message}</small>
                      <div className="text-end text-muted" style={{ fontSize: "0.75rem" }}>
                        {formatNotificationTime(notification.created_at)}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
