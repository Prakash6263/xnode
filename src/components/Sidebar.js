"use client"

import { Link, useLocation } from "react-router-dom"
import { authUtils } from "../utils/auth"

const Sidebar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? "active" : ""
  }

  const handleLogout = () => {
    console.log("Logging out...")
    const logoutEvent = authUtils.logout()
    if (logoutEvent) {
      window.location.href = "/login"
    }
  }

  return (
    <div
      className="sidebar"
      id="sidebar"
      style={{
        position: "fixed",
        top: "60px",
        left: "0",
        width: "250px",
        height: "calc(100vh - 60px)",
        backgroundColor: "#2c3e50",
        zIndex: 1000,
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      <div
        className="sidebar-inner"
        style={{
          height: "100%",
          padding: "20px 0",
        }}
      >
        <div id="sidebar-menu" className="sidebar-menu">
          <ul
            className="sidebar-vertical"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
            }}
          >
            <li
              className="menu-title"
              style={{
                color: "#bdc3c7",
                fontSize: "11px",
                fontWeight: "600",
                textTransform: "uppercase",
                padding: "15px 20px 10px",
                letterSpacing: "1px",
              }}
            >
              <span>GENERAL</span>
            </li>
            <li style={{ marginBottom: "2px" }}>
              <Link
                to="/dashboard"
                className={isActive("/dashboard")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: location.pathname === "/dashboard" ? "#fff" : "#bdc3c7",
                  textDecoration: "none",
                  backgroundColor: location.pathname === "/dashboard" ? "#3498db" : "transparent",
                  borderLeft: location.pathname === "/dashboard" ? "3px solid #2980b9" : "3px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/dashboard") {
                    e.target.style.backgroundColor = "#34495e"
                    e.target.style.color = "#fff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/dashboard") {
                    e.target.style.backgroundColor = "transparent"
                    e.target.style.color = "#bdc3c7"
                  }
                }}
              >
                <i className="fe fe-home" style={{ marginRight: "10px", fontSize: "16px" }}></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li
              className="menu-title"
              style={{
                color: "#bdc3c7",
                fontSize: "11px",
                fontWeight: "600",
                textTransform: "uppercase",
                padding: "15px 20px 10px",
                letterSpacing: "1px",
              }}
            >
              <span>MANAGEMENT</span>
            </li>

            <li style={{ marginBottom: "2px" }}>
              <Link
                to="/user-list"
                className={isActive("/user-list")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: location.pathname === "/user-list" ? "#fff" : "#bdc3c7",
                  textDecoration: "none",
                  backgroundColor: location.pathname === "/user-list" ? "#3498db" : "transparent",
                  borderLeft: location.pathname === "/user-list" ? "3px solid #2980b9" : "3px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/user-list") {
                    e.target.style.backgroundColor = "#34495e"
                    e.target.style.color = "#fff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/user-list") {
                    e.target.style.backgroundColor = "transparent"
                    e.target.style.color = "#bdc3c7"
                  }
                }}
              >
                <i className="fe fe-users" style={{ marginRight: "10px", fontSize: "16px" }}></i>
                <span>User Management</span>
              </Link>
            </li>

            <li style={{ marginBottom: "2px" }}>
              <Link
                to="/orders"
                className={isActive("/orders")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: location.pathname === "/orders" ? "#fff" : "#bdc3c7",
                  textDecoration: "none",
                  backgroundColor: location.pathname === "/orders" ? "#3498db" : "transparent",
                  borderLeft: location.pathname === "/orders" ? "3px solid #2980b9" : "3px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/orders") {
                    e.target.style.backgroundColor = "#34495e"
                    e.target.style.color = "#fff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/orders") {
                    e.target.style.backgroundColor = "transparent"
                    e.target.style.color = "#bdc3c7"
                  }
                }}
              >
                <i className="fa fa-shopping-cart" style={{ marginRight: "10px", fontSize: "16px" }}></i>
                <span>Order Management</span>
              </Link>
            </li>

            <li style={{ marginBottom: "2px" }}>
              <Link
                to="/sale-list"
                className={isActive("/sale-list")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: location.pathname === "/sale-list" ? "#fff" : "#bdc3c7",
                  textDecoration: "none",
                  backgroundColor: location.pathname === "/sale-list" ? "#3498db" : "transparent",
                  borderLeft: location.pathname === "/sale-list" ? "3px solid #2980b9" : "3px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/sale-list") {
                    e.target.style.backgroundColor = "#34495e"
                    e.target.style.color = "#fff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/sale-list") {
                    e.target.style.backgroundColor = "transparent"
                    e.target.style.color = "#bdc3c7"
                  }
                }}
              >
                <i className="fa fa-list" style={{ marginRight: "10px", fontSize: "16px" }}></i>
                <span>Sale List</span>
              </Link>
            </li>

            <li style={{ marginBottom: "2px" }}>
              <Link
                to="/billing-invoice"
                className={isActive("/billing-invoice")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: location.pathname === "/billing-invoice" ? "#fff" : "#bdc3c7",
                  textDecoration: "none",
                  backgroundColor: location.pathname === "/billing-invoice" ? "#3498db" : "transparent",
                  borderLeft: location.pathname === "/billing-invoice" ? "3px solid #2980b9" : "3px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/billing-invoice") {
                    e.target.style.backgroundColor = "#34495e"
                    e.target.style.color = "#fff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/billing-invoice") {
                    e.target.style.backgroundColor = "transparent"
                    e.target.style.color = "#bdc3c7"
                  }
                }}
              >
                <i className="fa fa-file" style={{ marginRight: "10px", fontSize: "16px" }}></i>
                <span>Billing & Invoicing</span>
              </Link>
            </li>

            <li style={{ marginBottom: "2px" }}>
              <Link
                to="/support-tickets"
                className={isActive("/support-tickets")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: location.pathname === "/support-tickets" ? "#fff" : "#bdc3c7",
                  textDecoration: "none",
                  backgroundColor: location.pathname === "/support-tickets" ? "#3498db" : "transparent",
                  borderLeft: location.pathname === "/support-tickets" ? "3px solid #2980b9" : "3px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/support-tickets") {
                    e.target.style.backgroundColor = "#34495e"
                    e.target.style.color = "#fff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/support-tickets") {
                    e.target.style.backgroundColor = "transparent"
                    e.target.style.color = "#bdc3c7"
                  }
                }}
              >
                <i className="fa fa-ticket" style={{ marginRight: "10px", fontSize: "16px" }}></i>
                <span>Support & Tickets</span>
              </Link>
            </li>

            {/* <li style={{ marginBottom: "2px" }}>
              <Link
                to="/knowledge-base"
                className={isActive("/knowledge-base")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: location.pathname === "/knowledge-base" ? "#fff" : "#bdc3c7",
                  textDecoration: "none",
                  backgroundColor: location.pathname === "/knowledge-base" ? "#3498db" : "transparent",
                  borderLeft: location.pathname === "/knowledge-base" ? "3px solid #2980b9" : "3px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/knowledge-base") {
                    e.target.style.backgroundColor = "#34495e"
                    e.target.style.color = "#fff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/knowledge-base") {
                    e.target.style.backgroundColor = "transparent"
                    e.target.style.color = "#bdc3c7"
                  }
                }}
              >
                <i className="fa fa-info" style={{ marginRight: "10px", fontSize: "16px" }}></i>
                <span>Knowledge Base</span>
              </Link>
            </li> */}

            <li style={{ marginBottom: "2px" }}>
              <Link
                to="/promotions-coupons"
                className={isActive("/promotions-coupons")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: location.pathname === "/promotions-coupons" ? "#fff" : "#bdc3c7",
                  textDecoration: "none",
                  backgroundColor: location.pathname === "/promotions-coupons" ? "#3498db" : "transparent",
                  borderLeft:
                    location.pathname === "/promotions-coupons" ? "3px solid #2980b9" : "3px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/promotions-coupons") {
                    e.target.style.backgroundColor = "#34495e"
                    e.target.style.color = "#fff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/promotions-coupons") {
                    e.target.style.backgroundColor = "transparent"
                    e.target.style.color = "#bdc3c7"
                  }
                }}
              >
                <i className="fa fa-gift" style={{ marginRight: "10px", fontSize: "16px" }}></i>
                <span>Promotions & Coupons</span>
              </Link>
            </li>

            <li style={{ marginBottom: "2px" }}>
              <Link
                to="/staff-admin"
                className={isActive("/staff-admin")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: location.pathname === "/staff-admin" ? "#fff" : "#bdc3c7",
                  textDecoration: "none",
                  backgroundColor: location.pathname === "/staff-admin" ? "#3498db" : "transparent",
                  borderLeft: location.pathname === "/staff-admin" ? "3px solid #2980b9" : "3px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/staff-admin") {
                    e.target.style.backgroundColor = "#34495e"
                    e.target.style.color = "#fff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/staff-admin") {
                    e.target.style.backgroundColor = "transparent"
                    e.target.style.color = "#bdc3c7"
                  }
                }}
              >
                <i className="fa fa-user-circle" style={{ marginRight: "10px", fontSize: "16px" }}></i>
                <span>Staff/Admin</span>
              </Link>
            </li>

            <li style={{ marginBottom: "2px" }}>
              <Link
                to="/notifications"
                className={isActive("/notifications")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 20px",
                  color: location.pathname === "/notifications" ? "#fff" : "#bdc3c7",
                  textDecoration: "none",
                  backgroundColor: location.pathname === "/notifications" ? "#3498db" : "transparent",
                  borderLeft: location.pathname === "/notifications" ? "3px solid #2980b9" : "3px solid transparent",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== "/notifications") {
                    e.target.style.backgroundColor = "#34495e"
                    e.target.style.color = "#fff"
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== "/notifications") {
                    e.target.style.backgroundColor = "transparent"
                    e.target.style.color = "#bdc3c7"
                  }
                }}
               
              >
                <i className="fa fa-bell" style={{ marginRight: "10px", fontSize: "16px" }}></i>
                <span>Notifications & Logs</span>
              </Link>
            </li>

            <li style={{ marginBottom: "2px" }}>
              <Link
                to="/login"
                onClick={handleLogout}
              
              >
                <i className="fe fe-power" style={{ marginRight: "10px", fontSize: "16px" }}></i>
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
