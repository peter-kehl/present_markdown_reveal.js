"use strict";

// Rather sharing a (global) one, we return a new object. This allows us to re-use this with
// mutliple (embedded) presentations, too.
//
// More info about initialization & config:
// - https://revealjs.com/initialization/
// - https://revealjs.com/config/
function reveal_js_config() {
    return {
        slideNumber: "c/t",
        hash: true,
        hashOneBasedIndex: true,
        // Thanks to https://salferrarello.com/creating-slide-decks-with-reveal-js:
        history: true,
        
        // For better screen utilization on mobile/responsive. However, this makes the back/forth
        // slide navigation arrows almost invisible at their default position (bottom right) on both
        // Firefox & Chrome for Android (as of September 2022). Hence we also changed controlsLayout
        // below.
        disableLayout: true,

        // On Firefox for small Android, the default (faded) back arrow is almost invisible.
        controlsBackArrows: 'visible',

        // Let Up and Down arrows, PageUp and PageDown, HOME and END apply to the current slide. We
        // want this because we allow zooming and scrolling through any slide.
        keyboardCondition: function(event) {
            return event.key!=="ArrowUp" && event.key!=="ArrowDown" &&
            event.key!=="PageUp" && event.key!=="PageUp" &&
            event.key!=="Home" && event.key!=="End";
        },

        // With disableLayout: true, both Firefox & Chrome for Android (as of Sep 2022) almost hide
        // the control arrows in their default location (bottom right). But 'edges' works better.
        controlsLayout: 'edges',

        // width and margin help <pre><code> have more space
        width: "100%",
        margin: 0,
        // Don't use: height: "100%". Otherwise <pre><code> is narrow.

        // Learn about plugins: https://revealjs.com/plugins/
        plugins: [
            // The following four plugins have to be initialized in this order, so they process
            // content in this order.
            RevealMarkdown,
            // Before EmbedCode, so that we can adjust <code>'s data-url
            RevealAnything,
            EmbedCode,
            RevealHighlight,
            RevealMenu,
            RevealSearch ],
        
        // As per https://github.com/denehyg/reveal.js-menu#configuration
        menu: {
            // themes: true,
            themes:  [
                {
                    name: 'Dark',
                    theme: '../reveal.js/dist/theme/black_compact_verbatim_headers.css',
                    // Reveal.js comes with only two highlighting themes, both darkish. You could
                    // use: highlightTheme: '../reveal.js/plugin/highlight/monokai.css'
                    //
                    // highlightTheme: '../reveal.js/plugin/highlight/zenburn.css'
                    //
                    // OR choose from many themes from https://highlightjs.org, for example:
                    //
                    // The only dark high contrast highlight theme:
                    highlightTheme: 'https://highlightjs.org/static/demo/styles/base16/windows-high-contrast.css'
                    //
                    // But, if you expect high traffic, clone
                    // https://github.com/highlightjs/highlight.js next to this repo, enable GitHub
                    // Pages for it, and use (for example):
                    //
                    // highlightTheme: '../highlight.js/src/styles/base16/windows-high-contrast.css'
                },
                {
                    name: 'Light',
                    theme: '../reveal.js/dist/theme/white_compact_verbatim_headers.css',
                    // No light highlight themes in Reveal.js. The only light high contrast
                    // highlight theme:
                    highlightTheme: 'https://highlightjs.org/static/demo/styles/base16/windows-high-contrast-light.css'
                    //
                    // But, if you expect high traffic, clone and enable GitHub Pages for it.
                    // https://github.com/highlightjs/highlight.js next to this repo and use (for
                    // example):
                    //
                    // highlightTheme:
                    // '../highlight.js/src/styles/base16/windows-high-contrast-light.css'
                }

            ],
            themesPath: '../reveal.js/dist/theme/',
            transitions: ['None', 'Fade', 'Slide']
        },
        anything: [
            {
                className: "link_relative_to_presentation_github_repo_blob",
                // The HTML comment inside the link (<a href="relative/source/link">any
                // link-text<!-- "relative/source/link" --> any link text</a>) duplicates the
                // (relative) href.
                //
                // That is not automated any more (it's not inferred from href value).
                //
                // TODO Apply automation - once we have presentation_absolute_link_to_relative() - or
                // REMOVE THIS COMMENT.
                initialize: make_link_relative_to_presentation_github_repo_blob
            },
            {
                // Like presentation_github_repo_blob_relative_link, but this is for listing of
                // directories.
                className: "link_relative_to_presentation_github_repo_tree",
                initialize: make_link_relative_to_presentation_github_repo_tree
            },
            {
                className: "code_relative_to_code_github_repo_raw",
                initialize: make_code_relative_to_code_github_repo_raw
            }
        ]
    };
}

