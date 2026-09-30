# lab-website

Jekyll site for [rund0wn/lab-website](https://github.com/rund0wn/lab-website), deployed to GitHub Pages at `https://rund0wn.github.io/lab-website/` by [a GitHub Actions workflow](.github/workflows/pages.yml) on every push to `main`.

## What's where

```text
.
├── index.html               # Home: hero + project catalogue
├── about.html
├── blog.html                # Project index (permalink /projects/)
├── members.html             # Lab members
├── _members/                # One Markdown file per person
├── _projects/               # One Markdown file per project page
├── _layouts/  _includes/  _sass/
├── _plugins/og_image.rb     # Fills in a DOGimg social card for pages without an image
├── assets/                  # CSS entry, JS, images
├── sitemap.xml              # Sitemap index
├── sitemap-main.xml         # This site's URLs, generated at build time
├── robots.txt
└── CLAUDE.md                # Conventions for agents (and a good read for humans)
```

## Local development

Requires Ruby and Bundler. No Node toolchain.

```bash
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000/lab-website/, rebuilds on change
bundle exec jekyll build   # production output in _site/
```

## Adding content

### A project

Add `_projects/<name>.md`:

```md
---
layout: project
title: "My Project"
description: "One sentence; it's the home card text and the page summary."
tech_stack: ["TypeScript", "WebGL2"]
stack: Function prediction methods
github_url: "https://github.com/zeikar/my-project"
demo_url: "https://zeikar.dev/my-project/"
image: "/assets/images/projects/my-project.png"
sequence: 21
gadget_no: 21
---
```

- `sequence` is the order on the home page and the projects page. `gadget_no` is the UNIT number, assigned by build order, and never changes.
- `stack` is one of `project_stacks` in `_config.yml`. The projects page lists everything until a stack filter is selected.
- The card shows the first six `tech_stack` entries. Leave out version numbers.
- `demo_url` and `image` are optional. Without an `image`, the social card comes from DOGimg.
- Keep `image` a PNG, since it's also the social card. Drop a smaller `.webp` with the same name next to it and the card and project page use that instead.

The page body has no fixed template. See [CLAUDE.md](CLAUDE.md) for how the pages are written.

### A lab member

Add `_members/<name>.md`. The file does not get its own page. `/members/` groups people by `group` and sorts each group by `sequence`.

```md
---
name: "Ada Lovelace"
group: student
position: "PhD student"
image: "/assets/images/members/ada.png"
sequence: 1
---

One or two paragraphs. This body is the bio, shown when the card is opened.
```

- `group` is one of `leader`, `postdoc`, `student`, `staff`, `alumni`.
- `position` is shown for students, research staff, and alumni.
- `image` is optional. A same-named `.webp` next to the PNG is used on the card.
- Leader, postdoc, student, and staff cards open the bio. Alumni do not, so leave their body empty.

### Sitemaps

`sitemap.xml` is an index. It points to `sitemap-main.xml`, which lists this site's pages, posts, and projects.

- A project whose `demo_url` is on this site's `url` joins `sitemap-main.xml` automatically.
- Any other same-site path goes in `extra_sitemap_urls` in `_config.yml`.
