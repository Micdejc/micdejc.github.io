# Michael Tchuindjang | Personal Website

Personal academic and professional website of **Michael Tchuindjang**, focused on cybersecurity, AI security research, academic publications, professional activities, and selected achievements.

The website is hosted as a static GitHub Pages site and follows a modular structure so that new content can be added without unnecessarily modifying the main page.

---

## Website Structure

```text
micdejc.github.io/
│
├── index.html
│
├── components/
│   ├── nav.html
│   ├── hero.html
│   ├── calendar.html
│   ├── game.html
│   └── footer.html
│
├── sections/
│   ├── about.html
│   ├── research-statement.html
│   ├── research.html
│   ├── flagship.html
│   ├── publications.html
│   ├── news.html
│   ├── projects.html
│   ├── profiles.html
│   ├── experience.html
│   ├── achievements.html
│   ├── service.html
│   ├── mentorship.html
│   ├── features.html
│   ├── blog.html
│   ├── testimonials.html
│   └── contact.html
│
├── content/
│   ├── publications/
│   ├── news/
│   ├── flagship/
│   ├── mentorship/
│   ├── testimonials/
│   └── features/
│
├── blog/
│   └── posts/
│       ├── my-new-cybersecurity-article.html
│       └── ...
│
├── css/
│   ├── style.css
│   ├── terminal.css
│   ├── calendar.css
│   ├── feature-modal.css
│   ├── blog.css
│   ├── game.css
│   ├── testimonials.css
│   └── search.css
│
├── js/
│   ├── main.js
│   ├── calendar.js
│   ├── feature.js
│   ├── blog.js
│   ├── game.js
│   ├── blog-posts.js
│   └── search.js
│
├── assets/
│   ├── favicon.png
│   ├── profile.png
│   ├── news/
│   ├── testimonials/
│   └── features/
│
├── CV.pdf
└── README.md
```

---

# How the Website Is Organized

The website is divided into four main layers.

### `index.html`

The main entry point of the website.

It brings the overall page together and should generally only be modified when the site's overall structure or navigation needs to change.

### `components/`

Contains reusable site-wide elements such as:

- Navigation
- Hero/profile area
- Footer

### `sections/`

Contains the major sections displayed on the website.

Examples:

- About
- Research
- Publications
- News
- Features
- Mentorship
- Achievements
- Service
- Blogs
- Testimonials
- Contact

### `content/`

Contains individual items that belong to dynamic sections.

Examples:

- Individual publications
- Individual news items
- Individual flagship research
- Individual mentorship entries
- Individual testimonial quotes
- Individual professional features

This is normally where new content should be added.

---

# Adding New Content

The general rule is:

> **Add a new content file to the appropriate category, then register it with that category's content list.**

Do not create new content directly inside `index.html` unless the content is part of the permanent page structure.

---

# Publications

Publications are stored in:

```text
content/publications/
```

For example:

```text
content/publications/
├── refusalguard-m.html
├── human-machine-agreement.html
├── cutcaptcha.html
└── grammatical-mirage.html
```

## To add a new publication

1. Create a new HTML file inside:

```text
content/publications/
```

2. Give it a descriptive filename.

For example:

```text
content/publications/new-paper-title.html
```

3. Add the publication to the publication list in:

```text
content/publications/index.js
```

4. Add any associated image or asset under the appropriate `assets/` directory if required.

5. Test the website locally.

6. Commit and push the changes.

### Recommended filename format

Use lowercase and hyphens:

```text
new-paper-title.html
```

Avoid spaces and unnecessarily short names such as:

```text
paper1.html
```

---

# News & Updates

News items are stored in:

```text
content/news/
```

For example:

```text
content/news/
├── refusalguard-m.html
├── ieee-csr-2026.html
├── ukci-2025.html
└── uwe-engineering-showcase.html
```

## To add a new news item

1. Create a new file in:

```text
content/news/
```

2. Use a descriptive filename.

Example:

```text
content/news/new-award.html
```

3. Add the filename to the news content list.

4. If the item has an image, place it in:

```text
assets/news/
```

