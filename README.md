# Rakesh Podder — Personal Website

Single-page academic website for Rakesh Podder, Ph.D. Candidate in Computer Science
at Colorado State University. Redesigned July 2026 ("Navy Academic" theme).

**Live:** https://cryptoknight13.github.io/rpodder/

## Structure

```
index.html              Single-page site (Home, About, Research, Publications,
                        Awards, Teaching, Service, Talks, Skills, Contact)
Style/main.css          Navy Academic design system (responsive, print-friendly)
main.js                 Nav, scroll-spy, publication filters, reveal animations
images/                 Photos and figures
cv/rakesh-podder-cv.tex LaTeX source for the CV
Rakesh-Podder-CV.pdf    Compiled CV (linked from the site)
_legacy/                Previous multi-page version (archived, not served)
```

## Running locally

Static site — no build step. Serve the folder and open in a browser:

```bash
cd rpodder
python3 -m http.server 8080
# open http://localhost:8080/index.html
```

External resources (Google Fonts, Font Awesome) load from CDN, so keep an
internet connection for local preview. All internal paths are relative, so the
site works both at the domain root and under the `/rpodder/` GitHub Pages path.

## Editing content

All content lives in `index.html`. Data (publications, awards, funding, talks,
mentees, references) mirrors `cv/rakesh-podder-cv.tex` — update both to keep the
CV PDF and the website in sync.

## Rebuilding the CV PDF

Requires a TeX distribution (TeX Live) with `tgpagella`, `tfrupee`, `microtype`,
`titlesec`, `enumitem`, `fancyhdr`.

```bash
cd cv
pdflatex rakesh-podder-cv.tex
pdflatex rakesh-podder-cv.tex        # run twice for headers/refs
cp rakesh-podder-cv.pdf ../Rakesh-Podder-CV.pdf
```

## Deploying (GitHub Pages)

Commit and push to the branch GitHub Pages serves (project site at
`https://cryptoknight13.github.io/rpodder/`). No CI/build required.
