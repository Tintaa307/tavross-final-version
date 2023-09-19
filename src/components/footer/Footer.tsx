import React from "react";
import "./Footer.css";
const icons = [
  {
    icon: "ri-instagram-fill",
    path: "#",
    name: "Instagram",
  },
  {
    icon: "ri-facebook-fill",
    path: "#",
    name: "Facebook",
  },
  {
    icon: "ri-twitter-fill",
    path: "#",
    name: "Twitter",
  },
  {
    icon: "ri-youtube-fill",
    path: "#",
    name: "Youtube",
  },
  {
    icon: "ri-linkedin-fill",
    path: "#",
    name: "Linkedin",
  },
];

const help = [
  {
    name: "Help",
    path: "#",
  },
  {
    name: "Contact",
    path: "#",
  },
  {
    name: "Privacy",
    path: "#",
  },
  {
    name: "Terms",
    path: "#",
  },
];

const siteLinks = [
  {
    name: "Home",
    path: "#",
  },
  {
    name: "About",
    path: "#",
  },
  {
    name: "Services",
    path: "#",
  },
  {
    name: "Blog",
    path: "#",
  },
];

const account = [
  {
    name: "My Account",
    path: "#",
  },
  {
    name: "Login",
    path: "#",
  },
  {
    name: "Register",
    path: "#",
  },
  {},
];

const Footer = () => {
  return (
    <footer className="w-full h-[320px] bg-black mt-20 flex items-center justify-center">
      <section className="info">
        <div className="content">
          <div>Logo</div>
          <div className="site-links">
            <h2>Site Links</h2>
            <ul>
              {siteLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.path}>{item.name}</a>
                  <div className="styles"></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="help-section">
            <h2>Help section</h2>
            <ul>
              {help.map((item, index) => (
                <li key={index}>
                  <a href={item.path}>{item.name}</a>
                  <div className="styles"></div>
                </li>
              ))}
            </ul>
          </div>
          <div className="account-section">
            <h2>Account</h2>
            <ul>
              {account.map((item, index) => (
                <li key={index}>
                  <a href={item.path}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="styles-2"></div>
        <div className="social-section">
          <ul>
            {icons.map((item, index) => (
              <li key={index}>
                <i className={[item.icon, "text-white"].join(" ")}></i>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
