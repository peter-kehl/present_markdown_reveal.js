This is how to run the same steps (as in the videos) in your (installed) VS Code with `CodeTour` extension. (Unfortunately, this doesn't work with [VS Code web/GitHub web](./README_VS-CODE_GITHUB_DEV.md) as of `CodeTour`, until it publishes its version `0.0.59` or newer.)

You need version `0.0.59` or newer. Unfortunately, as of September 2022, such a version is not available at https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour (I've [already reported](https://github.com/microsoft/codetour/issues/260) it- please give it thums up). You can either

1. download it from [open-vsx.org](https://open-vsx.org) > [CodeTour](https://open-vsx.org/extension/vsls-contrib/codetour) > "DOWNLOAD"
2. `code --install-extension vsls-contrib.codetour-0.0.59.vsix` (or the newer file)

OR

1. `git clone` [microsoft/codetour](https://github.com/microsoft/codetour)
2. install [VSCE - Visual Studio Code Extension Manager](https://github.com/microsoft/vscode-vsce).
   On Manjaro/Arch Linux suggest NOT to install it with `npm`, but with the OS's
   `pacman` or "Add/Remove Software" (as from [AUR](http://aur.archlinux.org/packages/vsce)).

Suggest installing [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer).

(Ignore a `Buffer()` depreciation warning. I've [already reported](https://github.com/microsoft/codetour/issues/262) it.)

[Auto-linking of tours to be more flexible](https://github.com/microsoft/codetour/issues/248)

Please, also give thumbs up to [ability to show the step's bubble above the line (rather than just below)](https://github.com/microsoft/codetour/issues/259).

