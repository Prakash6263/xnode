"use client"

import { useEffect, useState } from "react"
import { notificationsAPI } from "../api/notifications" // Import the API
import Swal from "sweetalert2"

const Notifications = () => {
  const [notifications, setNotifications] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true)
      setError(null)
      const result = await notificationsAPI.getNotifications(50, 0, false) // Fetch all notifications

      if (result.success) {
        setNotifications(result.data.notifications)
        setTotalCount(result.data.total_count)
        setUnreadCount(result.data.unread_count)
      } else {
        setError(result.error)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result.error || "Failed to load notifications.",
          confirmButtonColor: "#d33",
        })
      }
      setIsLoading(false)
    }

    fetchNotifications()
  }, [])

  const getNotificationDisplayInfo = (notification) => {
    let iconClass = "bi bi-info-circle-fill text-muted"
    let displayType = "Info"
    let badgeClass = "badge-secondary"

    // Determine icon based on API's 'type'
    switch (notification.type) {
      case "support_message":
        iconClass = "bi bi-chat-dots-fill text-primary"
        displayType = "Support"
        break
      case "fraud_alert":
        iconClass = "bi bi-exclamation-triangle-fill text-danger"
        displayType = "Critical"
        badgeClass = "badge-danger"
        break
      case "disk_warning":
        iconClass = "bi bi-hdd-fill text-warning"
        displayType = "Warning"
        badgeClass = "badge-warning text-dark"
        break
      case "user_verified":
        iconClass = "bi bi-person-check-fill text-success"
        displayType = "Success"
        badgeClass = "badge-success"
        break
      case "security_update":
        iconClass = "bi bi-shield-lock-fill text-secondary"
        displayType = "System"
        break
      case "revenue_spike":
        iconClass = "bi bi-graph-up-arrow text-warning"
        displayType = "Alert"
        badgeClass = "badge-warning text-dark"
        break
      default:
        iconClass = "bi bi-info-circle-fill text-muted"
        displayType = "Info"
        break
    }

    // Override displayType and badgeClass based on 'is_read' status if not already critical/warning
    if (notification.is_read === "false" && badgeClass !== "badge-danger" && badgeClass !== "badge-warning text-dark") {
      displayType = "Unread"
      badgeClass = "badge-info"
    } else if (
      notification.is_read === "true" &&
      badgeClass !== "badge-danger" &&
      badgeClass !== "badge-warning text-dark"
    ) {
      displayType = "Read"
      badgeClass = "badge-secondary"
    }

    return { iconClass, displayType, badgeClass }
  }

  const formatNotificationTime = (timestamp) => {
    if (!timestamp) return "N/A"
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "calc(100vh - 120px)" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading notifications...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        Error: {error}
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        .list-group-item {
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }
        
        .badge-pill {
          font-size: 0.75rem;
        }
      `}</style>

      <div className="page-header">
        <div className="row align-items-center">
          <div className="col">
            {/* <h3 className="page-title">Notifications & Logs</h3> */}
            <ul className="breadcrumb">
              {/* <li className="breadcrumb-item">
                <Link href="/dashboard">Dashboard</a>
              </li> */}
              <li className="breadcrumb-item active">Notifications</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">
                All Notifications ({totalCount})
                {unreadCount > 0 && <span className="badge bg-danger ms-2">{unreadCount} Unread</span>}
              </h5>
            </div>
            <div className="card-body">
              {notifications.length === 0 ? (
                <div className="alert alert-info text-center">No notifications to display.</div>
              ) : (
                <div className="list-group">
                  {notifications.map((notification) => {
                    const { iconClass, displayType, badgeClass } = getNotificationDisplayInfo(notification)
                    return (
                      <div
                        key={notification.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div className="d-flex align-items-center">
                          <i className={`${iconClass} fs-4 me-3`}></i>
                          <div>
                            <strong>[{formatNotificationTime(notification.created_at)}]</strong> {notification.message}
                          </div>
                        </div>
                        <span className={`badge badge-pill ${badgeClass}`}>{displayType}</span>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notifications
