import { useContext } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
// import useAdmin from "../../hooks/useAdmin";
// import useDeliveryMan from "../../hooks/useDeliveryMan";
const Navbar = () => {
  //   const [isAdmin] = useAdmin();
  //   const [isDeliveryMan] = useDeliveryMan();
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/dashboard/task">Dashboard</Link>
      </li>
      {user ? (
        <>
          <button onClick={handleLogOut} className="btn btn-ghost">
            LogOut
          </button>
        </>
      ) : (
        <>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 z-[100]">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navOptions}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Tasker</a>
      </div>
      <div className="navbar-center hidden lg:flex z-[100]">
        <ul className="menu menu-horizontal px-1 z-[9999]">{navOptions}</ul>
      </div>
      <div className="navbar-end">
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="pt-4">
              {user?.displayName}
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <div className="card-actions"></div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="user" src={user?.photoURL} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              {user ? (
                <>
                  <button onClick={handleLogOut} className="btn btn-ghost">
                    LogOut
                  </button>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
