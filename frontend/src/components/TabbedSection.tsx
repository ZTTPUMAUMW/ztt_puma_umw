import React from "react";
import styles from "@/styles/pages/team.module.scss";

export interface TabbedSectionTab<T> {
  key: string;
  label: string;
  content: React.ReactNode | ((data?: T) => React.ReactNode);
}

interface TabbedSectionProps<T> {
  tabs: TabbedSectionTab<T>[];
  activeKey: string;
  onTabChange: (key: string) => void;
  className?: string;
  tabClassName?: string;
  panelClassName?: string;
}

export default function TabbedSection<T>({
  tabs,
  activeKey,
  onTabChange,
  className = "",
  tabClassName = "",
  panelClassName = "",
}: TabbedSectionProps<T>) {
  return (
    <section className={`${styles["team-tabs-section"]} ${className}`}>
      <div className={styles["team-tabs-header"]}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles["team-tabs-tab"]}${activeKey === tab.key ? ` ${styles["active"]}` : ""} ${tabClassName}`}
            onClick={() => onTabChange(tab.key)}
            aria-current={activeKey === tab.key ? "page" : undefined}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        className={`${styles["team-tabs-content"]} ${panelClassName ? styles[panelClassName] : ""}`}
      >
        {tabs.map((tab) => (
          <div
            key={tab.key}
            className={`${styles["team-tabs-panel"]}${activeKey === tab.key ? ` ${styles["active"]}` : ""}`}
            style={{ display: activeKey === tab.key ? undefined : "none" }}
          >
            {typeof tab.content === "function" ? tab.content() : tab.content}
          </div>
        ))}
      </div>
    </section>
  );
}
