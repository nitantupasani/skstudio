# Swanand Kottewar — Studio Design Plan
## Comprehensive Direction for a State-of-the-Art Filmmaker / Photographer Portfolio

> *“Films help me build a worldview and give a voice to express. My films have stemmed from either a personal emotion or a quest about the surroundings.”*
> — Swanand Kottewar, **about**

> *“Absurdity is not the opposite of meaning. It is the residue of meaning that did not fit.”*
> — Swanand Kottewar, **On Absurdity**

> *Post-note from `instructions.txt`:*
> *“Circular motifs in the homepage and later. Like a circle, which follows another circle with a click.”*

---

## 0. Manifesto

This site is not a portfolio. It is a **slow cinema in the browser** — a long, observed walk through a body of work that began in a Mumbai college classroom, passed through a locked-down Auroville room, a donkey on a Nagpur street, a 13-year-old dog named Chikoo, a dabeli cart in Kutch, and the long quiet of an editing room.

The brief from `instructions.txt` is plain: show films, photographs and writing, with a circle that follows another circle on click, a Devanagari **स्व** as icon, and a tone rooted in observation and reflection.

Our answer is to take that plainness as scripture, and build around it the kind of WebGL-grade craft normally seen only in **Locomotive, Active Theory, Resn, Hello Monday, Hi-ReS!, Oh Studio, Studio Mesh** work — but slowed down, quieted, and turned inwards. The site’s 3D layer is not “3D for 3D’s sake”. It is a **lens**, a **darkroom**, a **room**, a **frame**, a **donkey** — each a metaphor pulled from Swanand’s own grammar.

If a viewer leaves with the feeling of having sat through a small documentary instead of clicked through a website, we have done our job.

---

## 1. Foundational Principles

### 1.1 The Five Pillars (drawn from the work itself)

| # | Pillar | Source in `instructions.txt` | Site translation |
|---|--------|------------------------------|------------------|
| 1 | **Stillness** | *Haalaat* — “caught up in stillness… thoughts like void in an empty box” | Long animation durations (900–1400ms), deliberate pacing, generous negative space |
| 2 | **Observation** | *Cycle of Life* — “intimate exploration of change witnessed through the life of Umesh Sarate” | Camera-like cursor, slow zooms, no auto-play; the viewer must look |
| 3 | **Circulation** | Post-notes — “circle which follows another circle with a click” + *Cycle of Life* | Circular motifs at every scale; route changes as orbital transitions |
| 4 | **Absurdity** | *On Absurdity* — “absurd as a working method… not as despair, but as a tool for staying honest” | One unexpected, slightly-broken element per page; the donkey easter egg; a misspelling that fixes itself |
| 5 | **Reflection** | The about page — *“filmmaking as storytelling rooted in observation and reflection”* | Mirror finishes, water-like shaders, doubled type, journal pages |

These five are the only **non-negotiables**. Every page must answer how it expresses each of them.

### 1.2 Rasa — Indian Aesthetic Anchor

Swanand is studying **Diploma in Indian Aesthetics at Jnanpravaha, Mumbai (2026)**. We honour that by mapping each major page to a *rasa* (the eight/nine classical emotional tones from the *Nāṭyaśāstra*). This is not theme-park dressing; it’s a content-shaping rule.

| Page | Rasa | Felt as |
|------|------|---------|
| Index / Hero | **Śānta** (peace) | Suspended dust, soft entry |
| Films | **Adbhuta** (wonder) | The reel revealed |
| Film Detail | **Karuṇa** (compassion) | Inhabited frames |
| Photographs (index) | **Vibhatsa → Śṛṅgāra**¹ | Disquiet that resolves into intimacy |
| Photo Series | **Śṛṅgāra** (love / aesthetic delight) | Surface, touch, light |
| Words | **Vīra → Hāsya** | Quiet courage with a twitch of comedy |
| About | **Karuṇa + Śānta** | Tender quiet |
| Contact | **Adbhuta** (wonder) | An aperture opening |
| Donkey Loop *(hidden)* | **Hāsya** (laughter) | The absurd let loose |

¹ *Vibhatsa* (the disquieting) is a deliberate choice — photography as residue, archive, missing tooth — before the series itself resolves into beauty.

### 1.3 Absurdism as Method

Borrowing from Camus (*Sisyphus*), Beckett (*Endgame*), Kafka (*Investigations of a Dog*), and Swanand’s own writing on absurdity, we install **one structurally surprising element per page**. Never as a gag. Always as a quiet wink.

Concrete examples (per page below):
- A donkey that occasionally walks across the films grid (gadha ghum raha hai homage).
- A misspelled word in About that auto-corrects itself when the user looks at it (IntersectionObserver).
- A photo in the photographs index that develops in real time (chemical-bath shader) the longer you stay on the page.
- The Devanagari स्व motif that occasionally winks (one closing eyelid frame, every ~60 seconds).
- A cursor circle that, once a session, briefly leaves the page and returns from the other side.

### 1.4 The Circle as Master Metaphor

Per the post-note: *“circle which follows another circle with a click.”* We make this the **navigation grammar** of the site:

- **Cursor** = a small circle (10–14px) that follows the pointer with spring physics.
- **Hover** = a larger circle (44–80px) that orbits/scales over interactive elements.
- **Click** = a third circle expands from the click point, becomes the route transition.
- **Route change** = the third circle fills the screen, the next page is unveiled inside it (clip-path circle reveal, in 3D space).

This single mechanic ties every page together and is felt subliminally — exactly the kind of detail that elevates a portfolio from “nice” to **studio-grade signature**.

---

## 2. Visual System

### 2.1 Color (extending current dark theme)

Each page may **tint** the base palette toward a single warm/cool axis tied to its rasa, while keeping the master swatch intact.

