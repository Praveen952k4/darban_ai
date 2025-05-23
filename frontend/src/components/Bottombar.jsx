import React from "react";
import { Link, useLocation } from "react-router-dom";
import { sidebarLinks } from "../../assets/assets"; 
const Bottombar = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <section className="fixed bottom-0 z-50 flex w-full items-center justify-around bg-black px-4 py-2 md:hidden">
      {sidebarLinks.map((link) => {
        const isActive =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;

        return (
          <Link
            to={link.route}
            key={link.label}
            className={`flex flex-col items-center justify-center gap-1 p-2 rounded-md transition ${
              isActive ? "bg-gray-800" : ""
            }`}
          >
            <link.icon className="text-amber-50 text-lg" />
            <p className="text-amber-50 text-[10px]">
              {link.label.split(" ")[0]}
            </p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
