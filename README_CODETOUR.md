# Follow with CodeTour

This is how to run the same steps (as in the videos) in your (installed) VS Code with `CodeTour`
extension. (Unfortunately, this works with local VS Code only. It doesn't work with [VS Code
web/GitHub web](./README_VS-CODE_GITHUB_DEV.md) until `CodeTour` publishes its version `0.0.59` or
newer on Marketplace - more below.)

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
   Manager](https://github.com/microsoft/vscode-vsce). On Manjaro/Arch Linux suggest NOT to install
   `VSCE` with `npm`, but with the OS's `pacman` or "Add/Remove Software" (as from
   [AUR](http://aur.archlinux.org/packages/vsce)).

Please, give thumbs up to

- [updating Code Tour on VS Code Marketplace](https://github.com/microsoft/codetour/issues/260)
- [ability to show the step's bubble above the line (rather than just
below)](https://github.com/microsoft/codetour/issues/259).
- [auto-linking of tours to be more flexible](https://github.com/microsoft/codetour/issues/248)
- [fixing a `Buffer()` depreciation warning](https://github.com/microsoft/codetour/issues/262).

Suggest also installing
[rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).
