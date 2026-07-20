# Fynbos & Flame (placeholder name)

A website about trails, camp cooking and video stories from the Garden Route, South Africa.

## Structure

```
index.html      the whole page, one file, top to bottom
css/style.css   all styling — colors and fonts are set once at the top as variables
js/main.js      three small interactive features (menu, trail filter, video modal)
LEARNING.md     a walkthrough of how the pieces fit together
```

## Running it locally

No build step, no install — it's plain HTML/CSS/JS. Two ways to view it:

1. **Just open it.** Double-click `index.html`, or drag it into a browser tab.
2. **Serve it properly** (recommended, avoids some browser quirks with `fetch`/modules later):
   ```
   npx serve .
   ```
   then open the URL it prints (usually `http://localhost:3000`).

## Swapping in real content

- **Logo & name**: replace the inline SVG in the `<nav>` of `index.html` and the "Fynbos & Flame" text throughout.
- **Videos**: change the `data-video="..."` attributes on the `.video-card` elements in `index.html` to real YouTube video IDs (the part of a YouTube URL after `watch?v=`).
- **Trails / recipes**: each is a repeated block in `index.html` — copy a `.trail-card` or `.recipe-card` block and edit the text.

## Deploying

See the deployment steps in the chat — GitHub first, then Vercel connects to the repo and redeploys automatically on every push.
