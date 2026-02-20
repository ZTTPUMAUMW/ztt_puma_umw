import styles from "@/styles/pages/models.module.scss";

export interface ModelData {
  image: string;
  title: string;
  description: string | React.ReactElement;
}

export const modelsData: ModelData[] = [
  {
    image: "/images/models/larwy.png",
    title: "Galleria mellonella larvae",
    description: (
      <>
        An invertebrate model organism used in <i>in vivo</i> research, including toxicological,
        microbiological, and behavioral studies. During two years of work with this organism, we
        have made two patent applications:
        <ol className={styles["models__description-list"]}>
          <li>examination of local infections</li>
          <li>assessment of contact cytotoxicity of materials and biomaterials</li>
        </ol>
      </>
    ),
  },
  {
    image: "/images/models/blob.png",
    title: "Slime mold Physarum polycephalum ('blob')",
    description:
      "A living system for research on networks, algorithms and adaptation, emergent phenomena.",
  },
  {
    image: "/images/models/bakterie_i_grzyby.png",
    title: "Collection of bacterial and fungal strains",
    description: "Both reference and clinical strains.",
  },
  {
    image: "/images/models/linie_komorkowe.png",
    title: "Cell lines",
    description: "Cell models for preclinical research and cytotoxicity assessment.",
  },
  {
    image: "/images/models/pole_magnetyczne.png",
    title: "Magnetic fields with modulated waveform and frequency",
    description:
      "A tool for studying the impact of physical factors on microorganisms and materials, including additive and synergistic effects in combating multidrug resistance.",
  },
  {
    image: "/images/models/ai-agent.png",
    title: "AI Agents",
    description: "Artificial intelligence analyzing patterns of movement and biological responses.",
  },
  {
    image: "/images/models/question.png",
    title: "Your model",
    description:
      "Have an idea that no one has tested yet? We'll build it! We love creating tools that open up new research possibilities.",
  },
];
