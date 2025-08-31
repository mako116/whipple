import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Users, Mail, BookOpen, Calculator, Package, Menu, X } from 'lucide-react';
import whipple from "../../assets/images/logowhiple.jpeg"

const Navigation = () => {
  const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 
  // State for scroll behavior
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // State to hold the timer IDs for dropdowns
  const [companyCloseTimer, setCompanyCloseTimer] = useState(null);
  const [productCloseTimer, setProductCloseTimer] = useState(null);

  // State for mobile dropdowns
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handles the shrinking effect
      setIsScrolled(currentScrollY > 20);

      // Handles the retracting (show/hide) effect
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      // Update the last scroll position, but only if the difference is significant to avoid jitter
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleCompanyMouseEnter = () => {
    if (companyCloseTimer) clearTimeout(companyCloseTimer);
    if (productCloseTimer) clearTimeout(productCloseTimer);
    setIsCompanyDropdownOpen(true);
    setIsProductDropdownOpen(false);
  };

  const handleCompanyMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsCompanyDropdownOpen(false);
    }, 250);
    setCompanyCloseTimer(timer);
  };

  const handleProductMouseEnter = () => {
    if (productCloseTimer) clearTimeout(productCloseTimer);
    if (companyCloseTimer) clearTimeout(companyCloseTimer);
    setIsProductDropdownOpen(true);
    setIsCompanyDropdownOpen(false);
  };

  const handleProductMouseLeave = () => {
    const timer = setTimeout(() => {
      setIsProductDropdownOpen(false);
    }, 250);
    setProductCloseTimer(timer);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close sub-menus when main menu is closed
    if (isMobileMenuOpen) {
        setIsMobileProductsOpen(false);
        setIsMobileServicesOpen(false);
    }
  };

  const toggleMobileProducts = () => {
    setIsMobileProductsOpen(!isMobileProductsOpen);
  };
  
  const toggleMobileServices = () => {
    setIsMobileServicesOpen(!isMobileServicesOpen);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2' : 'py-4'
      } ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className={`bg-white/90 backdrop-blur-lg rounded-full shadow-lg border border-gray-200/80 transition-all duration-300 ${
            isScrolled ? 'shadow-md' : 'shadow-sm'
          }`}>
            <div className="flex justify-between items-center px-4 sm:px-6 py-2">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/">
                  <img
                    src={whipple}
                    alt="whipple"
                    className="h-8 w-auto rounded-full"
                  />
                </Link>
              </div>

              {/* Desktop Navigation Items */}
              <div className="hidden md:flex items-center space-x-1">
                <Link to="/" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-50">
                  <span>HOME</span>
                </Link>
                
                
                
                
              </div>
              
              <div className="md:hidden">
                  <button onClick={toggleMobileMenu} className="p-2 rounded-full hover:bg-gray-100">
                      {isMobileMenuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                  </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      {isMobileMenuOpen ? (
          <div className="fixed inset-0 bg-white z-40 pt-20 md:hidden overflow-y-auto">
              <div className="container mx-auto px-4 py-8">
                  <div className="space-y-4">
                    <Link to="/" className="block text-lg font-semibold text-gray-800 hover:text-blue-600" onClick={toggleMobileMenu}>Home</Link>
                </div>
              </div>
          </div>
      ) : null}
    </>
  );
};

export default Navigation;
