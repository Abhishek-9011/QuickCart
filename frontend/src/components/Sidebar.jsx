import React from "react";  

import { MessageSquareWarning, PackageSearch, ListOrdered } from "lucide-react";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="w-[200px] pl-5 min-h-screen p-4">
      <ul className="space-y-3">
        <li>
          <div className="flex  w-[100px] justify-evenly">
            <MessageSquareWarning />
            <Link to="/admin-dashboard">Report</Link>
          </div>
        </li>
        <li>
          <div className="flex  w-[100px] justify-evenly">
            <PackageSearch />
            <Link to="/admin-products">Products</Link>
          </div>
        </li>
        <li>
          <div className="flex  w-[100px] justify-evenly">
            <ListOrdered />
            <Link to="/admin-orders">Order</Link>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
