"use client"

import { useState } from "react"
import { connectWallet, getContract, dateTimeToTimestamp, priceToWei } from "../lib/contract"
import Swal from "sweetalert2"

const AddSale = () => {
  const [formData, setFormData] = useState({
    saleType: "Private",
    startTime: "",
    endTime: "",
    tokenPrice: "",
    totalTokens: "",
    minBuy: "",
  })

  const [walletAddress, setWalletAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleConnectWallet = async () => {
    try {
      Swal.fire({
        title: "Connecting Wallet...",
        text: "Please approve the connection in MetaMask",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        },
      })

      const { address } = await connectWallet()
      setWalletAddress(address)

      Swal.fire({
        icon: "success",
        title: "Wallet Connected!",
        text: `Connected to ${address.slice(0, 6)}...${address.slice(-4)}`,
        timer: 3000,
        showConfirmButton: false,
      })
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Connection Failed",
        text: err.message,
        confirmButtonColor: "#d33",
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!walletAddress) {
      Swal.fire({
        icon: "warning",
        title: "Wallet Not Connected",
        text: "Please connect your wallet first",
        confirmButtonColor: "#3085d6",
      })
      return
    }

    if (!formData.startTime || !formData.endTime || !formData.tokenPrice || !formData.totalTokens || !formData.minBuy) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please fill in all required fields",
        confirmButtonColor: "#3085d6",
      })
      return
    }

    setIsLoading(true)

    Swal.fire({
      title: "Starting Token Sale...",
      html: "Please confirm the transaction in MetaMask<br><small>This may take a few moments</small>",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })

    try {
      const contract = await getContract()

      const saleType = formData.saleType === "Private" ? 0 : 1
      const startTimestamp = dateTimeToTimestamp(formData.startTime)
      const endTimestamp = dateTimeToTimestamp(formData.endTime)
      const price = priceToWei(formData.tokenPrice)
      const minBound = priceToWei(formData.minBuy)
      const totalTokens = priceToWei(formData.totalTokens)

      console.log("Calling startTokenSale with parameters:", {
        saleType,
        startTimestamp,
        endTimestamp,
        price: price.toString(),
        minBound: minBound.toString(),
        totalTokens: totalTokens.toString(),
      })

      const tx = await contract.startTokenSale(saleType, startTimestamp, endTimestamp, price, minBound, totalTokens)

      console.log("Transaction sent:", tx.hash)

      Swal.update({
        title: "Transaction Submitted!",
        html: `Transaction Hash: <code>${tx.hash}</code><br><small>Waiting for confirmation...</small>`,
      })

      const receipt = await tx.wait()
      console.log("Transaction confirmed:", receipt)

      Swal.fire({
        icon: "success",
        title: "Sale Started Successfully!",
        html: `
          <div class="text-start">
            <p><strong>Transaction Hash:</strong><br><code>${tx.hash}</code></p>
            <p><strong>Sale Type:</strong> ${formData.saleType}</p>
            <p><strong>Token Price:</strong> ${formData.tokenPrice} BNB</p>
            <p><strong>Total Tokens:</strong> ${formData.totalTokens}</p>
          </div>
        `,
        confirmButtonText: "View on BSCScan",
        showCancelButton: true,
        cancelButtonText: "Close",
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#6c757d",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open(`https://testnet.bscscan.com/tx/${tx.hash}`, "_blank")
        }
      })

      handleReset()
    } catch (err) {
      console.error("Transaction failed:", err)

      Swal.fire({
        icon: "error",
        title: "Transaction Failed",
        html: `
          <div class="text-start">
            <p><strong>Error:</strong> ${err.reason || err.message}</p>
            ${err.code ? `<p><strong>Error Code:</strong> ${err.code}</p>` : ""}
          </div>
        `,
        confirmButtonColor: "#d33",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      saleType: "Private",
      startTime: "",
      endTime: "",
      tokenPrice: "",
      totalTokens: "",
      minBuy: "",
    })

    Swal.fire({
      icon: "info",
      title: "Form Reset",
      text: "All fields have been cleared",
      timer: 2000,
      showConfirmButton: false,
    })
  }

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Add Sale</h5>
          <div className="list-btn" style={{ justifySelf: "end" }}>
            <div className="me-3">
              {!walletAddress ? (
                <button className="btn btn-success" onClick={handleConnectWallet} type="button">
                  <i className="fa fa-wallet me-2"></i>Connect Wallet
                </button>
              ) : (
                <span className="badge bg-success">
                  Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              )}
            </div>
            <ul className="filter-list">
              <li>
                <div className="dropdown dropdown-action" data-bs-placement="bottom">
                  <a href="#" className="btn btn-primary" data-bs-toggle="dropdown" aria-expanded="false">
                    <span>
                      <i className="fe fe-download me-2"></i>
                    </span>{" "}
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
                <a className="btn btn-primary" href="/sale-list">
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
                    <label className="form-label">Sale Type</label>
                    <select
                      className="form-control"
                      name="saleType"
                      value={formData.saleType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Private">Private</option>
                      <option value="Public">Public</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Start Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Token Price (in BNB)</label>
                    <input
                      type="number"
                      step="0.000000000000000001"
                      className="form-control"
                      name="tokenPrice"
                      value={formData.tokenPrice}
                      onChange={handleInputChange}
                      placeholder="0.001"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Total Tokens</label>
                    <input
                      type="number"
                      step="0.000000000000000001"
                      className="form-control"
                      name="totalTokens"
                      value={formData.totalTokens}
                      onChange={handleInputChange}
                      placeholder="1000"
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Minimum Buy Bound (in BNB)</label>
                    <input
                      type="number"
                      step="0.000000000000000001"
                      className="form-control"
                      name="minBuy"
                      value={formData.minBuy}
                      onChange={handleInputChange}
                      placeholder="0.01"
                      required
                    />
                  </div>
                </div>

                <div className="text-end mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                    onClick={handleReset}
                    disabled={isLoading}
                  >
                    Reset
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={isLoading || !walletAddress}>
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Processing...
                      </>
                    ) : (
                      "Start Token Sale"
                    )}
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

export default AddSale
