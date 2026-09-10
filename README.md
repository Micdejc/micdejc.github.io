# Michael Tchuindjang | Academic & Professional Website

Personal academic and professional website of **Michael Tchuindjang**, a cybersecurity researcher, educator, and AI security professional.

The website focuses on:

- Cybersecurity and AI security research
- Large Language Model (LLM) security
- Multi-turn jailbreak research
- Research publications
- Open-source projects
- Academic experience
- Teaching and mentorship
- Professional service
- Awards and recognition
- Conferences and research activities

The website is intentionally built as a **lightweight modular static website** using HTML, CSS, and JavaScript. It is designed to run on **GitHub Pages** without a frontend framework or build system. GitHub Pages can publish a repository directly as a website, making this architecture suitable for a simple academic portfolio.

---

## 🌐 Website

**Live website:**

`https://micdejc.github.io/`

**Repository:**

`https://github.com/Micdejc/micdejc.github.io`

---

# 📁 Project Structure

```text
micdejc.github.io/
│
├── index.html
│
├── components/
│   ├── nav.html
│   ├── hero.html
│   └── footer.html
│
├── sections/
│   ├── about.html
│   ├── research-statement.html
│   ├── research.html
│   ├── flagship-refusalguard.html
│   ├── flagship-grammatical-mirage.html
│   ├── publications.html
│   ├── news.html
│   ├── projects.html
│   ├── profiles.html
│   ├── experience.html
│   ├── achievements.html
│   ├── service.html
│   ├── mentorship.html
│   └── contact.html
│
├── content/
│   ├── news/
│   │   ├── index.js
│   │   ├── refusalguard-m.html
│   │   ├── ieee-csr-2026.html
│   │   ├── ukci-2025.html
│   │   └── uwe-engineering-showcase.html
│   │
│   ├── publications/
│   │   ├── index.js
│   │   ├── refusalguard-m.html
│   │   ├── human-machine-agreement.html
│   │   ├── cutcaptcha.html
│   │   └── grammatical-mirage.html
│   │
│   └── mentorship/
│       ├── chris-mayo.html
│       └── mohammed-almasabi.html
│
├── css/
│   ├── style.css
│   └── terminal.css
│
├── js/
│   └── main.js
│
├── assets/
│   ├── profile.png
│   └── news/
│       ├── refusalguard-m-publication.jpg
│       ├── ieee-csr-2026.jpg
│       ├── ukci2025award.jpg
│       └── uwe-engineering-showcase.jpg
│
└── CV.pdf
```

---

# 🏗️ Architecture

The website is divided into several layers:

```text
index.html
    │
    ├── components/
    │
    ├── sections/
    │
    ├── content/
    │
    ├── css/
    │
    ├── js/
    │
    └── assets/
```

Each directory has a specific responsibility.

| Directory | Purpose |
|---|---|
| `index.html` | Main HTML shell and metadata |
| `components/` | Reusable structural elements |
| `sections/` | Main homepage sections |
| `content/` | Individual publications, news items, mentorship entries |
| `css/` | Global and terminal-mode styling |
| `js/` | Main application logic |
| `assets/` | Images and other static assets |
| `CV.pdf` | Downloadable CV |

---

# 🧩 Components

The `components/` directory contains reusable structural elements:

```text
components/
├── nav.html
├── hero.html
└── footer.html
```

## Navigation

```text
components/nav.html
```

Contains:

- Main navigation
- Section links
- Theme toggle
- Terminal-mode toggle

If the navigation needs to change, edit this file rather than `index.html`.

---

## Hero

```text
components/hero.html
```

Contains:

- Name
- Professional title
- Introduction
- Profile image
- CV link
- Social/profile links

For example:

```text
GitHub
LinkedIn
Google Scholar
ORCID
Email
```

---

## Footer

```text
components/footer.html
```

Contains:

- Footer information
- Copyright
- Current year
- Footer links

The year is populated dynamically by JavaScript.

---

# 📑 Sections

The `sections/` directory contains the main sections of the homepage.

