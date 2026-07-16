// Placeholder: reemplaza con el número real del negocio (formato: código país + número, sin +).
export const WHATSAPP_NUMBER = "5218711234567";

export function construirLinkWhatsApp(mensaje: string) {
  const texto = encodeURIComponent(mensaje);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${texto}`;
}