| Token | Hex | Use |
|-------|-----|-----|
| `base` | `#0A0A0A` | Default canvas |
| `surface` | `#111110` | Section depth |
| `surface2` | `#161614` | Card / nested |
| `ink` | `#EDEAE3` | Primary type |
| `ink2` | `#C9C2B5` | Secondary type |
| `muted` | `#8A8680` | Tertiary type |
| `rule` | `#1F1E1B` | Hairlines |
| `accent.amber` | `#C99E5B` | Films page tint (lockdown lamp) |
| `accent.cyan` | `#5B96A7` | Photographs (silver gelatin) |
| `accent.cream` | `#E8DFC9` | Words (paper) |
| `accent.dust` | `#7A6F5F` | About (room dust) |
| `accent.crimson` | `#8C3D2E` | Donkey loop (sun, brick) |

Tints are applied as **8–12% gradient washes** over the base, never as solid swaps. Dark mode is default; a future light mode is planned but out of scope here.

### 2.2 Type System

Already simplified to a single family. We extend it conservatively for cinematic moments.

| Role | Family | Weight | Style |
|------|--------|--------|-------|
| Display | Inter Tight | 200–300 | Tight tracking `-0.035em` |
| Body | Inter Tight | 400 | Default tracking |
| Caption / eyebrow | Inter Tight | 500 | `0.32em` tracking, uppercase |
| Devanagari accent | Noto Serif Devanagari | 400–500 | Used as silent narrator |
| Hand / journal *(new, optional)* | **Reenie Beanie** OR **Caveat** | 400 | For diary pages and margin notes |
| Mono *(rare)* | **JetBrains Mono** | 400 | Frame counters, runtime metadata |

**Rule**: never more than three families on screen at once. Devanagari + sans + (optional) hand. No sans + serif mixing.

### 2.3 Motion Vocabulary

| Token | Curve | Duration | Use |
|-------|-------|----------|-----|
| `quiet-in` | `cubic-bezier(0.16, 1, 0.3, 1)` | 900–1300ms | Reveals, content fade |
| `quiet-out` | `cubic-bezier(0.7, 0, 0.84, 0)` | 600ms | Exits |
| `cinema` | `cubic-bezier(0.65, 0, 0.35, 1)` | 1400–1800ms | Page-level transitions |
| `spring-soft` | spring (stiffness 120, damping 26) | — | Cursor follow, hover orbits |
| `spring-firm` | spring (stiffness 220, damping 22) | — | Card lifts, press feedback |
| `breath` | sine, 6s loop | infinite | Idle elements (the master circle) |

**Hard rule**: nothing under 150ms (feels twitchy), nothing over 1800ms (feels broken). Reduced-motion replaces every transform/filter animation with cross-fade.

### 2.4 3D Tooling Stack

| Layer | Library | Purpose |
|-------|---------|---------|
| Renderer | **three.js** | Base WebGL |
| React glue | **@react-three/fiber** | Declarative scenes |
| Helpers | **@react-three/drei** | OrbitControls, useGLTF, Float, Text, MeshTransmissionMaterial |
| Postprocess | **@react-three/postprocessing** | Bloom, DepthOfField, ChromaticAberration, Noise |
| Physics *(donkey loop)* | **@react-three/rapier** | Cheap 2D-ish physics |
| Smooth scroll | **lenis** (or `@studio-freight/react-lenis`) | The single most important "feel" library |
| Scroll-tied tweens | **GSAP + ScrollTrigger** | Pin sections, scrub camera dollies |
| Cinematic sequencing | **Theatre.js** (optional, hero only) | Hand-keyframed camera moves |
| Vector morph | **Rive** (optional, donkey loop) | Cheap 2D animation, runtime-tweakable |
| Sound | **howler.js** *(muted by default, toggleable)* | Ambient + UI |
| Variable shaders | hand-written GLSL via `shaderMaterial` | Dissolve, displacement, dust |

Bundle strategy: each route owns its 3D bundle, lazy-loaded via `React.lazy` + Suspense fallback (the cursor circle becomes the spinner). Mobile fallbacks are 2D CSS in every case.

### 2.5 Performance Budget

| Metric | Target |
|--------|--------|
| Initial HTML + critical CSS + base JS | ≤ 80 kB gz |
| Per-route 3D bundle | ≤ 120 kB gz, lazy |
| LCP (mobile, 4G) | ≤ 2.5s |
| INP | ≤ 200 ms |
| CLS | ≤ 0.05 |
| GPU frame budget | 16 ms (60 fps); fallback to 30 fps cap on `navigator.deviceMemory < 4` |
| DPR cap | `Math.min(window.devicePixelRatio, 1.5)` |
| Texture max | 2048 px on desktop, 1024 px on mobile |
| Postprocessing | Off below 1024 px viewport |

Mobile rule: **the 3D layer must degrade to a great-looking 2D site, not a broken one**. Each scene below ships its mobile fallback explicitly.

---

## 3. Page Designs

> Numbering uses the slug structure already shipped. Each page below answers: **Concept · Layout · 3D Animation · Interaction · Sound · Easter Egg · Performance Mode**.

---

### 3.1 `/` — Index / Hero
#### *स्वर (Swara) — The Resonant Note*

**Rasa**: Śānta (peace, stillness)
**Source anchor**: post-notes circle motif + *Haalaat* lockdown stillness.

#### Concept
The viewer arrives in an empty room — a dust-lit, almost-black space with a single suspended circle of light. As they move, the circle responds. As they scroll, the room *opens*: more circles appear, drift apart, and reveal the work.

This is **not** a particle field. It is a **slow chamber** of orbiting light forms — like the mote you see in a beam of afternoon sun through a closed shutter.

#### Layout
- Full-bleed canvas behind centered hero copy (existing letter-cascade name).
- Above the fold: name, eyebrow, scroll cue.
- Below the fold (post-scroll, same canvas): four large gateway circles for **Films · Photographs · Words · About** — each a different rendered material.

