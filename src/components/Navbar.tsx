import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar = ({ isScrolled }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [animationPlayed, setAnimationPlayed] = useState(false);

  useEffect(() => {
    setAnimationPlayed(true);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 py-4 px-6 md:px-12 ${
        isScrolled ? "navbar-solid" : "navbar-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className={`text-2xl font-bold text-wavico-blue flex items-center transition-opacity duration-500 ${
            animationPlayed ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: "200ms" }}
        >
          <div className="w-10 h-10 rounded-lg bg-wavico-blue text-white flex items-center justify-center mr-2 text-xl">
            W
          </div>
          Wavico
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: "린 개발", path: "/service" },
            { name: "서비스 소개", path: "/services" },
            { name: "팀 소개", path: "/company" },
            { name: "포트폴리오", path: "/portfolio" },
            // { name: "문의", path: "/contact" },
          ].map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium text-gray-700 hover:text-wavico-blue transition-all duration-300 ${
                isScrolled ? "text-gray-800" : "text-gray-800"
              } ${animationPlayed ? "opacity-100" : "opacity-0"}`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              {item.name}
            </Link>
          ))}
          <Button
            className={`bg-wavico-blue hover:bg-wavico-darkblue text-white px-5 py-2 rounded-md transition-all ${
              animationPlayed ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "700ms" }}
            asChild
          >
            <Link to="/contact">문의하기</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 animate-fade-in">
          <div className="flex flex-col space-y-4 px-6">
            {[
              { name: "린 개발", path: "/service" },
              { name: "서비스 소개", path: "/services" },
              { name: "팀 소개", path: "/company" },
              { name: "포트폴리오", path: "/portfolio" },
              // { name: "문의", path: "/contact" },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-medium text-gray-800 hover:text-wavico-blue py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              className="bg-wavico-blue hover:bg-wavico-darkblue text-white w-full py-2 rounded-md"
              asChild
            >
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                상담 신청
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
