import { Project } from "@/components/ProjectItem";

export const projectsData: Project[] = [
  {
    title:
      "Grant Agencji Badań Medycznych: Non-commercial, randomized clinical trial evaluating the efficacy of 1-8-cyneol (18C) in the treatment of MRSA nasal carriage (NOSE).",
    funding_body: "Grant Agencji Badań Medycznych",
    funding_body_number: "Nr ABM/2024/1",
    funding_shortcut: "ABM",
    description:
      "Projekt NOSE to pierwsze w Polsce i na świecie, niekomercyjne, randomizowane badanie kliniczne oceniające miejscową skuteczność naturalnego związku - 1,8-cyneolu (eukaliptolu) podanego ustrojowo w eliminacji nosicielstwa metycylinoopornego Staphylococcus aureus (MRSA) z jamy nosowej. MRSA jest jednym z najgroźniejszych drobnoustrojów alarmowych, odpowiadającym za ciężkie infekcje szpitalne, powikłania pooperacyjne i wysoką śmiertelność.",
    roles: [
      {
        academicTitle: "dr hab.",
        name: "Adam Junka",
        universityTitle: "prof. UMW",
        role: "Kierownik zadań laboratoryjnych mikrobiologicznych",
      },
      {
        academicTitle: "dr",
        name: "Malwina Brożyna",
        role: "Wykonawca zadań laboratoryjnych mikrobiologicznych",
      },
      {
        academicTitle: "dr",
        name: "Bartłomiej Dudek",
        role: "Wykonawca zadań laboratoryjnych mikrobiologicznych",
      },
    ],
    funding_amount: "13 215 433,04 PLN",
    funding_logo: "/images/grant_logo/abm.svg",
    link: "https://abm.gov.pl/pl/",
  },
  {
    title:
      "Grant Narodowego Centrum Badań i Rozwoju Lider XIII: Staphix – innowacyjne rozwiązania na bazie bakteriocyn do kontroli mikrobiomu skóry i błon śluzowych w weterynarii.",
    funding_body: "Grant Narodowego Centrum Badań i Rozwoju Lider XIII",
    funding_body_number: "Nr LIDER13/0100/2022",
    funding_shortcut: "NCBiR",
    description:
      "Pracownicy P.U.M.A. są wykonawcami zadań badawczych w projekcie NCBiR LIDER: StaphiX - innowacyjne rozwiązanie na bazie bakteriocyn do kontroli mikrobiomu skóry i błon śluzowych w weterynarii realizowanym przez Uniwersytet Przyrodniczy we Wrocławiu oraz Uniwersytet Wrocławski.",
    roles: [
      {
        academicTitle: "dr hab.",
        name: "Adam Junka",
        universityTitle: "prof. UMW",
        role: "Ekspert",
      },
      { academicTitle: "dr", name: "Malwina Brożyna", role: "Wykonawca zadań badawczych" },
      { academicTitle: "dr", name: "Bartłomiej Dudek", role: "Wykonawca zadań badawczych" },
    ],
    funding_amount: "1 499 552,50 PLN",
    funding_logo: "/images/grant_logo/ncbr.svg",
    link: "https://www.gov.pl/web/ncbr",
  },
  {
    title:
      "Grant Narodowego Centrum Nauki Preludium: Ocena aktywności przeciwbiofilmowej olejków eterycznych wobec drobnoustrojów izolowanych z zakażeń ran przewlekłych przeprowadzona w środowisku odzwierciedlającym środowisko rany przewlekłej.",
    funding_body: "Grant Narodowego Centrum Nauki Preludium",
    funding_body_number: "Nr 2021/41/N/NZ6/03305",
    funding_shortcut: "NCN",
    description:
      "Projekt ma na celu stworzenie modelu in vitro naśladującego środowisko zakażonej rany i pozwalającego na analizę wpływu olejków eterycznych – tymiankowego i rozmarynowego – na biofilm powstający w wyżej wymienionych warunkach.",
    roles: [
      { academicTitle: "dr", name: "Malwina Bro\u017cyna", role: "Kierownik projektu" },
      {
        academicTitle: "dr hab.",
        name: "Adam Junka",
        universityTitle: "prof. UMW",
        role: "Opiekun projektu",
      },
    ],
    funding_amount: "139 934 PLN",
    funding_logo: "/images/grant_logo/ncn.svg",
    link: "https://ncn.gov.pl",
  },
];
