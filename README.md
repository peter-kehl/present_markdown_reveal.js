# Present Markdown with Reveal.js

Work in progress. See <https://peter-kehl.github.io/no_std_rust_libs> and
<https://github.com/peter-kehl/no_std_rust_libs> for now.

---

<!-- .slide: id="Benefits" -->
# Benefits

- Present on GitHub Pages by a simple `git push`. No `npm` or any other preprocessing.
- Present from any modern webserver (useful for editing locally).

---

<!-- .slide: id="Scope_Simplifications_Limitations" -->
# Scope, Simplifications, Limitations

- No vertical slides.
- Using [denehyg/reveal.js-menu](https://github.com/denehyg/reveal.js-menu), but disabled (hid) a
  few of its entries.
- Slides are scrollable, which is very tricky with Reveal.js. Scrolling is not ideal on mobile.
- Not related to [webpro/reveal-md](https://github.com/webpro/reveal-md).
- Mainstream only: GitHub or generic web server, videos as GitHub raw content and/or Youtube...
- No support for Reveal.js packages that

---

<!-- .slide: id="Suggestions_Slide_IDs" -->
# Suggestions

## Slide ID's

- Give your slides ID's (in Markdown it's `<!-- .slide: id="ID-here" -->`).
- Make them non-numeric. That way, if you insert new slides in-between, existing links to actual
  slides will be still valid.
- Naming conventions for ID's (as for anything) may be contraversial, but suggest
  Underscore_separated or Underscore_Separated_Title_Case.
- Group them semantically: Make related consecutive slides have ID's starting with the same prefix.
  Use that prefix as an ID for the first slide of the group. Like
  - `Navigate_Slides`,
  - `Navigate_CodeTour`.
  That way if you split/rename some slides in the group, even if the existing
  links may become obsolete, users can at least infer the slide group (as listed in the menu).
- This also keeps links consistent if you make some slides computer-only or mobile-only (or specific
  browser-only).
- The menu (shown by the bottom left button, or **m** key) does NOT pick up/use slide ID's. Instead,
  it uses the first header on each slide (even if it's not the top-level H1 `#` - it may be H2 `##`,
  even if there is an H1 `#` on the sam slide). So, make the first header on each slide the same as
  as ID in `<!-- .slide: id="ID-here" -->`. (But exclude the underscores in the headers.)
- Have the first slide's ID from each Markdown file reflected in its Markdown file name. But, see
  also [Markdown File Names](#/Markdown_File_Names) below.

---

<!-- .slide: id="Suggestions_Markdown_File_Names" -->
# Markdown File Names

- Name them `README.md` and `README-*.md`. Uppercase seems to be the standard on GitHub (like
  `LICENSE-MIT, LICENSE-APACHE`...)
- Use hyphen - to separate terms, and underscores within multiword terms.
- Is your presentation likely to use more than two local Markdown files (in the same directory) -
  that is, other than `README.md` and just one `README-SOMETHING.md`? If so,  number them (except
  for `README.md`): `README-01-SOMETHING.md, README-02_-SOMETHING-ELSE.md, ...` in the same order as
  you include them in `index.html`. That helps when organizing. You also help people with
  accessibility difficulties.
  
  (Do so, even if their filenames would happen to be
  alphabetically sorted even without `01, 02...`. That helps when people sort files by their last
  update timestamps.)
- Have a Markdown file name (after `README-XY-`) reflect the ID of its first slide.

<!-- .slide: id="Occasional_HTML" -->
# Occasional HTML

Even if you use Markdown, some combinations require HTML.

Beware that Reveal.js's Markdown ignores `<script>`. So you need to load any Javascript in `index.html`.
