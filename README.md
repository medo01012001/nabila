# Nabila — A Little Reminder

A small interactive gift website (React + TypeScript + Tailwind + Framer Motion).

## Open / share it
`dist/` is the finished, built website. To send Nabila a link, upload the **contents
of `dist/`** to any static host, for example by dragging the `dist` folder onto
https://app.netlify.com/drop, or by using GitHub Pages or Vercel.
(Opening `dist/index.html` straight from disk won't work, because browsers block
JS modules on `file://`.)

## Edit
- All text: `src/config/content.ts`
- Photos and where each one appears: `src/config/photos.ts` (files go in `public/photos/`)
- Original, untouched photos: `Nabila_Photos/`

## Run locally
Google Drive can't hold `node_modules`, so develop from a local copy:

    npm install
    npm run dev      # http://localhost:5173
    npm run build    # writes dist/