5. Test locally.

6. Commit and push.

---

# Professional Features

The **Features** section is used for external professional contributions and appearances, such as:

- Expert contributions
- Industry reports
- Professional publications
- Media analysis
- Cybersecurity organizations
- AI reports
- External platforms

Features are stored in:

```text
content/features/
```

Current examples include:

```text
content/features/
├── uk-cyber-security-council.html
├── heads-talk.html
└── ai-and-partners.html
```

Associated logos are stored in:

```text
assets/features/
```

For example:

```text
assets/features/
├── uk-cyber-security-council.png
├── heads-talk.png
└── ai-and-partners.png
```

## To add a new feature

1. Create a new HTML file in:

```text
content/features/
```

2. Use a descriptive filename.

Example:

```text
content/features/new-organization.html
```

3. Add the organization's or publication's official logo to:

```text
assets/features/
```

4. Add the new feature to the Features content list.

5. Include the relevant external link.

6. Ensure the logo has appropriate alternative text.

7. Test the feature on desktop and mobile.

8. Commit and push.

---

# Mentorship

Mentorship entries are stored in:

```text
content/mentorship/
```

For example:

```text
content/mentorship/
├── chris-mayo.html
└── mohammed-almasabi.html
```

## To add a new mentorship entry

1. Create a new HTML file in:

```text
content/mentorship/
```

2. Use a descriptive filename.

Example:

```text
content/mentorship/student-name.html
```

3. Add the file to the mentorship content list.

4. Add any relevant external publication or project links.

5. Test locally.

6. Commit and push.

---

# Testimonials

Testimonials are stored in:

```text
content/testimonials/
```

For example:

```text
content/testimonials/
├── amy.html
├── phil.html
├── thilini.html
└── douglas.html
```

## To add a new testimonial

1. Create a new HTML file inside:

```text
content/testimonials/
```

2. Give it a descriptive filename.

For example:

```text
content/testimonials/new-testimonial-title.html
```

3. Add the testimonial to the testimonial list in:

```text
content/testimonials/index.js
```

4. Add any associated image or asset under the appropriate `assets/` directory if required.

5. Test the website locally.

6. Commit and push the changes.

---

# Blog

The website includes a modular Blog system for publishing cybersecurity, AI security, LLM security, research, and professional insights.

### Add a New Blog Post

1. Create a new HTML file in:

```text
blog/posts/
```

Example:

```text
blog/posts/ai-security-governance.html
```

2. Add the article using this structure:
```text
<article class="blog-article">

    <header class="blog-article-header">

        <h1>
            Your Blog Title
        </h1>

        <div class="blog-article-meta">
            <span>
                22 September 2026
            </span>
        </div>

    </header>

    <div class="blog-content">

        <p>
            Your article content goes here.
        </p>

        <h2>
            Your Section
        </h2>

        <p>
            More content goes here.
        </p>

    </div>

</article>
```
3. Register the post in:

```text
sections/blog.html
```
Add the following inside `#blog-source`:
```text
<article
    class="blog-entry"
    data-title="Your Blog Title"
    data-slug="your-blog-title"
    data-date="2026-09-22"
    data-category="AI Security"
    data-type="internal"
    data-url="blog/posts/ai-security-governance.html"
    data-description="A short description of the article."
    data-tags="AI Security,Cybersecurity"
></article>
```
4. Save and refresh the website.

The Blog system automatically generates the preview, calculates reading time from `.blog-content`, and handles filtering, pagination, and the full article view.

---

# Adding Images and Other Assets

Static assets are stored under:

```text
assets/
```

Use the appropriate subdirectory whenever possible.

### Profile images

```text
assets/profile.png
```

### News images

```text
assets/news/
```

### Feature logos

```text
assets/features/
```

If a new content category requires many images, create a dedicated directory.

For example:

```text
assets/projects/
```

Keep filenames descriptive and use lowercase with hyphens.

---

# Adding a New Content Category

If a new type of content is needed in the future, follow the existing modular pattern.

For example, a future **Talks & Presentations** category could use:

