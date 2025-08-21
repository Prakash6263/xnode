"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { authAPI } from "../api/auth"
import { authUtils } from "../utils/auth"
import "./login.css"
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (authUtils.isAuthenticated()) {
      navigate("/dashboard")
    }
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields",
        confirmButtonColor: "#3085d6",
      })
      return
    }

    setIsLoading(true)

    try {
      const result = await authAPI.login({
        email: formData.email,
        password: formData.password,
      })

      if (result.success) {
        const adminData = {
          ...result.data,
          loginTime: new Date().toISOString(),
        }

        authUtils.storeUser(adminData, formData.rememberMe)

        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, ${result.data.admin.full_name}`,
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/dashboard")
        })
      } else {
        // Show error message
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: result.error || "Invalid credentials. Please try again.",
          confirmButtonColor: "#d33",
        })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Unable to connect to server. Please try again later.",
        confirmButtonColor: "#d33",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="page_loader"></div>
      <div className="login-30 tab-box">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-12 bg-img">
              <div id="bg"></div>
            </div>
            <div className="col-lg-6 col-md-12 form-section">
              <div className="login-inner-form">
                <div className="details">
                  <h1 className="mb-3 text-white">Sign Into Admin Panel</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="first_field" className="form-label float-start text-white">
                        Email address
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="first_field"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="form-group clearfix position-relative">
                      <label htmlFor="second_field" className="form-label float-start text-white">
                        Password
                      </label>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        autoComplete="off"
                        id="second_field"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="password-toggle-btn"
                        onClick={togglePasswordVisibility}
                        disabled={isLoading}
                        title={showPassword ? "Hide password" : "Show password"}
                      >
                        <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                      </button>
                    </div>
                    <div className="checkbox form-group clearfix">
                      <div className="form-check float-start">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberme"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                          disabled={isLoading}
                        />
                        <label className="form-check-label text-white" htmlFor="rememberme">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="form-group clearfix">
                      <button type="submit" className="btn btn-lg btn-primary btn-theme" disabled={isLoading}>
                        <span>
                          {isLoading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                              ></span>
                              Logging in...
                            </>
                          ) : (
                            "Login"
                          )}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
