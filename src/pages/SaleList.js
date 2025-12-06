"use client"

import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ethers } from "ethers"
import { getSalesDetailMap, isPaused, getContract } from "../lib/contract" // ✅ check path

// ---------- helpers ----------
const formatTimestamp = (value) => {
  try {
    if (value === undefined || value === null) return "-"
    const num = Number(value.toString())
    if (!num) return "-"
    const d = new Date(num * 1000)
    if (Number.isNaN(d.getTime())) return "-"
    return d.toLocaleString()
  } catch {
    return "-"
  }
}

const formatEtherSafe = (value) => {
  try {
    return ethers.formatEther(value ?? 0n)
  } catch {
    return "0"
  }
}

const SaleList = () => {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [pausedStatus, setPausedStatus] = useState(null) // null | true | false
  const [pauseLoading, setPauseLoading] = useState(false)

  // -------- load sales from salesDetailMap(saleId) --------
  useEffect(() => {
    const loadSales = async () => {
      try {
        setLoading(true)
        setError("")
        const data = []

        // probe first N ids; stop when we hit an empty slot or error
        const MAX_SALES = 20

        for (let id = 1; id <= MAX_SALES; id++) {
          try {
            const d = await getSalesDetailMap(id) // calls contract.salesDetailMap(saleId) :contentReference[oaicite:1]{index=1}
            // Actual on-chain order from Remix screenshot:
            // [ start, end, price, totalTokens, tokenSold, minBound, raisedIn, remainingToken ]
            console.log("sale raw", id, d)

            const startBn = d[0]
            const endBn = d[1]
            const priceBn = d[2]
            const totalTokensBn = d[3]
            const minBoundBn = d[5]

            // if slot is completely empty, stop
            const empty =
              (startBn ?? 0n) === 0n &&
              (endBn ?? 0n) === 0n &&
              (priceBn ?? 0n) === 0n &&
              (totalTokensBn ?? 0n) === 0n &&
              (minBoundBn ?? 0n) === 0n

            if (empty) {
              if (id === 1) console.log("No sale data at id 1")
              break
            }

            // We don't have per-sale type from this mapping, so show "Public" for now
            const saleTypeText = "Public"

            data.push({
              id,
              saleType: saleTypeText,
              startTime: formatTimestamp(startBn),
              endTime: formatTimestamp(endBn), // ✅ will now use 1766474400 → proper date
              tokenPrice: formatEtherSafe(priceBn),
              totalTokens: formatEtherSafe(totalTokensBn),
              minBuy: formatEtherSafe(minBoundBn),
            })
          } catch (innerErr) {
            console.log("Stop at saleId", id, "error:", innerErr)
            break
          }
        }

        setRows(data)
      } catch (err) {
        console.error("loadSales error:", err)
        setError("Failed to load sale data from contract.")
      } finally {
        setLoading(false)
      }
    }

    const loadPaused = async () => {
      try {
        const paused = await isPaused()
        setPausedStatus(Boolean(paused))
      } catch (err) {
        console.error("isPaused error:", err)
        // fallback so UI doesn't stay on "Loading..."
        setPausedStatus(false)
      }
    }

    loadSales()
    loadPaused()
  }, [])

  // -------- pause / unpause entire contract --------
  const handleTogglePause = async () => {
    try {
      setPauseLoading(true)
      setError("")

      const contract = await getContract() // ethers.Contract :contentReference[oaicite:2]{index=2}

      let tx
      if (pausedStatus) {
        tx = await contract.unpause()
      } else {
        tx = await contract.pause()
      }

      await tx.wait()
      const newPaused = await contract.paused()
      setPausedStatus(Boolean(newPaused))
    } catch (err) {
      console.error("toggle pause error:", err)
      setError(
        err?.message ||
          "Failed to toggle pause. Make sure you are using the owner wallet.",
      )
    } finally {
      setPauseLoading(false)
    }
  }

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Sale List</h5>
          <div className="list-btn" style={{ justifySelf: "end" }}>
            <ul className="filter-list">
              <li>
                <Link className="btn btn-primary" to="/add-sale">
                  <i className="fa fa-plus-circle me-2"></i>Add Sale
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card-table card p-2">
            <div className="card-body">
              {/* Contract paused status + global pause button */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <strong>Contract status: </strong>
                  {pausedStatus === null
                    ? "Loading..."
                    : pausedStatus
                    ? "Paused"
                    : "Running"}
                </div>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={handleTogglePause}
                  disabled={pausedStatus === null || pauseLoading}
                >
                  {pauseLoading
                    ? "Processing..."
                    : pausedStatus
                    ? "Unpause"
                    : "Pause"}
                </button>
              </div>

              {loading && <p>Loading sales…</p>}
              {error && <p className="text-danger">{error}</p>}

              <div className="table-responsive">
                <table className="table table-striped" style={{ width: "100%" }}>
                  <thead className="thead-light">
                    <tr>
                      <th>#</th>
                      <th>Sale Type</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Token Price (BNB)</th>
                      <th>Total Tokens</th>
                      <th>Min Buy (BNB)</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.length > 0 ? (
                      rows.map((row) => (
                        <tr key={row.id}>
                          <td>{row.id}</td>
                          <td>{row.saleType}</td>
                          <td>{row.startTime}</td>
                          <td>{row.endTime}</td> {/* ✅ should show 23/12/2025, 17:00:00 etc */}
                          <td>{row.tokenPrice}</td>
                          <td>{row.totalTokens}</td>
                          <td>{row.minBuy}</td>
                          <td>
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={handleTogglePause}
                              disabled={pausedStatus === null || pauseLoading}
                            >
                              {pauseLoading
                                ? "Processing..."
                                : pausedStatus
                                ? "Unpause"
                                : "Pause"}
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      !loading && (
                        <tr>
                          <td colSpan={8} className="text-center">
                            No sales found
                          </td>
                        </tr>
                      )
                    )}
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

export default SaleList
