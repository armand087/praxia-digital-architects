import Hero from "@/components/eldulcero/Hero";
import ComoFunciona from "@/components/eldulcero/ComoFunciona";
import PorQueElegirnos from "@/components/eldulcero/PorQueElegirnos";
import RenderizadorTematico from "@/components/eldulcero/RenderizadorTematico";
import AgendadorDisponibilidad from "@/components/eldulcero/AgendadorDisponibilidad";
import AgendadorCita from "@/components/eldulcero/AgendadorCita";
import PlanesBasicos from "@/components/eldulcero/PlanesBasicos";
import CreadorBolos from "@/components/eldulcero/CreadorBolos";
import CreadorCentrosMesa from "@/components/eldulcero/CreadorCentrosMesa";
import CreadorItinerario from "@/components/eldulcero/CreadorItinerario";
import Testimonios from "@/components/eldulcero/Testimonios";
import CTAFinal from "@/components/eldulcero/CTAFinal";
import FooterDulcero from "@/components/eldulcero/FooterDulcero";
import WhatsAppFloatingButton from "@/components/eldulcero/WhatsAppFloatingButton";

export default function ElDulcero() {
  return (
    <div className="eldulcero-theme min-h-screen bg-dulce-crema font-sans text-dulce-texto">
      <Hero />
      <ComoFunciona />
      <PorQueElegirnos />
      <RenderizadorTematico />
      <AgendadorDisponibilidad />
      <AgendadorCita />
      <PlanesBasicos />
      <CreadorBolos />
      <CreadorCentrosMesa />
      <CreadorItinerario />
      <Testimonios />
      <CTAFinal />
      <FooterDulcero />
      <WhatsAppFloatingButton />
    </div>
  );
}