```text
content/talks/
├── conference-presentation.html
├── webinar.html
└── guest-lecture.html
```

with a corresponding section under:

```text
sections/
```

and any required assets under:

```text
assets/
```

The new category should follow the same organizational principles as Publications, News, Mentorship, and Features.

---

# Adding a New Website Section

A new section should normally be created when the website needs to introduce a **new type of information**, rather than simply adding another item to an existing category.

Examples of appropriate future sections:

- Talks & Presentations
- Media
- Teaching
- Research Datasets
- Software & Tools
- Consulting
- Press Coverage

Before creating a new section, check whether the content already belongs naturally in an existing category.

For example:

- A new paper → **Publications**
- A new award announcement → **News**
- A new external report contribution → **Features**
- A new student project → **Mentorship**
- A new research tool → potentially **Projects**

This keeps the website organized and prevents unnecessary duplication.

---

# Naming Conventions

Use descriptive, lowercase filenames with hyphens.

Recommended:

```text
refusalguard-m.html
grammatical-mirage.html
uk-cyber-security-council.html
new-research-award.html
```

Avoid:

```text
Paper1.html
New Paper.html
feature_01.html
test.html
```

The filename should make the purpose of the content immediately clear.

---

# External Links

When adding external content, link directly to the relevant official publication, organization, report, paper, or profile whenever possible.

Examples include:

- Official organization websites
- Publisher pages
- Conference pages
- Research repositories
- Professional reports
- Media articles
- GitHub repositories
- ORCID
- Google Scholar
- LinkedIn

Avoid unnecessary intermediary links.

---

# Logos and Branding

For professional Features, use the official logo of the relevant organization or publication whenever appropriate.

Recommended location:

```text
assets/features/
```

Keep logos:

- High quality
- Appropriately sized
- Proportionally displayed
- Clearly identifiable

Do not unnecessarily edit or distort organizational logos.

---

# Updating Existing Content

If an existing item needs to be corrected or updated:

1. Locate the relevant file under `content/`.
2. Edit that file directly.
3. Do not create a duplicate unless the update represents a genuinely new item.
4. Check associated assets and links.
5. Test locally.
6. Commit and push.

---

# Changing the Website Structure

Changes to the overall structure should generally be made in:

```text
index.html
```

or:

```text
sections/
components/
```

Examples include:

- Adding a new navigation item
- Reordering major sections
- Changing the hero area
- Adding a new permanent section
- Modifying the footer

Routine content additions should **not** require restructuring the website.

---

# Styling

General website styling is located in:

```text
css/style.css
```

Terminal-mode styling is located in:

```text
css/terminal.css
```

When introducing a new component, prefer adding new CSS selectors rather than modifying unrelated existing components.

This reduces the risk of unintentionally changing other parts of the website.

---

# JavaScript

The main JavaScript file is:

```text
js/main.js
```

The content categories have their own loaders inside:

```text
content/
```

For normal content updates, there should usually be no need to modify `main.js`.

Only modify the JavaScript structure when:

- Adding a new content category
- Changing how content is loaded
- Adding a new interactive feature
- Changing the website's overall behavior

---

# Calendar

The website includes an integrated calendar designed to provide a broad view of important dates, holidays, and observances throughout the year.

## Features

- **UK public holidays** and bank holidays
- **Religious observances** from multiple traditions
- **Cultural and international observances**
- **Awareness days and commemorative events**
- **Upcoming-event notifications** with dynamically generated reminders
- **Responsive calendar interface** for desktop and mobile devices

## Data Sources

The calendar combines data from established calendar and holiday datasets to provide broader coverage than a standard UK public-holiday calendar.

The implementation currently uses:

- **Hebcal** for Jewish holidays and observances
- **Hindu festival data** for Hindu religious observances
- Additional calendar data sources for UK holidays and broader international observances

Where possible, events are represented using their official or commonly recognized names, dates, and relevant descriptions.

---

# Games & Hobbies

The website includes **DLN (Deviner le Nombre)**, an interactive number-guessing game designed and developed by me.

