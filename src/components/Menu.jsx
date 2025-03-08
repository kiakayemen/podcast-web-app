"use client";
import Link from "next/link";
import styles from "./Menu.module.css";
import { useState } from "react";

const menuItems = [
  { label: "صفحه اصلی", href: "/" },
  { label: "پادکست ها", href: "/podcasts" },
  { label: "پادکست رخ", href: "/podcasts/rokh-podcast" },
  { label: "پادکست طبقه ۱۶", href: "/podcasts/tabaghe-16" },
];

const Menu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="flex items-center justify-between font-bold">
        {/* Desktop Menu */}
        <div className="hidden h-10 text-lg md:flex items-center justify-between md:gap-8">
          {menuItems.map((item) => (
            <div key={item.label} className="group">
              <Link className="no-underline" href={item.href}>
                {item.label}
              </Link>
              <div className="mx-2 transition-all duration-200 group-hover:border-b-2 group-hover:border-primary" />
            </div>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`z-50 block ${
              styles.hamburger
            } md:hidden focus:outline-none ${menuOpen ? styles.open : ""}`}
          >
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className={`dark:bg-neutral-light ${
                  styles[`hamburger${["Top", "Middle", "Bottom"][i]}`]
                }`}
              />
            ))}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          aria-hidden={!menuOpen}
          className={`fixed top-0 right-0 h-screen w-full dark:bg-dark-elevated bg-white transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            menuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          } z-40 flex flex-col space-y-6 p-12 pt-40 text-lg uppercase`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-primary transition-colors duration-200"
              onClick={toggleMenu}
            >
              {item.label.toLowerCase()}
            </Link>
          ))}
        </div>

        {/* Backdrop */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={toggleMenu}
          />
        )}
      </nav>
    </>
  );
};
export default Menu;
