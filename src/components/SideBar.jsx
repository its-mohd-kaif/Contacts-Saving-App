import React from "react";
import Contact from "./Contact";
import ChartsAndMaps from "./ChartsAndMaps";
import { Link, Routes, Route, useLocation } from "react-router-dom";
function SideBar() {
  const location = useLocation();
  return (
    <>
      <aside
        id="default-sidebar"
        class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  location.pathname === "/" ? "bg-blue-500 text-white" : ""
                } focus:bg-blue-500 focus:text-white`}
              >
                <span className="ml-3">Contact</span>
              </Link>
            </li>
            <li>
              <Link
                to="/charts"
                className={`flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  location.pathname === "/charts"
                    ? "bg-blue-500 text-white"
                    : ""
                } focus:bg-blue-500 focus:text-white`}
              >
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Chart and Maps
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
      <div className="ml-64 p-4">
        <Routes>
          <Route path="/" element={<Contact />} />
          <Route path="/charts" element={<ChartsAndMaps />} />
        </Routes>
      </div>
    </>
  );
}

export default SideBar;
