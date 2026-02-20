import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import praxiaLogo from "@/assets/praxia-logo.png";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Metodología", href: "/metodologia" },
  { label: "Servicios", href: "/servicios" },
  { label: "Recursos", href: "/recursos" },
  { label: "Contacto", href: "/contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-praxia-dark/95 backdrop-blur-md border-b border-praxia-border shadow-lg"
          : "bg-praxia-black/10 backdrop-blur-sm"
      }`}
    >
      <nav className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img
            src={praxiaLogo}
            alt="PRAXIA Inteligencia Aplicada"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-foreground ${
                location.pathname === link.href
                  ? "text-foreground"
                  : "text-praxia-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + theme toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full border border-praxia-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-blue text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Agendar Diagnóstico
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="md:hidden bg-praxia-dark/98 backdrop-blur-md border-t border-praxia-border">
          <div className="container px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-base font-medium py-2 border-b border-praxia-border transition-colors hover:text-white ${
                  location.pathname === link.href ? "text-white" : "text-praxia-muted"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              {theme === "dark" ? "Modo claro" : "Modo oscuro"}
            </button>
            <Link
              to="/contacto"
              className="mt-2 inline-flex items-center justify-center px-5 py-3 rounded-sm bg-gradient-blue text-white text-sm font-semibold"
            >
              Agendar Diagnóstico
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
