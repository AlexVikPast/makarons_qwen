import { useEffect, useState } from "react";
import { CONTACTS, HOURS, IMG, MENU, TICKER } from "./data";
import { useCountUp, useInView, useParallax, useScramble } from "./hooks";
import {
  Asterisk,
  Farfalle,
  IconBalloon,
  IconCar,
  IconFamily,
  IconFlame,
  IconFork,
  IconNest,
  IconOven,
  IconPin,
  IconPhone,
  IconVeranda,
  IconArrow,
  Marquee,
  MaskText,
  Penne,
  Reveal,
  SectionHead,
  Squiggle,
  Stars,
  Stamp,
} from "./ui";

/* ================= HEADER ================= */
const NAV = [
  { href: "#about", label: "О ресторане" },
  { href: "#menu", label: "Меню" },
  { href: "#gallery", label: "Галерея" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#events", label: "Банкеты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-cream/10 bg-basil-950/90 py-3 shadow-[0_8px_30px_rgba(14,33,23,0.4)] backdrop-blur-md"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <Asterisk className="h-6 w-6 text-tomato transition-transform duration-500 group-hover:rotate-180" />
            <span className="font-display text-lg font-bold tracking-tight text-cream sm:text-xl">МАКАРОНЫ</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="group relative text-sm font-medium text-cream/80 transition-colors hover:text-saffron"
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-saffron transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={CONTACTS.phoneMainHref}
              className="hidden items-center gap-2 text-sm font-semibold text-cream/90 transition-colors hover:text-saffron xl:flex"
            >
              <IconPhone className="h-4 w-4 text-saffron" />
              {CONTACTS.phoneMain}
            </a>
            <a
              href="#booking"
              className="hidden rounded-full bg-tomato px-5 py-2.5 font-display text-xs font-bold tracking-wide text-cream uppercase shadow-lg shadow-tomato/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-tomato-700 sm:block"
            >
              Забронировать
            </a>
            <button
              aria-label="Открыть меню"
              onClick={() => setOpen(true)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-cream/25 lg:hidden"
            >
              <span className="h-0.5 w-4.5 bg-cream" />
              <span className="h-0.5 w-4.5 bg-cream" />
              <span className="h-0.5 w-3 self-center translate-x-[3px] bg-tomato" />
            </button>
          </div>
        </div>
      </header>

      {/* мобильное меню */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-basil-950 transition-all duration-400 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <span className="flex items-center gap-2.5">
            <Asterisk className="h-6 w-6 text-tomato" />
            <span className="font-display text-lg font-bold text-cream">МАКАРОНЫ</span>
          </span>
          <button
            aria-label="Закрыть меню"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-2xl leading-none text-cream"
          >
            ×
          </button>
        </div>
        <nav className="flex flex-1 flex-col items-start justify-center gap-2 px-8">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className={`font-display text-3xl font-bold text-cream transition-all duration-500 hover:translate-x-3 hover:text-saffron ${
                open ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="space-y-4 px-8 pb-10">
          <a href={CONTACTS.phoneMainHref} className="flex items-center gap-3 text-lg font-semibold text-saffron">
            <IconPhone className="h-5 w-5" /> {CONTACTS.phoneMain}
          </a>
          <p className="flex items-center gap-3 text-cream/70">
            <IconPin className="h-5 w-5 shrink-0" /> {CONTACTS.address}
          </p>
        </div>
      </div>
    </>
  );
}

/* ================= HERO ================= */
export function Hero() {
  const title = useScramble("МАКАРОНЫ");
  const p1 = useParallax<HTMLDivElement>(-0.05);
  const p2 = useParallax<HTMLDivElement>(0.07);
  const p3 = useParallax<HTMLDivElement>(0.04);

  return (
    <section id="top" className="relative overflow-hidden bg-basil-950">
      <div className="bg-dots absolute inset-0" aria-hidden="true" />
      <div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-basil-700/30 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-40 h-[480px] w-[480px] rounded-full bg-tomato/12 blur-[120px]"
        aria-hidden="true"
      />

      {/* парящая паста */}
      <div ref={p1} className="pointer-events-none absolute top-28 left-[6%] hidden lg:block" aria-hidden="true">
        <Farfalle className="anim-floaty h-14 w-22 text-saffron/80" style={{ "--r": "-14deg" } as React.CSSProperties} />
      </div>
      <div ref={p2} className="pointer-events-none absolute top-[62%] left-[3%] hidden lg:block" aria-hidden="true">
        <Penne className="anim-floaty h-9 w-20 text-tomato/70" style={{ "--r": "18deg", animationDelay: "-2.2s" } as React.CSSProperties} />
      </div>
      <div ref={p3} className="pointer-events-none absolute top-[18%] right-[4%] hidden xl:block" aria-hidden="true">
        <Squiggle className="anim-floaty h-8 w-36 text-basil-400/70" style={{ "--r": "8deg", animationDelay: "-4s" } as React.CSSProperties} />
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pt-32 pb-16 sm:px-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-40 lg:pb-24">
        <div className="lg:col-span-7">
          <Reveal className="mb-7 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-cream/25 px-4 py-1.5 font-display text-[11px] font-medium tracking-[0.18em] text-cream/85 uppercase">
              Семейный ресторан европейской кухни
            </span>
            <span className="flex items-center gap-1.5 rounded-full bg-basil-800 px-4 py-1.5 text-xs font-medium text-cream/80">
              <IconPin className="h-3.5 w-3.5 text-saffron" /> Краснодар · ул. Соколова, 82
            </span>
          </Reveal>

          <h1
            className="font-display text-[clamp(2.6rem,9.5vw,7rem)] leading-[0.98] font-black tracking-tight text-cream"
            aria-label="Макароны"
          >
            {title}
            <Asterisk className="anim-blink ml-2 inline-block h-[0.55em] w-[0.55em] align-baseline text-tomato" />
          </h1>

          <MaskText
            as="p"
            delay={350}
            lines={[
              "Паста, которую катаем вручную каждое утро,",
              "пицца из помпейской печи и настроение праздника —",
            ]}
            className="mt-7 text-lg font-medium text-cream/85 sm:text-xl"
          />
          <Reveal delay={650}>
            <p className="font-hand text-3xl text-saffron-300 sm:text-4xl">…и всё это — каждый день.</p>
          </Reveal>

          <Reveal delay={500} className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#booking"
              className="group flex items-center gap-3 rounded-full bg-tomato px-7 py-4 font-display text-sm font-bold tracking-wide text-cream uppercase shadow-xl shadow-tomato/30 transition-all duration-300 hover:-translate-y-1 hover:bg-tomato-700"
            >
              <IconFork className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-12" />
              Забронировать стол
            </a>
            <a
              href="#menu"
              className="rounded-full border border-cream/30 px-7 py-4 font-display text-sm font-bold tracking-wide text-cream uppercase transition-all duration-300 hover:border-saffron hover:text-saffron"
            >
              Смотреть меню
            </a>
          </Reveal>

          <Reveal delay={650} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-cream/75">
            <a href={CONTACTS.yandexUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-2.5">
              <span className="flex items-center gap-1 rounded-lg bg-cream px-2.5 py-1 font-display text-lg font-black text-ink">
                4.9 <span className="text-saffron-700">★</span>
              </span>
              <span className="leading-tight transition-colors group-hover:text-saffron">
                2 996 оценок
                <br />
                на Яндекс Картах
              </span>
            </a>
            <span className="hidden h-10 w-px bg-cream/15 sm:block" />
            <span className="flex items-center gap-2.5">
              <IconPin className="h-5 w-5 shrink-0 text-tomato-300" />
              {CONTACTS.address}
            </span>
            <span className="hidden h-10 w-px bg-cream/15 sm:block" />
            <span>
              Сегодня: <b className="text-cream">{HOURS[0].time}</b>
              <br />
              завтраки с 09:00
            </span>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <Reveal variant="zoom" delay={200} className="relative">
            <div className="relative overflow-hidden rounded-t-[999px] rounded-b-[30px] border border-cream/15 shadow-[0_40px_80px_rgba(0,0,0,0.45)]">
              <div className="aspect-[4/5]">
                <img
                  src={IMG.hero}
                  alt="Тальятелле ручной работы с белыми грибами"
                  className="anim-kenburns h-full w-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-basil-950/55 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full bg-cream/95 px-5 py-2 font-display text-[11px] font-bold tracking-[0.14em] text-ink uppercase">
                тальятелле с белыми грибами · 590 ₽
              </div>
            </div>
            <Stamp
              text="ПРАЗДНИК КАЖДЫЙ ДЕНЬ • СЕМЕЙНЫЙ РЕСТОРАН •"
              className="absolute -bottom-8 -left-8 hidden text-saffron sm:block lg:-left-14"
              size={138}
            />
            <div className="absolute -top-2 -right-2 rotate-6 text-right sm:top-4 sm:-right-10">
              <p className="font-hand text-2xl leading-none text-saffron-300 sm:text-3xl">тесто катаем</p>
              <p className="font-hand text-2xl leading-none text-saffron-300 sm:text-3xl">каждое утро!</p>
              <IconArrow className="mt-1 h-8 w-14 -scale-x-100 text-saffron-300/90 sm:ml-6" />
            </div>
          </Reveal>
        </div>
      </div>

      <div className="relative -mx-2 -rotate-1">
        <div className="border-y border-cream/20 bg-tomato py-3.5 text-cream shadow-[0_14px_40px_rgba(224,71,42,0.35)] sm:py-4">
          <Marquee items={TICKER} dur={36} />
        </div>
      </div>
    </section>
  );
}

/* ================= ABOUT ================= */
const FEATURES = [
  {
    icon: IconFamily,
    title: "Семейный ресторан",
    text: "Европейская кухня без пафоса: просторный зал, понятные цены и атмосфера, куда хочется возвращаться всей семьёй.",
    cls: "bg-basil-800 text-cream",
    iconCls: "border-cream/25 text-saffron",
  },
  {
    icon: IconNest,
    title: "Паста ручной работы",
    text: "Каждое утро начинаем с теста: мука, яйца и руки наших поваров. Никаких полуфабрикатов — только свежая паста.",
    cls: "bg-cream-2 text-ink",
    iconCls: "border-ink/20 text-tomato",
  },
  {
    icon: IconOven,
    title: "Помпейская печь",
    text: "Пицца на живом огне: хрустящий леопардовый борт, тянущаяся моцарелла и томаты сан-марцано.",
    cls: "bg-tomato text-cream",
    iconCls: "border-cream/30 text-saffron-300",
  },
  {
    icon: IconVeranda,
    title: "Панорамная веранда",
    text: "Стеклянная веранда с видом на город — гирлянды, зелень и закаты. Работает круглый год.",
    cls: "bg-saffron text-ink",
    iconCls: "border-ink/25 text-tomato-700",
  },
  {
    icon: IconBalloon,
    title: "Детская комната с няней",
    text: "Пока родители спокойно ужинают, дети играют под присмотром. Аниматоры — по выходным и праздникам.",
    cls: "bg-basil-800 text-cream",
    iconCls: "border-cream/25 text-tomato-300",
  },
  {
    icon: IconCar,
    title: "Доставка и праздники",
    text: "Привезём горячую пасту и пиццу по городу, а служба праздников организует банкет под ключ.",
    cls: "bg-tomato-700 text-cream",
    iconCls: "border-cream/25 text-saffron",
  },
];

function Stat({
  value,
  label,
  suffix = "",
  decimals = 0,
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  decimals?: number;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const n = useCountUp(value, inView, 1500, decimals);
  const formatted = decimals > 0 ? n.replace(".", ",") : Number(n).toLocaleString("ru-RU");
  return (
    <Reveal delay={delay}>
      <div ref={ref} className="rounded-lg border-2 border-ink/10 bg-cream px-5 py-4 transition-colors duration-300 hover:border-tomato/50">
        <div className="font-display text-3xl font-black text-ink sm:text-4xl">
          {formatted}
          <span className="text-tomato">{suffix}</span>
        </div>
        <div className="mt-1 text-sm leading-snug text-ink-soft">{label}</div>
      </div>
    </Reveal>
  );
}

export function About() {
  return (
    <section id="about" className="relative bg-cream text-ink">
      <div className="bg-dots-ink absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              num="01"
              kicker="о ресторане"
              tone="dark"
              lines={["Праздник —", "каждый день"]}
              desc={
                <>
                  «Макароны» — место, куда приходят за домашней пастой, а остаются за настроением.
                  Мы кормим Краснодар завтраками с девяти утра и ужинами до полуночи — а по пятницам
                  и субботам кухня работает до часа ночи.
                </>
              }
            />
            <div className="mt-10 grid grid-cols-2 gap-4">
              <Stat value={4.9} decimals={1} label="рейтинг на Яндекс Картах и в 2ГИС" />
              <Stat value={2996} label="оценок оставили наши гости" delay={90} />
              <Stat value={100} suffix="+" label="гостей вмещает зал для банкетов" delay={180} />
              <Reveal delay={270}>
                <div className="rounded-lg border-2 border-ink/10 bg-ink px-5 py-4 text-cream">
                  <div className="font-display text-3xl font-black sm:text-4xl">
                    09<span className="text-saffron">:</span>00
                  </div>
                  <div className="mt-1 text-sm leading-snug text-cream/70">открываем двери ежедневно</div>
                </div>
              </Reveal>
            </div>
            <Reveal delay={200} className="mt-8 flex flex-wrap gap-3">
              <a
                href={CONTACTS.yandexUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-cream transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Stars value={5} className="h-3.5 w-3.5 text-saffron" /> Яндекс · 4.9 · 1 394 отзыва
              </a>
              <span className="flex items-center gap-2 rounded-full border-2 border-ink/15 px-4 py-2 text-sm font-semibold">
                <Stars value={5} className="h-3.5 w-3.5 text-tomato" /> 2ГИС · 4.9
              </span>
            </Reveal>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-7">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} variant={i % 2 ? "right" : "left"} delay={60}>
              <article
                className={`group relative overflow-hidden rounded-xl p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(34,29,19,0.18)] sm:p-8 ${f.cls}`}
              >
                <span className="pointer-events-none absolute top-3 right-5 font-display text-6xl font-black opacity-10 select-none sm:text-7xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                  <span
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${f.iconCls}`}
                  >
                    <f.icon className="h-8 w-8" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold sm:text-2xl">{f.title}</h3>
                    <p className="mt-2 max-w-lg leading-relaxed opacity-85">{f.text}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
          <Reveal variant="zoom" delay={120}>
            <figure className="group relative overflow-hidden rounded-xl">
              <div className="aspect-[16/9]">
                <img
                  src={IMG.interior}
                  alt="Интерьер ресторана Макароны"
                  className="anim-kenburns h-full w-full object-cover"
                />
              </div>
              <figcaption className="absolute bottom-0 left-0 flex items-center gap-2 rounded-tr-xl bg-cream px-4 py-2 font-hand text-xl text-ink">
                <IconFlame className="h-5 w-5 text-tomato" /> тепло, как дома
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= MENU ================= */
const TAG_STYLE: Record<string, string> = {
  хит: "bg-tomato text-cream",
  новинка: "bg-saffron text-ink",
  veg: "border border-basil-400 text-basil-400",
};

export function MenuSection() {
  const [active, setActive] = useState(MENU[0].id);
  const cat = MENU.find((m) => m.id === active) ?? MENU[0];

  return (
    <section id="menu" className="relative overflow-hidden bg-basil-900 text-cream">
      <div className="bg-dots absolute inset-0 opacity-70" aria-hidden="true" />
      <div className="bg-stripes-tomato absolute inset-x-0 top-0 h-40" aria-hidden="true" />
      <Squiggle className="absolute top-16 right-[6%] hidden h-10 w-44 text-saffron/25 lg:block" />
      <Farfalle className="absolute bottom-24 left-[4%] hidden h-12 w-20 text-tomato/25 lg:block" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            num="02"
            kicker="меню"
            tone="light"
            lines={["Что сегодня", "в тарелке?"]}
            desc="Паста — из теста, раскатанного вручную, пицца — из помпейской печи. Цены в рублях, сезонные новинки — у официантов."
          />
          <Reveal variant="right" className="hidden lg:block">
            <div className="rotate-3 rounded-xl bg-saffron px-6 py-4 text-ink shadow-xl shadow-saffron/20 transition-transform duration-300 hover:rotate-0">
              <p className="font-hand text-2xl leading-tight">сейчас в гостях —</p>
              <p className="font-display text-lg font-bold uppercase">арбузно-дынное лето 🍉</p>
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-12 flex flex-wrap gap-2.5">
          {MENU.map((m) => (
            <button
              key={m.id}
              onClick={() => setActive(m.id)}
              className={`rounded-full border px-5 py-2.5 font-display text-xs font-bold tracking-wide uppercase transition-all duration-300 sm:text-sm ${
                active === m.id
                  ? "border-saffron bg-saffron text-ink shadow-lg shadow-saffron/25"
                  : "border-cream/25 text-cream/75 hover:-translate-y-0.5 hover:border-saffron/70 hover:text-saffron"
              }`}
            >
              {m.label}
            </button>
          ))}
        </Reveal>

        <div key={cat.id} className="anim-fadeup mt-12 grid gap-x-16 gap-y-9 md:grid-cols-2">
          {cat.items.map((it, i) => (
            <article key={it.name} className="group anim-fadeup" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="flex items-baseline">
                <h3 className="font-display text-base font-bold tracking-tight transition-colors duration-300 group-hover:text-saffron sm:text-lg">
                  {it.name}
                </h3>
                {it.tag && (
                  <span
                    className={`ml-2.5 shrink-0 rounded-full px-2.5 py-0.5 font-display text-[10px] font-bold tracking-wider uppercase ${TAG_STYLE[it.tag]}`}
                  >
                    {it.tag}
                  </span>
                )}
                <span className="leaders" />
                <span className="shrink-0 font-display text-lg font-black text-saffron">{it.price} ₽</span>
              </div>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-cream/60">{it.desc}</p>
            </article>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-4 rounded-xl border border-cream/15 bg-basil-800/70 p-6 sm:flex-row sm:items-center sm:p-7">
          <p className="max-w-xl text-sm leading-relaxed text-cream/75 sm:text-base">
            Полное меню — с детскими блюдами, лимонадами и сезонными спецпредложениями — ждёт вас в ресторане
            и на{" "}
            <a href={CONTACTS.siteUrl} target="_blank" rel="noreferrer" className="font-semibold text-saffron underline decoration-2 underline-offset-4 hover:text-saffron-300">
              macaroni.restaurant
            </a>
            . А если никуда не хочется ехать — привезём горячим.
          </p>
          <a
            href={CONTACTS.phoneMainHref}
            className="flex shrink-0 items-center gap-3 rounded-full bg-cream px-6 py-3.5 font-display text-xs font-bold tracking-wide text-ink uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-saffron"
          >
            <IconCar className="h-5 w-5 text-tomato" /> Заказать доставку
          </a>
        </Reveal>
      </div>
    </section>
  );
}
