import React from 'react';
import { Link } from 'react-router-dom';
import whipple from "../../assets/images/logowhiple.jpeg";

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
    <footer className="bg-[#4B95F7] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex gap-2 items-center">
              <img
                src={whipple}
                alt="whipple"
                className="h-8 w-auto rounded-full"
              />
              <h2>
                Whipple
              </h2>
            </div>
            <p className="text-white text-sm mb-4">
              Get a clear path to your financial goals.
            </p>
             <p className="text-white text-sm mb-4 space-x-5">
               Customer Support: 
               <Link className='ml-2 underline' to={'/Support@mywhipple.com'}>
                 Support@mywhipple.com
               </Link>

            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    {link.isExternal ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-white hover:underline"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-sm text-white hover:underline"
                      >
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
        <div className="border-t border-blue-800 mt-12 pt-8 text-center">
          <p className="text-white text-sm">
            Copyright © {new Date().getFullYear()} Whipple is owned and powered
            by Torsade de Pointes Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