function initialize_slides() {
    if (document.location.protocol.startsWith("http")) {
        var css = document.createElement('style');
        css.innerHTML = ".hide_with_web_server {display: none !important;}";
        document.head.appendChild(css);

        if (document.location.host.endsWith(".github.io")) {
            var css = document.createElement('style');
            css.innerHTML = ".hide_on_github_pages {display: none !important;}";
            document.head.appendChild(css);
        }
    }

    // Thanks to https://codepedia.info/detect-browser-in-javascript
    let onChrome = navigator.userAgent.match(/chrome|chromium|crios/i);
    if (!onChrome) {
        document.head.appendChild(document.createElement("style")).innerHTML =
             ".only_in_chrome {display: none;}";
    }
}

// For use with link_relative_to_presentation_github_repo_blob.
//
// If index.html is loaded from project-owner.github.io/project-name/some/path/index.html (on GitHub
// Pages), then presentation_github_repo_blob_dir will be a URL to the "blob" base URL for the same
// "some/path" (sub)directory. (For the above example, this URL would be
// https://github.com/project-owner/project-name/blob/main/some/path/). That allows us to show
// highlighted source code on GitHub.
//
// The above requires that the GitHub project is NOT the "primary" GitHub page of its project-owner
// (which, if used, usually has a project name project-name.github.io)!
//
// By default this uses `main` branch. Set `presentation_github_repo_branch` for a different branch.
//
// Otherwise this is the current folder (so that the user can open the files from the non-GitHub
// Pages webserver).
var presentation_github_repo_blob_dir = './';
// Like presentation_github_repo_blob_dir, but for listing directories.
var presentation_github_repo_tree_dir = './';

var presentation_github_repo_branch;
if (presentation_github_repo_branch===undefined) {
    presentation_github_repo_branch = 'main';
}

// GitHub repo of the code to present. (By default it's same as the presentation repo). In format
// "project-owner/repository-name". No trailing slash!
//
// This will be inferred only if it was not set, and only if the presentation is accessed from
// GitHub Pages.
//
// If set (rather than inferred to be the same as the repo of the presentation being shown), then
// you must set this before including this file (script.js).
var code_github_repo;

var code_github_repo_branch;
if (code_github_repo_branch===undefined) {
    code_github_repo_branch = 'main';
}

