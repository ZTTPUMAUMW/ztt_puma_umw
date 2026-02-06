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
      academicTitle: "Dr. habil.",
      name: "Adam Junka",
      universityTitle: "Professor at UMW",
      position: "Head of Z.T.T. P.U.M.A.",
      image: "images/team/AJ.jpg",
      image_2x: "images/team/AJ.jpg",
      alt: "Adam Junka",
      copy: "I am a graduate of interdisciplinary biotechnology studies at UMG–PG–UG in Gdańsk. Since October 1st, I have been acting head of Z.T.T. P.U.M.A. I have been associated with Wroclaw Medical University for over 18 years. Simultaneously, I gained experience in industry and the start-up environment, building a bridge between academic science and its practical applications. At Z.T.T. P.U.M.A., I lead a team that combines experimentation with technology: from in vitro, ex vivo and in vivo models, through biomaterial evaluation systems, clinical environment simulations and larval infection models, to analyzing patterns of behavior and biological structures using artificial intelligence. After hours, I am a fan of martial arts, forest expeditions and urbex.",
      links: [
        { title: "LinkedIn", url: "https://www.linkedin.com/in/adam-junka-26b432ba/" },
        { title: "ResearchGate", url: "https://www.researchgate.net/profile/Adam-Junka?ev=hdr_xprf" },
        { title: "PPM UMW", url: "https://ppm.umw.edu.pl/info/author/UMWd00d547e55ea4465a7442e3708dc3212/Profil%2Bosoby%2B%E2%80%93%2BAdam%2BFeliks%2BJunka%2B%E2%80%93%2BUniwersytet%2BMedyczny%2Bim.%2BPiast%C3%B3w%2B%C5%9Al%C4%85skich%2Bwe%2BWroc%C5%82awiu?r=publication&tab=publications&conversationPropagation=begin&sort=&lang=pl&pn=1" },
      ],
    },
    {
      id: "121",
      academicTitle: "PhD",
      name: "Bartłomiej Dudek",
      position: "Research Assistant Professor",
      image: "images/team/BD.jpg",
      image_2x: "images/team/BD.jpg",
      alt: "Bartłomiej Dudek",
      copy: "I graduated with a degree in Biology specializing in Microbiology from the University of Wrocław, then continued my education in the Doctoral Studies in Biology, obtaining a PhD in biological sciences. I began my scientific work at the Department of Microbiology at the University of Wrocław, and then worked in the Microbiology Laboratory at Łukasiewicz PORT - Polish Center for Technology Development. Currently, I work as an assistant professor at the Department of Translational Technology P.U.M.A. at Wroclaw Medical University. My scientific interests include studying bacterial pathogenesis, their virulence factors, pathogen-host interactions, with particular emphasis on modern methods of combating pathogenic bacteria. In my free time, I actively spend time running, cycling and hiking mountain trails.",
      links: [
        { title: "ResearchGate", url: "https://www.researchgate.net/profile/Bartlomiej-Dudek" },
        { title: "PPM UMW", url: "https://ppm.umw.edu.pl/info/author/UMW35f6f3f00c8a42cf984b69db0d72dd5c?aq=mesh:MeSH-D006090&r=publication&ps=20&title=Profil%2Bosoby%2B%E2%80%93%2BBart%C5%82omiej%2BDudek%2B%E2%80%93%2BUniwersytet%2BMedyczny%2Bim.%2BPiast%C3%B3w%2B%C5%9Al%C4%85skich%2Bwe%2BWroc%C5%82awiu&lang=pl&pn=1" },
      ],
    },
    {
      id: "131",
      academicTitle: "PhD",
      name: "Malwina Brożyna",
      position: "Research Assistant Professor",
      image: "images/team/MB.jpg",
      image_2x: "images/team/MB.jpg",
      alt: "Malwina Brożyna",
      copy: "I am a research assistant professor at Z.T.T. P.U.M.A. I graduated in pharmacy from Wroclaw Medical University. Since 2024, I have also been a PhD in pharmaceutical sciences. In my scientific work, I mainly focus on researching the antimicrobial activity of essential oils for use in the therapy of chronic wound treatment. In my free time, I play tennis, pickleball, swim and cycle.",
      links: [
        { title: "LinkedIn", url: "https://pl.linkedin.com/in/malwina-bro%C5%BCyna-202426229" },
        { title: "ResearchGate", url: "https://www.researchgate.net/profile/Malwina-Brozyna-2" },
        { title: "PPM UMW", url: "https://ppm.umw.edu.pl/info/author/UMWe9af25d6382540c48095a2bbd077d3de?ps=20&lang=pl&title=Person%2Bprofile%2B%E2%80%93%2BMalwina%2BBro%25C5%25BCyna%2B%E2%80%93%2BWroclaw%2BMedical%2BUniversity+title&pn=1&cid=54849" },
      ],
    },
    {
      id: "141",
      academicTitle: "MEng",
      name: "Zuzanna Stępnicka",
      position: "Junior Scientific-Technical Specialist",
      image: "images/team/ZS.jpg",
      image_2x: "images/team/ZS.jpg",
      alt: "mgr inż. Zuzanna Stępnicka",
      copy: "I am a graduate of biochemistry at the University of Glasgow and medicinal chemistry at the University of Wrocław. For two years, I worked at the pharmaceutical start-up Kynos Therapeutics, contributing to the company's sale in 2024. Since 2025, I have been collaborating with Z.T.T., where I focus on statistical development and advancing diagnostic methods using artificial intelligence. In my free time, I practice climbing, kickboxing and play golf.",
      links: [
        { title: "LinkedIn", url: "https://www.linkedin.com/in/zuzanna-stepnicka-6a07ab240/" },
        { title: "ResearchGate", url: "https://www.researchgate.net/profile/Zuzanna-Stepnicka-2" },
        { title: "PPM UMW", url: "https://ppm.umw.edu.pl/info/author/UMWec211d57dfdc49ebbba2db02cbc6b702?r=author&tab=publications&title=Profil%2Bosoby%2B%E2%80%93%2BZuzanna%2BKatarzyna%2BSt%25C4%2599pnicka%2B%E2%80%93%2BUniwersytet%2BMedyczny%2Bim.%2BPiast%25C3%25B3w%2B%25C5%259Al%25C4%2585skich%2Bwe%2BWroc%25C5%2582awiu&lang=pl&pn=1" },
      ],
    },
  ],
  doktoranci: [
    {
      id: "194",
      academicTitle: "MSc",
      name: "Aleksandra Woytoń",
      position: "PhD Candidate",
      image: "images/team/AW.jpg",
      image_2x: "images/team/AW.jpg",
      alt: "mgr Aleksandra Woytoń",
      copy: "I am a graduate of microbiology from the University of Wrocław and completed postgraduate studies in \"Analytical and Diagnostic Chemistry\" at the University of Wrocław. Since the end of 2023, I have been developing my professional skills in a diagnostic laboratory, dealing with sample analysis, identification of microorganisms and preparation of antibiotic susceptibility tests. In 2024, I began my studies at the Doctoral School at Z.T.T. P.U.M.A. In my research, I focus on developing alternative methods for treating chronic wounds and eradicating bacterial biofilms. I am passionate about musical theater, classical dance, and in my free time I bake and practice yoga.",
      links: [
        { title: "LinkedIn", url: "https://pl.linkedin.com/in/aleksandra-woyto%C5%84-98266a214" },
        { title: "ResearchGate", url: "https://www.researchgate.net/profile/Aleksandra-Woyton" },
        { title: "PPM UMW", url: "https://ppm.umw.edu.pl/info/author/UMW599c1f659c054e1aa1ad6cbd0b4bf68b?r=author&tab=&title=Profil%2Bosoby%2B%E2%80%93%2BAleksandra%2BAgnieszka%2BWoyto%25C5%2584%2B%E2%80%93%2BUniwersytet%2BMedyczny%2Bim.%2BPiast%25C3%25B3w%2B%25C5%259Al%25C4%2585skich%2Bwe%2BWroc%25C5%2582awiu&lang=pl&pn=1" },
      ],
    },
    {
      id: "195",
      academicTitle: "MEng",
      name: "Weronika Łojewska",
      position: "PhD Candidate PWR-UMW",
      image: "images/team/WL.jpg",
      image_2x: "images/team/WL.jpg",
      alt: "mgr inż. Weronika Łojewska",
      copy: "I completed my engineering studies at Wrocław University of Environmental and Life Sciences in Biotechnology and my master's studies at Wrocław University of Technology in Molecular Biotechnology and Biocatalysis. I continue my scientific adventure at the Doctoral School of Wrocław University of Technology in collaboration with Z.T.T. P.U.M.A. I specialize in metabolomics, focusing on the analysis of biomedical samples using NMR and LC-MS methods. In my research, I use silver and gold nanoparticles to assess their toxicological profile at the metabolic level. In my free time away from scientific work, I am interested in road cycling, mountain hiking and martial arts. In the winter season, when I don't practice outdoor sports, I create by knitting and embroidering alongside my two cat companions.",
      links: [
        { title: "DONA PWR", url: "https://dona.pwr.edu.pl/szukaj/default.aspx?nrewid=803834" },
      ],
    },
    {
      id: "196",
      academicTitle: "MEng",
      name: "Adrianna Pyra",
      position: "PhD Candidate PWR-UMW",
      image: "images/team/AP.jpg",
      image_2x: "images/team/AP.jpg",
      alt: "mgr inż. Adrianna Pyra",
      copy: "I graduated in biotechnology from Wrocław University of Technology. Since 2024, I have been continuing my scientific adventure at the Doctoral School of Wrocław University of Technology under the supervision of Professor Młynarz, Professor Łukaszewicz and Professor Junka at Z.T.T. P.U.M.A. My research project focuses on developing biotechnological methods for recycling cotton materials. In my free time, I like to paint and swim.",
      links: [
        { title: "ResearchGate", url: "https://www.researchgate.net/profile/Adrianna-Pyra" },
      ],
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
      copy: "I am a 5th-year pharmacy student at Wroclaw Medical University. I am conducting research related to the use of the in vivo Galleria mellonella model, on which my master's thesis is based. Apart from studying, I devote time to making music, swimming, cycling and I am a fan of horror cinema.",
      links: [],
    },
    {
      id: "202",
      name: "Sara Adamczyk",
      position: "Student",
      image: "images/team/SA.jpg",
      image_2x: "images/team/SA.jpg",
      alt: "Sara Adamczyk",
      copy: "I am a 5th-year Pharmacy student at Wroclaw Medical University. In the academic year 2025/2026, I am writing my master's thesis at Z.T.T. P.U.M.A. I am interested in microbiology - since 2023, I have been a member of the Scientific Circle of Pharmaceutical Microbiology, where I am in the process of implementing a project on studying the acquisition of bacterial resistance to antiseptics. In my free time, I go cross-country skiing and learn Spanish.",
      links: [],
    },
    {
      id: "203",
      name: "Gabriela Skoczek",
      position: "Student",
      image: "images/team/GS.jpg",
      image_2x: "images/team/GS.jpg",
      alt: "Gabriela Skoczek",
      copy: "I am a 5th-year pharmacy student at Wroclaw Medical University. Since 2023, I have been actively involved in the MicroPharm Student Scientific Circle of Pharmaceutical Microbiology, where I engage in research on microorganisms developing on lip cosmetic products and in a project on interactions between antiseptics. In the academic year 2025/2026, I am writing my master's thesis at Z.T.T. P.U.M.A. In my free time, I like to cook, bake, sing and practice yoga.",
      links: [],
    },
  ],
};