#### 3D Animation Spec

```
SCENE: A dark cubic room (no walls drawn; perceived through fog & DOF).
LIGHT: One key (warm 3200K, low intensity 0.6), one fill (cool 5600K, 0.15).
FOG: Custom shader, density 0.03, color matches base.

OBJECTS (10–14 spheres total):
  - 1 hero sphere: MeshTransmissionMaterial (glass), 1.2 unit radius, slow Y-rotation
  - 6 small motes: emissive, additive, drifting on perlin noise paths
  - 4 gateway spheres (revealed on scroll):
      - Films: matte amber w/ subtle cinema-grain shader
      - Photographs: silver-gelatin fresnel
      - Words: porcelain white w/ paper-fiber displacement
      - About: dust-velvet (anisotropic)

CURSOR INFLUENCE:
  Hero sphere has a Vec2 uniform `uMouse`; surface deforms ~0.4u toward cursor
  via vertex shader (sphere "leans" — never breaks contact).

SCROLL SEQUENCE (Theatre.js):
  0%   camera at z=8, looking at hero sphere
  30%  camera dollies forward to z=4, hero sphere orbits offscreen-left
  60%  4 gateway spheres ease into formation (lerp from offscreen origins)
  100% camera pulls back, gateways aligned in 2x2 grid

POSTPROCESSING:
  Bloom (luminanceThreshold 0.85, intensity 0.6)
  DepthOfField (focusDistance 0.018, focalLength 0.04)
  Noise (premultiply, opacity 0.06)  // film grain
```

#### Interaction
- **Cursor** = primary 12px circle + secondary 64px halo with 200ms lag (the “circle-follows-circle”).
- Hover hero sphere → it pulses gently (`breath` token, scaled by audio amplitude if sound on).
- Hover gateway → the corresponding name fades in floating below (Devanagari first, Roman after, 200ms stagger).
- Click gateway → click-circle expands from cursor, fills screen (clip-path circle), route changes inside the circle.

#### Sound (optional, off by default)
- Ambient drone, 60 BPM, in F minor (Haalaat has a quiet F-minor poem segment).
- Cursor over a sphere → very soft chime, pitch maps to sphere index.
- Sound toggle is a tiny `◐ / ◯` glyph in nav.

#### Easter Egg (Absurdism seed)
Once every ~60 seconds, the **hero sphere blinks** — a 100ms eyelid swipe across its diameter. Most users will never see it. Some will. The site does not explain it.

#### Performance Mode (mobile / reduced-motion)
- Static SVG of three concentric circles, fading in via CSS.
- Cursor reverts to OS default.
- Scroll-revealed gateway tiles become a 2x2 grid of 2D images.

---

### 3.2 `/films` *(home anchor `#films`)* — Films Index
#### *चक्र (Chakra) — The Reel of Reels*

**Rasa**: Adbhuta (wonder)
**Source anchor**: filmography listing in `instructions.txt`; the cycle in *Cycle of Life*.

#### Concept
A horizontal **filmstrip** that the viewer scrolls through — but rendered as a **3D ring**, like a strip of celluloid bent into a wheel. Each film is one frame on the ring. The viewer sits at the centre. To scroll is to turn the wheel. The current film is whichever frame is closest to camera.

This is the post-notes “circle that follows a circle” at architectural scale: the entire films section is a circle that the user controls with another (the scroll wheel).

#### Layout
- Pin the section for ~6× viewport-height of scroll (GSAP ScrollTrigger).
- Centre: 3D ring of 10 film “frames”, each a textured plane with the film’s poster.
- Foreground: large display text at the top showing the focused film’s title; eyebrow lock-up below shows type · year · runtime · language.
- Right edge: small Devanagari letter (the film’s `titleDeva`) that morphs as the ring turns.

#### 3D Animation Spec

```
GEOMETRY: 10 planes arranged on a torus path, radius 4.5
EACH PLANE:
  - Mesh: PlaneGeometry (1.2 x 1.6)
  - Material: ShaderMaterial w/ poster texture
      - Uniforms: uFocus (0..1), uGrain, uTime
      - When focused: full color, sharpness 1.0
      - When unfocused: desaturated 0.7, grain +30%, slight blur via mip-bias

CAMERA: Perspective, FOV 45, fixed at ring centre
SCROLL: scrubs ring rotation -360°, with ease ‘cinema’

ON FRAME FOCUS (the plane closest to camera):
  - Film grain shader pulses (sin wave, amplitude 0.04)
  - Title text above ring crossfades to focused film’s title
  - Devanagari letter morphs (SVG MorphSVG via GSAP)

LIGHTING: One spotlight angled at front plane only;
ambient 0.1; back planes fade into base color.
```

#### Interaction
- Scroll = rotate ring.
- Click focused frame → click-circle expands, transitions to `/films/:slug`.
- Hover off-axis frame → that frame leaves the ring and floats forward (`spring-firm`), becomes focused; ring re-balances.
- Keyboard: `←/→` rotate ring one frame at a time.

#### Sound
- Per scroll-detent, a **mechanical projector tick** — single sample, < 80 ms.
- A faint reel-spin loop fades in only while ring is rotating.

#### Easter Egg (Absurdism seed)
At an unpredictable scroll position (≈ once per session), a **2D donkey** (the gadha from *gadha ghum raha hai*) walks across the bottom of the screen, in front of the 3D ring, from right to left, takes 4–5 seconds, and exits. He may stop, look at the camera, then continue. He is hand-drawn (Rive). He has a name. We do not say his name on the site.

#### Performance Mode (mobile / reduced-motion)
- The ring becomes the existing flat 4-column grid.
- The donkey still walks, just as 2D. The donkey is non-negotiable.

---

### 3.3 `/films/:slug` — Film Detail
#### *दर्पण (Darpan) — Inside the Frame*

