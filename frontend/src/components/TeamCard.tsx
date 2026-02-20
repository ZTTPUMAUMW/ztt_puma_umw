"use client";

import Image from "next/image";
import styles from "../styles/components/team-card.module.scss";

export interface TeamMember {
  id: string;
  academicTitle?: string;
  name: string;
  universityTitle?: string;
  position: string;
  image: string;
  image_2x: string;
  alt: string;
  copy: string;
  links: { title: string; url: string }[];
}

interface TeamCardProps {
  member: TeamMember;
  onOpenModal: (member: TeamMember) => void;
}

export default function TeamCard({ member, onOpenModal }: TeamCardProps) {
  return (
    <div className={styles["team-card"]}>
      <button
        onClick={() => onOpenModal(member)}
        className={styles["team-card__button"]}
        aria-label={`Pokaż szczegóły członka zespołu: ${member.name}`}
      >
        <div className={styles["team-card__thumbnail"]}>
          <div className={styles["team-card__image-wrapper"]}>
            <Image
              className={styles["team-card__image"]}
              src={`/${member.image}`}
              alt={member.alt}
              fill
              sizes="(min-width: 1367px) 581px, 580px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <h3 className={`${styles["team-card__name"]} color-secondary`}>
          {member.academicTitle && `${member.academicTitle} `}
          {member.name}
          {member.universityTitle && `, ${member.universityTitle}`}
        </h3>
        <div className={`${styles["team-card__position"]} has-tertiary-color`}>
          {member.position}
        </div>
      </button>
    </div>
  );
}
