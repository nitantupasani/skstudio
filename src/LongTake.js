import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// THE LONG TAKE — a light, scroll-driven screening of the
// filmography. Rendered below the original Hero: as the hero
// scrolls away the fixed stage fades in, then stills crossfade
// with a slow push-in, grain and letterbox on top. No WebGL,
// no libraries, no gate — just scroll. ~1 MB of images, lazy.
// ============================================================

const media = (file) => `${process.env.PUBLIC_URL || ''}/media/${file}`;

const REELS = [
  {
    slug: 'haalaat',
    stage: 'The Room',
    title: 'Haalaat',
    deva: 'हालात',
    year: '2020',
    meta: 'Documentary · 09 min · Hindi',
    line: 'A film made in lockdown, at home. Thoughts like void in an empty box.',
    still: media('haalaat-still-1.jpg'),
    zoom: 'in',
  },
  {
    slug: 'gadha-ghum-raha-hai',
    stage: 'The Street',
    title: 'gadha ghum raha hai',
    deva: 'गधा घूम रहा है',
    year: '2022',
    meta: 'Fiction · 30 min · Marathi, Hindi',
    line: 'A donkey stands in the middle of a busy street. Palash starts looking.',
    still: media('gadha-ghum-raha-hai-still-1.jpg'),
    zoom: 'out',
  },
  {
    slug: 'baal-diwas',
    stage: 'The Village',
    title: 'Baal Diwas',
    deva: 'बाल दिवस',
    year: '2022',
    meta: 'Fiction · 20 min · Marathi',
    line: 'Gotya plays marbles. Circumstances force him from boy to man.',
    still: media('baal-diwas-still-1.jpg'),
    zoom: 'in',
  },
  {
    slug: 'cycle-of-life',
    stage: 'The Wheel',
    title: 'Cycle of Life',
    deva: 'जीवन चक्र',
    year: '2024',
    meta: 'Documentary · 08:30 min · Marathi',
    line: 'Change, witnessed through an age-old cycle customer in Nagpur.',
    still: media('cycle-of-life-still-1.jpg'),
    zoom: 'out',
  },
  {
    slug: 'anokha-dhaaga',
    stage: 'The Thread',
    title: 'Anokha Dhaaga',
    deva: 'अनोखा धागा',
    year: '2024',
    meta: 'CSR Film · 05:04 min · Hindi',
    line: 'Women in Jamshedpur turning collective support into livelihood.',
    still: media('anokha-dhaaga-still-1.jpg'),
    zoom: 'in',
  },
  {
    slug: 'tragedy-of-commons',
    stage: 'The Commons',
    title: 'Tragedy of the Commons',
    deva: 'सबकी जमीन',
    year: '2024',
    meta: 'Documentary · Hindi, English',
    line: 'Nagpur stands with Ladakh. Why the Sixth Schedule matters.',
    still: media('tragedy-of-commons-still-1.jpg'),
    zoom: 'out',
  },
  {
    slug: 'astitva-ka-tinka',
    stage: 'The Cart',
    title: 'Astitva ka Tinka',
    deva: 'अस्तित्व का तिनका',
    year: '2025',
    meta: 'Documentary · 06:17 min · Hindi',
    line: 'Bharatbhai, at a dabeli cart in Kutch, juggles memories and “what next”.',
    still: media('astitva-ka-tinka-still-1.jpg'),
    zoom: 'in',
  },
  {
    slug: 'nisargavedh',
    stage: 'The Forest',
    title: 'Nisargavedh',
    deva: 'निसर्गवेध',
    year: '2025',
    meta: 'NGO Profile · 18 min · Hindi',
    line: 'Environment and education, with CHIP NGO, Nagpur.',
    still: media('nisargavedh-still-4.jpg'),
    zoom: 'out',
  },
];

// Finale segment appended after the reels.
const FINALE = {
  stage: 'The Edit Room',
  year: '2026',
  deva: 'स्व',
};

