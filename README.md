# ValueBros Infotech — Website

Live site: **www.valuebrosinfo.tech**

Static site built with **HTML, CSS, and JavaScript only**—no server or backend required. Hosts on GitHub Pages, Netlify, or any static host.

---

## Tech stack

- **HTML5** — Semantic markup, skip link, meta, JSON-LD
- **CSS3** — Variables, grid/flex, animations, responsive
- **JavaScript** — Form validation, Formspree submit, scroll animations, mobile menu

---

## Run locally

```bash
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000`.

---

## Contact form (Formspree)

The form uses client-side validation and can send to **Formspree** (free, no server needed):

1. Go to [formspree.io](https://formspree.io), sign up, create a form.
2. Copy your form endpoint (e.g. `https://formspree.io/f/xxxxxxxx`).
3. In **index.html** and **contact.html**, set the form `action` to that URL:
   - Find `<form class="contact-form" action="#" method="post">`
   - Replace `action="#"` with `action="https://formspree.io/f/YOUR_ID"`

If you leave `action="#"`, the script shows a fallback message asking users to email you.

---

## WhatsApp & phone

- **WhatsApp button**: Replace `wa.me/919876543210` with your number (no spaces or +) in **index.html**, **about.html**, **services.html**, and **contact.html**.
- **Phone & email**: Update `tel:` and `mailto:` links in **index.html** and **contact.html**, and the phone in the JSON-LD script in **index.html**, with your real contact details.

---

## Images to add (optional)

Place these in the **`assets/`** folder; if missing, placeholders are used.

| File | Where it appears |
|------|------------------|
| **logo.png** | Header, footer (already used) |
| **favicon.svg** | Browser tab (already used) |
| **workflow-1.jpg** … **workflow-4.jpg** | Home page “Workflow in Action” (else `workflow-placeholder.svg`) |
| **shivam.jpg**, **prince.jpg**, **om.jpg** | About page team (else initials S, P, O) |
| **project-1.jpg**, **project-2.jpg**, **project-3.jpg** | Home page “Recent Projects” (else gradient placeholder) |

---

## SEO & static files

- **sitemap.xml** — Lists main pages (one homepage URL); submit in Google Search Console.
- **robots.txt** — Allows crawlers and points to `sitemap.xml`.
- **JSON-LD** — Organization + WebSite schema in **index.html**. Update `sameAs` with your LinkedIn, Instagram, etc. for richer search results.
- **Canonical, meta, Open Graph** — Set on all pages. For better social sharing, add **assets/og-image.png** (1200×630) and set `og:image` to that URL.
- **404.html** — Custom “page not found.” On Netlify and GitHub Pages, a file named `404.html` in the root is usually used automatically for unknown URLs.

---

## Pages

| File | Description |
|------|-------------|
| **index.html** | Home — Hero, tech marquee, services, testimonials, portfolio, process, workflow, contact |
| **services.html** | Full services (Video, AI, Web) |
| **about.html** | Our story + team (Shivam, Prince, Om) |
| **contact.html** | Contact form (contact section also on home) |
| **privacy.html** | Privacy policy |
| **terms.html** | Terms of use |
| **404.html** | Custom “page not found” (configure your host to use it) |

---

## Features

- Centered nav (Home, Services, About Us) + Contact button; Contact links go to **contact.html**
- Contact form on home and contact page; validation and Formspree support
- Testimonials + “Trusted by” badges; portfolio section with project placeholders
- WhatsApp floating button on all pages; back-to-top button; skip-to-main-content link
- Tech logo marquee; process steps; workflow images (lazy-loaded)
- Footer: Gujarat, India; Privacy & Terms; sitemap and robots for SEO

---

## Customization

- **Colors**: Edit `:root` in **styles.css** (e.g. `--accent`, `--purple`, `--orange`, `--gold`).
- **Copy**: Edit the relevant HTML (hero, services, testimonials, about story, contact).
- **Formspree**: Set form `action` as above.
- **WhatsApp / phone**: Update links and number in HTML.
