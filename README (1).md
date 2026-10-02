# Mohamed ElAzab — Portfolio

Personal portfolio website for **Mohamed ElAzab**, a Full-Stack .NET Developer with a Cybersecurity background.

Built with plain **HTML5, CSS3, and vanilla JavaScript**. No frameworks, no build step, no dependencies.

## Features

- Minimal editorial design with large typography and a single accent color
- Light and Dark themes, with separate color tokens for each
  - Light is the default for first-time visitors
  - Follows the system preference until the visitor picks a theme
  - The chosen theme is saved in `localStorage`
- Sticky navbar with a responsive mobile menu
- Selected work section: 3 projects shown first, the rest open with "View All Projects"
- Experience timeline, technical stack, education, and contact sections
- Subtle scroll reveal animations (disabled for visitors who prefer reduced motion)
- Semantic HTML, keyboard-friendly navigation, visible focus states, and a skip link
- SEO basics: title, meta description, and Open Graph tags

## Project structure

```
.
├── index.html   # Page structure and content
├── style.css    # Design tokens, layout, components, responsive rules
├── main.js      # Theme toggle, mobile menu, project expand, scroll reveal
└── README.md
```

## Run locally

No installation is needed. Open `index.html` in a browser.

Or serve the folder with any static server, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Customize

### Resume link

Search `index.html` for `Replace with CV/Resume URL`. There are three places, and each one currently has `href="#"`:

1. Navbar (desktop)
2. Mobile menu
3. Hero section

Replace `#` with the link to your CV in all three.

### Colors and fonts

All design tokens are CSS variables at the top of `style.css`:

- `:root` holds the light theme colors, plus font, spacing, and layout values
- `[data-theme='dark']` holds the dark theme colors

Change `--accent` in either block to change the accent color.

### Default theme

The theme is chosen by a small script in the `<head>` of `index.html`. To make Dark the default for visitors without a saved choice or system preference, change the fallback inside that script.

### Projects

Each project is an `<li class="project">` in the `#projects` list in `index.html`. To add one, copy an existing item and edit the number, category, title, description, tags, and links. Items with the class `project--more` and the `hidden` attribute appear only after "View All Projects" is pressed.

### Experience and stack

Edit the `<li>` items in the `.timeline` list and the `.stack` groups in `index.html`.

## Deploy to GitHub Pages

1. Push these files to the root of a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Select the `main` branch and the `/ (root)` folder, then save.
5. The site will be available at `https://<username>.github.io/<repository>/` after a minute or two.

If the repository is named `<username>.github.io`, the site is served from `https://<username>.github.io/`.

## Notes

- The Manrope font loads from Google Fonts. Without an internet connection, the page falls back to the system sans-serif font.
- The favicon is a simple inline placeholder. Replace the `<link rel="icon">` line in `index.html` with your own icon file.
- Add an `og:image` meta tag to `index.html` if you want a preview image when the link is shared.

## Contact

- GitHub: [github.com/Elazab2005](https://github.com/Elazab2005)
- LinkedIn: [linkedin.com/in/muhammad-elazab](https://www.linkedin.com/in/muhammad-elazab/)
- Email: mahamed22440@gmail.com