**Rasa**: Karuṇa (compassion, the dwelt-in moment)
**Source anchor**: each film’s synopsis + stills in `instructions.txt`.

#### Concept
The detail page is a **scrolling shot list**. The film’s stills are not static images on a page — they are *projected* onto a hanging plane in 3D space, and the viewer scrolls through them as the projector advances frame-by-frame. Between stills, a soft frame-burn dissolve (real cinema mistake, real cinema beauty). The synopsis types itself, character by character, as if subtitled.

#### Layout
- Hero: title (large, current size — Inter Tight 200), Devanagari subtitle, type · year · runtime · language metadata, role pill row.
- Below: large 16:9 “projector frame” (the WebGL canvas) — fixed to viewport while user scrolls a fake column to the right.
- Synopsis: typed in a fixed pane on the left; each word arrives as the corresponding still loads in the projector.
- Achievements & press: classic editorial list (current shipped version).

#### 3D Animation Spec

```
SCENE: A floating plane (16:9), centered, slight tilt in y (3°).
MATERIAL: Custom ShaderMaterial that accepts two textures (current still, next still)
          and a uTransition uniform 0..1.

TRANSITION SHADER:
  // Burn-in dissolve — emulates 16mm projector frame burn
  vec3 a = texture2D(uA, vUv).rgb;
  vec3 b = texture2D(uB, vUv).rgb;
  float n = noise(vUv * 8.0);
  float t = smoothstep(uTransition - 0.3, uTransition + 0.3, n);
  // Slight orange/red flash at the edge of the dissolve
  vec3 burn = mix(vec3(0.95, 0.55, 0.2), vec3(0.0), t);
  gl_FragColor = vec4(mix(a, b, t) + burn * 0.04, 1.0);

SCROLL DRIVES uTransition.
ON SCROLL DETENT (snap to each still):
  - Synopsis text revealed up to corresponding word index
  - Devanagari letter morphs in upper-right corner (poster frame metadata)

POSTPROCESSING: Subtle film grain (Noise pass), DPR-aware.
```

#### Interaction
- Scroll = advance projector.
- Click projector frame → opens the still in a lightbox (cursor expands to cover it).
- Press `space` → toggle “run mode”: the projector advances at film speed (24 fps simulation, 1 still per ~3 seconds), hands-free. Press again to stop.
- Bottom of page: prev / next film links keep the projector idea — clicking next causes the current still to **burn out** before the next page loads.

#### Sound
- Each scroll detent: a quiet **shutter click** sample.
- Run mode: a 16mm projector loop (very low volume, ducks under any voiceover).
- Synopsis typing: occasional typewriter strikes (probabilistic — every ~3 chars), to avoid mechanical rhythm.

#### Easter Egg (Absurdism seed)
Each film carries a single **frame that doesn’t belong** — e.g., on the *gadha ghum raha hai* page, one of the stills is briefly replaced (250 ms) with a still from *Cycle of Life*. As if a reel was misloaded. This appears once per session per page. Never explained.

#### Performance Mode (mobile / reduced-motion)
- The projector becomes a vertical stack of stills (current shipped layout).
- No burn-in shader; cross-fade only.
- Synopsis arrives as a normal paragraph.

---

### 3.4 `/photographs` *(home anchor)* — Photographs Index
#### *अंधार (Andhaar) — The Darkroom Continuum*

**Rasa**: Vibhatsa → Śṛṅgāra (the disquieting that resolves into intimacy)
**Source anchor**: *Childhood Archive*, *Food Archive*, *Chikoo at 13*, *Pankaj at Work*; “photographs as way of building memory, slowly”.

#### Concept
A **virtual darkroom**. The page opens with the screen mostly dark — only a red safelight at the top corner. Photographs are not displayed; they are **developing**. As the user scrolls, photos rise out of a digital developer tray (a noise-displacement shader emulating chemical bath), reach full visibility, fix, and dry. By the bottom of the page, all photographs are sharp. To scroll back up is to re-immerse the page in chemical fog.

The four series are the four *baths*: Developer (Food Archive), Stop (Childhood), Fixer (Chikoo at 13), Wash (Pankaj at Work).

#### Layout
- Sticky header with safelight glow (CSS only, but tinted).
- Four series, each a horizontal row of 3–4 thumbnails.
- Each thumbnail is a 3D plane that emerges from the darkroom shader.
- Click on any series cover → routes to `/photographs/:slug`.

#### 3D Animation Spec

```
SHADER (per thumbnail plane):
  - Two textures: uPhoto (the actual image), uPaper (blank gelatin texture)
  - uDevelop: 0..1, driven by IntersectionObserver progress
  - GLSL:
      vec3 paper = texture2D(uPaper, vUv).rgb;
      vec3 photo = texture2D(uPhoto, vUv).rgb;
      float bias = noise(vUv * 4.0 + uTime * 0.05);
      float reveal = smoothstep(uDevelop - 0.4, uDevelop + 0.4, bias);
      vec3 col = mix(paper, photo, reveal);
      // Slight magenta cast in mid-development (chemical truth)
      col += vec3(0.04, -0.02, 0.02) * (1.0 - abs(reveal - 0.5) * 2.0);
      gl_FragColor = vec4(col, 1.0);

GLOBAL: A red safelight point-light (intensity 0.3) at top-right.
A subtle bloom from the safelight only.
```

#### Interaction
- Scroll up = un-develop. Scroll down = develop. The shader is reversible.
- Hover thumbnail → slight lift (`spring-soft`) and the photo briefly oversaturates (the “dunk back” gesture, < 200 ms).
- Click → click-circle, route to series.

#### Sound
- Soft running-water loop (fixer wash) at -24 dB.
- Hover thumbnail = subtle wet plick.

#### Easter Egg (Absurdism seed)
One thumbnail in the page (random per session) **never finishes developing** no matter how far you scroll. It stays at 0.7 reveal. To finish it, you must hover and *hold* for 3 seconds. As if the chemical was weak that day.

