import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../assets/assets";

const Sidebar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
   <section className="hidden md:flex w-1/4 leftsidebar flex-col mt-4 mb-2.5 h-screen px-4">
  <div className="flex w-full flex-1 flex-col gap-6">
    {sidebarLinks.map((link) => {
      const isActive =
        (pathname.includes(link.route) && link.route.length > 1) ||
        pathname === link.route;

      return (
        <Link
          to={link.route}
          key={link.label}
          className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-800 transition leftsidebar_link ${
            isActive ? "bg-gray-800" : ""
          }`}
        >
          <img
            src={link.imgURL.replace(".", "/assets")}
            alt={link.label}
            width={24}
            height={24}
          />
          <p className="hidden sm:block text-amber-50 text-light-1 text-base">
            {link.label}
          </p>
        </Link>
      );
    })}
  </div>
</section>

  );
};

export default Sidebar;
