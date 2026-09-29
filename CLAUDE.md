# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Lab website for rund0wn/lab-website, published at https://rund0wn.github.io/lab-website/. Jekyll static site deployed to GitHub Pages from `main` via [.github/workflows/pages.yml](.github/workflows/pages.yml). Sample content is still the zeikar.github.io template. No custom domain. No JS/Node toolchain. No test suite.

## Commands

- `bundle install` — install gems (Ruby + Bundler required)
- `bundle exec jekyll serve` — dev server at http://127.0.0.1:4000/lab-website/, auto-rebuild
- `bundle exec jekyll build` — production build to `_site/`

## Non-obvious architecture

### OG images come from a plugin, not from front matter

[_plugins/og_image.rb](_plugins/og_image.rb) runs at `post_read` and auto-fills `page.image` with `https://dogimg.vercel.app/api/og?url=<page-url>` whenever a doc lacks an explicit `image:`. Coverage: **`site.documents`** (posts + every collection doc, including `_projects/*.md`) plus **top-level pages with `layout: default`**. `jekyll-seo-tag` then emits `og:image` / `twitter:image` from `page.image`. Don't add a layout-level OG-image fallback in [_layouts/default.html](_layouts/default.html) — it would be dead code under this plugin.

A project's explicit `image:` is therefore also its `og:image`, so keep it PNG (not every link-preview crawler reads WebP). For display, [_includes/image-src.html](_includes/image-src.html) swaps in a same-named `.webp` sibling when one exists in `site.static_files`; the home card and the project page both go through it.

### SEO signals live in the layout, not in _config.yml

[_layouts/default.html](_layouts/default.html) injects:

- WebSite JSON-LD with `alternateName` — homepage only (gated on `page.url == '/'`)
- Person JSON-LD with `sameAs` — `/about/` only
- `<link rel="alternate" hreflang>` (en / ko / x-default) — for any page with `translations:` in front matter

When debugging Google/social cards, check the layout AND [_plugins/og_image.rb](_plugins/og_image.rb) before `_config.yml`.

### Language switch

The header shows EN / PL on every page. Polish copy is not written yet. When a translation exists, set `translations.pl` to its path in that page's front matter and [_layouts/default.html](_layouts/default.html) turns PL into a link. The template blog and resume were removed.

### Members are a collection, like projects

`/members/` replaces the old resume page (`/resume/` and `/resume-ko/` redirect there). People are `_members/*.md` with `output: false`, so the bio expands on the members page and a person does not get a URL. `group` is `leader`, `postdoc`, `student`, `staff`, or `alumni`. `sequence` orders people inside a group. `position` is shown for students, staff, and alumni. The markdown body is the bio; alumni cards do not open one. `image` is the portrait (PNG, optional `.webp` sibling via [_includes/image-src.html](_includes/image-src.html)).

### Sitemap is hand-rolled

The site does **not** use `jekyll-sitemap` despite the Gemfile listing — it's not in the `plugins:` array in [_config.yml](_config.yml). [sitemap.xml](sitemap.xml) is a manual sitemap index pointing at [sitemap-main.xml](sitemap-main.xml) — pages, posts, projects, plus paths from `extra_sitemap_urls:` in `_config.yml`. [robots.txt](robots.txt) is Liquid and points at that index.

### Project ordering

`_projects/*.md` are sorted by integer `sequence:` in front matter on the home page and in [sitemap-main.xml](sitemap-main.xml). `sequence` is the curated display order ("listed here by preference"); `gadget_no` is the UNIT number by build order and never changes. New project entries need both. If `demo_url` contains `site.url`, it auto-joins the sitemap — don't also list it in `extra_sitemap_urls`.

### Manifest needs empty Jekyll front matter

[assets/images/site.webmanifest](assets/images/site.webmanifest) starts with `---` / `---` so Jekyll runs Liquid on it. Without that, `{{ site.title }}` ships as a literal string. The IDE will flag the file as invalid JSON — that's expected; Jekyll strips the front matter at build time.

## Content tone

Home and About copy intentionally lean playful and self-deprecating to match the `(>_<)` favicon. The members page stays straightforward. Don't carry that tone into home/about, or vice versa.

Project pages have no shared template. Open with a paragraph that says what the thing is, then build sections around that project's strongest technical points, with project-specific headings and details checked against the source repo. The old Overview / Key Features / Challenges / What I Learned / Impact skeleton is retired. `description` is both the card text and the hero summary; the card shows the first 6 `tech_stack` items, listed without version numbers. Link sibling projects as `/projects/<name>/`.

In `.html` page bodies, HTML-escape angle brackets in copy: `(&gt;_&lt;)`, not `(>_<)`. Kramdown only processes `.md`, but the HTML parser can still misread a bare `<`.
