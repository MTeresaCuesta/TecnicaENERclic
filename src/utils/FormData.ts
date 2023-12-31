interface ICategories {
  name: string;
  widge: IWidget[];
}

export const categories: ICategories[] = [
  {
    name: "balance",
    widge: [
      {
        name: "balance-electrico",
      },
    ],
  },
  {
    name: "demanda",
    widge: [
      { name: "evolucion" },
      { name: "variacion-componentes" },
      { name: "ire-general" },
      { name: "ire-general-anual" },
      { name: "ire-general-movil" },
      { name: "ire-industria" },
      { name: "ire-industria-anual" },
      { name: "ire-industria-movil" },
      { name: "ire-servicios" },
      { name: "ire-servicios-anual" },
      { name: "ire-servicios-movil" },
      { name: "ire-otras" },
      { name: "ire-otras-anual" },
      { name: "ire-otras-movil" },
      { name: "demanda-maxima-diaria" },
      { name: "demanda-maxima-horaria" },
      { name: "perdidas-transporte" },
      { name: "potencia-maxima-instantanea" },
      { name: "variacion-demanda" },
      { name: "potencia-maxima-instantanea-variacion" },
      { name: "potencia-maxima-instantanea-variacion-historico" },
      { name: "variacion-componentes-anual" },
      { name: "demanda-tiempo-real" },
    ],
  },
  {
    name: "generacion",
    widge: [
      { name: "estructura-generacion" },
      { name: "evolucion-renovable-no-renovable" },
      { name: "estructura-renovables" },
      { name: "estructura-generacion-emisiones-asociadas" },
      { name: "evolucion-estructura-generacion-emisiones-asociadas" },
      { name: "no-renovables-detalle-emisiones-CO2" },
      { name: "maxima-renovable" },
      { name: "potencia-instalada" },
      { name: "maxima-renovable-historico" },
      { name: "maxima-sin-emisiones-historico" },
    ],
  },
  {
    name: "intercambios",
    widge: [
      { name: "francia-frontera" },
      { name: "portugal-frontera" },
      { name: "marruecos-frontera" },
      { name: "andorra-frontera" },
      { name: "lineas-francia" },
      { name: "lineas-portugal" },
      { name: "lineas-marruecos" },
      { name: "lineas-andorra" },
      { name: "francia-frontera-programado" },
      { name: "portugal-frontera-programado" },
      { name: "marruecos-frontera-programado" },
      { name: "andorra-frontera-programado" },
      { name: "enlace-baleares" },
      { name: "frontera-fisicos" },
      { name: "todas-fronteras-fisicos" },
      { name: "frontera-programados" },
      { name: "todas-fronteras-programados" },
    ],
  },
  {
    name: "transporte",
    widge: [
      { name: "energia-no-suministrada-ens" },
      { name: "tindice-indisponibilidad" },
      { name: "tiempo-interrupcion-medio-tim" },
      { name: "kilometros-lineas" },
      { name: "indice-disponibilidad" },
      { name: "numero-cortes" },
      { name: "ens-tim" },
      { name: "indice-disponibilidad-total" },
    ],
  },
  {
    name: "mercados",
    widge: [
      { name: "componentes-precio-energia-cierre-desglose" },
      { name: "componentes-precio" },
      { name: "energia-gestionada-servicios-ajuste" },
      { name: "energia-restricciones" },
      { name: "precios-restricciones" },
      { name: "reserva-potencia-adicional" },
      { name: "banda-regulacion-secundaria" },
      { name: "energia-precios-regulacion-secundaria" },
      { name: "energia-precios-regulacion-terciaria" },
      { name: "energia-precios-gestion-desvios" },
      { name: "coste-servicios-ajuste" },
      { name: "volumen-energia-servicios-ajuste-variacion" },
      { name: "precios-mercados-tiempo-real" },
      { name: "energia-precios-ponderados-gestion-desvios-before" },
      { name: "energia-precios-ponderados-gestion-desvios" },
      { name: "energia-precios-ponderados-gestion-desvios-after" },
    ],
  },
];

interface IWidget {
  name: string;
}

export const filterWidgetsByCategory = (categoryName: string): IWidget[] => {
  const widgets = categories.find((category) => {
    if (category.name === categoryName) {
      return category;
    }
  })?.widge;
  return widgets || [];
};

export const randomColors = ["#FF5733", "#3399FF", "#FF33FF", "#33FF99", "#FFFF33", "#9933FF", "#33FFFF"];
