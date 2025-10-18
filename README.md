StarryChildhood site mirror

This folder contains a mirror of https://starrychildhood.ru/ saved by wget. It includes HTML, images, CSS and JS under `starrychildhood.ru/`.

How to preview locally

1. From the repository root run a simple static server (Python 3):

```sh
python3 -m http.server 8000 --directory starrychildhood/starrychildhood.ru
```

2. Open http://localhost:8000 in your browser.

Deploying to GitHub Pages (automatic)

A GitHub Actions workflow `.github/workflows/gh-pages-starrychildhood.yml` is included. On push to `main` it will publish the contents of `starrychildhood/starrychildhood.ru` to the `gh-pages` branch.

Manual deploy (if you prefer)

```sh
git subtree push --prefix starrychildhood/starrychildhood.ru origin gh-pages
```

Notes and license

- This repository now contains a copy of the site. Make sure you have the right to publish or redistribute the content before enabling GitHub Pages for this repository.
- If any assets are copyrighted, remove them or obtain permission before publishing.

Files of interest:
- `starrychildhood/starrychildhood.ru/index.html` — main page
- `starrychildhood/starrychildhood.ru/*.(png|jpg|webp|mp4)` — media files

If you want, I can also:
- Trim or reorganize the mirrored files into a flatter structure
- Add a small index or sitemap
- Convert absolute links to root-relative to make the site work when served from `https://<org>.github.io/<repo>/`
