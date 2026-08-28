import { useCallback, useEffect, useState, type FormEvent } from "react";
import { CONTACTS, EVENTS, GALLERY, HOURS, IMG, REVIEWS } from "./data";
import { useCountUp, useInView } from "./hooks";
import {
  Asterisk,
  IconArrow,
  IconCar,
  IconClock,
  IconPhone,
  IconPin,
  Marquee,
  Penne,
  Reveal,
  SectionHead,
  Squiggle,
  Stars,
  Stamp,
} from "./ui";

/* ================= GALLERY ================= */
function Chevron({ dir = "right", className = "" }: { dir?: "left" | "right"; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d={dir === "right" ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const step = useCallback((d: number) => {
    setOpen((cur) => (cur === null ? cur : (cur + d + GALLERY.length) % GALLERY.length));
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-basil-950 text-cream">
      <div className="bg-dots absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full bg-saffron/8 blur-[120px]" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            num="03"
            kicker="галерея"
            tone="light"
            lines={["Снято у нас —", "ничего постановочного"]}
            desc="Пар от свежей пасты, огонь в печи, гирлянды на веранде. Кликайте — фото можно листать, как альбом."
          />
          <Reveal variant="right" className="mb-2 hidden items-center gap-3 text-cream/60 md:flex">
            <span className="font-hand text-2xl text-saffron-300">листайте и кликайте</span>
            <IconArrow className="h-7 w-12 text-saffron" />
          </Reveal>
        </div>

        <div className="mt-12 columns-2 gap-4 sm:gap-5 lg:columns-3">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src + i} delay={(i % 3) * 90} className="mb-4 break-inside-avoid sm:mb-5">
              <figure
                className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-cream/10 bg-basil-900"
                onClick={() => setOpen(i)}
              >
                <div className={g.w > g.h ? "aspect-[4/3]" : "aspect-[3/4]"}>
                  <img
                    src={g.src}
                    alt={g.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-basil-950/85 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute top-3 left-3 -translate-y-2 rounded-full bg-saffron px-3 py-1 font-display text-[10px] font-bold tracking-widest text-ink uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {g.tag}
                </span>
                <figcaption className="absolute right-4 bottom-4 left-4 translate-y-3 font-display text-sm font-medium text-cream opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {g.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>

      {/* лайтбокс */}
      {open !== null && (
        <div
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-basil-950/95 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={GALLERY[open].caption}
        >
          <div className="anim-fadeup relative max-h-[82vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={GALLERY[open].src}
              alt={GALLERY[open].caption}
              className="mx-auto max-h-[72vh] w-auto rounded-xl border border-cream/15 object-contain shadow-2xl"
            />
            <div className="mt-4 flex items-center justify-between gap-4 text-cream">
              <div>
                <p className="font-display text-base font-bold">{GALLERY[open].caption}</p>
                <p className="text-xs tracking-widest text-saffron uppercase">{GALLERY[open].tag}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-display text-sm text-cream/60">
                  {open + 1} / {GALLERY.length}
                </span>
                <button
                  aria-label="Предыдущее фото"
                  onClick={() => step(-1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 transition-all hover:border-saffron hover:text-saffron"
                >
                  <Chevron dir="left" className="h-5 w-5" />
                </button>
                <button
                  aria-label="Следующее фото"
                  onClick={() => step(1)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/25 transition-all hover:border-saffron hover:text-saffron"
                >
                  <Chevron className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
          <button
            aria-label="Закрыть галерею"
            onClick={() => setOpen(null)}
            className="absolute top-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-2xl leading-none text-ink transition-transform hover:rotate-90"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}

/* ================= REVIEWS ================= */
export function Reviews() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const big = useCountUp(4.9, inView, 1600, 1).replace(".", ",");

  return (
    <section id="reviews" className="relative bg-cream text-ink">
      <div className="bg-dots-ink absolute inset-0 opacity-60" aria-hidden="true" />
      <Penne className="absolute top-16 right-[7%] hidden h-8 w-16 -rotate-12 text-tomato/30 lg:block" />
      <Squiggle className="absolute bottom-14 left-[5%] hidden h-8 w-36 text-basil-600/30 lg:block" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHead
              num="04"
              kicker="отзывы"
              tone="dark"
              lines={["Гости говорят", "громче рекламы"]}
            />
            <div ref={ref} className="mt-8 rounded-xl border-2 border-ink/10 bg-ink p-7 text-cream shadow-[0_24px_50px_rgba(34,29,19,0.25)]">
              <div className="flex items-end gap-3">
                <span className="font-display text-7xl leading-none font-black text-saffron">{big}</span>
                <div className="pb-2">
                  <Stars value={5} className="h-5 w-5 text-saffron" />
                  <p className="mt-1 text-xs text-cream/60">из 5 возможных</p>
                </div>
              </div>
              <div className="mt-5 space-y-2.5 border-t border-cream/15 pt-5 text-sm leading-relaxed">
                <p>
                  <b className="font-display text-saffron">2 996</b> оценок и <b className="font-display text-saffron">1 394</b> отзыва
                  на Яндекс Картах
                </p>
                <p>
                  <b className="font-display text-saffron">4.9</b> · 270 оценок в 2ГИС
                </p>
              </div>
              <a
                href={CONTACTS.yandexReviewsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-tomato px-5 py-3 font-display text-xs font-bold tracking-wide text-cream uppercase transition-all duration-300 hover:-translate-y-0.5 hover:bg-tomato-700"
              >
                Все отзывы на картах <IconArrow className="h-5 w-8" />
              </a>
            </div>
          </div>
        </div>

        <div className="grid gap-x-6 gap-y-10 pt-4 sm:grid-cols-2 lg:col-span-8">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={(i % 2) * 110} className={i % 2 ? "sm:translate-y-8" : ""}>
              <article
                className="tape relative h-full rounded-lg border border-ink/10 bg-[#fdf8ea] p-6 shadow-[0_14px_35px_rgba(34,29,19,0.12)] transition-all duration-500 rotate-(--tilt) hover:z-10 hover:rotate-0 hover:shadow-[0_26px_55px_rgba(34,29,19,0.2)]"
                style={{ "--tilt": `${r.tilt}deg` } as React.CSSProperties}
              >
                <Stars value={r.rating} className="h-4 w-4 text-saffron-700" />
                <p className="mt-4 leading-relaxed text-ink/85">«{r.text}»</p>
                <footer className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                  <div>
                    <p className="font-display text-sm font-bold">{r.name}</p>
                    <p className="text-xs text-ink-soft">{r.date}</p>
                  </div>
                  <span className="rounded-full bg-basil-800 px-3 py-1 text-[11px] font-semibold text-cream">{r.source}</span>
                </footer>
              </article>
            </Reveal>
          ))}
          <Reveal delay={150} className="sm:translate-y-8">
            <div
              className="flex h-full flex-col items-start justify-center rounded-lg border-2 border-dashed border-tomato/50 bg-tomato/5 p-6 transition-all duration-500 rotate-[-2deg] hover:rotate-0 hover:border-tomato"
            >
              <p className="font-hand text-3xl leading-tight text-tomato-700">Ваша история — следующая!</p>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Приходите пробовать пасту — и расскажите о ней на Яндекс Картах. Нам правда важно каждое слово.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= EVENTS / БАНКЕТЫ ================= */
export function Events() {
  return (
    <section id="events" className="relative overflow-hidden bg-basil-900 text-cream">
      <div className="bg-stripes-tomato absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute -bottom-40 -right-32 h-[480px] w-[480px] rounded-full bg-tomato/12 blur-[130px]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
        <Reveal variant="left" className="relative">
          <div className="rounded-xl border border-saffron/30 p-3">
            <div className="group overflow-hidden rounded-lg">
              <img
                src={IMG.banquet}
                alt="Банкетный стол в ресторане Макароны"
                className="anim-kenburns aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
          <Stamp
            text="ДО 100 ГОСТЕЙ • СВАДЬБЫ • ЮБИЛЕИ • КОРПОРАТИВЫ •"
            className="absolute -top-10 -right-4 text-saffron sm:-right-8"
            size={132}
          />
          <p className="absolute -bottom-7 left-6 -rotate-3 font-hand text-3xl text-saffron-300">
            своя служба организации праздников
          </p>
        </Reveal>

        <div>
          <SectionHead
            num="05"
            kicker="банкеты и праздники"
            tone="light"
            lines={["Праздник берём", "на себя"]}
            desc="Просторный зал до 100 гостей, панорамная веранда и команда, которая уже сто раз провела «тот самый» вечер. Вам остаются тосты — остальное сделаем мы."
          />
          <div className="mt-10">
            {EVENTS.map((e, i) => (
              <Reveal key={e.title} delay={i * 90}>
                <div className="group flex items-start gap-5 border-b border-cream/12 py-5 transition-all duration-300 hover:border-saffron/60 hover:pl-3">
                  <span className="font-display text-sm font-black text-saffron/70 transition-colors group-hover:text-saffron">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold transition-colors duration-300 group-hover:text-saffron sm:text-2xl">
                      {e.title}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-cream/65">{e.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200} className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href={CONTACTS.phoneEventsHref}
              className="flex items-center gap-3 rounded-full bg-saffron px-7 py-4 font-display text-sm font-bold tracking-wide text-ink uppercase shadow-xl shadow-saffron/25 transition-all duration-300 hover:-translate-y-1 hover:bg-saffron-300"
            >
              <IconPhone className="h-5 w-5" /> {CONTACTS.phoneEvents}
            </a>
            <span className="text-sm leading-snug text-cream/60">
              бронь банкетов ежедневно
              <br />с 09:00 до 22:00
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ================= BOOKING / КОНТАКТЫ ================= */
const inputCls =
  "w-full rounded-lg border border-cream/20 bg-basil-800 px-4 py-3 text-cream placeholder-cream/35 outline-none transition-all duration-300 focus:border-saffron focus:ring-2 focus:ring-saffron/25 [color-scheme:dark]";

export function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", date: "", time: "19:00", guests: "2", note: "" });
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: { name?: string; phone?: string } = {};
    if (form.name.trim().length < 2) errs.name = "Как к вам обращаться?";
    if (form.phone.replace(/\D/g, "").length < 10) errs.phone = "Нужен номер, чтобы подтвердить бронь";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setSent(true);
  };

  return (
    <section id="booking" className="relative bg-cream text-ink">
      <div className="bg-dots-ink absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:py-32">
        <div className="lg:col-span-7">
          <Reveal variant="left">
            <div className="relative overflow-hidden rounded-xl bg-basil-900 p-7 text-cream shadow-[0_35px_70px_rgba(14,33,23,0.35)] sm:p-10">
              <div className="bg-dots absolute inset-0 opacity-40" aria-hidden="true" />
              <div className="relative">
                {!sent ? (
                  <>
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-display text-2xl font-bold sm:text-3xl">Забронировать стол</h3>
                      <Asterisk className="h-8 w-8 text-tomato" />
                    </div>
                    <p className="mt-2 text-sm text-cream/65">
                      Оставьте заявку — перезвоним в течение 15 минут и подберём лучшее место: зал или веранду.
                    </p>
                    <form onSubmit={submit} className="mt-7 grid gap-5 sm:grid-cols-2" noValidate>
                      <div>
                        <label className="mb-1.5 block font-display text-[11px] font-bold tracking-widest text-saffron uppercase" htmlFor="bk-name">
                          Ваше имя *
                        </label>
                        <input
                          id="bk-name"
                          className={inputCls}
                          placeholder="Мария"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        {errors.name && <p className="mt-1.5 text-xs font-medium text-tomato-300">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block font-display text-[11px] font-bold tracking-widest text-saffron uppercase" htmlFor="bk-phone">
                          Телефон *
                        </label>
                        <input
                          id="bk-phone"
                          className={inputCls}
                          placeholder="+7 (900) 000-00-00"
                          inputMode="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                        {errors.phone && <p className="mt-1.5 text-xs font-medium text-tomato-300">{errors.phone}</p>}
                      </div>
                      <div>
                        <label className="mb-1.5 block font-display text-[11px] font-bold tracking-widest text-saffron uppercase" htmlFor="bk-date">
                          Дата
                        </label>
                        <input
                          id="bk-date"
                          type="date"
                          className={inputCls}
                          value={form.date}
                          onChange={(e) => setForm({ ...form, date: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-1.5 block font-display text-[11px] font-bold tracking-widest text-saffron uppercase" htmlFor="bk-time">
                            Время
                          </label>
                          <select id="bk-time" className={inputCls} value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                            {["12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"].map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1.5 block font-display text-[11px] font-bold tracking-widest text-saffron uppercase" htmlFor="bk-guests">
                            Гостей
                          </label>
                          <select id="bk-guests" className={inputCls} value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })}>
                            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "10+"].map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="mb-1.5 block font-display text-[11px] font-bold tracking-widest text-saffron uppercase" htmlFor="bk-note">
                          Пожелания
                        </label>
                        <textarea
                          id="bk-note"
                          rows={3}
                          className={`${inputCls} resize-none`}
                          placeholder="Столик у окна, детский стул, повод — день рождения…"
                          value={form.note}
                          onChange={(e) => setForm({ ...form, note: e.target.value })}
                        />
                      </div>
                      <button
                        type="submit"
                        className="group flex w-full items-center justify-center gap-3 rounded-full bg-tomato py-4 font-display text-sm font-bold tracking-wide text-cream uppercase shadow-lg shadow-tomato/30 transition-all duration-300 hover:-translate-y-0.5 hover:bg-tomato-700 sm:col-span-2"
                      >
                        <IconCar className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                        Отправить заявку
                      </button>
                      <p className="text-center text-xs text-cream/45 sm:col-span-2">
                        Нажимая кнопку, вы соглашаетесь на звонок нашего гостеприимного администратора
                      </p>
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center py-10 text-center">
                    <svg viewBox="0 0 64 64" className="anim-popcheck h-20 w-20 text-saffron">
                      <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="3.5" />
                      <path d="M20 33l8 8 16-17" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <h3 className="mt-6 font-display text-2xl font-bold sm:text-3xl">Заявка принята!</h3>
                    <p className="mt-3 max-w-sm text-cream/70">
                      {form.name.trim() ? `${form.name.trim()}, спасибо!` : "Спасибо!"} Стол на {form.guests}{" "}
                      {form.guests === "1" ? "гостя" : "гостей"}
                      {form.date ? ` · ${new Date(form.date + "T00:00:00").toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}` : ""} в{" "}
                      {form.time}. Перезвоним в течение 15 минут.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({ name: "", phone: "", date: "", time: "19:00", guests: "2", note: "" });
                      }}
                      className="mt-8 rounded-full border border-cream/30 px-6 py-3 font-display text-xs font-bold tracking-wide text-cream uppercase transition-colors hover:border-saffron hover:text-saffron"
                    >
                      Забронировать ещё
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <SectionHead
            num="06"
            kicker="бронь и контакты"
            tone="dark"
            lines={["Столик уже", "накрывают"]}
            desc="Мы в самом центре Краснодара — пять минут прогулки от улицы Красной. Парковка для гостей — вдоль улицы Соколова."
          />
          <div className="mt-10 space-y-6">
            <Reveal delay={80}>
              <a
                href={CONTACTS.yandexUrl}
                target="_blank"
                rel="noreferrer"
                className="group flex items-start gap-4 rounded-xl border-2 border-ink/10 bg-cream-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-tomato/50 hover:shadow-lg"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-tomato text-cream">
                  <IconPin className="h-6 w-6" />
                </span>
                <span>
                  <span className="font-display text-lg font-bold">{CONTACTS.address}</span>
                  <span className="mt-1 flex items-center gap-1.5 text-sm font-medium text-tomato-700">
                    Открыть в Яндекс Картах <IconArrow className="h-4 w-7 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={160}>
              <div className="flex items-start gap-4 rounded-xl border-2 border-ink/10 bg-cream-2 p-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-basil-800 text-cream">
                  <IconClock className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-lg font-bold">Часы работы</p>
                  <div className="mt-2 space-y-1 text-sm">
                    {HOURS.map((h) => (
                      <div key={h.days} className="flex justify-between gap-4 border-b border-ink/8 pb-1 last:border-0">
                        <span className="text-ink-soft">{h.days}</span>
                        <b>{h.time}</b>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <div className="grid gap-4 sm:grid-cols-2">
                <a
                  href={CONTACTS.phoneMainHref}
                  className="group rounded-xl border-2 border-ink/10 bg-cream-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-tomato/50 hover:shadow-lg"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-ink">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-xs font-semibold tracking-widest text-ink-soft uppercase">Бронь столов</p>
                  <p className="mt-1 font-display text-base font-bold transition-colors group-hover:text-tomato">{CONTACTS.phoneMain}</p>
                </a>
                <a
                  href={CONTACTS.phoneEventsHref}
                  className="group rounded-xl border-2 border-ink/10 bg-cream-2 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-tomato/50 hover:shadow-lg"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-saffron text-ink">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-xs font-semibold tracking-widest text-ink-soft uppercase">Банкеты и свадьбы</p>
                  <p className="mt-1 font-display text-base font-bold transition-colors group-hover:text-tomato">{CONTACTS.phoneEvents}</p>
                </a>
              </div>
            </Reveal>
            <Reveal delay={320} className="flex flex-wrap gap-3">
              {[
                { label: "Сайт ресторана", href: CONTACTS.siteUrl },
                { label: "Яндекс Карты", href: CONTACTS.yandexUrl },
                { label: "2ГИС", href: "https://2gis.ru/krasnodar/firm/70000001023373516" },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border-2 border-ink/15 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:border-ink hover:bg-ink hover:text-cream"
                >
                  {l.label} ↗
                </a>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= FOOTER ================= */
export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-basil-950 text-cream">
      <div className="-mx-2 rotate-1">
        <div className="border-y border-ink/20 bg-saffron py-3.5 text-ink sm:py-4">
          <Marquee items={["Ждём вас в гости", "Приходите голодными", "Уходите счастливыми", "Паста всё стерпит"]} dur={30} />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-10 sm:px-8">
        <Reveal variant="zoom">
          <p className="outline-word text-center font-display text-[clamp(2.6rem,11vw,9rem)] leading-none font-black tracking-tight select-none">
            МАКАРОНЫ<span className="text-tomato" style={{ WebkitTextStroke: "0" }}>*</span>
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-cream/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="flex items-center gap-2.5 font-display text-lg font-bold">
              <Asterisk className="h-5 w-5 text-tomato" /> МАКАРОНЫ
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-cream/60">
              Семейный ресторан европейской кухни. Паста ручной работы, пицца из помпейской печи и праздник — каждый день.
            </p>
          </div>
          <div>
            <p className="font-display text-xs font-bold tracking-widest text-saffron uppercase">Разделы</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                ["#about", "О ресторане"],
                ["#menu", "Меню"],
                ["#gallery", "Галерея"],
                ["#reviews", "Отзывы"],
                ["#events", "Банкеты"],
                ["#booking", "Бронь стола"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="text-cream/70 transition-colors hover:text-saffron">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-bold tracking-widest text-saffron uppercase">Контакты</p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li className="flex items-start gap-2">
                <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-tomato-300" /> {CONTACTS.address}
              </li>
              <li>
                <a href={CONTACTS.phoneMainHref} className="transition-colors hover:text-saffron">
                  {CONTACTS.phoneMain}
                </a>
              </li>
              <li>
                <a href={CONTACTS.phoneEventsHref} className="transition-colors hover:text-saffron">
                  {CONTACTS.phoneEvents} — банкеты
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-xs font-bold tracking-widest text-saffron uppercase">Часы работы</p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {HOURS.map((h) => (
                <li key={h.days} className="flex justify-between gap-3">
                  <span>{h.days}</span>
                  <b className="text-cream">{h.time}</b>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-hand text-xl text-saffron-300">кухня открыта до последнего гостя</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-6 text-xs text-cream/45 sm:flex-row">
          <p>© 2026 «Макароны» · семейный ресторан · Краснодар</p>
          <p>
            Фото — архив ресторана ·{" "}
            <a href={CONTACTS.yandexUrl} target="_blank" rel="noreferrer" className="transition-colors hover:text-saffron">
              мы на Яндекс Картах
            </a>
          </p>
          <p>Сделано с любовью к пасте 🍝</p>
        </div>
      </div>
    </footer>
  );
}
