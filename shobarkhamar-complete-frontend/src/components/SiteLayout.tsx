import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import {
  Bell,
  BookOpen,
  ChevronDown,
  Home,
  Leaf,
  LogOut,
  Menu,
  MessageSquare,
  ScanLine,
  User,
  X,
  History,
} from "lucide-react";
import { useLanguage } from "../i18n/LanguageContext";
import { LanguageToggle } from "./LanguageSwitcher";
import { LoginModal } from "./LoginModal";
import { clearSession } from "../services/session";
import { getToken } from "../services/api";
import { useUnreadCount } from "./useUnreadCount";

export function SiteLayout() {
  const { lang, t, num } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const unread = useUnreadCount();
  const signedIn = Boolean(getToken());
  const copy = (en: string, bn: string) => (lang === "bn" ? bn : en);
  const home = signedIn ? "/selection" : "/";
  const isHome =
    location.pathname === "/" || location.pathname === "/selection";

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (
        !menuRef.current?.contains(event.target as Node) &&
        !menuButton.current?.contains(event.target as Node)
      )
        setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
    };
  }, [menuOpen]);

  const logout = () => {
    clearSession();
    setMenuOpen(false);
    navigate("/");
  };
  const navigation = [
    { to: home, icon: Home, label: copy("Home", "হোম"), active: isHome },
    {
      to: "/selection",
      icon: ScanLine,
      label: copy("Diagnose", "রোগ নির্ণয়"),
      active: ["/farm-info", "/detection", "/treatment", "/results"].includes(
        location.pathname,
      ),
    },
    {
      to: "/history",
      icon: History,
      label: copy("History", "ইতিহাস"),
      active: location.pathname === "/history",
    },
    {
      to: "/disease-database",
      icon: BookOpen,
      label: copy("Disease guide", "রোগের তথ্য"),
      active: location.pathname === "/disease-database",
    },
  ];

  return (
    <div className="farm-app">
      <a className="skip-link" href="#page-content">
        {copy("Skip to content", "মূল বিষয়বস্তুতে যান")}
      </a>
      <header className="app-header">
        <div className="app-header-inner">
          <Link to={home} className="brand-lockup" aria-label={t("home.brand")}>
            <span className="brand-symbol">
              <Leaf size={28} strokeWidth={1.8} />
            </span>
            <span>
              <strong>{copy("Shobar Khamar", "সবার খামার")}</strong>
              <small>
                {copy(
                  "A little care. A healthier farm.",
                  "একটু যত্নে, সুস্থ খামার।",
                )}
              </small>
            </span>
          </Link>
          <nav
            className="desktop-navigation"
            aria-label={copy("Main navigation", "প্রধান নেভিগেশন")}
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={item.active ? "active" : ""}
                aria-current={item.active ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <LanguageToggle />
            <Link
              to="/notifications"
              className="icon-button notification-button"
              aria-label={t("sel.notifications")}
            >
              <Bell size={23} />
              {unread > 0 && (
                <span className="notification-dot">
                  {num(unread > 99 ? "99+" : unread)}
                </span>
              )}
            </Link>
            <button
              className="account-button"
              onClick={() =>
                signedIn ? navigate("/profile") : setLoginOpen(true)
              }
            >
              <span className="account-avatar">
                <User size={21} />
              </span>
              <span className="account-copy">
                <strong>
                  {signedIn
                    ? localStorage.getItem("userName") || t("common.user")
                    : copy("Welcome", "স্বাগতম")}
                </strong>
                <small>
                  {signedIn ? copy("Farmer", "খামারি") : t("common.login")}{" "}
                  <ChevronDown size={12} />
                </small>
              </span>
            </button>
            <button
              ref={menuButton}
              className="icon-button desktop-menu"
              aria-label={copy("Menu", "মেনু")}
              aria-expanded={menuOpen}
              aria-controls="app-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
        {signedIn && (
          <div className="session-actions">
            <Link to="/logout"><LogOut size={16} />{t("common.logout")}</Link>
          </div>
        )}
      </header>
      {menuOpen && (
        <div ref={menuRef} className="app-menu" id="app-menu">
          <strong>{copy("Your farm companion", "আপনার খামারের সঙ্গী")}</strong>
          {[
            ["/profile", t("sel.profile")],
            ["/notifications", t("sel.notifications")],
            ["/feedback", t("sel.feedback")],
            ["/about", t("sel.about")],
          ].map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
          {signedIn ? (
            <button onClick={logout}>
              <LogOut size={18} />
              {t("common.logout")}
            </button>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                setLoginOpen(true);
              }}
            >
              <User size={18} />
              {t("common.login")}
            </button>
          )}
        </div>
      )}
      <div
        id="page-content"
        className={`page-content ${isHome ? "is-home" : "inner-page"}`}
      >
        <Outlet />
      </div>
      <footer className="app-footer">
        <span>
          {copy("Shobar Khamar", "সবার খামার")}{" "}
          <span aria-hidden="true">·</span>{" "}
          {copy("Care for every farm.", "প্রতিটি খামারের যত্নে।")}
        </span>
        <Link to="/about">{t("sel.about")}</Link>
        <Link to="/feedback">{t("sel.feedback")}</Link>
      </footer>
      <Link
        className="feedback-float"
        to="/feedback"
        aria-label={t("sel.feedback")}
      >
        <MessageSquare size={25} />
      </Link>
      <nav
        className="mobile-navigation"
        aria-label={copy("Mobile navigation", "মোবাইল নেভিগেশন")}
      >
        {navigation.map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={item.active ? "active" : ""}
            aria-current={item.active ? "page" : undefined}
          >
            <item.icon size={24} strokeWidth={1.7} />
            <span>{item.label}</span>
          </Link>
        ))}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="app-menu"
          className={menuOpen ? "active" : ""}
        >
          <Menu size={25} />
          <span>{copy("Menu", "মেনু")}</span>
        </button>
      </nav>
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </div>
  );
}
