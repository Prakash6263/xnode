"use client" // This component needs to be a client component to use browser APIs

import { useEffect, useState } from "react"
import { ethers } from "ethers" // Import ethers.js
import { authUtils } from "../utils/auth"
import { Link } from "react-router-dom" // Import Link for navigation
import logo from "../assets/img/logo.png";
import logoSmall from "../assets/img/logo-small.png";
import searchIcon from "../assets/img/icons/search.svg";
import avatar07 from "../assets/img/profiles/avatar-07.jpg";
const Navbar = () => {
  const [connectedWalletAddress, setConnectedWalletAddress] = useState(null)
  const [walletBalance, setWalletBalance] = useState("0.00") // State for wallet balance

  // Function to connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        const address = accounts[0]
        setConnectedWalletAddress(address)
        localStorage.setItem("connectedWalletAddress", address)

        // Get balance
        const provider = new ethers.BrowserProvider(window.ethereum)
        const balance = await provider.getBalance(address)
        setWalletBalance(ethers.formatEther(balance)) // Format balance to ETH

        // Listen for account changes
        window.ethereum.on("accountsChanged", (newAccounts) => {
          if (newAccounts.length > 0) {
            setConnectedWalletAddress(newAccounts[0])
            localStorage.setItem("connectedWalletAddress", newAccounts[0])
            provider.getBalance(newAccounts[0]).then(bal => setWalletBalance(ethers.formatEther(bal)))
          } else {
            // No accounts connected, disconnect
            disconnectWallet()
          }
        })

        // Listen for chain changes
        window.ethereum.on("chainChanged", (chainId) => {
          // Reload the page or re-initialize provider if necessary
          console.log("Chain changed to:", chainId);
          // For simplicity, we'll just re-fetch balance
          if (connectedWalletAddress) {
            provider.getBalance(connectedWalletAddress).then(bal => setWalletBalance(ethers.formatEther(bal)))
          }
        });

      } catch (error) {
        console.error("Error connecting wallet:", error)
        alert("Failed to connect wallet. Please ensure MetaMask is installed and unlocked.")
      }
    } else {
      alert("MetaMask or a compatible wallet is not detected. Please install one.")
    }
  }

  // Function to disconnect wallet
  const disconnectWallet = () => {
    setConnectedWalletAddress(null)
    setWalletBalance("0.00")
    localStorage.removeItem("connectedWalletAddress")
    // Note: MetaMask doesn't have a direct 'disconnect' method for dApps.
    // This just clears the app's state. User must disconnect from wallet itself.
    if (window.ethereum && window.ethereum.removeListener) {
      window.ethereum.removeListener("accountsChanged", () => {});
      window.ethereum.removeListener("chainChanged", () => {});
    }
  }

  // Load connected wallet from local storage on initial mount
  useEffect(() => {
    const storedAddress = localStorage.getItem("connectedWalletAddress")
    if (storedAddress) {
      setConnectedWalletAddress(storedAddress)
      // If address is stored, try to get balance and set up listeners
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum)
        provider.getBalance(storedAddress).then(bal => setWalletBalance(ethers.formatEther(bal))).catch(console.error)

        window.ethereum.on("accountsChanged", (newAccounts) => {
          if (newAccounts.length > 0) {
            setConnectedWalletAddress(newAccounts[0])
            localStorage.setItem("connectedWalletAddress", newAccounts[0])
            provider.getBalance(newAccounts[0]).then(bal => setWalletBalance(ethers.formatEther(bal)))
          } else {
            disconnectWallet()
          }
        })
        window.ethereum.on("chainChanged", (chainId) => {
          console.log("Chain changed to:", chainId);
          if (connectedWalletAddress) {
            provider.getBalance(connectedWalletAddress).then(bal => setWalletBalance(ethers.formatEther(bal)))
          }
        });
      }
    }
  }, []) // Empty dependency array to run only once on mount


    const handleLogout = () => {
    console.log("Logging out...")
    const logoutEvent = authUtils.logout()
    if (logoutEvent) {
      window.location.to = "/login"
    }
  }
  return (
    <div className="header header-one">
      <Link
        to="/dashboard"
        className="d-inline-flex d-sm-inline-flex align-items-center d-md-inline-flex d-lg-none align-items-center device-logo"
      >
        <img src={logo} className="img-fluid logo2" alt="Logo" style={{ width: "150px" }} />
      </Link>
      <div className="main-logo d-inline float-start d-lg-flex align-items-center d-none d-sm-none d-md-none">
        <div className="logo-color">
          <Link to="/dashboard">
            <img src={logo} className="img-fluid logo-blue" alt="Logo" style={{ width: "150px" }} />
          </Link>
          <Link to="/dashboard">
            <img
              src={logoSmall}
              className="img-fluid logo-small"
              alt="Logo"
              style={{ width: "80px" }}
            />
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="top-nav-search">
        <form>
          <input type="text" className="form-control" placeholder="Search here" />
          <button className="btn" type="submit">
            <img src={searchIcon} alt="img" />
          </button>
        </form>
      </div>

      {/* Mobile Menu Toggle */}
      <Link className="mobile_btn" id="mobile_btn">
        <i className="fas fa-bars"></i>
      </Link>

      {/* Header Menu */}
      <ul className="nav nav-tabs user-menu">
        <li className="nav-item">
          {connectedWalletAddress ? (
            <div className="border-light p-2 radius-10 d-flex align-items-center">
              <strong className="me-2">Wallet:</strong>
              <i className="fas fa-wallet me-2" style={{ color: "#7638ff" }}></i>
              <span className="me-2">
                {connectedWalletAddress.substring(0, 6)}...{connectedWalletAddress.substring(connectedWalletAddress.length - 4)}
              </span>
              <span className="me-2">({parseFloat(walletBalance).toFixed(4)} ETH)</span> {/* Display balance */}
              <button onClick={disconnectWallet} className="btn btn-sm btn-danger">
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={connectWallet} className="btn btn-primary">
              Connect Wallet
            </button>
          )}
        </li>

        {/* User Menu */}
        <li className="nav-item dropdown">
          <Link to="javascript:void(0)" className="user-link nav-link" data-bs-toggle="dropdown">
            <span className="user-img">
              <img src={avatar07} alt="img" className="profilesidebar" />
              <span className="animate-circle"></span>
            </span>
            <span className="user-content">
              <span className="user-details">Admin</span>
              <span className="user-name">John Smith</span>
            </span>
          </Link>
          <div className="dropdown-menu menu-drop-user">
            <div className="profilemenu">
              <div className="subscription-logout">
                <ul>
                  <li className="pb-0">
                    <Link className="dropdown-item" to="/login" onClick={handleLogout}>
                      Log Out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
