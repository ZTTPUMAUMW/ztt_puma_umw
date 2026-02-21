"use client";

import { TeamMember } from "./TeamCard";
import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "@/styles/components/team-modal.module.scss";

interface TeamModalProps {
  isOpen: boolean;
  member: TeamMember | null;
  onClose: () => void;
  onNavigate: (direction: "prev" | "next") => void;
}

export default function TeamModal({ isOpen, member, onClose, onNavigate }: TeamModalProps) {
  const t = useTranslations("team");
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      const scrollY = window.scrollY;
      document.addEventListener("keydown", handleEscape);
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        document.body.style.overflow = "";
        document.body.style.touchAction = "";
        window.scrollTo({ top: scrollY, behavior: "instant" });
      };
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!member) return null;

  return (
    <div
      className={`${styles["team-modal__overlay"]} ${isOpen ? styles["active"] : ""}`}
      onClick={onClose}
    >
      <div className={styles["team-modal__content"]} onClick={(e) => e.stopPropagation()}>
        <div className={styles["team-modal__header"]}>
          <button className={styles["btn-back"]} onClick={onClose}>
            <Image
              src="/images/icons/arrow-left.svg"
              alt="Back"
              width={20}
              height={20}
              className={styles["btn-icon"]}
            />
            {t("modal.back")}
          </button>
          <button className={styles["btn-close"]} onClick={onClose}>
            <Image
              src="/images/icons/x-mark.svg"
              alt="Close"
              width={20}
              height={20}
              className={styles["btn-icon"]}
            />
          </button>
        </div>

        <div className={styles["team-modal__body"]}>
          <div className={styles["team-modal__left"]}>
            <Image
              src={`/${member.image}`}
              alt={member.alt}
              width={800}
              height={800}
              className={styles["team-modal__photo"]}
            />
            <div className={styles["team-modal__nav"]}>
              <button
                className={`${styles["btn-nav"]} ${styles["btn-prev"]}`}
                onClick={() => onNavigate("prev")}
                aria-label="Poprzedni"
              >
                <Image
                  src="/images/icons/arrow-left.svg"
                  alt="Previous"
                  width={24}
                  height={24}
                  className={styles["btn-icon"]}
                />
              </button>
              <button
                className={`${styles["btn-nav"]} ${styles["btn-next"]}`}
                onClick={() => onNavigate("next")}
                aria-label="Następny"
              >
                <Image
                  src="/images/icons/arrow-right.svg"
                  alt="Next"
                  width={24}
                  height={24}
                  className={styles["btn-icon"]}
                />
              </button>
            </div>
          </div>

          <div className={styles["team-modal__right"]}>
            <h2 className={styles["team-modal__name"]}>
              {member.academicTitle && `${member.academicTitle} `}
              {member.name}
              {member.universityTitle && `, ${member.universityTitle}`}
            </h2>
            <p className={styles["team-modal__position"]}>{member.position}</p>
            <p
              className={styles["team-modal__bio"]}
              dangerouslySetInnerHTML={{ __html: member.copy }}
            />

            {member.links && member.links.length > 0 && (
              <div className={styles["team-modal__links"]}>
                {member.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles["team-modal__link"]}
                  >
                    {link.title}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
