<!-- .slide: data-visibility="hidden" -->

<!-- 
  TODO DOC: If we injected a class="only_on_computer" for a slide, the class would have an effect
  on the content of the slide. However, the slide itself would show up regardless. So if the class
  did apply, the slide would show up as blank!
-->


# SEE SLIDES

This file is only a part of multiple sets of presentation slides. If you are reading this, consider
viewing slides instead. However, this can't point you to the actual slides. (Why? Because several
presentations use this file.) Instead, see

- the GitHub project (or its clone/copy) or webpage you that referred you to this file; or
- `index.html` at the root of the actual presentation that referred to this file. However, do NOT
  open it from a filesystem, but from a web server instead. See `python3` below for an example; or
- the list of the original author's
  [presentations](https://github.com/peter-kehl/peter-kehl/blob/main/README.md).

But, if you are reading this, or any related `README*.md` files (referred to from `index.html` of
the actual presentation), there are limitations:

- Start with `README.md` and follow other `README*.md` files (in the actual presentation's webroot).
  See the end of each `README*.md` file, or source of `index.html` (in the actual presentation's
  webroot).
- Unfortunately, you will not be able to see source code examples as a part of the `README*.md`
  documents. Instead, follow links to the respective source code. Those links highlight respective
  line ranges. However, source code loaded in the slides may be newer than the source code links in
  `README*.md` files. And source code shown on a video recording (if there is one) may be older or
  newer (than source code links in `README*.md` files).
- Any comments in the referred sources starting with "`presentation-`" indicate start and end of
  relevant code examples.

The rest of this file assumes that you are viewing its content through `index.html` in the relevant
presentation's webroot, either on GitHub pages or served by a local (or other) web server.

If you are reading the rest of the file from its source (from
<https://github.com/peter-kehl/present_on_github_with_reveal.js/blob/main/README-NAVIGATE-SLIDES.md>
or its clone), beware links (if any) with CSS classes

- `link_relative_to_presentation_github_repo_blob`
- `link_relative_to_presentation_github_repo_tree`
- `pre_relative_to_code_github_repo_raw`
- `tours`
- `vs_code_github_dev`
- `videos`.

They are NOT relative to this file (`README-NAVIGATE-SLIDES.md`)! Instead, they are relative to directory
of the actual presentation (one that referred you to this file).

---

<!-- .slide: data-visibility="hidden" -->
# Reading this not as slides?

This is a shared file for presentation(s) in `*.md` file(s) (written in [Reveal.js's
Markdown](https://revealjs.com/markdown) mostly compatible with [GitHub
Markdown](https://github.github.com/gfm/)). The content is to be rendered by
[Reveal.js](https://github.com/hakimel/reveal.js) (also [https://revealjs.com](revealjs.com))
through `index.html` of the given presentation. It won't display correctly if open from a
filesystem! It requires to be accessed through a web server.

Such presentation(s) can load external files (both content and example code). In order to show them:

 1. Access `index.html` of the given presentation from a webserver (GitHub Pages, or another
    public/local webserver).
 2. But don't open it from a local file opened directly in browser. See [Reveal.js > Markdown >
    External Markdown](https://revealjs.com/markdown/#external-markdown).
 3. You do _not_ need `npm`. For example, you can run `python3 -m http.server` instead.
 4. But you do need to run the webserver for a directory at least one level above the clone of this
    project - so that the webserver serves the neighbor projects, too. Open the **source of**
    `index.html` of the actual presentation, and search for `..` to see what neighbor projects it
    requires.
 5. Beware that, as of August 2022, `python3 -m http.server` and/or Firefox caused local
    `README*.md` files to be cached for up to 24 hours. Even refreshing the page in Firefox didn't
    help. It required purging Firefox cache: Firefox special URL `about:preferences#privacy` (or
    Preferences/Settings > Privacy & Security) > "Cookies and Site Data" > "Clear Data..." button >
    choose "Cached Web Content" > "Clear Data" button.
 6. Have the neighbor directories. On GitHub pages, fork all related projects (ones referred to from
    `index.html` through links containing `..`). Then configure all those related forked GitHub
    repositories to publish their `main` branch to GitHub Pages (do not use `master`, or you will
    need to modify `index.html`). Alternatively, change the relative CSS and JS URL's in
    `index.html`.

Using relative URLs for plugins gives a benefit: People who fork/copy a project can use the same
source code, and can merge back. Also, such relative URLs refer to their own GitHub forks of the
plugins, hence not consuming [GitHub pages bandwidth
limit](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits)
of the original project.

## Use outside of GitHub

This is tailored for GitHub Pages. However, all the above principles (about viewing these slides)
are independent of GitHub. You may be able to apply this to any decent source code hub that can
serve the files' raw content and can serve source of JS files with `text/javascript` MIME. If your
webserver doesn't allow to list directories starting with a dot, and if you want to list CodeTour
file(s), then you need to either

- put CodeTour files under `tours` directory and make `.tours` a symlink to it, or
- have `.vscode/settings.json` pointing CodeTour to the directory where you keep CodeTour files:
  <!-- markdownlint-disable MD040 -->
  ```
  {
    "codetour.customTourDirectory": "xxx"
  }
  ```
  <!-- markdownlint-enable MD040 -->
- but don't apply both (of the above), because then (local) VS Code shows the code tours twice.

## Rendered with: Reveal.js

If you'd like to render this locally, you need to run a web server. Then you can access this in a
web browser as (a part of) your presentation's `index.html`. See [Reveal.js > Markdown > External
Markdown](https://revealjs.com/markdown/#external-markdown). You can also [test snippets of
markdown](https://marked.js.org/demo).

Unfortunately, Reveal.js doesn't publish/document how to load its CSS & JS files online (and they
don't seem to be publicly available on CDN's, either). Instead, it wants us to [distribute its
copies](https://revealjs.com/installation). However, that would make the actual presentation's
repository much larger. It would also mean more work when updating (a copy of) Reveal.js for several
presentations. Having your multiple presentations refer to your (one) clone of Remark.js makes it
simpler.

So this presentation uses my fork of [Reveal.js](https://github.com/hakimel/reveal.js). It's
idential (except for an extra CSS theme). It's served/loaded through GitHub Pages, which has
[bandwidth
limit](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#usage-limits)
of 100GB per month.

Even though visitors of my presentations may not make it go over that bandwidth limit, we might
reach the limit if authors of other presentations link to (my) forks of

- [`Reveal.js`](https://github.com/hakimel/reveal.js/)
- [`RevealJS-Embed-Code`](https://github.com/befocken/revealjs-embed-code/) and
- [`reveal.js-plugins`](https://github.com/rajgoel/reveal.js-plugins).

Hence, please don't link to my forks. Instead, get your own forks.

(That will also boost their GitHub projects. And while you're at it, please star their GitHub
repositories, too).

To make a GitHub repository show up on GitHub Pages (under `.github.io`) configure your fork
repository's Settings > Pages > Source > Branch: `main` (and `/(root)`).

Reveal.js uses [highlight.js](https://highlightjs.org/usage). In addition to syntax-coloring, you
can even highlight selected line(s) and transition between them. See
[Markdown](https://revealjs.com/markdown) and [Presenting Code](https://revealjs.com/code). (FYI
[supported languages](https://highlightjs.readthedocs.io/en/latest/supported-languages.html)). See
[highlight.js docs](https://highlightjs.readthedocs.io/en/latest) and its
[wiki](https://github.com/highlightjs/highlight.js/wiki).

## Alternative: Remark.js

If you don't want to clone and track Reveal.js, and if you're happy with simpler and lightweight
alternative, try [Remark.js](https://remarkjs.com) (see also its
[wiki](https://github.com/gnab/remark/wiki)). It allows your presentations to get Remark.js's JS
files online (without copying and distributing them).

For an example on how to render it online with Gitlab CLI, see an example of
[slides](https://gitlab.com/indyrs/july2022) and their
[source](https://gitlab.com/indyrs/july2022/-/blob/main/index.html). (This example is authored by
Cameron Dersham, the leader of [Indy.rs](https://indy.rs), in July 2022. In addition to kindly
sharing his knowledge, his presentation are a good source of important Rust news, both general and
embedded.) As with [Reveal.js](revealjs.com), [Remark.js](https://remarkjs.com) also allows you to
include a [separate Markdown file](https://github.com/gnab/remark/wiki#external-markdown=). And it
has [slide notes](https://github.com/gnab/remark/wiki/Markdown#slide-notes=) and [presenter
mode](https://github.com/gnab/remark/wiki#getting-started=), too.

However, it doesn't seem to support any plugins. And it doesn't have an ability to include (and then
syntax-color) source files. (So you need to copy and paste the code examples). It doesn't seem to
allow highlighting of selected lines of example code lines, either.

Both Reveal.js and Remark.js support code source highlighting. However, only Reveal.js can

- highlight specified parts of (lines), and
- display (parts of) external source files.

Unfortunately, Reveal.js [doesn't support vertical
scrolling](https://github.com/hakimel/reveal.js/issues/118) of the slides (except for limited
scrolling on mobile). Please give that issue thums up.

---

<!-- .slide: id="Navigate_Slides" -->
# Navigate Slides

<!-- Can't apply https://revealjs.com/markdown/#element-attributes like .element: class="..."
     to list items. That doesn't add the class to the whole list item, but it adds the class only to
     an auto-generated paragraph in that list item.
     Having a whole list inside a <span class="only_on_mobile">...</span> doesn't work either
     (Reveal.js then doesn't generate an HTML list).
     Yet another try: We can't write <ol class="..."> and </ol> as raw HTML and have the list items
     entered in Markdown - they don't get transformed to HTML.
     Hence, we write raw HTML. For that we disable
     https://github.com/DavidAnson/vscode-markdownlint > MD033.
-->
<!-- markdownlint-disable MD033 -->
<h2>Essentials</h1>
<ul>
   <li class="only_on_mobile">Suggest a computer. Last line of slides often doesn't show up on mobile.
   </li>
   <li class="only_on_portrait only_on_mobile">Rotate the screen (to landscape).
   </li>
   <li class="only_in_firefox_list_item only_on_mobile">Scrolling is tricky in Mobile Firefox.
   </li>
   <li class="only_in_chrome">Suggest Firefox (showing code blocks better than Chrome).
   </li>
   <li>Bottom left button<span class="only_on_computer"> or <strong>m</strong> key
      (lowercase)</span>: Menu with list of slides & themes.
   </li>
   <!-- TODO vscode.dev & github.dev links -->
   <li class="videos">See video(s) in <a href="videos"
      class="link_relative_to_presentation_github_repo_blob"><code>videos/</code></a> directory.
   </li>
   <li class="bookmarks">Follow bookmarks in VS Code with
      <a href="https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks">
          Bookmarks</a>.</li>
   </li>
   <li class="hide_on_github_pages">Outside of <code>github.io</code> see
      <code>README-NAVIGATE-SLIDES.md</code>: Original <a
      href="https://github.com/peter-kehl/present_on_github_with_reveal.js/blob/main/README-NAVIGATE-SLIDES.md">highlighted
      online</a> (or raw source from a
      <a href="../present_on_github_with_reveal.js/README-NAVIGATE-SLIDES.md">neighbor clone</a>).
   </li>
</ul>
<h2>Extras (on computer only)</h1>
<ul>
   <li class="only_on_mobile">Easier navigation through slides and search.
   </li>
   <li class="only_on_computer"><strong>Left</strong> & <strong>Right</strong> keys to switch slides.
   </li>
   <li class="only_on_computer"><strong>?</strong> (question mark) for keyboard shortcuts.
   </li>
   <li class="only_on_computer"><strong>ESC</strong> or <strong>o</strong> key (lowercase) to show
       (or hide) an <strong>overview</strong> of the nearby slides. (Navigate through the overview
       with arrow keys.)
   </li>
   <li class="only_on_computer"><strong>Ctrl Shift F</strong> to show (or hide) a
       <strong>search</strong> input (at the top right).
       <ul>
           <li>Type the text and <strong>Enter</strong>.
           </li>
           <li>Click anywhere on the slide to use the keys for navigation again.
           </li>
           <li>This search is <strong>sticky</strong>: Any matching text will stay highlighted,
               even as you navigate to other slides.
           </li>
           <li>Search results get highlighted in the <strong>overview</strong>, too.
           </li>
       </ul>
   </li>
   <li class="tours">Replay tour(s) from <code>.tours/</code> directory (TODO TREE) in VS Code with
      <a href="https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour">Code
      Tour</a>.
   </li>
</ul>
<!-- markdownlint-enable MD033 -->
