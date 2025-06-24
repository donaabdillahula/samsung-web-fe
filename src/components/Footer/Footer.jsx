import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";

const FooterLinks = [
  {
    id: 1,
    title: "Home",
    link: "/#",
  },
  {
    id: 2,
    title: "About",
    link: "/#about",
  },
  {
    id: 3,
    title: "Contact",
    link: "/#contact",
  },
  {
    id: 4,
    title: "Blog",
    link: "/#blog",
  },
];
const Footer = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-950">
      <section className="container">
        <div>
          <div className="text-center py-10 border-t-2 border-gray-300/50">
            @copyright 2025 All rights reserved || Made with ❤️ by Dona Abdillah Ula
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
