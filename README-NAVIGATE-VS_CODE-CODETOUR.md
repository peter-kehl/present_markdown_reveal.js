<!-- .slide: id="Navigate-in-CodeTour" -->
# Navigate in CodeTour

This is how to run the same steps (as in the videos) locally. You'll need to install [VS
Code](https://code.visualstudio.com/download) with
[`CodeTour`](https://github.com/microsoft/codetour/) extension.

You need version `0.0.59` or newer. Unfortunately, as of September 2022, such a version is not
available on [VS Code
Marketplace](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour).

You have two options:

## Download CodeTour from Open VSX

1. download v. `0.0.59` (or newer) from [open-vsx.org](https://open-vsx.org) >
  [CodeTour](https://open-vsx.org/extension/vsls-contrib/codetour) > "DOWNLOAD"
2. `code --install-extension vsls-contrib.codetour-0.0.59.vsix` (or newer)

---

<!-- .slide: id="Navigate-in-CodeTour-local_build" -->
# Navigate in CodeTour > local build

1. `git clone` [`microsoft/codetour`](https://github.com/microsoft/codetour)
2. install [`VSCE` - Visual Studio Code Extension
  Manager](https://github.com/microsoft/vscode-vsce). On Manjaro/Arch Linux suggest NOT to install
  `VSCE` with `npm`, but with the OS's `pacman` or "Add/Remove Software" (as from
  [AUR](http://aur.archlinux.org/packages/vsce)).
3. `git clone https://github.com/microsoft/codetour`
4. `cd codetour`
5. `vsce package`
6. Turn off your VS Code
7. `code --install-extension codetour-0.0.59.vsix`

<!-- markdownlint-disable MD033 -->
Unfortunately, we can't play/run the tour(s) in VS Code web/GitHub web until `CodeTour` publishes
its version `0.0.59` or newer on
     [Marketplace](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour). <!--
     DOCUMENT_THIS GitHub removes "style" and "class" attributes when rendering Markdown. So we
     can't hide the following link on GitHub. That's why we add an explanation in the next
(non-Reveal.js) text & link. --> See <span class="hide_with_reveal_js">
[README-RELATED-ISSUES-SLIDES.md](README-RELATED-ISSUES-SLIDES.md) and ignore the following link
(which is available only when viewing this rendered as slides)</span> the [Related
Issues > Slides](#/Related_Issues_Slides) slide, and give them thumbs up.
<!-- markdownlint-enable MD033 -->
