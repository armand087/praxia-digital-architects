import { describe, it, expect } from "vitest";
import { calcularPrecioBolos, PRECIO_BASE_BOLSA, tiposDulce } from "@/data/eldulcero/bolos";
import { calcularPrecioCentroMesa, tamanosMesa, estilosCentroMesa } from "@/data/eldulcero/centrosMesa";

describe("calcularPrecioBolos", () => {
  it("cobra solo el precio base cuando no hay dulces seleccionados", () => {
    const { precioUnitario, precioTotal } = calcularPrecioBolos(10, []);
    expect(precioUnitario).toBe(PRECIO_BASE_BOLSA);
    expect(precioTotal).toBe(PRECIO_BASE_BOLSA * 10);
  });

  it("suma el precio por invitado de cada tipo de dulce seleccionado", () => {
    const [mexicano, chocolate] = tiposDulce;
    const { precioUnitario, precioTotal } = calcularPrecioBolos(20, [mexicano.id, chocolate.id]);
    const esperadoUnitario = PRECIO_BASE_BOLSA + mexicano.precioPorInvitado + chocolate.precioPorInvitado;
    expect(precioUnitario).toBe(esperadoUnitario);
    expect(precioTotal).toBe(esperadoUnitario * 20);
  });

  it("ignora ids de dulce desconocidos sin romper el cálculo", () => {
    const { precioUnitario } = calcularPrecioBolos(5, ["no-existe"]);
    expect(precioUnitario).toBe(PRECIO_BASE_BOLSA);
  });
});

describe("calcularPrecioCentroMesa", () => {
  it("aplica el multiplicador del estilo sobre el precio base del tamaño", () => {
    const tamano = tamanosMesa.find((t) => t.id === "mediana")!;
    const estilo = estilosCentroMesa.find((e) => e.id === "flores")!;
    const { precioUnitario, precioTotal } = calcularPrecioCentroMesa("mediana", "flores", 3);
    expect(precioUnitario).toBe(Math.round(tamano.precioBase * estilo.multiplicador));
    expect(precioTotal).toBe(precioUnitario * 3);
  });

  it("escala el total según la cantidad de mesas", () => {
    const uno = calcularPrecioCentroMesa("chica", "globos", 1);
    const cinco = calcularPrecioCentroMesa("chica", "globos", 5);
    expect(cinco.precioTotal).toBe(uno.precioTotal * 5);
  });
});
