import { NavLink } from "react-router-dom";

const Navbar = ({ isAdmin, logoutHandler }) => {
  return (
    <>
      <h1>Navbar</h1>
      <p>Home</p>
      <p>Profile</p>

      {isAdmin && <NavLink to="/admin-dashboard">Admin Dashboard</NavLink>}

      <NavLink onClick={logoutHandler} to="/login">
        Logout
      </NavLink>
    </>
  );
};

export default Navbar;
