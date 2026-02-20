"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import styles from "@/styles/pages/publications.module.scss";
import Hero from "@/components/Hero";
import PublicationItem, { Publication } from "@/components/PublicationItem";
import { italicizeLatinWords } from "@/lib/utils";


// TODO: Refactor to fetch publications from API instead of static data, and implement pagination or infinite scroll for better performance with large number of publications.
export default function PublicationsPage() {
  const t = useTranslations('publications');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const publicationsData: Publication[] = [
    {
      title: "Assessment of biological activity of water-soluble polysaccharides isolated from cultivated Pleurotus pulmonarius and Pleurotus citrinopileatus",
      authors: "Paulina Pieniądz and Adrian Wiater and Mateusz Pięt and Elżbieta Samorek and Iwona Komaniecka and Marek Siwulski and Kamila Wlizło and Adam Junka and Aleksandra Woytoń and Adam Choma and Roman Paduch",
      year: 2024,
      month: 9,
      journal: "Acta Poloniae Pharmaceutica",
      doi: "10.32383/appdr/190506",
      url: "https://www.ptfarm.pl/wydawnictwa/czasopisma/acta-poloniae-pharmaceutica/110/-/30580"
    },
    {
      title: "Effect of the addition of graphene flakes on the physical and biological properties of composite paints",
      authors: "Natalia Bartczak and Jerzy Kowalczyk and Robert Tomala and Mariusz Stefanski and Damian Szymański and Maciej Ptak and Wiesław Stręk and Konrad Szustakiewicz and Tomasz Kurzynowski and Łukasz Szczepański and Adam Junka and Damian Gorczyca and Paweł Głuchowski",
      year: 2023,
      month: 8,
      journal: "Molecules",
      doi: "10.3390/molecules28166173",
      url: "https://www.mdpi.com/1420-3049/28/16/6173"
    },
    {
      title: "An epidemic behind the bars: AIDS in American prisons",
      authors: "Jędrzej Dzięgielewski and Iga Barczak and Barbara Dalkowska and Adam Feliks Junka and Marzenna Bartoszewicz and Artur Furga",
      year: 2023,
      month: 12,
      journal: "PROBACJA",
      doi: "10.5604/01.3001.0054.0192",
      url: "https://probacja.com/article/01.3001.0054.0192/pl?language=en"
    },
    {
      title: "Ocena skuteczności maści SutriHeal® Forte 10% względem tworzonego przez Pseudomonas aeruginosa i Staphylococcus aureus biofimu mieszanego o wysokiej tolerancji na bacytracynę, neomycynę i polimyksynę A",
      authors: "Adam Junka and Monika Dzięgielewska and Michał Worek and Marzenna Bartoszewicz",
      year: 2023,
      month: 3,
      journal: "Forum Zakażeń",
      doi: "10.15374/fz2023005",
      url: "https://evereth.pl/project/ocena-skutecznosci-masci-sutriheal-forte-10/#"
    },
    {
      title: "Comparison of antibiofilm activity of low-concentrated hypochlorites vs polyhexanide-containing antiseptic",
      authors: "Justyna Paleczny and Adam Felix Junka and Paweł Krzyżek and Joanna Czajkowska and Axel Kramer and Hicham Benkhai and Ewa Żyfka-Zagrodzińska and Marzenna Bartoszewicz",
      year: 2023,
      month: 3,
      journal: "Frontiers in cellular and infection microbiology",
      doi: "10.3389/fcimb.2023.1119188",
      url: "https://www.frontiersin.org/journals/cellular-and-infection-microbiology/articles/10.3389/fcimb.2023.1119188/full"
    },
    {
      title: "Real-time impedance-based monitoring of the growth and inhibition of osteomyelitis biofilm pathogen Staphylococcus aureus treated with novel bisphosphonate-fluoroquinolone antimicrobial conjugates",
      authors: "Parish P Sedghizadeh and Philip Cherian and Sahar Roshandel and Natalia Tjokro and Casey Chen and Adam F Junka and Eric Hu and Jeffrey Neighbors and Jacek Pawlak and R Graham G Russell and Charles E McKenna and Frank H Ebetino and Shuting Sun and Esmat Sodagar",
      year: 2023,
      month: 1,
      journal: "International Journal of Molecular Sciences",
      doi: "10.3390/ijms24031985",
      url: "https://www.mdpi.com/1422-0067/24/3/1985"
    },
    {
      title: "Argon plasma-modified bacterial cellulose filters for protection against respiratory pathogens",
      authors: "Anna Żywicka and Daria Ciecholewska-Juśko and Magdalena Charęza and Radosław Drozd and Peter Sobolewski and Adam Junka and Selestina Gorgieva and Miroslawa El Fray and Karol Fijałkowski",
      year: 2023,
      month: 2,
      journal: "Carbohydrate Polymers",
      doi: "10.1016/j.carbpol.2022.120322",
      url: "https://www.sciencedirect.com/science/article/pii/S0144861722012279?via%3Dihub"
    },
    {
      title: "(1→3)-α-d-glucan from the pink oyster mushroom (Pleurotus djamor): structural features",
      authors: "Paulina Adamczyk and Iwona Komaniecka and Marek Siwulski and Kamila Wlizło and Adam Junka and Artur Nowak and Dariusz Kowalczyk and Adam Waśko and Jolanta Lisiecka and Michał Grzymajło and Adrian Wiater",
      year: 2025,
      month: 4,
      journal: "Foods",
      doi: "10.3390/foods14071272",
      url: "https://www.mdpi.com/2304-8158/14/7/1272"
    },
    {
      title: "Impact of amber powdered waste on the processability and properties of PCL-based materials",
      authors: "Cláudia A B dos Santos and Bartłomiej Kryszak and Michał Grzymajło and Łukasz J Wilk and Patrycja Szymczyk-Ziółkowska and Adam Junka and Aleksandra Ujćič and Konrad Szustakiewicz",
      year: 2025,
      month: 3,
      journal: "Journal of Materials Research and Technology",
      doi: "10.1016/j.jmrt.2025.02.227",
      url: "https://www.sciencedirect.com/science/article/pii/S2238785425004740"
    },
    {
      title: "Targeting ocular biofilms with plant-derived antimicrobials in the era of antibiotic resistance",
      authors: "Monika Dzięgielewska and Michał Tomczyk and Adrian Wiater and Aleksandra Woytoń and Adam Junka",
      year: 2025,
      month: 5,
      journal: "Molecules",
      doi: "10.3390/molecules30132863",
      url: "https://www.mdpi.com/1420-3049/30/13/2863"
    },
    {
      title: "Synergy of tetracyclines and potassium azeloyl diglycinate (azeloglycine) in hydrogels: evaluation of stability, antimicrobial activity, and physicochemical properties",
      authors: "Agnieszka Kostrzębska and Adam Junka and Witold Musiał",
      year: 2025,
      month: 5,
      journal: "International Journal of Molecular Sciences",
      doi: "10.3390/ijms26115239",
      url: "https://www.mdpi.com/1422-0067/26/11/5239"
    },
    {
      title: "Cytocompatible and antibacterial Fe-, Cu- and Zn-substituted calcium hydroxyapatite materials for skin applications",
      authors: "L Lukaviciute and A Lukowiak and Z Stankeviciute and Adam Junka and M Mortimer and A Zarkov and J.-C. Yang and R Ganceviciene and A Kareiva",
      year: 2025,
      month: 4,
      journal: "Ceramics International",
      doi: "10.1016/j.ceramint.2024.12.545",
      url: "https://www.sciencedirect.com/science/article/abs/pii/S0272884224062205"
    },
    {
      title: "Wielopłaszczyznowa terapia 1,8-cyneolem o działaniu przeciwdrobnoustrojowym i przeciwzapalnym w leczeniu chorób dróg oddechowych",
      authors: "Jarosław Markowski and Milena Szymańska and Adam Junka",
      year: 2025,
      month: 2,
      journal: "Otolaryngologia Polska",
      doi: "10.5604/01.3001.0054.9607",
      url: "https://otolaryngologypl.com/article/549607/en"
    },
    {
      title: "Zastosowanie dichlorowodorku oktenidyny w otorynolaryngologii – przegląd badań in vitro oraz klinicznych",
      authors: "Aleksandra Olkiewicz and Adam Junka and Tomasz Zatoński",
      year: 2025,
      month: 4,
      journal: "Nowa Audiofonologia",
      doi: "10.17431/na/201134",
      url: "https://www.nowaaudiofonologia.pl/Zastosowanie-dichlorowodorku-oktenidyny-w-otorynolaryngologii-przeglad-badan-in-vitro,201134,0,1.html"
    },
    {
      title: "Borax - and tannic acid-based post-3D-printing treatment to tune the mechanical properties of scaffolds",
      authors: "Julia Simińska-Stanny and Parinaz Hobbi and Pejman Ghaffari-Bohlouli and Man Li and Adam Junka and Hafez Jafari and Christine Delporte and Lei Nie and Armin Shavandi",
      year: 2025,
      month: 7,
      journal: "Biomaterials Science",
      doi: "10.1039/d5bm00151j",
      url: "https://pubs.rsc.org/en/content/articlelanding/2025/bm/d5bm00151j"
    },
    {
      title: "Antibacterial metallacarborane-peptide hybrids target the membrane potential in a nonlytic mode and are resistant to proteolysis",
      authors: "Krzysztof Fink and Bożena Szermer-Olearnik and Anna Kędziora and Bartłomiej Dudek and Gabriela Bugla-Płoskońska and Waldemar Goldeman and Michalina Gos and Monika Cuprych-Belter and Mateusz Psurski and Paweł Migdał and Mariusz Uchman and Tomasz M Goszczyński",
      year: 2025,
      month: 7,
      journal: "Journal of Medicinal Chemistry",
      doi: "10.1021/acs.jmedchem.5c01025",
      url: "https://pubs.acs.org/doi/10.1021/acs.jmedchem.5c01025"
    },
    {
      title: "Synthesis and characterization of curcumin-polycaprolactone block copolymers for biomedical applications",
      authors: "Qianqian Wei and Adam Junka and Bartłomiej Dudek and Houman Alimoradi and Julia Simińska-Stanny and Lei Nie and Oseweuba Valentine Okoro and Armin Shavandi",
      year: 2025,
      month: 7,
      journal: "Materials",
      doi: "10.3390/ma18184348",
      url: "https://www.mdpi.com/1996-1944/18/18/4348"
    },
    {
      title: "Mechanical and antimicrobial properties of the graphene-polyamide 6 composite",
      authors: "Paweł Głuchowski and Marta Macieja and Robert Tomala and Mariusz Stefanski and Wiesław Stręk and Maciej Ptak and Damian Szymański and Konrad Szustakiewicz and Adam Junka and Bartłomiej Dudek",
      year: 2024,
      month: 6,
      journal: "Materials",
      doi: "10.3390/ma17143465",
      url: "https://www.mdpi.com/1996-1944/17/14/3465"
    },
    {
      title: "Lipopolysaccharide with long O-antigen is crucial for Salmonella Enteritidis to evade complement activity and to facilitate bacterial survival in vivo in the Galleria mellonella infection model",
      authors: "Eva Krzyżewska-Dudek and Vinaya Dulipati and Katarzyna Kapczyńska and Mateusz Noszka and Carmen Chen and Juha Kotimaa and Marta Książczyk and Bartłomiej Dudek and Gabriela Bugla-Płoskońska and Krzysztof Pawlik and Seppo Meri and Jacek Rybka",
      year: 2024,
      month: 5,
      journal: "Medical Microbiology and Immunology",
      doi: "10.1007/s00430-024-00790-3",
      url: "https://link.springer.com/article/10.1007/s00430-024-00790-3"
    },
    {
      title: "Culturable fungi in Arctic cryoconite holes: A case study from Hansbreen, Spitsbergen",
      authors: "Rafał Ogórek and Jakub Suchodolski and Agata Piecuch and Magdalena Cal and Klaudyna Spychała and Bartłomiej Dudek",
      year: 2024,
      month: 7,
      journal: "Polish Polar Research",
      doi: "10.24425/ppr.2024.150878",
      url: "https://journals.pan.pl/dlibra/publication/150878/edition/132272/content"
    },
    {
      title: "Structural patterns enhancing the antibacterial activity of metallacarborane-based antibiotics",
      authors: "Jakub Cebula and Krzysztof Fink and Waldemar Goldeman and Bożena Szermer-Olearnik and Anna Nasulewicz-Goldeman and Mateusz Psurski and Monika Cuprych and Anna Kędziora and Bartłomiej Dudek and Gabriela Bugla-Płoskońska and Monika Chaszczewska-Markowska and Michalina Gos and Paweł Migdał and Tomasz M Goszczyński",
      year: 2023,
      month: 10,
      journal: "Journal of Medicinal Chemistry",
      doi: "10.1021/acs.jmedchem.3c01516",
      url: "https://pubs.acs.org/doi/abs/10.1021/acs.jmedchem.3c01516"
    },
    {
      title: "In vitro activity of octenidine dihydrochloride-containing lozenges against biofilm-forming pathogens of oral cavity and throat",
      authors: "Bartłomiej Dudek and Justyna Tymińska and Patrycja Szymczyk-Ziółkowska and Grzegorz Chodaczek and Paweł Migdał and Joanna Czajkowska and Adam Junka",
      year: 2023,
      month: 2,
      journal: "Applied Sciences",
      doi: "10.3390/app13052974",
      url: "https://www.mdpi.com/2076-3417/13/5/2974"
    },
    {
      title: "Toward essential oil stewardship: strain-resolved evaluation of thyme oil activity against Pseudomonas aeruginosa",
      authors: "Malwina Brożyna and Zuzanna Stępnicka and Natalia Tymińska and Bartłomiej Dudek and Katarzyna Kapczyńska and Adam Matkowski and Yanfang Sun and Michał Tomczyk and Adam Junka",
      year: 2025,
      month: 9,
      journal: "Frontiers in Pharmacology",
      doi: "10.3389/fphar.2025.1659096",
      url: "https://www.frontiersin.org/journals/pharmacology/articles/10.3389/fphar.2025.1659096/full"
    },
    {
      title: "Establishing essential oil stewardship through the case of rosemary and thyme oils against Staphylococcus aureus",
      authors: "Malwina Brożyna and Zuzanna Stępnicka and Katarzyna Kapczyńska and Bartłomiej Dudek and Adam Matkowski and Adam Junka",
      year: 2025,
      month: 9,
      journal: "Frontiers in Microbiology",
      doi: "10.3389/fmicb.2025.1668594",
      url: "https://www.frontiersin.org/journals/microbiology/articles/10.3389/fmicb.2025.1668594/full"
    },
    {
      title: "Antimicrobial properties and toxicity challenges of chlorine dioxide used in alternative medicine",
      authors: "Ruth Dudek-Wicher and Malwina Brożyna and Justyna Paleczny and Beata Mączyńska and Bartłomiej Dudek and Paweł Migdał and Arleta Dołowacka-Jóźwiak and Jędrzej Fischer and Adam Junka",
      year: 2025,
      month: 5,
      journal: "Scientific Reports",
      doi: "10.1038/s41598-025-01852-z",
      url: "https://www.nature.com/articles/s41598-025-01852-z"
    },
    {
      title: "Galleria mellonella larvae as a model for Helicobacter pylori biofilm formation under antibiotic stress",
      authors: "Paweł Krzyżek and Bartłomiej Dudek and Malwina Brożyna and Barbara Krzyżanowska and Adam Junka",
      year: 2025,
      month: 1,
      journal: "Microbial Pathogenesis",
      doi: "10.1016/j.micpath.2024.107121",
      url: "https://www.sciencedirect.com/science/article/pii/S0882401024005886?via%3Dihub"
    },
    {
      title: "Oxidation of myrtenol to myrtenal epoxide in a porphyrin-based photocatalytic system – A novel terpene alcohol derivative with antimicrobial and anticancer properties",
      authors: "Mateusz Kutyła and Mateusz Pięt and Marek Stankevič and Adam Junka and Malwina Brożyna and Bartłomiej Dudek and Roman Paduch and Mariusz Trytek",
      year: 2025,
      month: 1,
      journal: "Bioorganic Chemistry",
      doi: "10.1016/j.bioorg.2024.108047",
      url: "https://www.sciencedirect.com/science/article/pii/S0045206824009520?via%3Dihub"
    },
    {
      title: "The potential impact of edible fruit extracts on bacterial nucleases in preliminary research - in silico and in vitro insight",
      authors: "Łukasz Szeleszczuk and Malwina Brożyna and Bartłomiej Dudek and Marcin Czarnecki and Adam Junka and Monika E Czerwińska",
      year: 2025,
      month: 1,
      journal: "International Journal of Molecular Sciences",
      doi: "10.3390/ijms26041757",
      url: "https://www.mdpi.com/1422-0067/26/4/1757"
    },
    {
      title: "Novel isoxazole-based antifungal drug candidates",
      authors: "Urszula Bąchor and Malwina Brożyna and Adam Junka and Mateusz Ramires Chmielarz and Damian Gorczyca and Marcin Mączyński",
      year: 2024,
      month: 12,
      journal: "International Journal of Molecular Sciences",
      doi: "10.3390/ijms252413618",
      url: "https://www.mdpi.com/1422-0067/25/24/13618"
    },
    {
      title: "New biocompatible Ti-MOF@hydroxyapatite composite boosted with gentamicin for postoperative infection control",
      authors: "Weronika Bodylska and Adam Junka and Malwina Brożyna and Michał Bartmański and Renata Gadzała-Kopciuch and Anna Jaromin and Jorge A R Navarro and Anna Lukowiak and Marzena Fandzloch",
      year: 2024,
      month: 11,
      journal: "ACS Biomaterials Science & Engineering",
      doi: "10.1021/acsbiomaterials.4c01230",
      url: "https://pubs.acs.org/doi/10.1021/acsbiomaterials.4c01230"
    },
    {
      title: "The chronic wound milieu changes essential oils' antibiofilm activity–an in vitro and larval model study",
      authors: "Malwina Brożyna and Bartłomiej Dudek and Weronika Kozłowska and Katarzyna Malec and Justyna Paleczny and Jerzy Detyna and Krystyna Fabianowska-Majewska and Adam Junka",
      year: 2024,
      month: 1,
      journal: "Scientific Reports",
      doi: "10.1038/s41598-024-52424-6",
      url: "https://www.nature.com/articles/s41598-024-52424-6"
    },
    {
      title: "In vitro and in vivo translational insights into the intraoperative use of antiseptics and lavage solutions against microorganisms causing orthopedic infections",
      authors: "Bartłomiej Dudek and Malwina Brożyna and Michał Karoluk and Mariusz Frankiewicz and Paweł Migdał and Konrad Szustakiewicz and Tomasz Matys and Adrian Wiater and Adam Junka",
      year: 2024,
      month: 11,
      journal: "International Journal of Molecular Sciences",
      doi: "10.3390/ijms252312720",
      url: "https://www.mdpi.com/1422-0067/25/23/12720"
    },
    {
      title: "Abietic acid as a novel agent against ocular biofilms: an in vitro and preliminary in vivo investigation",
      authors: "Monika Dzięgielewska and Marzenna Bartoszewicz and Marta Książczyk and Bartłomiej Dudek and Malwina Brożyna and Patrycja Szymczyk-Ziółkowska and Piotr Gruber and Jacek Pawlak and Weronika Kozłowska and Sylwia Zielińska and Jędrzej Fischer and Aleksandra Woytoń and Adam Junka",
      year: 2024,
      month: 12,
      journal: "International Journal of Molecular Sciences",
      doi: "10.3390/ijms25031528",
      url: "https://www.mdpi.com/1422-0067/25/3/1528"
    },
    {
      title: "The influence of the pectin structure on the properties of hydrogel dressings doped with octenidine-containing antiseptic",
      authors: "Marta Fiedot and Adam Junka and Malwina Brożyna and Justyna Cybulska and Artur Zdunek and Olga Kockova and Krzysztof Lis and Katarzyna Chomiak and Maciej Czajkowski and Roman Jędrzejewski and Konrad Szustakiewicz and Joanna Cybińska and John F Kennedy",
      year: 2024,
      month: 11,
      journal: "Carbohydrate Polymers",
      doi: "10.1016/j.carbpol.2024.122463",
      url: "https://www.sciencedirect.com/science/article/pii/S0144861724006891?via%3Dihub"
    },
    {
      title: "The assessment of physicochemical and antimicrobial properties of hydrophilic gels containing tetracycline hydrochloride and various concentrations of ethanol",
      authors: "Agnieszka Kostrzębska and Adam Junka and Malwina Brożyna and Witold Musiał",
      year: 2024,
      month: 5,
      journal: "Pharmaceutics",
      doi: "10.3390/pharmaceutics16060830",
      url: "https://www.mdpi.com/1999-4923/16/6/830"
    },
    {
      title: "The in vitro impact of isoxazole derivatives on pathogenic biofilm and cytotoxicity of fibroblast cell line",
      authors: "Urszula Bąchor and Adam Junka and Malwina Brożyna and Marcin Mączyński",
      year: 2023,
      month: 12,
      journal: "International Journal of Molecular Sciences",
      doi: "10.3390/ijms24032997",
      url: "https://www.mdpi.com/1422-0067/24/3/2997"
    },
    {
      title: "Antimicrobial and cytotoxic activities of water-soluble isoxazole-linked 1,3,4-oxadiazole with delocalized charge: in vitro and in vivo results",
      authors: "Bartłomiej Dudek and Urszula Bąchor and Ewa Drozd-Szczygieł and Malwina Brożyna and Piotr Dąbrowski and Adam Junka and Marcin Mączyński",
      year: 2023,
      month: 10,
      journal: "International Journal of Molecular Sciences",
      doi: "10.3390/ijms242216033",
      url: "https://www.mdpi.com/1422-0067/24/22/16033"
    },
    {
      title: "The effect of extrusion and injection molding on physical, chemical, and biological properties of PLLA/HAp whiskers composites",
      authors: "Bartłomiej Kryszak and Monika Biernat and Paulina Tymowicz-Grzyb and Adam Junka and Malwina Brożyna and Michał Worek and Paulina Dzienny and Arkadiusz Antończak and Konrad Szustakiewicz",
      year: 2023,
      month: 11,
      journal: "Polymer",
      doi: "10.1016/j.polymer.2023.126428",
      url: "https://www.sciencedirect.com/science/article/pii/S0032386123007589?via%3Dihub"
    },
    {
      title: "Influence of bioactive metal fillers on antimicrobial properties of PA12 composites produced by laser-based powder bed fusion of polymers",
      authors: "Piotr Gruber and Patrycja Szymczyk-Ziółkowska and Michał Olejarczyk and Adam Junka and Krystyna Fabianowska-Majewska and Malwina Brożyna and Tomasz Kurzynowski",
      year: 2023,
      month: 12,
      journal: "Acta of Bioengineering and Biomechanics",
      doi: "10.37190/abb-02303-2023-04",
      url: "https://reference-global.com/article/10.37190/abb-02303-2023-04"
    },
    {
      title: "Culture shock: an investigation into the tolerance of pathogenic biofilms to antiseptics in environments resembling the chronic wound milieu",
      authors: "Justyna Paleczny and Malwina Brożyna and Bartłomiej Dudek and Aleksandra Woytoń and Grzegorz Chodaczek and Marta Szajnik and Adam Junka",
      year: 2023,
      month: 12,
      journal: "International Journal of Molecular Sciences",
      doi: "10.3390/ijms242417242",
      url: "https://www.mdpi.com/1422-0067/24/24/17242"
    }
  ];

  return (
    <>
      <Hero 
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      />

      <section className={styles['section-publications']}>
        <div className="container-content">
          <div className={styles['section-publications__container']}>
            <aside className={styles['section-publications__filters']}>
              <ul className={styles['section-publications__filter-list']}>
                <li 
                  className={`${styles['section-publications__filter-item']} ${selectedYear === null ? styles['section-publications__filter-item--active'] : ''}`}
                  onClick={() => setSelectedYear(null)}
                >
                  {t('filters.all')}
                </li>
                <li
                  className={`${styles['section-publications__filter-item']} ${selectedYear === 2025 ? styles['section-publications__filter-item--active'] : ''}`}
                  onClick={() => setSelectedYear(2025)}
                >
                  2025
                </li>
                <li 
                  className={`${styles['section-publications__filter-item']} ${selectedYear === 2024 ? styles['section-publications__filter-item--active'] : ''}`}
                  onClick={() => setSelectedYear(2024)}
                >
                  2024
                </li>
                <li 
                  className={`${styles['section-publications__filter-item']} ${selectedYear === 2023 ? styles['section-publications__filter-item--active'] : ''}`}
                  onClick={() => setSelectedYear(2023)}
                >
                  2023
                </li>
              </ul>
            </aside>

            <div className={styles['section-publications__list']}>
              {publicationsData
                .filter(pub => selectedYear === null || pub.year === selectedYear)
                .sort((a, b) => {
                  if (b.year !== a.year) return b.year - a.year;
                  return b.month - a.month;
                })
                .map((publication, index) => (
                  <PublicationItem 
                    key={index} 
                    publication={{
                      ...publication,
                      title: italicizeLatinWords(publication.title)
                    }} 
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
