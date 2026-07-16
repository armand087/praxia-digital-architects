import { Button } from "@/components/ui/button";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CTAFinal() {
  return (
    <section className="bg-dulce-gradient px-4 py-16 text-center">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-heading text-3xl font-extrabold text-dulce-texto sm:text-4xl">
          ¿Lista para la mejor fiesta? 🎊
        </h2>
        <p className="mt-2 text-dulce-texto/80">
          Agenda tu fecha hoy y deja que nosotros nos encarguemos de todo
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="w-full rounded-full bg-dulce-rosa text-base font-bold text-white hover:bg-dulce-rosa/90 sm:w-auto"
            onClick={() => scrollTo("cita")}
          >
            Cotiza tu fiesta 🎂
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full rounded-full border-2 border-dulce-morado bg-white/70 text-base font-bold text-dulce-morado hover:bg-white sm:w-auto"
            onClick={() => scrollTo("disponibilidad")}
          >
            Ver disponibilidad 📅
          </Button>
        </div>
      </div>
    </section>
  );
}
