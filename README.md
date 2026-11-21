# Tevin Medley's Personal Website

Code for [tevinmedley.com](https://tevinmedley.com), deployed via GitHub Pages.

## What is live now

A single coming-soon page while the full site is rebuilt.

- `index.html` - the whole page in one file: styles, markup and script. No build step and no server.
  The only outside request is the headline typeface from Google Fonts.
- `404.html` - sends any old page address (about, services, projects, contact) to the home page.
- `CNAME` - the custom domain.

Visitors can move the sun across the sky (the scene shifts from midday to golden hour), tap the sea
to launch sailboats, and watch dolphins leap. The sun starts where it sits in the visitor's own day.
Sound is off until the visitor presses the sound button.

## Previous site

`previous-site/` holds the earlier multi-page site (home, about, services, projects, contact, with
its styles, script and images) so its copy and photos are on hand for the rebuild. Nothing links to it.

## Setup

1. Clone the repository
2. Open `index.html` in a web browser to view it locally

## Deployment

The site deploys automatically via GitHub Pages when changes reach the `main` branch, using
`.github/workflows/deploy.yml`.

## Contact

Tevin Medley: tevin@tevinmedley.com or [LinkedIn](https://www.linkedin.com/in/rtevinm/).
