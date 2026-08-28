import { useId, type CSSProperties, type ReactNode } from "react";
import { useInView } from "./hooks";

/* ============ Scroll reveal wrapper ============ */
export function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  variant?: "up" | "left" | "right" | "zoom";
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "figure";
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const v = variant === "up" ? "" : ` rv-${variant}`;
  return (
    <Tag
      ref={ref as never}
      className={`rv${v}${inView ? " rv-in" : ""} ${className}`}
      style={{ "--rv-d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/* ============ Line-mask reveal для заголовков ============ */
export function MaskText({
  lines,
  className = "",
  step = 110,
  as: Tag = "h2",
  delay = 0,
}: {
  lines: ReactNode[];
  className?: string;
  step?: number;
  as?: "h1" | "h2" | "h3" | "p" | "div";
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <Tag ref={ref as never} className={`${inView ? "mask-in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span className="mask-line" key={i}>
          <span style={{ "--ml-d": `${delay + i * step}ms` } as CSSProperties}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/* ============ Бегущая строка ============ */
export function Marquee({
  items,
  className = "",
  dur = 34,
  separator,
}: {
  items: string[];
  className?: string;
  dur?: number;
  separator?: ReactNode;
}) {
  const sep = separator ?? <Asterisk className="h-[0.9em] w-[0.9em] shrink-0 opacity-80" />;
  return (
    <div className={`marquee ${className}`}>
      <div className="marquee-track" style={{ "--marquee-dur": `${dur}s` } as CSSProperties}>
        {[0, 1].map((dup) => (
          <div key={dup} aria-hidden={dup === 1} className="flex shrink-0 items-center">
            {items.map((it, i) => (
              <span key={i} className="flex items-center gap-5 pr-5 whitespace-nowrap sm:gap-7 sm:pr-7">
                <span className="font-display text-sm font-medium tracking-wide uppercase sm:text-base">{it}</span>
                {sep}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============ Звёзды рейтинга ============ */
export function Stars({ value, className = "h-4 w-4" }: { value: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Рейтинг ${value} из 5`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" className={className} aria-hidden="true">
          <path
            d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"
            fill={i < Math.round(value) ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
            opacity={i < Math.round(value) ? 1 : 0.35}
          />
        </svg>
      ))}
    </span>
  );
}

/* ============ Вращающаяся печать ============ */
export function Stamp({
  text,
  className = "",
  size = 130,
}: {
  text: string;
  className?: string;
  size?: number;
}) {
  const id = useId();
  return (
    <div className={`anim-spin-slow ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <path id={id} d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" fill="none" />
        </defs>
        <circle cx="100" cy="100" r="97" fill="currentColor" opacity="0.12" />
        <circle cx="100" cy="100" r="52" fill="currentColor" opacity="0.16" />
        <text fontSize="11" letterSpacing="1.3" className="font-display" fill="currentColor" fontWeight="500">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
        <g transform="translate(100,100)" fill="currentColor">
          <path d="M-20,6 C-12,-10 12,-10 20,6 C12,0 -12,0 -20,6 Z" opacity="0.9" />
          <path d="M-24,-2 C-14,-18 14,-18 24,-2 C14,-9 -14,-9 -24,-2 Z" opacity="0.6" />
          <path d="M-15,14 C-8,4 8,4 15,14 C8,9 -8,9 -15,14 Z" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
}

/* ============ Рукописные декоративные глифы ============ */
export function Asterisk({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <path d="M12 3v18M4.2 7.5l15.6 9M19.8 7.5l-15.6 9" />
      </g>
    </svg>
  );
}

export function Farfalle({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 64 40" className={className} style={style} aria-hidden="true">
      <g fill="currentColor" opacity="0.92">
        <path d="M2 6 L7 11 L2 15 L7 20 L2 25 L7 29 L2 34 L21 27 L21 13 Z" />
        <path d="M62 6 L57 11 L62 15 L57 20 L62 25 L57 29 L62 34 L43 27 L43 13 Z" />
        <rect x="26" y="12" width="12" height="16" rx="4" />
      </g>
    </svg>
  );
}

export function Penne({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 64 26" className={className} style={style} aria-hidden="true">
      <path d="M10 22 46 2l10 4-36 20z" fill="currentColor" opacity="0.9" />
      <path d="M14 18 46 4" stroke="rgba(14,33,23,0.35)" strokeWidth="2" />
      <path d="M22 20 50 6" stroke="rgba(14,33,23,0.2)" strokeWidth="2" />
    </svg>
  );
}

export function Squiggle({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 120 24" className={className} style={style} aria-hidden="true">
      <path
        d="M2 16 C12 2 22 2 32 14 S52 26 62 12 82 0 92 12 112 24 118 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ============ Сюжетные иконки (ручная отрисовка) ============ */
const st = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function IconNest({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g {...st}>
        <path d="M4 21c4-6 8-6 12 0s8 6 12 0" />
        <path d="M4 15c4-6 8-6 12 0s8 6 12 0" />
        <path d="M7 27c3.5-4.5 7.5-4.5 11 0s7.5 4.5 11 0" transform="translate(-2,-1) scale(0.98)" />
        <circle cx="9" cy="7" r="2.4" />
        <circle cx="17" cy="5.5" r="2" />
      </g>
    </svg>
  );
}

export function IconFlame({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g {...st}>
        <path d="M16 3c1 5 7 7.5 7 14a7 7 0 0 1-14 0c0-3 1.5-5 3-7 .5 2 1.5 3 3 3.5C14 10 14 6 16 3z" />
        <path d="M16 27a3.5 3.5 0 0 0 3.5-3.5c0-2.5-3.5-4-3.5-6 0 2-3.5 3.5-3.5 6A3.5 3.5 0 0 0 16 27z" />
      </g>
    </svg>
  );
}

export function IconFamily({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g {...st}>
        <circle cx="11" cy="9" r="4" />
        <path d="M4 27c0-5 3-8 7-8s7 3 7 8" />
        <circle cx="23" cy="13" r="3" />
        <path d="M18.5 27c0-3.8 2-6.5 4.5-6.5s4.5 2.7 4.5 6.5" />
      </g>
    </svg>
  );
}

export function IconBalloon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g {...st}>
        <path d="M16 3a7 7 0 0 1 7 7c0 4.5-3 8-7 8s-7-3.5-7-8a7 7 0 0 1 7-7z" />
        <path d="M14.5 18l1.5 3 1.5-3" />
        <path d="M16 21c-2 2.5 2 3.5 0 6.5" />
      </g>
    </svg>
  );
}

export function IconVeranda({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g {...st}>
        <circle cx="22" cy="8" r="3.5" />
        <path d="M22 2.5v-1M27.5 8h1M26 4l.8-.8M3 14l13-5 13 5" />
        <path d="M5 14v13M12 12.6V27M20 12.6V27M27 14v13M3 27h26" />
      </g>
    </svg>
  );
}

export function IconOven({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g {...st}>
        <path d="M4 27V16a12 12 0 0 1 24 0v11" />
        <path d="M2 27h28" />
        <path d="M10 27v-6a6 6 0 0 1 12 0v6" />
        <path d="M16 18.5c.5 2 2.5 2.6 2.5 5a2.5 2.5 0 0 1-5 0c0-1.5.8-2.3 1.4-3 .2.8.6 1.2 1.1 1.4z" />
      </g>
    </svg>
  );
}

export function IconCar({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <g {...st}>
        <path d="M2 19V9a2 2 0 0 1 2-2h13v12" />
        <path d="M17 12h6l4 5v2h-2" />
        <circle cx="9" cy="22" r="3" />
        <circle cx="22" cy="22" r="3" />
        <path d="M12 22h7M2 22h4M25 22h5v-3" />
        <path d="M6 11h6" />
      </g>
    </svg>
  );
}

export function IconPin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...st}>
        <path d="M12 21s-7-6.4-7-11.5A7 7 0 0 1 12 2.5a7 7 0 0 1 7 7C19 14.6 12 21 12 21z" />
        <circle cx="12" cy="9.5" r="2.6" />
      </g>
    </svg>
  );
}

export function IconPhone({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M5 4h4l1.5 4.5-2.2 1.8a13 13 0 0 0 5.4 5.4l1.8-2.2L20 15v4a2 2 0 0 1-2.2 2A16.8 16.8 0 0 1 3 6.2 2 2 0 0 1 5 4z"
        {...st}
      />
    </svg>
  );
}

export function IconClock({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...st}>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </g>
    </svg>
  );
}

export function IconArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" className={className} aria-hidden="true">
      <g {...st} strokeWidth="2">
        <path d="M2 17C10 8 20 6 42 10" />
        <path d="M35 4l8 6-9 4" />
      </g>
    </svg>
  );
}

export function IconFork({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <g {...st}>
        <path d="M8 2v7a3 3 0 0 0 3 3v10" />
        <path d="M5 2v5M11 2v5M14 9h4l-1 13" />
        <path d="M18 2c1.5 1 2 3.5 2 7h-4" />
      </g>
    </svg>
  );
}

/* ============ Заголовок секции ============ */
export function SectionHead({
  num,
  kicker,
  lines,
  tone = "light",
  className = "",
  desc,
}: {
  num: string;
  kicker: string;
  lines: ReactNode[];
  tone?: "light" | "dark";
  className?: string;
  desc?: ReactNode;
}) {
  const ink = tone === "dark";
  return (
    <div className={className}>
      <Reveal className="mb-5 flex items-center gap-3">
        <span
          className={`font-display text-xs font-bold tracking-[0.22em] uppercase ${ink ? "text-saffron" : "text-tomato"}`}
        >
          {num} — {kicker}
        </span>
        <span className={`h-px flex-1 max-w-24 ${ink ? "bg-cream/25" : "bg-ink/20"}`} />
      </Reveal>
      <MaskText
        lines={lines}
        as="h2"
        className={`font-display font-bold tracking-tight text-[clamp(1.9rem,4.6vw,3.6rem)] leading-[1.04] ${
          ink ? "text-cream" : "text-ink"
        }`}
      />
      {desc && (
        <Reveal delay={200} className="mt-5 max-w-xl">
          <p className={`text-base leading-relaxed sm:text-lg ${ink ? "text-cream/75" : "text-ink-soft"}`}>{desc}</p>
        </Reveal>
      )}
    </div>
  );
}