```text
sections/
├── about.html
├── research-statement.html
├── research.html
├── flagship-refusalguard.html
├── flagship-grammatical-mirage.html
├── publications.html
├── news.html
├── projects.html
├── profiles.html
├── experience.html
├── achievements.html
├── service.html
├── mentorship.html
└── contact.html
```

A section defines the **layout and structure** of a part of the website.

For example:

```text
sections/publications.html
```

defines the Publications section.

Likewise:

```text
sections/news.html
```

defines the News section and contains the container into which individual news items are inserted.

---

# 📰 Content vs Sections

This distinction is important.

## Sections define structure

For example:

```text
sections/news.html
```

defines:

```text
Latest News
       │
       └── News grid
```

## Content defines individual items

For example:

```text
content/news/refusalguard-m.html
```

defines one news card.

Therefore:

```text
sections/news.html
```

should **not** contain every news article.

Instead:

```text
content/news/
├── refusalguard-m.html
├── ieee-csr-2026.html
├── ukci-2025.html
└── uwe-engineering-showcase.html
```

contains the individual news items.

The same principle applies to publications.

---

# 📰 Adding a New News Item

Adding news is designed to be simple.

Suppose you want to add:

> Michael featured in a cybersecurity publication

## Step 1: Create the HTML file

Create:

```text
content/news/cybersecurity-feature.html
```

A news item should contain **one article**.

Example:

```html
<article class="news-card">

    <a
        href="YOUR_EXTERNAL_LINK"
        target="_blank"
        rel="noopener"
        class="news-image-link"
    >
        <img
            src="assets/news/cybersecurity-feature.jpg"
            alt="Michael Tchuindjang featured in cybersecurity publication"
        >
    </a>

    <div class="news-content">

        <div class="news-date">
            SEP 2026
        </div>

        <h3>
            Featured in Cybersecurity Publication
        </h3>

        <p>
            A short description of the announcement,
            feature, award, publication, conference,
            or professional activity.
        </p>

        <a
            href="YOUR_EXTERNAL_LINK"
            target="_blank"
            rel="noopener"
            class="news-link"
        >
            Read more →
        </a>

    </div>

</article>
```

### Important

A content file is an **HTML fragment**.

Do not add:

```html
<html>
<head>
<body>
```

The file is inserted into the existing homepage by JavaScript.

---

# 🖼️ Adding the News Image

Place the image in:

```text
assets/news/
```

For example:

```text
assets/news/cybersecurity-feature.jpg
```

Then reference it:

```html
<img
    src="assets/news/cybersecurity-feature.jpg"
    alt="Cybersecurity publication feature"
>
```

Recommended image filename conventions:

```text
refusalguard-m-publication.jpg
ieee-csr-2026.jpg
ukci2025award.jpg
cybersecurity-feature.jpg
```

Avoid filenames containing spaces:

```text
My New Image FINAL.jpg
```

Prefer:

```text
my-new-image.jpg
```

---

# 🔌 Registering a New News Item

Open:

```text
content/news/index.js
```

The loader maintains the list of news files.

Add your new file:

```javascript
const files = [
    "refusalguard-m.html",
    "ieee-csr-2026.html",
    "ukci-2025.html",
    "uwe-engineering-showcase.html",
    "cybersecurity-feature.html"
];
```

The loader then fetches the new HTML file and inserts it into the News grid.

---

# 📚 Adding a New Publication

Publications follow the same architecture.

Create:

```text
content/publications/my-new-paper.html
```

For example:

```html
<article class="publication-card">

    <div class="publication-year">
        2026
    </div>

    <div class="publication-content">

        <h3>
            Title of the New Publication
        </h3>

        <p>
            Short description of the publication,
            its contribution, or research focus.
        </p>

        <p class="publication-meta">
            <strong>Journal:</strong>
            Journal Name
        </p>

        <div class="publication-links">

            <a
                href="YOUR_PAPER_URL"
                target="_blank"
                rel="noopener"
            >
                Paper ↗
            </a>

            <a
                href="YOUR_CODE_URL"
                target="_blank"
                rel="noopener"
            >
                Code ↗
            </a>

        </div>

    </div>

</article>
```