#### Performance Mode (mobile / reduced-motion)
- The shader is replaced with a simple CSS opacity ramp (0 → 1 over IntersectionObserver progress).
- All thumbnails ship as normal `<img loading="lazy">`.
- Safelight remains as a CSS radial gradient.

---

### 3.5 `/photographs/:slug` — Photo Series Page
#### *स्पर्श (Sparsh) — The Touch of Surfaces*

**Rasa**: Śṛṅgāra (love, aesthetic delight)
**Source anchor**: each series’ subject — food, childhood, dog, filmmaker at work.

#### Concept
Photographs are not flat. Each series treats its photos as **physical objects**, with thickness, light, and surface. The reader doesn’t scroll past them; the reader **handles** them.

Each series gets a different physical metaphor:

| Series | Surface | Light |
|--------|---------|-------|
| **Food Archive** | Polaroid stack on a wooden tabletop | Warm overhead bulb |
| **Childhood Archive** | Scattered old prints on bedsheet | Window-side soft light |
| **Chikoo at 13** | A photobook turning its own pages | Lamp on bedside |
| **Pankaj at Work** | Contact sheet on a lightbox | Cool fluorescent |

This makes each series page **distinct enough to feel like a different show**, while the navigation, type, and motion language remain identical.

#### Layout
- Hero: series title (current size), eyebrow `Photo Series`, blurb, capture date range.
- WebGL canvas dominates the next viewport — the “surface” of that series.
- Below the canvas: list view (current shipped flat list) for screen-readers and as a fallback.

#### 3D Animation Spec (Food Archive variant — others follow same template, swap material/light)

```
SCENE:
  - Plane (the table) at y=0, MeshStandardMaterial wood texture, normal map
  - 6–10 photo cards (PlaneGeometry 0.8 x 0.6, depth via extrusion 0.012)
    Material:  MeshStandardMaterial with poster texture + paper roughness map
    Position: scattered on table with slight rotation
  - Above: PointLight (warm 2700K, intensity 1.2), positioned slightly off-centre
  - Slight DOF, focus on cursor-aimed card

CURSOR INFLUENCE:
  Raycast from camera through cursor into scene.
  Hovered card: lerps y +0.06, rotation tilts toward cursor (max 8°).
  Other cards drop slightly (-0.01) — the “lifted card” idea.

SCROLL: Camera dollies along table length (positive Z).
  No FOV change; pure dolly — feels like walking around table.

DUST: A second canvas overlay (2D) of softly drifting motes. CSS only, masked.
```

Each series swaps:
- Wood → bedsheet textile (Childhood)
- Wood → fabric photobook page (Chikoo)
- Wood → frosted lightbox glass (Pankaj)

And swaps the light accordingly.

#### Interaction
- Move cursor over scene → cards lift; hovered card raises higher.
- Click a card → opens a lightbox in 3D: card rises to camera, others fade to grayscale, background blur intensifies. Click outside or press `esc` to return.
- Drag (touch) → tilts the entire surface — like literally tilting a table.

#### Sound
- Per card hover: a soft paper-handle sound.
- Per series, an ambience matching the room: kitchen for Food, hum for Childhood, pawn-claws-on-floor for Chikoo, generator hum for Pankaj.

#### Easter Egg (Absurdism seed)
On Pankaj at Work only: one of the contact-sheet frames is **the cameraman’s own thumb**, exactly as on a real contact sheet. We never crop it out. It is the honesty of the shoot.

On Chikoo at 13: the photobook makes a turning sound even when no card is hovered, once every 30 seconds. The book turns one page on its own. A page later, it returns. As if the dog walked past.

#### Performance Mode (mobile / reduced-motion)
- Cards become 2D tiles.
- Lift on hover replaced by a CSS scale 1.02 + shadow.
- Per-series ambience is silenced.

---

### 3.6 `/words` *(home anchor)* + `/words/:slug` — Words / Writing
#### *स्याही (Syahi) — Ink and Time*

**Rasa**: Vīra → Hāsya (quiet courage, with a glimmer of comedy)
**Source anchor**: writing categories in `instructions.txt` — Poetry, Cinema, Ideas, Art, Absurdity, Connections; pieces named there.

#### Concept
Writing is not a list of articles. Writing is **ink behaving on paper**. The list page treats each piece as a **wet stamp** — its title type bleeds slightly into the paper texture as you hover, then sets. The detail page is a **single, long sheet of paper** — the entire piece visible on one continuous scroll, with handwritten margin notes (Reenie Beanie / Caveat) appearing in the gutters.

Poetry pieces (e.g. *Connections*) are special-cased: the words are **not on a page**. They are **suspended in 3D space** as a constellation. The viewer can drag them gently. They re-settle.

#### Layout — Index
- Existing left sidebar of categories.
- Right column: the list of titles.
- Each title is a fragment of paper (3D plane with paper-fiber displacement) sitting just barely above the dark canvas.

#### Layout — Detail (essay)
- Top: title, category, date.
- Body: prose, in two-column-on-wide / single-column-on-mobile, with margin notes pulled into the right gutter on desktop.
- Bottom: prev / next.

#### Layout — Detail (poetry)
- Title only at the top.
- Canvas dominant: 3D constellation of words.
- Each word is its own draggable mesh.
- Below the fold (if the user scrolls): the poem appears as plain typography for accessibility.

#### 3D Animation Spec — Poetry constellation

```
GEOMETRY: For each word, a Text mesh (drei <Text>) at random position
within a sphere of radius 3 around the origin.
PHYSICS: Rapier rigid bodies, very light damping, soft return spring to origin.
GRAVITY: Off (pure 3D suspension).

INTERACTION:
  Pointer down + drag → grab nearest word, attach to a constraint that
  follows the cursor in 3D (project to camera-aligned plane).
  Release → word drifts, returns to origin over 4 seconds via spring.

SUBTLETY:
  Each word "breathes" — tiny scale modulation (1.0 ± 0.02), out of phase per word.
  Reading order is preserved by drifting alpha — words near the start of
  the line are slightly brighter.

POSTPROCESSING:
  ChromaticAberration on the constellation only (intensity 0.0008).
  This makes the type feel slightly off-register, like an old print.
```

