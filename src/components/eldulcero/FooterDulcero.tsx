import { MessageCircle, MapPin, Instagram, Facebook } from "lucide-react";
import { construirLinkWhatsApp } from "@/lib/eldulcero/whatsapp";

export default function FooterDulcero() {
  return (
    <footer className="bg-dulce-texto px-4 py-10 text-white/90">
      <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
        <div>
          <div className="font-heading text-xl font-extrabold text-white">El Dulcero 🍭</div>
          <p className="mt-2 text-sm text-white/70">
            Dulcería y organización de fiestas infantiles en la Comarca Lagunera.
          </p>
        </div>

        <div>
          <div className="text-sm font-bold text-white">Contacto</div>
          <a
            href={construirLinkWhatsApp("¡Hola! Quiero información sobre El Dulcero 🎉")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center gap-2 text-sm text-white/70 hover:text-white"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
          <div className="mt-2 flex items-center gap-2 text-sm text-white/70">
            <MapPin className="h-4 w-4" /> La Laguna, Coahuila-Durango
          </div>
        </div>

        <div>
          <div className="text-sm font-bold text-white">Síguenos</div>
          <div className="mt-2 flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-full bg-white/10 p-2 hover:bg-white/20"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="rounded-full bg-white/10 p-2 hover:bg-white/20"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-5xl border-t border-white/10 pt-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} El Dulcero. Todos los derechos reservados.
      </div>
    </footer>
  );
}
