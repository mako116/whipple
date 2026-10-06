import React from "react";
import { Link } from "react-router-dom";
import whipple from "../../assets/images/logowhiple.jpeg";

/* Same palette as Hero / About
   sand #EADCC8 · parchment #F6EEE2 · bark #6B4F3A
   cocoa #2A1D14 · gold #C9A227 → #E3BE4F */

const linkClass =
  "text-sm text-[#D9C6AA] hover:text-[#E3BE4F] transition-colors duration-150 " +
  "focus:outline-none focus-visible:text-[#E3BE4F] focus-visible:underline";

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "Terms and Conditions", href: "/terms-and-conditions" },
        { name: "Privacy Policy", href: "/privacy-policy" },
      ],
    },
    {
      title: "Guidelines",
      links: [
        { name: "Legal & Compliance Framework", href: "/legal-compliance-framework", isExternal: true },
        { name: "Refund Policy", href: "/refund-policy", isExternal: true },
        { name: "Fair Play Policy", href: "/fair-play-policy" },
      ],
    },
  ];

  return (
    <footer className="bg-[#2A1D14] text-[#F6EEE2] font-primary">
      {/* Thin gold rule ties the footer to the gold CTAs above */}
      <div className="h-1 bg-gradient-to-r from-[#C9A227] via-[#E3BE4F] to-[#C9A227]" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand + support */}
          <div className="col-span-2">
            <div className="mb-5 flex gap-3 items-center">
              <img
                src={whipple}
                alt="Whipple logo"
                className="h-10 w-10 object-cover rounded-full ring-2 ring-[#C9A227]"
              />
              <h2 className="text-2xl font-bold text-[#F6EEE2]">Whipple</h2>
            </div>

            <p className="text-sm text-[#BFA88A] max-w-xs leading-relaxed">
              Play quick. Climb higher. Compete for the top.
            </p>

            <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-sm text-[#BFA88A]">Customer support:</span>
              <a
                href="mailto:Support@mywhipple.com"
                className="text-sm text-[#E3BE4F] underline underline-offset-4 decoration-[#C9A227]/50 hover:decoration-[#E3BE4F] break-all"
              >
                Support@mywhipple.com
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-[#E3BE4F] font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link to={link.href} className={linkClass}>
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-[#4A3627] mt-12 pt-8 text-center">
          <p className="text-xs sm:text-sm text-[#BFA88A] leading-relaxed">
            Copyright © {new Date().getFullYear()} Whipple is owned and powered
            by Torsade de Pointes Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;