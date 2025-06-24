import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMobileAlt,
} from "react-icons/fa";
import aboutLogo from "../../assets/website/logo.png";
import { useNavigate } from "react-router-dom";

const Links = [
  {
    id: 1,
    title: "Books",
    link: "/books",
  },
  {
    id: 2,
    title: "Authors",
    link: "/authors",
  },
  {
    id: 3,
    title: "Members",
    link: "/members",
  },
  {
    id: 4,
    title: "Borrowed Books",
    link: "/borrowed-books",
  },
];

const PersonalLinks = [
  {
    id: 1,
    title: "Linkedin",
    link: "https://www.linkedin.com/in/donaabdillahula/",
  },
  {
    id: 2,
    title: "Github",
    link: "https://github.com/donaabdillahula",
  },
  {
    id: 3,
    title: "Intagram",
    link: "https://www.instagram.com/dona.ula/",
  },
  {
    id: 4,
    title: "CV",
    link: "https://drive.google.com/file/d/1rtMkMP7ys5K8rPexGHLASrL_z1r8eEPw/view?usp=drive_link",
  },
];
const About = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 dark:bg-gray-950">
      <section className="container">
        <div className=" grid md:grid-cols-3 py-5">
          {/* company Details */}
          <div className=" py-8 px-4 ">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={aboutLogo} alt="Logo" className="max-w-[50px]" />
              Samsung Library
            </h1>
            <p className="">
              Samsung Library is a web-based application designed to efficiently
              manage library resources, including books, authors, members, and
              borrowed book history.
            </p>
            <br />
            <div className="flex items-center gap-3">
              <FaLocationArrow />
              <p>Jakarta, Indonesia</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <FaMobileAlt />
              <p>+62 89648321481</p>
            </div>
            {/* Social Handle */}
            <div className="flex items-center gap-3 mt-6">
              <a href="https://www.instagram.com/dona.ula/">
                <FaInstagram className="text-3xl" />
              </a>
              <a href="https://www.facebook.com/dona.ula99">
                <FaFacebook className="text-3xl" />
              </a>
              <a href="https://www.linkedin.com/in/donaabdillahula/">
                <FaLinkedin className="text-3xl" />
              </a>
              <a href="https://github.com/donaabdillahula">
                <FaGithub className="text-3xl" />
              </a>
            </div>
          </div>
          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Personal Links
                </h1>
                <ul className={`flex flex-col gap-3`}>
                  {PersonalLinks.map((link) => (
                    <li
                      key={link.id}
                      className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary space-x-1 text-gray-500"
                      onClick={() => window.open(link.link, "_blank")}
                    >
                      <span>&#11162;</span>
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="">
              <div className="py-8 px-4 ">
                <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
                  Links
                </h1>
                <ul className="flex flex-col gap-3">
                  {Links.map((link) => (
                    <li
                      key={link.id}
                      className="cursor-pointer hover:translate-x-1 duration-300 hover:text-primary space-x-1 text-gray-500"
                      onClick={() => navigate(link.link)}
                    >
                      <span>&#11162;</span>
                      <span>{link.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
