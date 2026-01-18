import { useEffect, useState, useRef } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import logo from "../assets/logo1.png";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);
  const THRESHOLD = 10;

// navBar link items
const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];


  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  // scroll logic (same)
  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const lastY = lastScrollYRef.current;
        const landingPageHeight = window.innerHeight;

        if (currentScrollY < landingPageHeight) {
          if (!showNavbar) setShowNavbar(true);
        } else {
          const delta = Math.abs(currentScrollY - lastY);
          if (delta > THRESHOLD) {
            if (currentScrollY > lastY && showNavbar) setShowNavbar(false);
            else if (currentScrollY < lastY && !showNavbar) setShowNavbar(true);
          }
        }

        lastScrollYRef.current = currentScrollY;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showNavbar]);

  return (
    <nav
      className={`sticky top-0 z-50 py-1 border-b backdrop-blur-xs text-white border-neutral-700/80 transition-transform duration-500 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <a href="#herosec" className="text-2xl font-bold text-white">
              <img src={logo} alt="Logo" className="h-7" />
            </a>
          </div>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex ml-14 space-x-10">
            {navItems.map((item, index) => (
              <li key={index} className="py-4 hover:text-orange-200">
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a
              href="#contact"
              className="py-2 px-3 border-2 rounded-2xl hover:bg-neutral-700 transition" 
            >
              Get In Touch
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-100 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul>
              {navItems.map((item, index) => (
                <li key={index} className="py-4">
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>

            <div className="flex space-x-6 mt-6">
              <a
                href="#contact"
                className="py-4 px-4 border rounded-md hover:bg-neutral-800 transition"
              >
                Get In Touch 
              </a>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