Then register it in:

```text
content/publications/index.js
```

For example:

```javascript
const files = [
    "refusalguard-m.html",
    "human-machine-agreement.html",
    "cutcaptcha.html",
    "grammatical-mirage.html",
    "my-new-paper.html"
];
```

---

# 🎓 Adding a Mentorship Item

Mentorship content lives in:

```text
content/mentorship/
```

Create:

```text
content/mentorship/new-student.html
```

Use the same HTML structure as the existing mentorship entries.

Then add the file to the list in the mentorship loader.

For example:

```javascript
const files = [
    "chris-mayo.html",
    "mohammed-almasabi.html",
    "new-student.html"
];
```

---

# ⚙️ Content Loaders

Each dynamic content type has its own loader.

```text
content/
├── news/
│   └── index.js
│
├── publications/
│   └── index.js
│
└── mentorship/
    └── index.js
```

The loaders are responsible for:

1. Finding the relevant container.
2. Fetching the individual HTML files.
3. Inserting the HTML into the page.

---

## Publications Loader

The publication loader is located at:

```text
content/publications/index.js
```

It should export:

```javascript
export async function loadPublications() {
    // publication loading logic
}
```

It is imported by `main.js`:

```javascript
import {
    loadPublications
} from "../content/publications/index.js";
```

Then initialized:

```javascript
await loadPublications();
```

---

## News Loader

The News loader is located at:

```text
content/news/index.js
```

It should export:

```javascript
export async function loadNews() {
    // news loading logic
}
```

It is imported by:

```javascript
import {
    loadNews
} from "../content/news/index.js";
```

Then initialized:

```javascript
await loadNews();
```

---

## Mentorship Loader

Mentorship follows the same pattern:

```javascript
export async function loadMentorship() {
    // mentorship loading logic
}
```

and:

```javascript
import {
    loadMentorship
} from "../content/mentorship/index.js";
```

---

# 🧠 `main.js`

The main JavaScript entry point is:

```text
js/main.js
```

It coordinates the website.

A typical initialization sequence is:

```javascript
await loadPublications();
await loadNews();
await loadMentorship();
```

Other global functionality may include:

```text
Theme switching
Terminal mode
Console animation
Current year
Navigation behaviour
```

---

# 📌 Important JavaScript Rule

Because the project uses ES modules, imports must be at the **top level** of `main.js`.

Correct:

```javascript
import {
    loadPublications
} from "../content/publications/index.js";

import {
    loadNews
} from "../content/news/index.js";


async function loadPage() {

    await loadPublications();
    await loadNews();

}
```

Incorrect:

```javascript
async function loadPage() {

    import {
        loadNews
    } from "../content/news/index.js";

}
```

---

# 🧱 HTML Module Rule

Content files are fragments.

For example:

```text
content/news/refusalguard-m.html
```

should contain:

```html
<article class="news-card">
    ...
</article>
```

It should **not** contain:

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
```

The same applies to publications and mentorship content.

---

# 🎨 Styling

Global styling is located in:

```text
css/style.css
```

Terminal-specific styling is located in:

```text
css/terminal.css
```

Use `style.css` for:

- Typography
- Layout
- Colors
- Navigation
- Cards
- Buttons
- Sections
- Responsive design
- Research/publication/news styling

Use `terminal.css` for:

- Terminal mode
- Terminal colors
- Terminal typography
- Terminal-specific effects

---

# 🖌️ Reusing Existing CSS Classes

When adding content, reuse the existing classes.

For News:

```text
news-card
news-image-link
news-content
news-date
news-link
```

For Publications:

```text
publication-card
publication-year
publication-content
publication-meta
publication-links
```

This ensures new content automatically receives the existing visual design.

Avoid creating new CSS classes unless the new content actually requires a different presentation.

---

# 🔗 Links

External links should normally use:

```html
target="_blank"
rel="noopener"
```

Example:

```html
<a
    href="https://example.com"
    target="_blank"
    rel="noopener"
>
    Read more ↗