const SEG_VH = 130; // scroll length per reel, in vh
const TAIL_VH = 120; // finale segment

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const ease = (t) => t * t * (3 - 2 * t); // smoothstep

// Grain: animated SVG turbulence tile, zero network cost.
const GRAIN_URI = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0"/></filter><rect width="180" height="180" filter="url(%23n)" opacity="0.5"/></svg>'
)}")`;

const LongTakeStyles = () => (
  <style>{`
    .lt-root { background: #060606; color: var(--ink); }
    .lt-stage { position: fixed; inset: 0; overflow: hidden; z-index: 10;
      will-change: opacity; pointer-events: none; }
    .lt-frame { position: absolute; inset: 0; will-change: opacity, transform; }
    .lt-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .lt-frame::after { content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,0.55) 100%); }
    .lt-shade { position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 38%),
                  linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 22%); }
    .lt-grain { position: absolute; inset: -12%; pointer-events: none; opacity: 0.05;
      background-image: ${GRAIN_URI}; animation: ltGrain 0.6s steps(4) infinite; }
    @keyframes ltGrain {
      0% { transform: translate(0,0); } 25% { transform: translate(-3%,2%); }
      50% { transform: translate(2%,-3%); } 75% { transform: translate(-2%,-2%); }
      100% { transform: translate(3%,3%); }
    }
    .lt-bar { position: absolute; left: 0; right: 0; height: 4.2vh; background: #060606; z-index: 4; }
    .lt-caption { position: absolute; left: clamp(1.5rem, 6vw, 7rem); right: clamp(1.5rem, 6vw, 7rem);
      bottom: 11vh; z-index: 5; will-change: opacity, transform; }
    .lt-caption .deva-big { font-size: clamp(2.6rem, 7.5vw, 6.5rem); line-height: 1.15;
      color: rgba(245, 242, 234, 0.94); }
    .lt-caption .en { font-weight: 300; letter-spacing: -0.02em;
      font-size: clamp(1.35rem, 2.6vw, 2.2rem); color: var(--ink-strong); margin-top: 0.35rem; }
    .lt-caption .meta { margin-top: 0.8rem; color: rgba(237,234,227,0.62);
      font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase; }
    .lt-caption .line { margin-top: 0.9rem; max-width: 34rem; color: rgba(237,234,227,0.8);
      font-size: clamp(0.95rem, 1.25vw, 1.08rem); line-height: 1.65; font-weight: 300; }
    .lt-caption .watch { display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1.2rem;
      color: var(--tertiary); font-size: 0.75rem; letter-spacing: 0.28em; text-transform: uppercase;
      text-decoration: none; border-bottom: 1px solid rgba(216,179,107,0.35); padding-bottom: 0.3rem; }
    .lt-caption .watch:hover { border-color: var(--tertiary); }
    .lt-hud { position: fixed; z-index: 12; font-size: 0.68rem; letter-spacing: 0.3em;
      text-transform: uppercase; color: rgba(237,234,227,0.55); user-select: none;
      top: 88px; right: clamp(1.5rem, 4vw, 4rem); text-align: right;
      will-change: opacity; pointer-events: none; }
    .lt-hud .yr { color: var(--ink-strong); font-size: 1.05rem; letter-spacing: 0.12em; }
    .lt-rail { position: fixed; right: clamp(0.9rem, 2.2vw, 2rem); top: 50%; transform: translateY(-50%);
      z-index: 12; display: flex; flex-direction: column; gap: 0.9rem; will-change: opacity; }
    .lt-rail button { width: 26px; height: 26px; display: grid; place-items: center;
      background: none; border: 0; cursor: pointer; padding: 0; }
    .lt-rail i { width: 5px; height: 5px; border-radius: 50%; background: rgba(237,234,227,0.4);
      transition: all 300ms ease; }
    .lt-rail button.on i { background: var(--tertiary); transform: scale(1.7); }
    .lt-rail button:hover i { background: var(--ink-strong); }
    .lt-finale { position: absolute; inset: 0; z-index: 5; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
      will-change: opacity; padding: 2rem; }
    .lt-finale .deva-mark { font-size: clamp(4rem, 10vw, 8rem); color: var(--tertiary); opacity: 0.9; }
    .lt-finale h2 { font-size: clamp(1.8rem, 4.2vw, 3.2rem); font-weight: 300;
      letter-spacing: -0.02em; color: var(--ink-strong); margin-top: 1.6rem; }
    .lt-finale p { margin-top: 1rem; color: rgba(237,234,227,0.6); max-width: 30rem;
      line-height: 1.7; font-weight: 300; }
    .lt-finale .row { margin-top: 2.6rem; display: flex; gap: 2.4rem; flex-wrap: wrap; justify-content: center; }
    .lt-finale a { color: var(--tertiary); font-size: 0.72rem; letter-spacing: 0.3em;
      text-transform: uppercase; text-decoration: none;
      border-bottom: 1px solid rgba(216,179,107,0.35); padding-bottom: 0.35rem; }
    .lt-finale a:hover { border-color: var(--tertiary); }
    @media (prefers-reduced-motion: reduce) {
      .lt-grain { animation: none; }
    }
  `}</style>
);

