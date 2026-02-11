# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal blog and portfolio site hosted on GitHub Pages. The site features a bilingual interface (English and Spanish) with blog posts written in Markdown, styled using Tailwind CSS. The homepage is a single-page landing with anchor-linked sections (hero, works, craftsmanship, blog, contact).

## Build and Development Commands

### Jekyll Site (Ruby)
```bash
bundle install               # Install Ruby dependencies
bundle exec jekyll serve     # Start dev server (port 4000)
bundle exec jekyll build     # Build static site to _site/
```

### Tailwind CSS (Node.js)
```bash
npm install                  # Install Node dependencies
npm run dev                  # Watch mode (rebuilds on file changes)
npm run prod                 # Production build (minified)
```

### Combined Development Workflow
Run both in separate terminals:
1. `bundle exec jekyll serve`
2. `npm run dev`

## Architecture and Structure

### Layouts Hierarchy

- `default.html`: Base layout — SEO meta tags, Google Fonts (Raleway, Space Grotesk, Source Code Pro), Google Analytics, structured data, includes header/footer
- `landing.html`: Extends default — single-page homepage with section includes (hero, works, craftsmanship, blog)
- `post.html`: Extends default — individual blog post with `.post` typography class
- `page.html`: Extends default — generic content pages (about, services)
- `home.html`: Legacy layout (replaced by `landing.html` for homepages)

### Landing Page Sections (`_includes/landing/`)

The homepage is composed of four section includes, each with bilingual support via `{% if page.lang == "es" %}{% endif %}` conditionals:

- `hero.html`: Large name typography, subtitle, tech badges, CSS-animated scrolling ticker
- `works.html`: Portfolio grid loaded from `_data/works.yml` or `_data/works_es.yml`
- `craftsmanship.html`: Services section with numbered items (01-03)
- `blog.html`: Recent posts filtered by `site.posts | where:"lang", page.lang`

### Multilingual Content Organization

Custom bilingual architecture without plugins:

- **Homepages**: `index.md` (English, layout: landing), `es.md` (Spanish, layout: landing)
- **Blog posts**: `_posts/YYYY-MM-DD-title.md` (lang: es), `_posts/en/YYYY-MM-DD-title.md` (lang: en)
- **Pages**: Parallel files — `about.md`/`acerca-de.md`, `services.md`/`servicios.md`
- **Navigation**: Language switcher in `_data/navigation.yml`
- **Data files**: Parallel YAML files — `_data/works.yml`/`_data/works_es.yml`
- **Post filtering**: `{% assign posts = site.posts | where:"lang", page.lang %}`

### Design System

- **Background**: Pure black (`bg-black`) with `bg-gray-950`/`bg-gray-900` for cards
- **Accent color**: Lime/chartreuse (`lime-400` for highlights, `lime-300` for hover)
- **Fonts**: Space Grotesk (`font-display`) for headings, Raleway (`font-sans`) for body, Source Code Pro for code
- **Borders**: `border-gray-800` subtle borders on cards and sections
- **Navigation**: Fixed sticky header with `bg-black/80 backdrop-blur-md`

### Tailwind CSS Integration

- **Input**: `src/input.css` — Tailwind directives, `.post` typography styles, ticker utility
- **Output**: `assets/css/styles.css` (generated, do not edit directly)
- **Config**: `tailwind.config.js` — font families (sans, display), scroll animation keyframes, custom slate-750 color
- **Content paths**: Scans `_layouts/`, `_includes/`, root `.md` files, and `_posts/`

### Front Matter Requirements for Posts

```yaml
---
layout: post
title: "Post Title"
subtitle: "Post Subtitle"
summary: "Brief summary for listings"
image: /assets/images/image.png  # For social media cards
lang: en  # or 'es'
categories:
  - category1
---
```

## Key Data Files

- `_data/works.yml` / `_data/works_es.yml`: Portfolio projects (id, title, subtitle, description, year, gradient, tags)
- `_data/navigation.yml`: Language switcher links
- `_config.yml`: Site config — title, url, languages, plugins (jekyll-sitemap)

## Creating New Blog Posts

1. Create file: `_posts/YYYY-MM-DD-slug.md` (Spanish) or `_posts/en/YYYY-MM-DD-slug.md` (English)
2. Add required front matter (see template above)
3. Write content in Markdown
4. Place images in `assets/images/` directory
5. Rebuild Tailwind CSS if new utility classes are used

## Styling Blog Post Content

Custom post styles are defined in `src/input.css` using Tailwind's `@layer base` directive. The `.post` class provides consistent typography for paragraphs, headings (h1-h3), lists, links, images, tables, and code blocks.

## Git Hooks

Husky is configured with a minimal pre-commit hook at `.husky/pre-commit`.