</a>
```

Internal navigation can use section anchors:

```html
<a href="#research">
    Research
</a>
```

---

# 🖼️ Assets

Images and other static resources are stored in:

```text
assets/
```

News images are stored in:

```text
assets/news/
```

The profile image is:

```text
assets/profile.png
```

The CV is:

```text
CV.pdf
```

---

# 🧪 Local Development

Because the site dynamically loads HTML files using JavaScript `fetch()`, it should be tested through a local HTTP server rather than by opening `index.html` directly with `file://`.

For example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

You can also use a local development server such as VS Code Live Server.

---

# 🚀 GitHub Pages Deployment

The website is designed to run as a static GitHub Pages site.

After making changes:

```bash
git add .
git commit -m "Update website content"
git push
```

GitHub Pages will publish the updated repository according to the repository's configured publishing source.

---

# 🔄 Typical Workflows

## Add a publication

```text
1. Create:
   content/publications/my-paper.html

2. Add the filename to:
   content/publications/index.js

3. Add any required image to:
   assets/

4. Test locally.

5. Commit and push.
```

---

## Add a news item

```text
1. Create:
   content/news/my-news.html

2. Add the filename to:
   content/news/index.js

3. Add the image to:
   assets/news/

4. Test locally.

5. Commit and push.
```

---

## Add a mentorship entry

```text
1. Create:
   content/mentorship/my-student.html

2. Register the file in:
   content/mentorship/index.js

3. Test locally.

4. Commit and push.
```

---

## Modify an existing section

Edit the relevant file in:

```text
sections/
```

For example:

```text
sections/research.html
```

or:

```text
sections/experience.html
```

No change to `index.html` is normally required.

---

# 📋 Section Reference

| Website Area | File |
|---|---|
| Navigation | `components/nav.html` |
| Hero | `components/hero.html` |
| About | `sections/about.html` |
| Research Statement | `sections/research-statement.html` |
| Research | `sections/research.html` |
| RefusalGuard-M | `sections/flagship-refusalguard.html` |
| Grammatical Mirage | `sections/flagship-grammatical-mirage.html` |
| Publications | `sections/publications.html` |
| News | `sections/news.html` |
| Projects | `sections/projects.html` |
| Profiles | `sections/profiles.html` |
| Experience | `sections/experience.html` |
| Achievements | `sections/achievements.html` |
| Service | `sections/service.html` |
| Mentorship | `sections/mentorship.html` |
| Contact | `sections/contact.html` |
| Footer | `components/footer.html` |

---

# 📚 Current Publications

The current publication content is located in:

```text
content/publications/
```

Current entries include:

```text
refusalguard-m.html
human-machine-agreement.html
cutcaptcha.html
grammatical-mirage.html
```

---

# 📰 Current News

The current News content is located in:

```text
content/news/
```

Current entries include:

```text
refusalguard-m.html
ieee-csr-2026.html
ukci-2025.html
uwe-engineering-showcase.html
```

---

# 🎓 Current Mentorship

The current mentorship content includes:

```text
content/mentorship/
├── chris-mayo.html
└── mohammed-almasabi.html
```

---

# ⚠️ Common Errors

## `loadPublications is not defined`

Make sure the function is exported:

```javascript
export async function loadPublications() {
    ...
}
```

and imported correctly:

```javascript
import {
    loadPublications
} from "../content/publications/index.js";
```

---

## `loadNews is not defined`

Check:

```javascript
export async function loadNews() {
    ...
}
```

and:

```javascript
import {
    loadNews
} from "../content/news/index.js";
```

---

## `The requested module does not provide an export`

This usually means the function is defined but not exported.

Incorrect:

```javascript
async function loadPublications() {
    ...
}
```

Correct:

```javascript
export async function loadPublications() {
    ...
}
```

---

## `Failed to fetch`

Check:

1. The file exists.
2. The path is correct.
3. The filename matches exactly.
4. Capitalization matches.
5. The site is being served through HTTP rather than `file://`.

For example:

```text
content/news/refusalguard-m.html
```

is different from:

```text
content/news/RefusalGuard-M.html
```

