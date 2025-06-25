import React from "react";
import Logo from "../../assets/website/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { FaCaretDown } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { APP_NAVIGATION } from "../../shared/Constants";

const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/",
  },
  {
    id: 2,
    name: "Top Books",
    link: "/#top-books",
  },
  {
    id: 3,
    name: "Top Members",
    link: "/#top-members",
  },
];

const DropdownLinks = [
  {
    id: 1,
    name: "Books",
    link: APP_NAVIGATION.BOOKS,
  },
  {
    id: 2,
    name: "Authors",
    link: APP_NAVIGATION.AUTHORS,
  },
  {
    id: 3,
    name: "Members",
    link: APP_NAVIGATION.MEMBERS,
  },
  {
    id: 4,
    name: "Borrowed Books",
    link: APP_NAVIGATION.BORROWED_BOOKS,
  },
];

const Navbar = () => {
  const navigate = useNavigate();

  const handleSectionClick = (section) => {
    if (location.pathname !== "/") {
      // If not on home, navigate then scroll after navigation
      navigate("/", { replace: false });
      setTimeout(() => {
        const el = document.getElementById(section.link.replace("/#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100); // delay to ensure DOM is rendered
    } else {
      // If already on home, just scroll
      const el = document.getElementById(section.link.replace("/#", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className="shadow-lg bg-white dark:bg-gray-900 dark:text-white duration-200">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div
              onClick={() => navigate(APP_NAVIGATION.HOME)}
              className="cursor-pointer"
            >
              <a className="font-bold text-xl sm:text-2xl flex gap-2 items-center">
                <img src={Logo} alt="Logo" className="w-8 sm:w-10" />
                <span className="text-base sm:text-xl">Samsung Library</span>
              </a>
            </div>
            <div className="flex justify-between items-center gap-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center">
                <DarkMode />
              </div>
              <ul className="hidden sm:flex items-center gap-4">
                {Menu.map((menu) => (
                  <li key={menu.id} className="hidden md:inline-block">
                    <a
                      onClick={() => handleSectionClick(menu)}
                      className="inline-block py-4 px-4 hover:text-primary duration-200"
                    >
                      {menu.name}
                    </a>
                  </li>
                ))}
              </ul>
              {/* Quick Links always visible */}
              <div className="relative">
                <div className="group cursor-pointer flex items-center">
                  <span className="flex h-[48px] sm:h-[72px] items-center gap-[2px]">
                    Quick Links{" "}
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                  <div className="absolute right-2 top-11 z-[9999] hidden group-hover:block w-[90vw] max-w-[180px] sm:w-[150px] sm:max-w-[200px] rounded-md bg-white p-2 text-black shadow-lg">
                    <ul className="space-y-3">
                      {DropdownLinks.map((data) => (
                        <li key={data.name}>
                          <NavLink
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20 text-sm"
                            to={data.link}
                          >
                            {data.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
