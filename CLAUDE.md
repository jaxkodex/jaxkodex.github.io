# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Jekyll-based personal blog and portfolio site hosted on GitHub Pages. The site features a bilingual interface (English and Spanish) with blog posts written in Markdown, styled using Tailwind CSS.

## Build and Development Commands

### Jekyll Site (Ruby)
```bash
# Install Ruby dependencies
bundle install

# Start Jekyll development server (default port 4000)
bundle exec jekyll serve

# Build the static site
bundle exec jekyll build
```

### Tailwind CSS (Node.js)
```bash
# Install Node dependencies
npm install

# Development mode (watch for changes)
npm run dev

# Production build (minified CSS)
npm run prod
```

### Combined Development Workflow
Run both Jekyll and Tailwind in separate terminals:
1. Terminal 1: `bundle exec jekyll serve`
2. Terminal 2: `npm run dev`

## Architecture and Structure

### Multilingual Content Organization

The site implements a custom multilingual architecture without using jekyll-multiple-languages-plugin:

- **Root-level pages**: Language-specific index pages (`index.md` for English, `es.md` for Spanish)
- **Blog posts**: Organized by language using `lang` front matter and directory structure:
  - Spanish posts: `_posts/YYYY-MM-DD-title.md` (lang: es)
  - English posts: `_posts/en/YYYY-MM-DD-title.md` (lang: en)
- **Navigation**: Language switcher configured in `_data/navigation.yml`
- **Post filtering**: The `home.html` layout filters posts using: `{% assign posts=site.posts | where:"lang", page.lang %}`

### Tailwind CSS Integration

Tailwind is integrated with Jekyll using a custom build process:

- **Input**: `src/input.css` contains Tailwind directives and custom layer styles
- **Output**: `assets/css/styles.css` (generated, not committed)
- **Post styles**: Custom typography styles defined in `@layer base` for the `.post` class
- **Content paths**: Configured in `tailwind.config.js` to scan `_layouts/**/*.html` and `_includes/**/*.html`

### Jekyll Layouts Hierarchy

- `default.html`: Base layout with meta tags, Google Analytics, and includes header/footer
- `home.html`: Extends default, displays filtered list of posts by language
- `post.html`: Extends default, renders individual blog post content

### Front Matter Requirements for Posts

All blog posts must include:
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
  - category2
---
```

## Important Configuration Files

- `_config.yml`: Site-wide Jekyll configuration including plugins (jekyll-sitemap)
- `_data/navigation.yml`: Language switcher links configuration
- `tailwind.config.js`: Tailwind content paths and custom font family (Raleway)
- `.devcontainer/devcontainer.json`: DevContainer setup with Jekyll, Node.js, and Claude Code

## Creating New Blog Posts

1. Create a new file in the appropriate directory:
   - Spanish: `_posts/YYYY-MM-DD-slug.md`
   - English: `_posts/en/YYYY-MM-DD-slug.md`
2. Add required front matter (see template above)
3. Write content in Markdown
4. Images should be placed in `assets/images/` directory
5. Jekyll will automatically generate the post URL as `/YYYY/MM/DD/slug.html`

## Styling Blog Post Content

Custom post styles are defined in [src/input.css](src/input.css) using Tailwind's `@layer base` directive. The `.post` class provides consistent typography for:
- Paragraphs, headings (h1-h3)
- Lists (ul, ol)
- Links, images
- Tables with borders
- Inline code blocks with syntax highlighting background

## Git Hooks

Husky is configured but the pre-commit hook is currently minimal. The hook infrastructure is in place at `.husky/pre-commit`.
