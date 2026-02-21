"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { usePathname } from "@/i18n/routing";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import styles from "../styles/components/header.module.scss";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const menuItems = [
  { labelKey: "projects", href: "/projects" },
  { labelKey: "publications", href: "/publications" },
  { labelKey: "models", href: "/models" },
  { labelKey: "team", href: "/team" },
  { labelKey: "recruitment", href: "/recruitment" },
  { labelKey: "cooperation", href: "/cooperation" },
  { labelKey: "contact", href: "/contact" },
] as const;

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const t = useTranslations("navigation");
  const tCommon = useTranslations("common");

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const sidebar = sidebarRef.current;
    const originalBody = body.style.overflow;
    const originalHtml = html.style.overflow;

    if (isSidebarOpen) {
      body.style.overflow = "hidden";
      html.style.overflow = "hidden";
      body.style.position = "fixed";
      html.style.position = "fixed";
      if (sidebar) sidebar.removeAttribute("inert");
      return () => {
        body.style.overflow = originalBody;
        html.style.overflow = originalHtml;
        body.style.position = "";
        html.style.position = "";
      };
    } else {
      body.style.overflow = "";
      html.style.overflow = "";
      body.style.position = "";
      html.style.position = "";
      if (sidebar) sidebar.setAttribute("inert", "");
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isActive = (href: string) => {
    return pathname === href;
  };

  const headerClass =
    `${styles["site-header"]} ${isSidebarOpen ? styles["site-header--sidebar-open"] : ""}`.trim();

  return (
    <header className={headerClass}>
      <div className={styles["site-header__container"]}>
        <div className={styles["site-header__logo"]}>
          <Link href="/" onClick={closeSidebar}>
            <Image
              src="/logo.svg"
              alt="P.U.M.A. Logo"
              width={55}
              height={75}
              priority
              quality={85}
              sizes="55px"
            />
          </Link>
        </div>
        <nav className={styles["site-header__nav"]}>
          <ul className={styles["site-header__menu"]}>
            {menuItems.map((item) => (
              <li
                key={item.href}
                className={`${styles["site-header__menu-item"]} ${isActive(item.href) ? styles["site-header__menu-item--active"] : ""}`}
              >
                <Link href={item.href}>{t(item.labelKey)}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles["site-header__lang-switcher"]}>
          <LanguageSwitcher />
        </div>
        <button
          className={styles["site-header__burger"]}
          id="burger"
          aria-label={tCommon("openMenu")}
          aria-expanded={isSidebarOpen}
          aria-controls="mobile-sidebar"
          onClick={toggleSidebar}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div
        id="mobile-sidebar"
        ref={sidebarRef}
        className={`${styles["site-header__sidebar"]} ${isSidebarOpen ? styles["site-header__sidebar--active"] : ""}`}
        data-open={isSidebarOpen}
        inert={!isSidebarOpen ? true : undefined}
        role="navigation"
        aria-label="Menu mobilne"
      >
        <div
          className={styles["site-header__container"]}
          style={{
            boxShadow: "none",
            borderBottom: "none",
            background: "none",
            position: "static",
            zIndex: 1,
          }}
        >
          <div className={styles["site-header__logo"]}>
            <Link href="/" onClick={closeSidebar}>
              <Image
                src="/logo.svg"
                alt="P.U.M.A. Logo"
                width={55}
                height={75}
                priority
                quality={100}
                sizes="55px"
              />
            </Link>
          </div>
          <button
            className={styles["site-header__x-button"]}
            id="x-sidebar"
            aria-label={tCommon("closeMenu")}
            onClick={closeSidebar}
          >
            <span aria-hidden="true"></span>
          </button>
        </div>
        <ul className={styles["site-header__sidebar__menu"]}>
          {menuItems.map((item) => (
            <li
              key={item.href}
              className={`${styles["site-header__sidebar__menu-item"]} ${isActive(item.href) ? styles["site-header__sidebar__menu-item--active"] : ""}`}
            >
              <Link href={item.href} onClick={closeSidebar}>
                {t(item.labelKey)}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles["site-header__sidebar__lang-switcher"]}>
          <LanguageSwitcher isMobile />
        </div>
      </div>
    </header>
  );
}
