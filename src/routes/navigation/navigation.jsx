import { Outlet, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import "./navigation.scss";

const Navigation = () => (
  <>
    <div className="navigation">
      <Link className="logo-container" to="/">
        <Logo className="logo" />
      </Link>
      <div className="nav-links-container">
        <Link className="nav-link" to="/shop">
          SHOP
        </Link>
        <Link className="nav-link" to="/store">
          STORE
        </Link>
        <Link className="nav-link" to="/About">
          ABOUT
        </Link>
      </div>
    </div>
    <Outlet />
  </>
);

export default Navigation;