#### Interaction (essay pages)
- Hover a margin note → the corresponding sentence in the body subtly underlines (background gradient grows, current `underline-grow` token).
- Highlight (select) text → a small 3D ink blob forms at the start of the selection (cursor circle deforms into a comma).
- Press `t` → toggle “typewriter” mode: the page re-renders as if being typed live, character by character, from the top. Auto-stops on Esc.

#### Sound
- Pen scratch when hovering a margin note.
- Paper-rustle when scrolling fast.
- Poetry constellation: low-pass filtered ambient drone, sparse.

#### Easter Egg (Absurdism seed)
- One **misspelled word per essay**. (Confessional, deliberate.) When you hover that word for ≥ 1 second, it auto-corrects with a tiny shimmer.
- The poem *Connections* contains an extra word (one not in the source). The word is **गधा** (donkey). Reading order must be honoured; do not remove.

#### Performance Mode (mobile / reduced-motion)
- Poetry: constellation becomes a normal centred typographic stack with a slight breathing CSS animation on each line.
- Essays: margin notes move below their paragraph.
- Typewriter mode disabled.

---

### 3.7 `/about` *(home anchor)* — About
#### *कोठरी (Kothri) — The Filmmaker's Room*

**Rasa**: Karuṇa + Śānta (tender quiet)
**Source anchor**: full bio in `instructions.txt`, the “Diary of a Young Filmmaker” entry, the Auroville fellow years.

#### Concept
The about page is **a room**. Not a hero portrait + paragraph. A small, low-poly 3D room rendered with deliberate imperfection: a desk, a lamp, a stack of books, a 16mm reel can, a Bolex (purely decorative), a window with ambient light that matches the **viewer’s real-world time of day** (`Date.now()` → time-of-day shader), a poster of *Pather Panchali* on the back wall, a tea cup with steam.

The bio paragraphs and the timeline are **objects in the room**:
- The **stack of books** = the timeline (clicking each spine reveals one timeline entry; the spine is labeled with the year in Devanagari numerals).
- The **poster** = the bio paragraph (hover to reveal as overlay).
- The **reel can** = the films link (click to navigate).
- The **Bolex** = the photographs link.
- The **tea cup** = the contact link (steam writes the email address into the air for 3 seconds).

#### 3D Animation Spec

```
SCENE: Single low-poly room, ~2,400 triangles.
CAMERA: Slight orbit driven by mouse parallax (mouse XY → camera YX, max 4°).
        No free-orbit; we are not a game.

LIGHTING:
  - Window directional light: color/intensity blended via uTimeOfDay
    (warm orange near sunset, cool blue at night, soft white midday)
  - Lamp on desk: always on, warm 2700K, baked into a small light cookie
  - Ambient: 0.15

OBJECT INTERACTIONS (raycast):
  - On hover any object, that object lifts 0.04u and a label appears
  - On click any object, the corresponding content panel slides in from
    the right (full-height, glassy panel with backdrop blur)
  - Esc / outside-click closes the panel

CHALKBOARD:
  - On the back wall, an SVG chalkboard
  - Once per session, a hand draws स्वानंद on it character by character
  - Then erases it back to dust (chalk-eraser shader)
```

#### Interaction
- Mouse XY tilts camera 0–4° (parallax).
- Object hover/click as above.
- Press `r` → cycles a small Easter egg: the desk lamp turns off, the room goes black except the window. (The room exists at night too.)

#### Sound
- Background room tone (refrigerator hum + occasional traffic, low).
- On lamp toggle, a click.
- Tea cup hover: a sip sound (very soft).

#### Easter Egg (Absurdism seed)
The room has a **wall calendar**, and the calendar shows the wrong month. It always shows **जुलै (July)**. Even in November. We do not fix it. (It is the month *Cycle of Life* was edited.)

#### Performance Mode (mobile / reduced-motion)
- The room collapses to a beautiful 2D illustration (single SVG / WEBP) with hotspots.
- Each hotspot opens the same content panel.
- Time-of-day still drives the SVG’s palette via CSS variables.

---

### 3.8 `/contact` *(home anchor)* — Contact
#### *झरोखा (Jharokha) — The Open Window*

**Rasa**: Adbhuta (wonder)
**Source anchor**: *“Let’s connect :)”* + the closing of the brief.

#### Concept
A single round **aperture** in the centre of a dark canvas. The aperture is closed. As the cursor moves across it, the **iris** opens — exactly like a camera lens. Through the open aperture: sky. The email address is suspended in front of the aperture, slightly out of focus until the iris is fully open.

#### 3D Animation Spec

```
GEOMETRY: A camera iris (procedural — 9 leaves, hinged at fixed angle, blade
          shape via custom shape geometry).
TARGET: Open angle 0..1 driven by:
  - mouse distance from screen center (closer = more open)
  - + a slow `breath` baseline (always slightly opening/closing)

THROUGH THE IRIS:
  A second scene rendered to a render target — a slow time-lapse sky
  (a gradient from dawn to dusk based on time-of-day, with one drifting
  cloud sphere every ~30s).

EMAIL TYPE:
  3D text "lifeskaisart@gmail.com" floating in front of the iris.
  Out of focus when iris is < 0.3 open; sharp when > 0.7.

PHONE NUMBER:
  Below the iris, in plain type. Always visible. Always tabular nums.
```

