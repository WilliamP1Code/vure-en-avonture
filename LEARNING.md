# Under the hood

A walkthrough of what's actually happening in this project, written for
someone learning web dev by building something real.

## 1. The three languages, and what each one owns

- **HTML** (`index.html`) — the *content and structure*. Every element
  (`<nav>`, `<section>`, `<article>`) describes what something *is*, not
  what it looks like. Notice the tags aren't `<div>` everywhere — `<nav>`,
  `<header>`, `<footer>`, `<article>` are "semantic" elements. They mean
  something to screen readers and search engines, not just to you.
- **CSS** (`css/style.css`) — the *appearance*. It never touches
  `index.html` directly; instead it selects elements by tag, class
  (`.trail-card`), or id (`#trailGrid`) and styles them from the outside.
- **JavaScript** (`js/main.js`) — the *behavior*. It runs after the page
  loads and reacts to things (clicks, key presses) by changing the HTML/CSS
  live, in the browser.

These three load in order: the browser reads `index.html` top to bottom,
hits the `<link rel="stylesheet">` and fetches `style.css`, keeps reading,
and finally hits `<script src="js/main.js">` near the bottom of `<body>` —
deliberately placed last, so the page's content exists before the script
tries to grab it with `document.getElementById(...)`.

## 2. CSS variables (the `:root` block)

At the top of `style.css`:

```css
:root {
  --fynbos: #24402f;
  --sand: #ede6d6;
}
```

These are custom properties — you set a color once and reuse it everywhere
with `var(--fynbos)`. Change the hex value in one place, and it updates
across the whole site. This is why swapping the brand colors later (once
you have a real logo) is a five-minute job, not a find-and-replace across
hundreds of lines.

## 3. Flexbox vs. Grid

- `display: flex` is used for one-dimensional layouts — a row of nav
  links, a row of buttons. Things line up along a single axis.
- `display: grid` with `grid-template-columns: repeat(auto-fill,
  minmax(280px, 1fr))` is used for the trail/recipe/video cards — it lets
  the browser figure out how many columns fit, and reflow automatically
  as the window resizes. That single line is why the grid is responsive
  without a "mobile version" of the CSS.

## 4. The DOM, and what main.js actually does

The DOM (Document Object Model) is the browser's live, in-memory version
of your HTML — a tree of objects JavaScript can read and change.
`document.getElementById('navToggle')` walks that tree and hands you back
the actual button element. From there:

- `addEventListener('click', ...)` says "run this function whenever this
  element is clicked." Nothing happens until the click occurs — this is
  event-driven programming, not a script that runs top-to-bottom once.
- The trail filter doesn't rebuild the HTML — it just toggles
  `card.style.display = 'none'` on cards that don't match, using a
  `data-difficulty` attribute you can see directly in `index.html`.
- The video modal sets an `<iframe src="...">` attribute at the moment
  you click a card. That's the whole trick behind embedding a YouTube
  video: YouTube's embed player is just a URL you can drop into an
  iframe.

## 5. Why no build step (yet)

Frameworks like React or Next.js compile your code before the browser
sees it. This project skips that entirely — the files you write are the
files the browser runs. That's deliberate for a first project: fewer
moving parts between "I changed something" and "I see it happen." Once
this feels natural, moving to a framework will make a lot more sense,
because you'll recognize what the framework is doing *for* you.