Players progress through increasingly challenging levels by guessing a randomly generated number, with attempts, hints, bonuses, super hits, and scores tracked throughout the session. The game also includes animated feedback for correct and incorrect guesses, level progression, and new records.

The game runs entirely in the browser and does **not require a database or server-side storage**. The current high score is maintained as a JavaScript session variable and resets when the page is refreshed.

The game is integrated directly into the website through a responsive modal and automatically follows the site's light and dark themes.

---
# Local Testing

Before publishing changes, test the website locally.

Because the site loads some content dynamically, it should be served through a local web server rather than opened directly as a `file://` document.

For example:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Check the website on:

- Desktop
- Tablet
- Mobile

Also check the browser console for errors.

---

# Content Addition Checklist

Before adding new content:

- [ ] Identify the correct category.
- [ ] Create a descriptive filename.
- [ ] Add the content to the appropriate `content/` directory.
- [ ] Register the new item with the category.
- [ ] Add required images or logos.
- [ ] Check all external links.
- [ ] Check image alternative text.
- [ ] Test desktop layout.
- [ ] Test mobile layout.
- [ ] Check terminal mode if relevant.
- [ ] Check the browser console.
- [ ] Commit the changes.
- [ ] Push to GitHub.

---

# New Category Checklist

When creating a completely new category:

- [ ] Create the appropriate directory under `content/`.
- [ ] Create the corresponding section under `sections/`.
- [ ] Create the category's content list/loader.
- [ ] Add the category to the main website structure.
- [ ] Add navigation if appropriate.
- [ ] Create any required CSS.
- [ ] Create an assets directory if needed.
- [ ] Test desktop and mobile layouts.
- [ ] Test terminal mode if applicable.
- [ ] Update this README.

---

# GitHub Pages Deployment

The website is hosted through GitHub Pages.

After making changes:

```bash
git add .
git commit -m "Update website"
git push
```

GitHub Pages will deploy the updated repository according to the repository's configured Pages settings.

Allow a short period for the changes to become visible online.

---

# Recommended Commit Messages

Keep commit messages short and descriptive.

Examples:

```text
Add new publication
Add UKCSC feature
Update research profile
Add conference news
Update mentorship section
Add new professional achievement
Update website navigation
```

Avoid vague messages such as:

```text
update
changes
stuff
website
```

---

# Maintenance Principles

The website should remain:

- **Modular**: content is separated into manageable files.
- **Simple**: avoid unnecessary frameworks or infrastructure.
- **Maintainable**: future updates should be straightforward.
- **Consistent**: new content should follow existing layouts.
- **Accessible**: images, links, and navigation should remain usable.
- **Responsive**: content should work across desktop, tablet, and mobile.
- **Professional**: external links and organizational branding should be accurate.
- **Lightweight**: avoid unnecessary dependencies.

---

# Quick Reference

| Task                   | Location                 |
| ---------------------- | ------------------------ |
| Main website structure | `index.html`             |
| Navigation             | `components/nav.html`    |
| Hero/profile           | `components/hero.html`   |
| Footer                 | `components/footer.html` |
| Major page sections    | `sections/`              |
| Blogs                  | `blog/posts/`          |
| Publications           | `content/publications/`  |
| News                   | `content/news/`          |
| Mentorship             | `content/mentorship/`    |
| Professional Features  | `content/features/`      |
| General styling        | `css/style.css`          |
| Terminal styling       | `css/terminal.css`       |
| Main JavaScript        | `js/main.js`             |
| Calendar JavaScript    | `js/calendar.js`         |
| Game JavaScript        | `js/game.js`             |
| Profile assets         | `assets/`                |
| News images            | `assets/news/`           |
| Feature logos          | `assets/features/`       |
| CV                     | `CV.pdf`                 |

---

# General Rule for Future Updates

When adding something new, first ask:

> **Is this a new type of content, or is it another item within an existing category?**

If it belongs to an existing category, add a new content item there.

If it represents a genuinely new type of information, consider creating a new section and category.

The goal is to keep the website easy to maintain as the number of publications, achievements, professional contributions, research activities, and other content grows.
