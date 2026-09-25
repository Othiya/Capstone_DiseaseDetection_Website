import { useState } from "react";
import { PoultryIcon } from './PoultryIcon';
import { Link, useNavigate } from "react-router";
import {
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  Fish,
  Heart,
  Search,
  ShieldCheck,
  Sprout,
  Stethoscope,
  User,
} from "lucide-react";
import { LoginModal } from "./LoginModal";
import { useLanguage } from "../i18n/LanguageContext";
import { getToken } from "../services/api";
import fishImage from "figma:asset/62f52d45234fa34e0569cc9cc6fc66e654838740.png";
import poultryImage from "figma:asset/42eeaf1bf402682fb5a784bdf4ac8a449b212110.png";

export function Home({ dashboard = false }: { dashboard?: boolean }) {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const [loginOpen, setLoginOpen] = useState(false);
  const [query, setQuery] = useState("");
  const copy = (en: string, bn: string) => (lang === "bn" ? bn : en);
  const start = (type: string) =>
    getToken() ? navigate(`/farm-info?type=${type}`) : setLoginOpen(true);
  const services = [
    {
      title: copy("Fish care", "মাছের যত্ন"),
      description: copy(
        "Check your fish’s health",
        "মাছের স্বাস্থ্য পরীক্ষা করুন",
      ),
      icon: Fish,
      color: "aqua",
      action: () => start("fish"),
    },
    {
      title: copy("Poultry care", "পোলট্রির যত্ন"),
      description: copy(
        "A healthier flock starts here",
        "সুস্থ থাকুক আপনার পোলট্রি",
      ),
      icon: PoultryIcon,
      color: "cream",
      action: () => start("poultry"),
    },
    {
      title: copy("Diagnosis history", "পরীক্ষার ইতিহাস"),
      description: copy(
        "Keep track of their wellbeing",
        "আগের পরীক্ষার ফলাফল দেখুন",
      ),
      icon: Heart,
      color: "lilac",
      action: () => navigate("/history"),
    },
    {
      title: copy("Disease guide", "রোগের তথ্য"),
      description: copy(
        "Understand symptoms & care",
        "লক্ষণ ও যত্ন সম্পর্কে জানুন",
      ),
      icon: Stethoscope,
      color: "lavender",
      action: () => navigate("/disease-database"),
    },
    {
      title: copy("Your profile", "আপনার প্রোফাইল"),
      description: copy(
        "Your details, in one place",
        "আপনার সব তথ্য এক জায়গায়",
      ),
      icon: User,
      color: "rose",
      action: () => (getToken() ? navigate("/profile") : setLoginOpen(true)),
    },
    {
      title: copy("About our care", "আমাদের সম্পর্কে"),
      description: copy(
        "Get to know Shobar Khamar",
        "সবার খামার সম্পর্কে জানুন",
      ),
      icon: Sprout,
      color: "mint",
      action: () => navigate("/about"),
    },
  ];
  const filteredServices = services.filter((item) =>
    `${item.title} ${item.description}`
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase().trim()),
  );

  return (
    <main className="home-content">
      <div className="welcome-row">
        <div>
          <p className="eyebrow">
            {copy(
              "YOUR EVERYDAY FARM COMPANION",
              "আপনার খামারের নিত্যদিনের সঙ্গী",
            )}
          </p>
          <h1>
            {dashboard
              ? copy(
                  `Good to see you, ${localStorage.getItem("userName") || "farmer"}.`,
                  `স্বাগতম, ${localStorage.getItem("userName") || "খামারি"}।`,
                )
              : copy(
                  "A happy farm starts with care.",
                  "যত্নেই ভালো থাকে আপনার খামার।",
                )}
          </h1>
        </div>
        <span className="care-label">
          <span />
          {copy("Made for our farmers", "আমাদের খামারিদের জন্য")}
        </span>
      </div>

      <section className="care-banner" aria-labelledby="care-banner-title">
        <div className="banner-copy">
          <span className="banner-kicker">
            <ShieldCheck size={16} />
            {copy(
              "A helping hand for healthier farms",
              "সুস্থ খামারের বিশ্বস্ত সঙ্গী",
            )}
          </span>
          <h2 id="care-banner-title">
            {copy("Little signs.", "ছোট্ট লক্ষণ।")}
            <br />
            {copy("Better care.", "আরও ভালো যত্ন।")}
          </h2>
          <p>
            {copy(
              "Understand your fish and poultry’s health with a photo. Find helpful guidance, all in one place.",
              "একটি ছবি দিয়ে জানুন আপনার মাছ ও পোলট্রির স্বাস্থ্য। প্রয়োজনীয় পরামর্শ পান এক জায়গায়।",
            )}
          </p>
          <a href="#farm-care" className="primary-action">
            {copy("Let’s check their health", "স্বাস্থ্য পরীক্ষা শুরু করুন")}
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="banner-art" aria-hidden="true">
          <div className="art-orbit" />
          <div className="photo-tile photo-fish">
            <img src={fishImage} alt="" />
            <span>
              <Fish size={18} />
              {copy("Fish care", "মাছের যত্ন")}
              <Check size={16} />
            </span>
          </div>
          <div className="photo-tile photo-poultry">
            <img src={poultryImage} alt="" />
            <span>
              <PoultryIcon size="1.125rem" />
              {copy("Poultry care", "পোলট্রির যত্ন")}
              <Check size={16} />
            </span>
          </div>
          <span className="art-heart">
            <Heart size={27} fill="currentColor" />
          </span>
        </div>
      </section>

      <div className="home-search">
        <Search size={23} />
        <input
          type="search"
          aria-label={copy("Find a care service", "সেবা খুঁজুন")}
          placeholder={copy(
            "Find fish care, poultry care, or a disease guide…",
            "মাছ, পোলট্রির যত্ন বা রোগের তথ্য খুঁজুন…",
          )}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="search-hint">
          {copy("Explore care", "সেবা খুঁজুন")}
        </span>
      </div>
      <section className="services-section" aria-labelledby="services-heading">
        <div className="section-heading">
          <h2 id="services-heading">
            {copy("How can we help today?", "আজ কীভাবে সাহায্য করতে পারি?")}
          </h2>
          <span>
            {copy("A little support, every day", "প্রতিদিন, আপনার পাশে")}
          </span>
        </div>
        <div className="service-grid">
          {filteredServices.map((service) => (
            <button
              key={service.title}
              className={`service-tile ${service.color}`}
              onClick={service.action}
            >
              <span className="service-icon">
                <service.icon size={31} strokeWidth={1.9} />
              </span>
              <strong>{service.title}</strong>
              <span className="service-description">{service.description}</span>
              <ArrowRight className="tile-arrow" size={19} />
            </button>
          ))}
        </div>
        {filteredServices.length === 0 && (
          <div className="search-empty" role="status">
            {copy(
              "No matching services. Try “fish”, “poultry”, or “disease”.",
              "কোনো সেবা পাওয়া যায়নি। “মাছ”, “পোলট্রি” বা “রোগ” লিখে খুঁজুন।",
            )}
            <button onClick={() => setQuery("")}>
              {copy("Show all services", "সব সেবা দেখুন")}
            </button>
          </div>
        )}
      </section>

      <section
        id="farm-care"
        className="farm-care-section"
        aria-labelledby="farm-care-heading"
      >
        <div className="section-heading">
          <div>
            <h2 id="farm-care-heading">
              {copy("Care for your farm", "আপনার খামারের যত্নে")}
            </h2>
            <p>
              {copy(
                "Choose who needs a little attention today.",
                "আজ কার যত্ন দরকার, বেছে নিন।",
              )}
            </p>
          </div>
          <Link to="/disease-database">
            {copy("Explore the guide", "রোগের তথ্য দেখুন")}
            <ArrowRight size={17} />
          </Link>
        </div>
        <div className="animal-grid">
          {[
            {
              type: "fish",
              image: fishImage,
              icon: Fish,
              title: copy(
                "Healthy waters. Happy fish.",
                "সুস্থ পানিতে, সুস্থ মাছ।",
              ),
              tag: copy("FISH HEALTH", "মাছের স্বাস্থ্য"),
              desc: copy(
                "Spot visible signs and learn what your fish may need.",
                "মাছের লক্ষণ দেখে প্রয়োজনীয় যত্ন সম্পর্কে জানুন।",
              ),
              color: "aqua",
            },
            {
              type: "poultry",
              image: poultryImage,
              icon: PoultryIcon,
              title: copy(
                "A little care for every bird.",
                "প্রতিটি পাখির জন্য একটু যত্ন।",
              ),
              tag: copy("POULTRY HEALTH", "পোলট্রির স্বাস্থ্য"),
              desc: copy(
                "Upload a dropping photo for a poultry health check.",
                "পোলট্রির স্বাস্থ্য পরীক্ষার জন্য বিষ্ঠার ছবি দিন।",
              ),
              color: "cream",
            },
          ].map((animal) => (
            <button
              key={animal.type}
              className="animal-card"
              onClick={() => start(animal.type)}
            >
              <div className="animal-photo">
                <img
                  src={animal.image}
                  alt={
                    animal.type === "fish"
                      ? copy(
                          "Fish swimming underwater",
                          "পানিতে সাঁতার কাটা মাছ",
                        )
                      : copy("Young poultry chicks", "পোলট্রির বাচ্চা")
                  }
                />
                <span className={`animal-badge ${animal.color}`}>
                  <animal.icon size={17} />
                  {animal.tag}
                </span>
              </div>
              <div className="animal-copy">
                <h3>{animal.title}</h3>
                <p>{animal.desc}</p>
                <span className="animal-link">
                  {copy("Start a health check", "স্বাস্থ্য পরীক্ষা করুন")}
                  <ArrowRight size={19} />
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="steps-section" aria-labelledby="steps-heading">
        <div className="section-heading">
          <h2 id="steps-heading">
            {copy("Simple steps. Thoughtful care.", "সহজ ধাপে, যত্নের পথে।")}
          </h2>
        </div>
        <div className="steps-grid">
          {[
            {
              icon: Camera,
              title: copy("Take a clear photo", "পরিষ্কার ছবি তুলুন"),
              text: copy(
                "Choose fish or poultry and upload an image.",
                "মাছ বা পোলট্রি বেছে নিয়ে ছবি আপলোড করুন।",
              ),
            },
            {
              icon: BookOpen,
              title: copy("Understand the signs", "লক্ষণগুলো বুঝুন"),
              text: copy(
                "Review the health insights from your image.",
                "ছবির ভিত্তিতে পাওয়া ফলাফল দেখুন।",
              ),
            },
            {
              icon: Heart,
              title: copy("Plan the next step", "পরবর্তী পদক্ষেপ নিন"),
              text: copy(
                "Read care guidance and consult your veterinarian.",
                "যত্নের পরামর্শ পড়ুন এবং পশুচিকিৎসকের সঙ্গে কথা বলুন।",
              ),
            },
          ].map((step, index) => (
            <div className="step-card" key={step.title}>
              <span className="step-icon">
                <step.icon size={24} />
              </span>
              <div>
                <small>{copy(`STEP 0${index + 1}`, `ধাপ ০${index + 1}`)}</small>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </main>
  );
}
