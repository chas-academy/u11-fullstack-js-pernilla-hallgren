const Navbar = ({ isAdmin }) => {
  return (
    <>
      <h1>Navbar</h1>

      <p>Profile</p>
      {isAdmin && <p>Admin Dashboard</p>}
    </>
  );
};

export default Navbar;
