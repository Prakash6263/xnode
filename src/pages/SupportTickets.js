"use client"

import { useEffect, useState } from "react"
import { contactsAPI } from "../api/contacts" // Import the new API file

const SupportTickets = () => {
  const [showViewModal, setShowViewModal] = useState(false)
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedContact, setSelectedContact] = useState(null)

  const fetchContacts = async () => {
    setLoading(true)
    setError(null)
    const result = await contactsAPI.getContacts()
    if (result.success) {
      setContacts(result.contacts)
    } else {
      setError(result.error)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchContacts()
  }, []) // Fetch contacts only once on mount

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

    // Re-initialize DataTable whenever contacts data changes
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
  }, [contacts]) // This effect runs when 'contacts' state changes

  const openViewModal = (contact) => {
    setSelectedContact(contact)
    setShowViewModal(true)
  }

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "badge status-open"
      case "pending":
        return "badge status-pending"
      case "closed":
        return "badge status-closed"
      default:
        return "badge bg-secondary"
    }
  }

  if (loading) {
    return <div className="text-center p-4">Loading support tickets...</div>
  }

  if (error) {
    return <div className="text-center p-4 text-danger">Error: {error}</div>
  }

  return (
    <>
      <div className="page-header">
        <div className="content-page-header">
          <h5>Support Tickets</h5>
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
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, index) => (
                      <tr key={contact.id}>
                        <td>{index + 1}</td>
                        <td>{contact.full_name}</td>
                        <td>{contact.email}</td>
                        <td>{contact.created_at}</td>
                        <td>
                          <button className="btn btn-sm btn-primary" onClick={() => openViewModal(contact)}>
                            View
                          </button>
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

      {/* View Modal */}
      {showViewModal && selectedContact && (
        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
          <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Ticket Details - {selectedContact.full_name}</h5>
                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="modal-body ticket">
                <p>
                  <strong>ID:</strong> {selectedContact.id}
                </p>
                <p>
                  <strong>Full Name:</strong> {selectedContact.full_name}
                </p>
                <p>
                  <strong>Email:</strong> {selectedContact.email}
                </p>
                <p>
                  <strong>Details:</strong> {selectedContact.details}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={getStatusBadgeClass(selectedContact.status)}>{selectedContact.status}</span>
                </p>
                <p>
                  <strong>Created At:</strong> {selectedContact.created_at}
                </p>
                {/* Removed Priority, SLA Time, Assigned To as they are not in the provided API response */}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowViewModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal removed as requested */}
    </>
  )
}

export default SupportTickets
