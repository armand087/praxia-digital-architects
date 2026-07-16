import { MessageCircle } from "lucide-react";
import { construirLinkWhatsApp } from "@/lib/eldulcero/whatsapp";

export default function WhatsAppFloatingButton() {
  const link = construirLinkWhatsApp("¡Hola! Quiero información para organizar una fiesta infantil 🎉");

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-transform hover:scale-110 active:scale-95 md:h-16 md:w-16"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
      <MessageCircle className="relative h-7 w-7 md:h-8 md:w-8" fill="white" strokeWidth={0} />
    </a>
  );
}
