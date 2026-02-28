# AIEyeStudios — Agency Website

A professional, modern website for **AIEyeStudios**, a video production agency.

## Structure

- **Home** (`index.html`) — Hero, services preview, featured work, CTA
- **Services** (`services.html`) — Full list of video production services
- **Work** (`work.html`) — Dedicated portfolio page for past posts/projects with category filters
- **Contact** (`contact.html`) — Contact form and email

## Features

- Dark, cinematic design with gold accent
- Responsive layout (mobile menu, flexible grids)
- Sticky header with scroll state
- Work page: filter posts by category (All, Commercials, Brand Films, Social, Documentary)
- Contact form (front-end only; hook up to your backend or form service)
- Smooth scroll and basic animations
- Accessible markup (ARIA, semantic HTML)

## How to run

Open `index.html` in a browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

Then visit `http://localhost:8000`.

## Customization

- **Thumbnails:** Replace `.placeholder-thumb` divs with `<img>` tags or video posters in `index.html` and `work.html`.
- **Form:** Point the contact form `action` to your backend or use a service (Formspree, Netlify Forms, etc.).
- **Copy:** Update project names, dates, and categories on the Work page to match your real projects.

## SEO & ranking

The site is set up for keywords like **best marketing video shoots**, **best AI video maker**, **marketing videos**, and **video production agency**.

**Before going live:** Replace `https://www.aieyestudios.com` with your real domain in all HTML files, `sitemap.xml`, and `robots.txt`. Add an `og-image.jpg` (1200×630 px) for social sharing. Optionally add social profile URLs to the `sameAs` array in the JSON-LD in `index.html`.

**After going live:** Submit `https://yourdomain.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Consider a Google Business Profile and backlinks to improve organic traffic.
