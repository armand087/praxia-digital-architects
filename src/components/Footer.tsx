import { Link } from "react-router-dom";
import { Linkedin, Twitter, Mail } from "lucide-react";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Metodología", href: "/metodologia" },
  { label: "Servicios", href: "/servicios" },
  { label: "Recursos", href: "/recursos" },
  { label: "Contacto", href: "/contacto" },
];

export default function Footer() {
  return (
    <footer className="bg-praxia-dark border-t border-praxia-border">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-sm bg-gradient-blue flex items-center justify-center">
                <span className="text-white font-black text-sm tracking-tight">P</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg leading-none tracking-tight">PRAXIA</span>
                <span className="text-praxia-muted text-[10px] leading-none tracking-widest uppercase">Inteligencia Aplicada</span>
              </div>
            </Link>
            <p className="text-praxia-muted text-sm leading-relaxed max-w-xs">
              Transformamos empresas en sistemas digitales medibles y escalables. Estrategia, automatización y tecnología aplicada.
            </p>
            <div className="flex gap-3 mt-2">
              <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-sm border border-praxia-border flex items-center justify-center text-praxia-muted hover:text-white hover:border-praxia-blue transition-colors">
                <Linkedin size={16} />
              </a>
              <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-sm border border-praxia-border flex items-center justify-center text-praxia-muted hover:text-white hover:border-praxia-blue transition-colors">
                <Twitter size={16} />
              </a>
              <a href="mailto:hola@praxia.mx" aria-label="Email" className="w-9 h-9 rounded-sm border border-praxia-border flex items-center justify-center text-praxia-muted hover:text-white hover:border-praxia-blue transition-colors">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-4">Navegación</h3>
            <ul className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-praxia-muted text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-4">Contacto</h3>
            <div className="flex flex-col gap-2">
              <p className="text-praxia-muted text-sm">hola@praxia.mx</p>
              <p className="text-praxia-muted text-sm">México</p>
            </div>
            <Link
              to="/contacto"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-blue text-white text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Agendar Diagnóstico
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-praxia-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-praxia-muted text-xs">
            © {new Date().getFullYear()} PRAXIA Inteligencia Aplicada. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-praxia-muted text-xs hover:text-white transition-colors">Aviso de Privacidad</a>
            <a href="#" className="text-praxia-muted text-xs hover:text-white transition-colors">Términos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