(() => {
    /** Get an URL relative to the presentation's URL (`index.html`).
     *  @param absolute_url May be outside the presentation's URL's leaf directory (then the result
     *  will start with "../"). But it must be under the same `origin` (domain/host and protocol).
     *
     *  @return Relative URL for given `absolute_url`, if it's under the current document's URL;
     *  `undefined` otherwise.
     */
    function presentation_absolute_link_to_relative(given_absolute_url) {
        if (!given_absolute_url.startsWith(document.location.origin)) {
            return undefined;
        }
        var given_pathname = given_absolute_url.substring(document.location.origin.length);

        // Absolute URL to the presentation's root (excluding "index.html", but including the
        // trailing slash "/")
        var presentation_pathname = document.location.pathname;
        if (presentation_pathname.endsWith("/index.html")) {
            presentation_pathname = presentation_pathname.substring(0, presentation_pathname.length-10);
        }

    }

    if (document.location.protocol.startsWith("http") && document.location.host.endsWith(".github.io")) {
        var github_io_substr_index = document.location.host.indexOf(".github.io");
        var project_owner = document.location.host.substring(0, github_io_substr_index);
        
        var pathname = document.location.pathname;
        var path_first_slash_index = pathname.indexOf('/');
        var path_second_slash_index;
        if (path_first_slash_index >= 0) {
            path_second_slash_index = pathname.indexOf('/', path_first_slash_index+1);
        }
        if (path_first_slash_index < 0 || path_second_slash_index < 0) {
            console.error("Do not publish this as webroot on " +project_owner+ ".github.io. Instead, publish it under a (sub)directory.");
        } else {
            var project_name = pathname.substring(path_first_slash_index+1, path_second_slash_index);
            
            var path_last_slash_index = pathname.lastIndexOf('/');
            // This presentation's (sub(sub...))directory under its GitHub project.
            if (path_second_slash_index < path_last_slash_index) {
                var presentation_directory_and_slash = pathname.substring(path_second_slash_index+1, path_last_slash_index)+ '/';
            } else {
                var presentation_directory_and_slash = '';
            }
            presentation_github_repo_blob_dir = "https://github.com/" +project_owner+ "/" +
                project_name + "/blob/" + presentation_github_repo_branch + "/" + presentation_directory_and_slash;
            presentation_github_repo_tree_dir = "https://github.com/" +project_owner+ "/" +
                project_name + "/tree/" + presentation_github_repo_branch + "/" + presentation_directory_and_slash;
        }

        if (code_github_repo===undefined) {
            code_github_repo = project_owner + '/' + project_name;
        }        
    }
}
)();

// Change the given link from relative to absolute based on the current presentation's GitHub
// repository (as inferred from its GitHub Pages URL). However, that is relative to the file that
// loaded this script (for example: index.html) - even if that file (index.html) is not at the root
// of its GitHub repo, but in a subtree).
//
// On GitHub the link will point to a (highlighted) source code view. Outside of GitHub it points
// relative to directory of the file that loaded this file (for example: index.html).
//
// For use with CSS class link_relative_to_presentation_github_repo_blob and "anything" plugin for
// Reveal.js.
function make_link_relative_to_presentation_github_repo_blob(link, options) {
    if (presentation_github_repo_blob_dir!=='./') {
        link.href = presentation_github_repo_blob_dir + options;
    }
}

// Like `make_link_relative_to_presentation_github_repo_blob` but to list a directory on GitHub. Use
// with CSS class `link_relative_to_presentation_github_repo_tree`.
function make_link_relative_to_presentation_github_repo_tree(link, options) {
    if (presentation_github_repo_tree_dir!=='./') {
        link.href = presentation_github_repo_tree_dir + options;
    }
}

// Update `<code>` in `<pre><code>...</code></pre>` to have its code element have `data-url`
// pointing to a raw (unhighlighted) file content for relative URL given in `options` param.
//
// For use with `Anything` and `EmbedCode` plugins. We can't apply this (with Anything plugin)
// directly to <code>...</code>, because <code>...</code> ignores "class" attribute, and then
// Anything plugin couldn't select the <code>...</code> element.
//
// @param code <code>...</code> element
//
// @param options URL relative to `code_github_repo`.
function make_code_relative_to_code_github_repo_raw(pre, options) {
    var code_element;

    for (var code of pre.getElementsByTagName('code')) {
        if (code_element!==undefined) {
            console.error("More than one <code>...</code> under the given element " +pre.innerHtml);
            return;
        }
        code_element = code;
    }
    if (code_element===undefined) {
        console.error("No <code>...</code> under the given element " +pre.innerHtml);
        return;
    }
    var data_url = code_element.getAttribute('data-url');
    if (!data_url[0] !== '/') {
        data_url = '/' + data_url;
    }
    // @TODO LATER local links -> store code_github_repo in 2 parts: code_project_owner and
    // code_project_name
    code_element.setAttribute('data-url', "https://raw.githubusercontent.com/" + code_github_repo + '/' + code_github_repo_branch + data_url);
}