"use client"

const InvoiceDetails = () => {
  const handleDownload = () => {
    console.log("Downloading invoice...")
    // Add download logic here
  }

  const handleSend = () => {
    console.log("Sending invoice...")
    // Add send logic here
  }

  return (
    <>
      <style jsx>{`
        .invoice-box {
          background: #fff;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 0 15px rgba(0,0,0,0.05);
          max-width: 800px;
          margin: 40px auto;
        }
        .invoice-box h4 {
          font-weight: 600;
        }
        .table th {
          color: #fff;
        }
        .badge-status {
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
        }
        .badge-paid { 
          background: #d4edda; 
          color: #155724; 
        }
        .badge-failed { 
          background: #f8d7da; 
          color: #721c24; 
        }
        .badge-pending { 
          background: #fff3cd; 
          color: #856404; 
        }
        .summary-box {
          background: #f0f0ff;
          border: 1px solid #dcdcf9;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
        }
        .summary-box h5 {
          font-weight: 600;
        }
      `}</style>

      <div className="row">
        <div className="col-sm-12">
          <div className="card-table card p-2">
            <div className="card-body">
              <div className="invoice-box">
                <div className="d-flex justify-content-between">
                  <h4>Invoice #INV-0001</h4>
                  <span className="badge badge-status badge-pending">Pending</span>
                </div>

                <hr />

                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6>Billed To:</h6>
                    <p>
                      Jane Smith
                      <br />
                      jane.smith@email.com
                      <br />
                      +1 234 567 890
                    </p>
                  </div>
                  <div className="col-md-6 text-end">
                    <h6>Invoice Details:</h6>
                    <p>
                      Date: 2025-06-01
                      <br />
                      Auto Renew: No
                      <br />
                      Coupon: SUMMER20
                      <br />
                      Tax: 18%
                    </p>
                  </div>
                </div>

                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th className="text-end">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Monthly Subscription Plan</td>
                      <td className="text-end">$250</td>
                    </tr>
                    <tr>
                      <td>Tax (18%)</td>
                      <td className="text-end">$45</td>
                    </tr>
                    <tr>
                      <td>Discount (SUMMER20)</td>
                      <td className="text-end text-danger">- $20</td>
                    </tr>
                    <tr>
                      <th>Total</th>
                      <th className="text-end">$275</th>
                    </tr>
                  </tbody>
                </table>

                {/* Total Amount Summary */}
                <div className="summary-box">
                  <div className="d-flex justify-content-between">
                    <h5>Total Amount Payable</h5>
                    <h5 className="text-primary">$275</h5>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button className="btn btn-primary me-2" onClick={handleDownload}>
                    Download Invoice
                  </button>
                  <button className="btn btn-outline-secondary" onClick={handleSend}>
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default InvoiceDetails
