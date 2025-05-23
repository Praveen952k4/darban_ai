import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../assets/assets";

const SideBar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
   <section className="hidden md:flex w-1/4 leftsidebar flex-col mt-4 mb-2.5 h-screen px-4">
  <div className="flex w-full flex-1 flex-col gap-6">
    {sidebarLinks.map((link) => {
  const isActive =
    link.route === "/" ? pathname === "/" : pathname.startsWith(link.route);

  return (
    <Link
      to={link.route}
      key={link.label}
      className={`flex items-center gap-4 p-2 rounded-lg hover:bg-gray-800 transition leftsidebar_link ${
        isActive ? "bg-gray-800" : ""
      }`}
    >
      <link.icon className="text-white text-xl" />
      <p className="hidden sm:block text-amber-50 text-base">{link.label}</p>
    </Link>
  );
})}


  </div>
</section>

  );
};

export default SideBar;
