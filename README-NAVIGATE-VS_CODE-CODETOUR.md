<style type="text/css">
  .hide_without_reveal_js {
    display: none;
  }
</style>
<!-- .slide: id="Navigate-with-VS_Code-CodeTour" -->
# Navigate with VS Code CodeTour

<!-- markdownlint-disable MD033 -->
This is how to run the same steps (as in the videos) locally. You'll need to install [VS
Code](https://code.visualstudio.com/download) with `CodeTour` extension. (Unfortunately, this works
with local VS Code only. Not with VS Code web/GitHub web until `CodeTour` publishes its version
`0.0.59` or newer on Marketplace - see <span class="hide_without_reveal_js">"Related Issues"
slide</span><a class="hide_with_reveal_js"
href="README-RELATED-ISSUES.md">README-RELATED-ISSUES.md</a> and give them thumbs up.)
<!-- markdownlint-enable MD033 -->

You need version `0.0.59` or newer. Unfortunately, as of September 2022, such a version is not
available on [VS Code
Marketplace](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour).

You can either

1. download v. `0.0.59` (or newer) from [open-vsx.org](https://open-vsx.org) >
  [CodeTour](https://open-vsx.org/extension/vsls-contrib/codetour) > "DOWNLOAD"
2. `code --install-extension vsls-contrib.codetour-0.0.59.vsix` (or newer)

OR

1. `git clone` [`microsoft/codetour`](https://github.com/microsoft/codetour)
2. install [`VSCE` - Visual Studio Code Extension
  Manager](https://github.com/microsoft/vscode-vsce).
  
  On Manjaro/Arch Linux suggest NOT to install `VSCE` with `npm`, but with the OS's `pacman` or
  "Add/Remove Software" (as from [AUR](http://aur.archlinux.org/packages/vsce)).

Suggest also installing
[rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).

<!-- markdownlint-disable MD033 -->
Please, see the "Related Issues" slide <a class="hide_with_reveal_js"
href="README-RELATED-ISSUES.md">README-RELATED-ISSUES.md</a> and give them thumbs up.
<!-- markdownlint-enable MD033 -->

<!-- 
  Double space at the end of the first line after this comment preserves it when formated with
  Rewrap: https://stkb.github.io/Rewrap/specs/features/spaces/#at-the-end-of-a-line. Otherwise
  Reveal.js wouldn't apply/inject the following class into the generated link
  (https://revealjs.com/markdown/#element-attributes).
-->
Please, see the "Related Issues" slide  
[README-RELATED-ISSUES.md <!-- .element: class="hide_with_reveal_js" -->](README-RELATED-ISSUES.md)
and give them thumbs up.