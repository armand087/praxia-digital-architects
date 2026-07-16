import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonios } from "@/data/eldulcero/testimonios";
import { useScrollReveal } from "@/lib/eldulcero/useScrollReveal";

export default function Testimonios() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-dulce-crema px-4 py-16">
      <div ref={ref} className="fade-in-up mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-3xl font-extrabold text-dulce-texto sm:text-4xl">
          Fiestas que ya hicimos realidad 💕
        </h2>

        <Carousel className="mt-10">
          <CarouselContent>
            {testimonios.map((t) => (
              <CarouselItem key={t.id} className="sm:basis-1/1">
                <div className="mx-2 rounded-3xl bg-white p-6 text-left shadow-sm sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-dulce-rosa font-heading text-lg font-bold text-white">
                      {t.nombre.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-dulce-texto">{t.nombre}</div>
                      <div className="text-xs text-dulce-texto/60">Fiesta de {t.tema}</div>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < t.estrellas ? "fill-dulce-amarillo text-dulce-amarillo" : "text-dulce-texto/20"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="mt-3 text-sm text-dulce-texto/80">“{t.comentario}”</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
