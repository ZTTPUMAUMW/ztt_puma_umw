import { Project } from "@/components/ProjectItem";

export const projectsData: Project[] = [
  {
    title:
      "Medical Research Agency Grant: Non-commercial, randomized clinical trial evaluating the efficacy of 1-8-cineol (18C) in the treatment of MRSA nasal carriage (NOSE).",
    funding_body: "Medical Research Agency Grant",
    funding_body_number: "Nr ABM/2024/1",
    funding_shortcut: "ABM",
    description:
      "The NOSE project is the first non-commercial, randomized clinical trial in Poland and worldwide evaluating the local efficacy of a natural compound - 1,8-cineole (eucalyptol) administered systemically in eliminating methicillin-resistant Staphylococcus aureus (MRSA) carriage from the nasal cavity. MRSA is one of the most dangerous alarm microorganisms, responsible for severe hospital infections, postoperative complications and high mortality.",
    roles: [
      {
        academicTitle: "Dr. habil.",
        name: "Adam Junka",
        universityTitle: "Professor at UMW",
        role: "Head of microbiological laboratory tasks",
      },
      {
        academicTitle: "PhD",
        name: "Malwina Bro\u017cyna",
        role: "Performer of microbiological laboratory tasks",
      },
      {
        academicTitle: "PhD",
        name: "Bart\u0142omiej Dudek",
        role: "Performer of microbiological laboratory tasks",
      },
    ],
    funding_amount: "13 215 433,04 PLN",
    funding_logo: "/images/grant_logo/abm.svg",
    link: "https://abm.gov.pl/pl/",
  },
  {
    title:
      "National Centre for Research and Development Lider XIII Grant: Staphix – innovative bacteriocin-based solutions for controlling skin and mucous membrane microbiome in veterinary medicine.",
    funding_body: "National Centre for Research and Development Lider XIII Grant",
    funding_body_number: "Nr LIDER13/0100/2022",
    funding_shortcut: "NCBiR",
    description:
      "P.U.M.A. employees are performers of research tasks in the NCBiR LIDER project: StaphiX - an innovative bacteriocin-based solution for controlling skin and mucous membrane microbiome in veterinary medicine, implemented by Wrocław University of Environmental and Life Sciences and University of Wrocław.",
    roles: [
      {
        academicTitle: "Dr. habil.",
        name: "Adam Junka",
        universityTitle: "Professor at UMW",
        role: "Expert",
      },
      { academicTitle: "PhD", name: "Malwina Bro\u017cyna", role: "Research task performer" },
      { academicTitle: "PhD", name: "Bart\u0142omiej Dudek", role: "Research task performer" },
    ],
    funding_amount: "1 499 552,50 PLN",
    funding_logo: "/images/grant_logo/ncbr.svg",
    link: "https://www.gov.pl/web/ncbr",
  },
  {
    title:
      "National Science Centre Preludium Grant: Evaluation of antibiofilm activity of essential oils against microorganisms isolated from chronic wound infections, conducted in an environment reflecting the chronic wound environment.",
    funding_body: "National Science Centre Preludium Grant",
    funding_body_number: "Nr 2021/41/N/NZ6/03305",
    funding_shortcut: "NCN",
    description:
      "The project aims to create an in vitro model mimicking the environment of an infected wound and allowing analysis of the effect of essential oils - thyme and rosemary - on biofilm formed under the above-mentioned conditions.",
    roles: [
      { academicTitle: "PhD", name: "Malwina Bro\u017cyna", role: "Project leader" },
      {
        academicTitle: "Dr. habil.",
        name: "Adam Junka",
        universityTitle: "Professor at UMW",
        role: "Project supervisor",
      },
    ],
    funding_amount: "139 934 PLN",
    funding_logo: "/images/grant_logo/ncn.svg",
    link: "https://ncn.gov.pl",
  },
];
