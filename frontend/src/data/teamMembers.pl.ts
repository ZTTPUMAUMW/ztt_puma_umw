import { TeamMember } from "@/components/TeamCard";

export interface TeamMembersData {
  pracownicy: TeamMember[];
  doktoranci: TeamMember[];
  studenci: TeamMember[];
}

export const teamMembers: TeamMembersData = {
  pracownicy: [
    {
      id: "111",
      academicTitle: "dr hab.",
      name: "Adam Junka",
      universityTitle: "prof. UMW",
      position: "Kierownik ZTT P.U.M.A.",
      image: "images/team/AJ.jpg",
      image_2x: "images/team/AJ.jpg",
      alt: "Adam Junka",
      copy: "Jestem absolwentem międzywydziałowych studiów biotechnologicznych UMG–PG–UG w Gdańsku. Od 1 października jestem p.o. kierownika Z.T.T. P.U.M.A. Od ponad 18 lat jestem związany z Uniwersytetem Medycznym we Wrocławiu. Równolegle zdobywałem doświadczenie w przemyśle i środowisku start-upowym, budując pomost między nauką akademicką a jej praktycznymi zastosowaniami. W Z.T.T. P.U.M.A. kieruję zespołem, który łączy eksperyment z technologią: od modeli in vitro, ex vivo i in vivo, poprzez systemy oceny biomateriałów, symulacje środowisk klinicznych i larwalne modele infekcji, po analizę wzorców zachowań i struktur biologicznych przy użyciu sztucznej inteligencji. Po godzinach jestem pasjonatem sztuk walki, leśnych wypraw i urbexu.",
      links: [
        { title: "LinkedIn", url: "https://www.linkedin.com/in/adam-junka-26b432ba/" },
        {
          title: "ResearchGate",
          url: "https://www.researchgate.net/profile/Adam-Junka?ev=hdr_xprf",
        },
        {
          title: "PPM UMW",
          url: "https://ppm.umw.edu.pl/info/author/UMWd00d547e55ea4465a7442e3708dc3212/Profil%2Bosoby%2B%E2%80%93%2BAdam%2BFeliks%2BJunka%2B%E2%80%93%2BUniwersytet%2BMedyczny%2Bim.%2BPiast%C3%B3w%2B%C5%9Al%C4%85skich%2Bwe%2BWroc%C5%82awiu?r=publication&tab=publications&conversationPropagation=begin&sort=&lang=pl&pn=1",
        },
      ],
    },
    {
      id: "121",
      academicTitle: "dr",
      name: "Bartłomiej Dudek",
      position: "Adiunkt Naukowy",
      image: "images/team/BD.jpg",
      image_2x: "images/team/BD.jpg",
      alt: "Bartłomiej Dudek",
      copy: "Ukończyłem studia na kierunku Biologia spec. Mikrobiologia na Uniwersytecie Wrocławskim, po czym kontynuowałem naukę na Studiach Doktoranckich Biologii uzyskując stopień doktora nauk biologicznych. Moją pracę naukową rozpocząłem w Zakładzie Mikrobiologii na Uniwersytecie Wrocławskim, a następnie pracowałem w Laboratorium Mikrobiologii w Łukasiewicz PORT - Polskim Ośrodku Rozwoju Technologii. Obecnie pracuję na stanowisku adiunkta w Zakładzie Technologii Translacyjnej P.U.M.A. na Uniwersytecie Medycznym we Wrocławiu. W ramach moich zainteresowań naukowych badam patogenezę bakterii, ich czynniki wirulencji, interakcje patogen-gospodarz oraz ze szczególnym uwzględnieniem nowoczesne metody zwalczania bakterii patogennych. W czasie wolnym aktywnie spędzam czas biegając, jeżdżąc na rowerze i chodząc po górskich ścieżkach.",
      links: [
        { title: "ResearchGate", url: "https://www.researchgate.net/profile/Bartlomiej-Dudek" },
        {
          title: "PPM UMW",
          url: "https://ppm.umw.edu.pl/info/author/UMW35f6f3f00c8a42cf984b69db0d72dd5c?aq=mesh:MeSH-D006090&r=publication&ps=20&title=Profil%2Bosoby%2B%E2%80%93%2BBart%C5%82omiej%2BDudek%2B%E2%80%93%2BUniwersytet%2BMedyczny%2Bim.%2BPiast%C3%B3w%2B%C5%9Al%C4%85skich%2Bwe%2BWroc%C5%82awiu&lang=pl&pn=1",
        },
      ],
    },
    {
      id: "131",
      academicTitle: "dr",
      name: "Malwina Brożyna",
      position: "Adiunkt Naukowy",
      image: "images/team/MB.jpg",
      image_2x: "images/team/MB.jpg",
      alt: "Malwina Brożyna",
      copy: "Jestem adiunktem naukowym w ZTT P.U.M.A. Ukończyłam studia farmaceutyczne na Uniwersytecie Medycznym we Wrocławiu. Od 2024 roku jestem również doktorem nauk farmaceutycznych. W mojej pracy naukowej zajmuję się głównie badaniem aktywności przeciwdrobnoustrojowych olejków eterycznych w celu wykorzystania ich w terapii leczenia ran przewlekłych. W wolnych chwilach gram w tenisa, pickleball, pływam i jeżdżę na rowerze.",
      links: [
        { title: "LinkedIn", url: "https://pl.linkedin.com/in/malwina-bro%C5%BCyna-202426229" },
        { title: "ResearchGate", url: "https://www.researchgate.net/profile/Malwina-Brozyna-2" },
        {
          title: "PPM UMW",
          url: "https://ppm.umw.edu.pl/info/author/UMWe9af25d6382540c48095a2bbd077d3de?ps=20&lang=pl&title=Person%2Bprofile%2B%E2%80%93%2BMalwina%2BBro%25C5%25BCyna%2B%E2%80%93%2BWroclaw%2BMedical%2BUniversity+title&pn=1&cid=54849",
        },
      ],
    },
    {
      id: "141",
      academicTitle: "mgr inż.",
      name: "Zuzanna Stępnicka",
      position: "Młodszy Specjalista Naukowo-Techniczny",
      image: "images/team/ZS.jpg",
      image_2x: "images/team/ZS.jpg",
      alt: "mgr inż. Zuzanna Stępnicka",
      copy: "Jestem absolwentką biochemii na Uniwersytecie w Glasgow oraz chemii medycznej na Uniwersytecie Wrocławskim. Przez dwa lata pracowałam w start-upie farmaceutycznym Kynos Therapeutics przyczyniając się do sprzedaży firmy w 2024 roku. Od 2025 współpracuje z ZTT, gdzie skupiam się na opracowaniu statystycznym oraz rozwijaniu metod diagnostyki z wykorzystaniem sztucznej inteligencji. W wolnym czasie uprawiam wspinaczkę, kickboxing oraz gram w golfa.",
      links: [
        { title: "LinkedIn", url: "https://www.linkedin.com/in/zuzanna-stepnicka-6a07ab240/" },
        { title: "ResearchGate", url: "https://www.researchgate.net/profile/Zuzanna-Stepnicka-2" },
        {
          title: "PPM UMW",
          url: "https://ppm.umw.edu.pl/info/author/UMWec211d57dfdc49ebbba2db02cbc6b702?r=author&tab=publications&title=Profil%2Bosoby%2B%E2%80%93%2BZuzanna%2BKatarzyna%2BSt%25C4%2599pnicka%2B%E2%80%93%2BUniwersytet%2BMedyczny%2Bim.%2BPiast%25C3%25B3w%2B%25C5%259Al%25C4%2585skich%2Bwe%2BWroc%25C5%2582awiu&lang=pl&pn=1",
        },
      ],
    },
  ],
  doktoranci: [
    {
      id: "194",
      academicTitle: "mgr",
      name: "Aleksandra Woytoń",
      position: "Doktorantka",
      image: "images/team/AW.jpg",
      image_2x: "images/team/AW.jpg",
      alt: "mgr Aleksandra Woytoń",
      copy: 'Jestem absolwentka mikrobiologii Uniwersytetu Wrocławskiego oraz ukończyłam studia podyplomowe "Analityka i Diagnostyka Chemiczna" Uniwersytetu Wrocławskiego. Od końca 2023 rozwijam swoje umiejętności zawodowe w laboratorium diagnostycznym zajmując się m.in. analizą próbek, identyfikacją drobnoustrojów oraz przygotowaniem testów antybiotykowrażliwości. W roku 2024 rozpoczęłam naukę w ramach Szkoły Doktorskiej w ZTT P.U.M.A. W swoich badaniach skupiam się na opracowaniu alternatywnych metod leczenia ran przewlekłych i eradykacji biofilmów bakteryjnych. Jestem pasjonatką teatru muzycznego, tańca klasycznego, w wolnym czasie piekę i uprawiam yogę.',
      links: [
        { title: "LinkedIn", url: "https://pl.linkedin.com/in/aleksandra-woyto%C5%84-98266a214" },
        { title: "ResearchGate", url: "https://www.researchgate.net/profile/Aleksandra-Woyton" },
        {
          title: "PPM UMW",
          url: "https://ppm.umw.edu.pl/info/author/UMW599c1f659c054e1aa1ad6cbd0b4bf68b?r=author&tab=&title=Profil%2Bosoby%2B%E2%80%93%2BAleksandra%2BAgnieszka%2BWoyto%25C5%2584%2B%E2%80%93%2BUniwersytet%2BMedyczny%2Bim.%2BPiast%25C3%25B3w%2B%25C5%259Al%25C4%2585skich%2Bwe%2BWroc%25C5%2582awiu&lang=pl&pn=1",
        },
      ],
    },
    {
      id: "195",
      academicTitle: "mgr inż.",
      name: "Weronika Łojewska",
      position: "Doktorantka PWR-UMW",
      image: "images/team/WL.jpg",
      image_2x: "images/team/WL.jpg",
      alt: "mgr inż. Weronika Łojewska",
      copy: "Ukończyłam studia inżynierskie na Uniwersytecie Przyrodniczym we Wrocławiu na kierunku Biotechnologia oraz magisterskie na Politechnice Wrocławskiej na kierunku Biotechnologia Molekularna i Biokataliza. Kontynuuję swoją naukową przygodę w Szkole Doktorskiej Politechniki Wrocławskiej współpracując z ZTT P.U.M.A. Specjalizuję się w metabolomice, skupiając się na analizie próbek biomedycznych metodami NMR oraz LC-MS. W swoich badaniach wykorzystuję nanocząstki srebra i złota oceniając ich profil toksykologiczny na poziomie metabolicznym. W czasie wolnym od pracy naukowej interesuję się jazdą na rowerze szosowym, wędrówkami górskimi oraz sportami walki. W sezonie zimowym, kiedy nie uprawiam sportu na dworze tworzę na drutach i wyszywam u boku moich dwóch kocich towarzyszy.",
      links: [
        { title: "DONA PWR", url: "https://dona.pwr.edu.pl/szukaj/default.aspx?nrewid=803834" },
      ],
    },
    {
      id: "196",
      academicTitle: "mgr inż.",
      name: "Adrianna Pyra",
      position: "Doktorantka PWR-UMW",
      image: "images/team/AP.jpg",
      image_2x: "images/team/AP.jpg",
      alt: "mgr inż. Adrianna Pyra",
      copy: "Ukończyłam studia biotechnologiczne na Politechnice Wrocławskiej. Od 2024 roku kontynuuję swoją naukową przygodę w Szkole Doktorskiej Politechniki Wrocławskiej pod opieką Profesora Młynarza, Profesora Łukaszewicza oraz Profesora Junki w ZTT P.U.M.A. Mój projekt badawczy koncentruje się na opracowywaniu biotechnologicznych metod recyklingu materiałów bawełnianych. W wolnym czasie lubię malować i pływać.",
      links: [{ title: "ResearchGate", url: "https://www.researchgate.net/profile/Adrianna-Pyra" }],
    },
  ],
  studenci: [
    {
      id: "201",
      name: "Kacper Pietrzak",
      position: "Student",
      image: "images/team/KP.jpg",
      image_2x: "images/team/KP.jpg",
      alt: "Kacper Pietrzak",
      copy: "Jestem Studentem V roku farmacji na Uniwersytecie Medycznym im. Piastów Śląskich we Wrocławiu. Zajmuję się badaniami związanymi z użyciem modelu in vivo Galleria mellonella, na podstawie których powstaje moja praca magisterska. Poza nauką, poświęcam czas na tworzenie muzyki, pływanie, jazdę na rowerze i jestem miłośnikiem kina grozy.",
      links: [],
    },
    {
      id: "202",
      name: "Sara Adamczyk",
      position: "Studentka",
      image: "images/team/SA.jpg",
      image_2x: "images/team/SA.jpg",
      alt: "Sara Adamczyk",
      copy: "Jestem studentką V roku Farmacji na Uniwersytecie Medycznym im. Piastów Śląskich we Wrocławiu. W roku akademickim 2025/2026 realizuję pisanie pracy magisterskiej w ZTT P.U.M.A. Interesuję się mikrobiologią – od 2023 roku jestem członkinią SKN Mikrobiologii Farmaceutycznej, gdzie jestem w trakcie realizacji projektu dotyczącego badania nabywania oporności bakterii na antyseptyki. W wolnym czasie jeżdżę na nartach biegowych i uczę się języka hiszpańskiego.",
      links: [],
    },
    {
      id: "203",
      name: "Gabriela Skoczek",
      position: "Studentka",
      image: "images/team/GS.jpg",
      image_2x: "images/team/GS.jpg",
      alt: "Gabriela Skoczek",
      copy: "Jestem studentką V roku farmacji na Uniwersytecie Medycznym im. Piastów Śląskich we Wrocławiu. Od 2023 roku aktywnie działam w Studenckim Kole Naukowym Mikrobiologii Farmaceutycznej MicroPharm, gdzie angażuję się m.in. w badania nad mikroorganizmami rozwijającymi się na produktach kosmetycznych do ust oraz w projekt dotyczący interakcji pomiędzy antyseptykami. W roku akademickim 2025/2026 realizuję pracę magisterską w ZTT P.U.M.A. W wolnym czasie lubię gotować, piec, śpiewać oraz praktykować jogę.",
      links: [],
    },
  ],
};
