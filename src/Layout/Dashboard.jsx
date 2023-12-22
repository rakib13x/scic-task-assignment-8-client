import React from "react";
// import useAdmin from "../hooks/useAdmin";
// import useDeliveryMan from "../hooks/useDeliveryMan";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  //   const [isAdmin] = useAdmin();
  //   const [isDeliveryMan] = useDeliveryMan();

  const { user } = useAuth();

  return (
    <div className="flex">
      <div className="w-64 min-h-screen bg-black text-white">
        <div className="flex items-center gap-4 ml-8 mt-10">
          <img src={user?.photoURL} alt="" className="h-10 w-10" />
          {user?.displayName}
        </div>
        <ul className="menu p-4">
          <>
            <li>
              <NavLink to="/dashboard/task">Task</NavLink>
            </li>
          </>
          <div className="divider">OR</div>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