#### Interaction
- Cursor moves toward aperture → iris opens, email focuses.
- Click email → mailto: with a pre-filled subject line `Hello, Swanand —` (deliberate em-dash exception, in the user's email client only).
- Cursor leaves → iris slowly closes back to default (60% open).

#### Sound
- A faint shutter motor when the iris transitions across detents.
- Outside: birdsong if local time is morning, crickets at night.

#### Easter Egg (Absurdism seed)
Click the iris itself (not the email). The whole page **takes a photograph** of itself — full white flash, a 200ms shutter sound, and a generated postcard appears on the screen. Drag-saveable. (Implementation: html2canvas → downloadable PNG.)

#### Performance Mode (mobile / reduced-motion)
- Static SVG iris in “half-open” state.
- Email + phone visible in plain editorial layout (current shipped version).
- Postcard-snapshot easter egg disabled.

---

### 3.9 `/loop` *(hidden, not in nav)* — The Donkey Loop
#### *गधा (Gadha) — गधा घूम रहा है*

**Rasa**: Hāsya (laughter) — but a quiet, melancholic laughter.
**Source anchor**: the film *gadha ghum raha hai*; *On Absurdity*; the post-notes circle motif.

#### Concept
The site’s **resolved absurdism**. A hidden page where a **single donkey walks slowly across an empty Nagpur street**, forever. Low-poly, side-on, scrolling parallax background. The user can do nothing except **watch**. Or **click**, which spawns another donkey. Donkeys persist (localStorage) for that user. Eventually they become a **herd**. The page accepts that.

This page exists for two reasons:
1. As an honest tribute to the film and to the work’s own thesis (curiosity → responsibility).
2. As a **resting place** — when the rest of the site is too much, this page is here.

#### Access
- Not in nav.
- Discoverable by:
  - Clicking the small **⊙ glyph** in the footer (it’s already there as decoration; we make it a real link).
  - Typing the word **gadha** anywhere on the site (capture global keypresses).
  - Following the donkey easter egg in the films index — clicking him before he leaves the screen.

#### Layout / 3D
```
SCENE: Side-scrolling parallax, three layers
  - Far: building silhouettes (single sprite, drifts slowly right)
  - Mid: shop fronts, hawker carts
  - Near: street level, dust

DONKEY:
  - Rive 2D character with walk cycle, blink, ear-twitch
  - Walks left to right at ~6 px/s
  - Stops randomly (15–25% chance per pixel) for 2–8 seconds
  - On stop, may turn head toward camera

ON CLICK:
  - Spawn a new donkey at the screen-left edge
  - Use the same Rive instance with a different palette tint
  - Save count to localStorage (Swanand's herd)

WORLD TIME:
  - Sky tints by real time of day
  - At night, a single sodium streetlamp flickers
```

#### Interaction
- Click anywhere → spawn a donkey.
- Press `space` → all donkeys stop and look at camera in unison for 2 seconds.
- Press `esc` → return to `/`.
- The page has **no other affordances**.

#### Sound
- Distant Nagpur street ambience (motorbike, distant horn, ~ -20 dB).
- The first donkey’s click plays one **brief bray** at low volume. Subsequent donkeys are silent (the absurdism: only the first donkey speaks).

#### Easter Egg (within an Easter Egg)
After 8 minutes on the page (the runtime of *Cycle of Life*), the page fades to black and shows **one line of poetry from *Connections***:
*“the wires sing only when no one is listening.”*
Then returns to the donkeys.

#### Performance Mode
- This page is already deliberately light (Rive 2D). No degradation needed.
- Reduced-motion: donkeys still walk but slower; no clicks-spawn (one donkey, forever).

---

## 4. Cross-Page Glue

### 4.1 The Cursor System
| State | Form | Behaviour |
|-------|------|-----------|
| default | 12px filled circle | follows pointer (spring-soft) |
| hover-link | 12px + 64px outlined ring | ring orbits link center |
| hover-image | ring expands to image edges | preview readiness |
| pressed | snaps to 8px, ring contracts | feedback within 80ms |
| route-changing | expands to fill screen | becomes the transition |

The cursor is **always rendered** above the WebGL canvas (DOM-overlaid `mix-blend-mode: difference` for legibility on light/dark photos). Disabled on touch devices.

### 4.2 Route Transitions
Every navigation expands a **circle** (the click point) to fill the screen, the new route mounts inside the circle, then the circle releases. Implemented via:
- Framer Motion `LayoutGroup` or
- Custom shared-element via React Router `useNavigate` + a portal-rendered SVG circle clip-path.

Duration: 1100–1400ms (`cinema` token). The user sees: their click, the circle, the new page rising. They never see a white flash. They never see a stutter.

### 4.3 The Sound System
- One global Howler instance.
- Mute by default (per Apple HIG: never auto-play).
- Toggle in nav: `◐` (off) ↔ `◯` (on).
- Per-page channels:
  - **Ambience** (music bed) — fades 600ms on route change
  - **UI** (clicks, hovers) — short samples, gain -12 dB
  - **Spatial** (panning relative to cursor for some scenes) — only on /about and /loop
- On `prefers-reduced-motion`, sound is also defaulted off (some users report cross-sensitivity).

### 4.4 The Devanagari Layer
- **स्व** appears as logo always.
- **स्वानंद** appears in:
  - Hero (after letter cascade completes, 2 seconds later, a small स्वानंद fades in below the name)
  - Footer marquee
  - About chalkboard (drawn live, once per session)
- Each route has a Devanagari shadow:
  - `/films` → फ़िल्में
  - `/photographs` → छवियाँ
  - `/words` → शब्द
  - `/about` → परिचय
  - `/contact` → संपर्क
  - `/loop` → गधा
- Devanagari numerals on the about chalkboard and the chakra ring metadata.

### 4.5 Keyboard Map (global)
| Key | Action |
|-----|--------|
| `g` then `f` | go to films |
| `g` then `p` | go to photographs |
| `g` then `w` | go to words |
| `g` then `a` | go to about |
| `g` then `c` | go to contact |
| `←` `→` | prev / next within film and photo series |
| `m` | toggle sound |
| `?` | shortcuts overlay |
| typing `gadha` anywhere | go to /loop |

### 4.6 Accessibility (non-negotiable)
- Every WebGL canvas has a paired DOM fallback (the existing flat layouts, kept in source, hidden behind `aria-hidden` only when WebGL successfully boots).
- All images have meaningful `alt` text.
- All interactive elements meet 44×44pt touch target.
- `prefers-reduced-motion` is respected at every level (cursor system, transitions, shaders).
- Focus states are visible — even with custom cursor.
- Screen reader users get the editorial layout, not the room.
- All audio is muted by default; toggle is keyboard-reachable.

---

## 5. Phasing / Build Plan

### Phase 0 — Already shipped *(✓)*
- Dark editorial base (Inter Tight + Devanagari).
- Routes for films, photographs, words.
- Letter cascade hero.
- IntersectionObserver-driven reveals.

### Phase 1 — Glue and Cursor (1 sprint)
- Lenis smooth scroll integration.
- Custom cursor (DOM-overlaid).
- Route transitions (circle expand).
- Sound toggle (silent until enabled).

### Phase 2 — Hero Chamber + Films Ring (1 sprint)
- `/` Hero Chamber 3D (the gateway spheres).
- `/films` Chakra ring (the 10-film carousel).
- Mobile fallbacks.

### Phase 3 — Film Detail Projector (1 sprint)
- `/films/:slug` projector + burn-in shader.
- Synopsis word-sync.
- Run-mode keyboard.

### Phase 4 — Darkroom + Series Rooms (2 sprints)
- `/photographs` darkroom shader.
- 4 distinct `/photographs/:slug` 3D rooms.
- Lightbox-in-3D.

### Phase 5 — Words and Poetry Constellation (1 sprint)
- `/words` paper-fragment list.
- `/words/:slug` essay (margin notes) and poetry (constellation).
- Typewriter mode.

### Phase 6 — About Room + Contact Aperture (1 sprint)
- `/about` 3D room with time-of-day light.
- `/contact` aperture iris.
- Easter eggs across pages.

### Phase 7 — The Donkey Loop (3 days)
- `/loop` Rive donkey scene.
- All paths in (footer glyph, films easter egg, `gadha` keystroke).

### Phase 8 — Polish & Release (1 sprint)
- Performance audit (LCP, INP, CLS targets).
- A11y audit (NVDA, VoiceOver, keyboard-only pass).
- Cross-browser (Safari iOS, Firefox Android included).
- Replace placeholder picsum images with Swanand’s real assets.
- Real video links into the projector (preview boxes).

---

## 6. Anti-Patterns (we will not do this)

- **Auto-playing audio.** Ever.
- **Decorative-only motion.** Every animation answers one of the five pillars.
- **Cursor-jacking.** The custom cursor never blocks system gestures (right-click, ctrl+click) and is disabled on touch.
- **WebGL on first paint.** First contentful paint is always editorial DOM — the WebGL boots in after.
- **Loading screens longer than 800ms.** Use the cursor circle as the spinner; never a logo with a percentage.
- **Inert text inside canvases.** All text content is also in the DOM for SEO + a11y.
- **Auto-scroll.** Only the user moves the page. Even the films ring is user-driven.
- **Modal hell.** Lightboxes only; no nested modals; ESC always works.
- **Em dashes** *(per ongoing instruction)* — anywhere except in `mailto:` subject seed.
- **Dark / light toggle in v1.** This is a dark cinema. Light comes later, deliberately.
- **Generic stock photography placeholders in production.** Picsum is a *dev* convenience only; before launch, every image must be Swanand’s.

---

## 7. Source Lineage — what is from `instructions.txt`

So the design plan never floats free of the brief, here is the explicit anchor map:

| Page / decision | Anchor in `instructions.txt` |
|---|---|
| स्व + स्वानंद motif | *“sw and swanand written in devnagri as website icons”* (Post Notes) |
| Circle-on-circle navigation grammar | *“Circular motifs… circle which follows another circle with a click”* (Post Notes) |
| Films ring carousel | Filmography list (10 films) |
| Film Detail projector | *“VIDEO LINK (Preview Box) · Film Stills · Role · Synopsis · Achievements”* (page template) |
| Haalaat as Stillness pillar | *“caught up in stillness… emptiness, anxieties, ecstasies”* |
| Cycle of Life as Circulation pillar | *“intimate exploration of change… he travels to the city as he rents a cycle”* |
| Donkey Loop hidden page | *gadha ghum raha hai* — Palash and the donkey |
| Photographs darkroom | *“Food Archive, Childhood photo archive, Chikoo at 13, Pankaj at work”* |
| Words constellation (poetry) | *Connections* + *Kabir & A Perfect Day* |
| Absurdism seeds | *On Absurdity* + the open contradictions in the brief itself |
| About chalkboard | *2019: Bachelor’s in Mass Media + Film Appreciation* |
| About time-of-day | *“Working on a documentary, while wondering, writing.”* — wonder is a daily light |
| Contact aperture iris | *“Let’s connect :)”* — the colon-paren as a half-open eye |
| Tribal · Fantasy · Retro | Photography tone reference (*Photography — Tribal, Fantasy, Retro*) — feeds future series |

---

## 8. Closing Frame

This is a portfolio for a filmmaker who has spent ten years insisting that *attention itself is craft*. Our job is not to dazzle. Our job is to **make attention easier**. Every 3D scene above buys its place by deepening attention — to a film’s frame, to a series’ surface, to a poem’s suspension, to a donkey’s walk.

If we get this right, the loudest review the site will ever receive is silence — the silence of a viewer who closed the laptop and went to read Kabir.

That is the studio-grade we are aiming at.

— *End of plan.*
