import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import UserList from "./pages/UserList"
import AddUser from "./pages/AddUser"
import SaleList from "./pages/SaleList"
import AddSale from "./pages/AddSale"
import Orders from "./pages/Orders"
import StaffAdmin from "./pages/StaffAdmin"
import PromotionsCoupons from "./pages/PromotionsCoupons"
import SupportTickets from "./pages/SupportTickets"
import BillingInvoice from "./pages/BillingInvoice"
import CreateInvoice from "./pages/CreateInvoice"
import InvoiceDetails from "./pages/InvoiceDetails"
import KnowledgeBase from "./pages/KnowledgeBase"
import Notifications from "./pages/Notifications"
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from "./components/PublicRoute"

import AddNode from "./pages/AddNode"
import EditNode from "./pages/EditNode"
import Nodes from "./pages/Nodes"

function App() {
  return (
    <Router >
      <Routes>
        {/* Public route - redirects to dashboard if already logged in */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected routes - requires authentication */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-list" element={<UserList />} />
          <Route path="add-user" element={<AddUser />} />
          <Route path="sale-list" element={<SaleList />} />
          <Route path="add-sale" element={<AddSale />} />
          <Route path="orders" element={<Orders />} />
          <Route path="billing-invoice" element={<BillingInvoice />} />
          <Route path="create-invoice" element={<CreateInvoice />} />
          <Route path="invoice-details" element={<InvoiceDetails />} />
          <Route path="support-tickets" element={<SupportTickets />} />
          <Route path="knowledge-base" element={<KnowledgeBase />} />
          <Route path="promotions-coupons" element={<PromotionsCoupons />} />
          <Route path="staff-admin" element={<StaffAdmin />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="add-node" element={<AddNode />} />
          <Route path="edit-node" element={<EditNode />} />
          <Route path="nodes" element={<Nodes />} />


        </Route>
      </Routes>
    </Router>
  )
}

export default App