export default function LongTake() {
  const total = REELS.length; // finale rides on the tail segment
  const [active, setActive] = useState(0);
  const frameRefs = useRef([]);
  const captionRefs = useRef([]);
  const stageRef = useRef(null);
  const hudRef = useRef(null);
  const railRef = useRef(null);
  const finaleRef = useRef(null);
  const smoothed = useRef(-1);

  const segPx = () => (window.innerHeight * SEG_VH) / 100;
  const heroPx = () => window.innerHeight; // hero above is min-h-screen
  const scrollHeight = useMemo(() => `${total * SEG_VH + TAIL_VH}vh`, [total]);

  // Preload: first frame immediately, the rest shortly after mount.
  useEffect(() => {
    const first = new Image();
    first.src = REELS[0].still;
    const t = setTimeout(() => {
      REELS.slice(1).forEach((r) => { const img = new Image(); img.src = r.still; });
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  // The engine: one rAF loop drives every frame/caption via direct style
  // writes; React state only changes on discrete act boundaries. Progress
  // is measured from the bottom of the hero, so p = 0 means reel one.
  useEffect(() => {
    let raf;
    const tick = () => {
      const target = (window.scrollY - heroPx()) / segPx();
      smoothed.current += (target - smoothed.current) * 0.09;
      const p = smoothed.current;

      // Stage (and HUD/rail) fade in while the hero scrolls away.
      const on = ease(clamp01((p + 0.55) / 0.45));
      if (stageRef.current) {
        stageRef.current.style.opacity = on.toFixed(3);
        stageRef.current.style.visibility = on <= 0.001 ? 'hidden' : 'visible';
        stageRef.current.style.pointerEvents = on > 0.6 ? 'auto' : 'none';
      }
      if (hudRef.current) hudRef.current.style.opacity = on.toFixed(3);
      if (railRef.current) {
        railRef.current.style.opacity = on.toFixed(3);
        railRef.current.style.pointerEvents = on > 0.6 ? 'auto' : 'none';
      }

      const idx = Math.min(total, Math.max(0, Math.floor(p + 0.5)));
      setActive((prev) => (prev === idx ? prev : idx));

      REELS.forEach((r, i) => {
        const el = frameRefs.current[i];
        if (!el) return;
        const local = p - i; // 0 = fully this act
        const vis = 1 - clamp01(Math.abs(local) - 0.18) / 0.62;
        const o = ease(clamp01(vis));
        el.style.opacity = o.toFixed(3);
        el.style.visibility = o <= 0.001 ? 'hidden' : 'visible';
        const t = clamp01((local + 1) / 2); // 0..1 across its life
        const s = r.zoom === 'in' ? 1.02 + 0.07 * (1 - t) : 1.02 + 0.07 * t;
        el.style.transform = `scale(${s.toFixed(4)})`;

        const cap = captionRefs.current[i];
        if (cap) {
          const co = ease(clamp01(1 - Math.abs(local) / 0.42));
          cap.style.opacity = co.toFixed(3);
          cap.style.transform = `translateY(${(14 * (1 - co)).toFixed(1)}px)`;
          cap.style.filter = `blur(${(4 * (1 - co)).toFixed(1)}px)`;
          cap.style.pointerEvents = co > 0.5 ? 'auto' : 'none';
        }
      });

      if (finaleRef.current) {
        const local = p - total;
        const fo = ease(clamp01(1 + local / 0.7));
        finaleRef.current.style.opacity = fo.toFixed(3);
        finaleRef.current.style.pointerEvents = fo > 0.5 ? 'auto' : 'none';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total]);

  const jumpTo = (i) => window.scrollTo({ top: heroPx() + i * segPx(), behavior: 'smooth' });

  const current = active < total ? REELS[active] : FINALE;

  return (
    <div className="lt-root" style={{ height: scrollHeight }}>
      <LongTakeStyles />

      <div className="lt-stage" ref={stageRef} style={{ opacity: 0 }}>
        {REELS.map((r, i) => (
          <div
            key={r.slug}
            className="lt-frame"
            ref={(el) => { frameRefs.current[i] = el; }}
            style={{ opacity: 0 }}
          >
            <img src={r.still} alt="" loading={i === 0 ? 'eager' : 'lazy'} draggable={false} />
          </div>
        ))}
        <div className="lt-shade" />
        <div className="lt-grain" />
        <div className="lt-bar" style={{ top: 0 }} />
        <div className="lt-bar" style={{ bottom: 0 }} />

        {REELS.map((r, i) => (
          <div
            key={`cap-${r.slug}`}
            className="lt-caption"
            ref={(el) => { captionRefs.current[i] = el; }}
            style={{ opacity: 0 }}
          >
            <div className="eyebrow" style={{ color: 'var(--tertiary)', marginBottom: '0.9rem' }}>
              {r.stage}
            </div>
            <div className="deva deva-big">{r.deva}</div>
            <div className="en">{r.title}</div>
            <div className="meta">{r.year} · {r.meta}</div>
            <p className="line">{r.line}</p>
            <Link className="watch" to={`/films/${r.slug}`}>Watch the film →</Link>
          </div>
        ))}

        <div className="lt-finale" ref={finaleRef} style={{ opacity: 0 }}>
          <div className="deva deva-mark">{FINALE.deva}</div>
          <h2>The next film is being cut.</h2>
          <p>
            Six years, eight films, one pair of hands. 2026: Indian Aesthetics at
            Jnanpravaha, a new documentary in the edit.
          </p>
          <div className="row">
            <Link to="/#films">All films</Link>
            <Link to="/#contact">Write to Swanand</Link>
            <Link to="/">Back to the index</Link>
          </div>
        </div>
      </div>

      <div className="lt-hud" ref={hudRef} style={{ opacity: 0 }}>
        <div className="yr">{current.year}</div>
        <div style={{ marginTop: '0.3rem' }}>
          {active < total
            ? `Reel ${String(active + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')} · ${current.stage}`
            : current.stage}
        </div>
      </div>

      <nav className="lt-rail" ref={railRef} aria-label="Reels" style={{ opacity: 0 }}>
        {REELS.map((r, i) => (
          <button
            key={r.slug}
            className={active === i ? 'on' : ''}
            onClick={() => jumpTo(i)}
            aria-label={`${r.title}, ${r.year}`}
            title={`${r.title} · ${r.year}`}
          >
            <i />
          </button>
        ))}
        <button
          className={active >= total ? 'on' : ''}
          onClick={() => jumpTo(total)}
          aria-label="The edit room"
          title="The Edit Room · 2026"
        >
          <i />
        </button>
      </nav>
    </div>
  );
}
