# Rust influence

The author and his presentations use/are about [Rust](https://doc.rust-lang.org/) language. Hence we

- include editor/IDE settings, like [VS Code settings](.vscode/),
- [.gitignore](.gitignore) editor/IDE/extension-specific files that we don't want to include (like
  [.vscrof](.vscrof))
- honor Rust [style guide](https://github.com/rust-dev-tools/fmt-rfcs/blob/master/guide/guide.md)
  and default `cargo fmt` [formatting](https://rust-lang.github.io/rustfmt/?version=v1.5.1&search=),
  such as [max. line length](https://rust-lang.github.io/rustfmt/?version=v1.5.1&search=#max_width)
  being `100`.

Other conventions

- `README*.md` filenames and slide fragment (relative/anchor) URL's are like
  [`README-NAVIGATE-VS_CODE-CODETOUR.md`](./README-NAVIGATE-VS_CODE-CODETOUR.md) and
  `Navigate-with-VS_Code-CodeTour` (respectively), where related words are separated by an
  underscore. The other separator is a hyphen.
- Headers and Reveal.js Menu entries are like `Navigate with VS Code CodeTour`, reflecting slide
  fragment URL's.
- Re-wrap any source file with [VS Code
  Rewrap](https://marketplace.visualstudio.com/items?itemName=stkb.rewrap)
  [stkb/Rewrap](https://stkb.github.io/Rewrap).
- Preserve two spaces at the end of Markdown (`*.md`) files. That's used to prevent those lines from
  being rewrapped by Rewrap - for example when injecting a CSS class with `<!-- .element:
  class="hide_with_reveal_js" -->` to links, where such HTML comments must not be split over
  multiple lines.

See also [README.md](README.md) and [README-NAVIGATE-SLIDES.md](README-NAVIGATE-SLIDES.md).
