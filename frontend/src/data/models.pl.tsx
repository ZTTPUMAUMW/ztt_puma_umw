import styles from "@/styles/pages/models.module.scss";

export interface ModelData {
  image: string;
  title: string;
  description: string | React.ReactElement;
}

export const modelsData: ModelData[] = [
  {
    image: "/images/models/larwy.png",
    title: "Larwy Galleria mellonella",
    description: (
      <>
        Bezkręgowy organizm modelowy wykorzystywany w badaniach <i>in vivo</i>, między innymi w zakresie toksykologicznym, mikrobiologicznym oraz behavioralnym. W ciągu dwóch lat pracy na organizmie, doprowadziliśmy do dwóch zgłoszeń patentowych:
        <ol className={styles['models__description-list']}>
          <li>badanie infekcji miejscowych</li>
          <li>ocena cytotoksyczności kontaktowej materiałów i biomateriałów</li>
        </ol>
      </>
    ),
  },
  {
    image: "/images/models/blob.png",
    title: "Śluzowiec Physarum polycephalum ('blob')",
    description: "Żywy system do badań nad sieciami, algorytmami i adaptacją, zjawiskami emergentnymi.",
  },
  {
    image: "/images/models/bakterie_i_grzyby.png",
    title: "Kolekcja szczepów bakteryjnych i grzybiczych",
    description: "Zarówno referencyjnych, jak i klinicznych.",
  },
  {
    image: "/images/models/linie_komorkowe.png",
    title: "Linie komórkowe",
    description: "Modele komórkowe do badań przedklinicznych i oceny cytotoksyczności.",
  },
  {
    image: "/images/models/pole_magnetyczne.png",
    title: "Pola magnetyczne o modulowanym kształcie fali i częstotliwości",
    description: "Narzędzie do badania wpływu czynników fizycznych na mikroorganizmy i materiały, w tym efektów addytywnych i synergistycznych w zwalczaniu wielolekooporności.",
  },
  {
    image: "/images/models/ai-agent.png",
    title: "Agenci AI",
    description: "Sztuczna inteligencja analizująca wzorce ruchów i odpowiedzi biologicznych.",
  },
  {
    image: "/images/models/question.png",
    title: "Twój model",
    description: "Masz pomysł, którego nikt jeszcze nie testował? My go zbudujemy! Uwielbiamy tworzyć narzędzia, które otwierają nowe możliwości badawcze.",
  },
];
