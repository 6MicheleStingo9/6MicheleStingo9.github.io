# 6MicheleStingo9.github.io

The personal site of [Michele Stingo](https://6michelestingo9.github.io) — research, notes and
published work on language models, knowledge representation and multi-agent systems.

The site is bilingual: English at the root, Italian under `/it/`.

## Running it locally

Docker is the only requirement.

```bash
docker compose up          # serves on http://localhost:8080, with live reload
docker compose down        # stops it and frees the port
```

For a one-off build without starting the server:

```bash
docker compose run --rm --no-deps jekyll bundle exec jekyll build
```

The site is written with [Jekyll](https://jekyllrb.com/) and deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`. The workflow builds with
`bundle exec jekyll build` rather than GitHub's own Pages build, which is what allows the
third-party plugins listed in `_config.yml`.

Run `npx prettier . --write` before committing; a workflow checks the formatting.

## Where things are

|                            |                                                          |
| -------------------------- | -------------------------------------------------------- |
| `_pages/`                  | the standing pages — about, blog index, papers, repo, CV |
| `_posts/`                  | blog posts                                               |
| `_notes/`                  | short notes on books and papers, linked from the posts   |
| `_news/`                   | the announcements listed on the home page                |
| `_data/`                   | the CV, the interface strings, the adjacency graph       |
| `_bibliography/papers.bib` | the publication list, rendered by jekyll-scholar         |
| `_plugins/wikilinks.rb`    | resolves `[[wiki links]]` between posts and notes        |
| `assets/rendercv/`         | the RenderCV configuration behind the CV PDFs            |

Each language keeps its own copy under an `it/` subdirectory — `_posts/it/`, `_pages/it/`
and so on — and a rule in `_config.yml` gives everything under those paths its language and
its `/it/…` address. Interface strings live in `_data/lang/en.yml` and `_data/lang/it.yml`.

The CV is written once per language in `_data/cv.yml` and `_data/cv_it.yml`, and rendered
to PDF by [RenderCV](https://docs.rendercv.com) through `.github/workflows/render-cv.yml`.

## Built on al-folio

This site is built on [al-folio](https://github.com/alshedivat/al-folio), a Jekyll theme for
academics by Maruan Al-Shedivat and its contributors, used and modified here under the MIT
licence. See [LICENSE](LICENSE).