on case-sensitive hosting environments.

---

# 🧭 Design Philosophy

The architecture intentionally separates:

```text
STRUCTURE
    ↓
CONTENT
    ↓
PRESENTATION
    ↓
BEHAVIOUR
```

### Structure

```text
components/
sections/
```

Defines what the website looks like structurally.

### Content

```text
content/
```

Contains individual publications, news stories, and mentorship entries.

### Presentation

```text
css/
```

Controls the visual design.

### Behaviour

```text
js/
```

Controls dynamic functionality and content loading.

---

# ➕ Adding Content Without Touching `index.html`

One of the main goals of this architecture is to avoid turning `index.html` into a large monolithic file.

For example, adding a new publication should normally involve only:

```text
content/publications/my-paper.html
content/publications/index.js
```

Adding a new news story should normally involve:

```text
content/news/my-story.html
content/news/index.js
assets/news/my-story.jpg
```

The homepage structure remains unchanged.

---

# 🔒 Content Integrity

When adding academic publications, research projects, awards, or professional activities:

- Use accurate publication titles.
- Use official publication URLs where possible.
- Use the correct publication year.
- Use the correct venue.
- Link to the DOI or publisher page when available.
- Link to GitHub repositories where appropriate.
- Use accurate descriptions of research contributions.
- Avoid claiming awards, positions, or affiliations that have not been formally confirmed.

---

# ♿ Accessibility

When adding images, always provide meaningful `alt` text.

Good:

```html
<img
    src="assets/news/ukci2025award.jpg"
    alt="Michael Tchuindjang receiving the UKCI 2025 Best Paper Award"
>
```

Avoid:

```html
<img
    src="assets/news/ukci2025award.jpg"
    alt="image"
>
```

Use semantic HTML such as:

```html
<article>
<h2>
<h3>
<p>
<a>
<button>
```

where appropriate.

---

# 🔧 Maintenance Principles

When maintaining the website:

### Prefer

```text
Small HTML files
Reusable CSS classes
Dedicated content loaders
Descriptive filenames
Semantic HTML
Relative paths
```

### Avoid

```text
One huge index.html
Duplicated HTML
Inline CSS everywhere
Duplicated JavaScript
Hard-coded content in multiple locations
Unnecessary frameworks
```

---

# 📌 Quick Reference

### New news item

```text
content/news/new-item.html
        ↓
content/news/index.js
        ↓
News section
```

### New publication

```text
content/publications/new-paper.html
        ↓
content/publications/index.js
        ↓
Publications section
```

### New mentorship item

```text
content/mentorship/new-student.html
        ↓
content/mentorship/index.js
        ↓
Mentorship section
```

### New homepage section

```text
sections/new-section.html
        ↓
js/main.js
        ↓
Homepage
```

### New reusable component

```text
components/new-component.html
        ↓
js/main.js
        ↓
Homepage
```

---

# 👤 Author

**Michael Tchuindjang**

Cybersecurity Researcher | AI Security Researcher | Educator

Research interests include:

- LLM security
- Multi-turn jailbreaking
- Adversarial AI
- AI security
- Representation engineering
- Cybersecurity
- Human-AI interaction
- AI governance

---

# 📄 License

This repository primarily represents a personal academic and professional website.

Unless otherwise stated, website text, personal branding, photographs, CV material, and original content are the property of **Michael Tchuindjang**.

Individual research papers, datasets, repositories, images, and third-party resources remain subject to their respective licenses and copyright terms.

---

# ⭐ Maintenance Summary

The most important rule to remember is:

> **Sections define where content appears. Content files define what appears. Loaders connect the two.**

Therefore:

```text
New publication
→ create HTML
→ register it in publications/index.js

New news item
→ create HTML
→ add image
→ register it in news/index.js

New mentorship item
→ create HTML
→ register it in mentorship/index.js

Change layout
→ edit sections/

Change design
→ edit css/

Change functionality
→ edit js/

Change navigation/hero/footer
→ edit components/
```

This keeps the website modular, maintainable, and easy to extend as the research portfolio grows.