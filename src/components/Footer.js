import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div className="footer">
      <div className="copyright">
        <div className="row">
          <div className="col-md-6 col-lg-6">
            <div className="footer-copyright">
              <p className="mb-0">
                <Link href="templateshub.net">Templates Hub</Link>
              </p>
            </div>
          </div>
          <div className="col-md-6 col-lg-6">
            <div className="footer-copyright text-right">
              <p className="mb-0">All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
