"use strict";

// Rather sharing a (global) one, we return a new object. This allows us to re-use this with
// mutliple (embedded) presentations, too.
//
// More info about initialization & config:
// - https://revealjs.com/initialization/
// - https://revealjs.com/config/
function present_markdown_reveal_get_config() {
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
        //
        // Even worse: This makes the last line of (Markdown/HTML) content invisible/unreachable by
        // scrolling on mobile/responsive (if a slide is long enough to need scrolling).
        //
        // But, without `disableLayout: true`, (embedded) code in `<pre><code>` takes very little of
        // the screen! And `<code>` on its own (without being enclosed within `<pre>...</pre>`)
        // doesn't highlight!
        //
        disableLayout: true,

        // On Firefox for small Android, the default (faded) back arrow is almost invisible.
        controlsBackArrows: 'visible',

        // Let Up and Down arrows, PageUp and PageDown, HOME and END apply to the current slide. We
        // want this because we allow zooming and scrolling through any slide.
        //
        // Also disable any shortcuts when Shift is pressed - so that the user can click & then
        // Shift (repeatedd) right arrow, or Shift (repeated) left arrow to select text to
        // highlight.
        keyboardCondition: function(event) {
            return event.key!=="ArrowUp" && event.key!=="ArrowDown" &&
            event.key!=="PageUp" && event.key!=="PageUp" &&
            event.key!=="Home" && event.key!=="End" &&
            !event.shiftKey;
        },

        // With disableLayout: true, both Firefox & Chrome for Android (as of Sep 2022) almost hide
        // the control arrows in their default location (bottom right). But 'edges' works better.
        controlsLayout: 'edges',

        // Disabling the progress bar doesn't affect scrolling/not-hiding of the addressbar on
        // mobile (in Firefox 105 and Chrome).
        //
        // progress: false,

        // width and margin help <pre><code> have more space.
        //
        // No effect on shrinked <pre><code> (without `disableLayout: true`)!
        width: "100%",
        // Setting `margin: 0` or not had no effect on shrinked `<pre><code>` that emerges without
        // `disableLayout: true`)!
        //
        // Setting `margin: 0.20` had no effect on missing last one-two lines of longer slides on
        // mobile (with `disableLayout: true`)!
        margin: 0,

        // Don't use: height: "100%". Otherwise <pre><code> is narrow. (Unless you also use
        //`disableLayout: true`, which unfortunately makes the last one-two lines of long slides
        //invisible on mobile!)
        //
        // But, even without `height: "100%"`, <pre><code> shrinkgs vertically once you navigate to
        // another slide and then come back!
        //
        // height: "100%",

        // Learn about plugins: https://revealjs.com/plugins/
        //
        // Disabling any and all plugins (RevealMarkdown, RevealAnything. EmbedCode,
        // RevealHighlight, RevealMenu, RevealSearch) didn't fix scrolling/not-hiding of the
        // addressbar on mobile.
        plugins: [
            // The following four plugins have to be initialized in this order, so they process
            // content in this order.
            RevealMarkdown,
            // RevealAnything applies before EmbedCode, so that we can adjust <code>'s data-url
            RevealAnything,
            EmbedCode,
            RevealHighlight,
            RevealMenu,
            RevealSearch],
        
        // As per https://github.com/denehyg/reveal.js-menu#configuration
        menu: {
            // themes: true,
            themes:  [
                {
                    name: 'Dark',
                    theme: '../reveal.js/dist/theme/black_contrast_compact_verbatim_headers.css',
                    // Reveal.js comes with only two highlighting themes, both darkish. You could
                    // use:
                    // - highlightTheme: '../reveal.js/plugin/highlight/monokai.css'
                    // - highlightTheme: '../reveal.js/plugin/highlight/zenburn.css'
                    //
                    // Or choose from many themes from https://highlightjs.org. But the only dark
                    // high contrast highlight theme:
                    highlightTheme: 'https://highlightjs.org/static/demo/styles/base16/windows-high-contrast.css'
                    //
                    // Or, clone https://github.com/highlightjs/highlight.js next to this repo,
                    // enable GitHub Pages for it, and use (for example):
                    //
                    // highlightTheme: '../highlight.js/src/styles/base16/windows-high-contrast.css'
                },
                {
                    name: 'Light',
                    theme: '../reveal.js/dist/theme/white_contrast_compact_verbatim_headers.css',
                    // No light highlight themes in Reveal.js. The only light high contrast
                    // highlight theme:
                    highlightTheme: 'https://highlightjs.org/static/demo/styles/base16/windows-high-contrast-light.css'
                    //
                    // Or, clone https://github.com/highlightjs/highlight.js next to this repo and
                    // use (for example):
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
                // If `href` is relative, it must be relative to the presentation's URL
                // (`index.html`), even if the presentation itself is not right under the webroot
                // but under a sub(sub...)directory.
                //
                // TODO: That is not automated any more (it's not inferred from href value).
                //
                // TODO Apply automation - once we have change_link_github_pages_to_highlighted() - or
                // REMOVE THIS COMMENT.
                initialize: make_link_relative_to_presentation_github_repo_blob
            },
            {
                // Like link_relative_to_presentation_github_repo_blob, but this is for listing of
                // directories.
                className: "link_relative_to_presentation_github_repo_tree",
                initialize: make_link_relative_to_presentation_github_repo_tree
            },
            {
                className: "pre_relative_to_code_github_repo_raw",
                initialize: make_pre_relative_to_code_github_repo_raw
            }
        ]
    };
}

// @TODO How to share it among our functions, but not make public/available outside this file?
//
// Not exact (unsure about smart TV's etc.), but good enough. Thanks to
// https://dev.to/timhuang/a-simple-way-to-detect-if-browser-is-on-a-mobile-device-with-javascript-44j3.
var onDesktop = !(/Android|webOS|iPhone|iPad|iPod|kindle|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

function present_markdown_reveal_before_ini() {
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
    var onChrome = navigator.userAgent.match(/chrome|chromium|crios/i);
    if (!onChrome) {
        document.head.appendChild(document.createElement("style")).innerHTML =
             ".only_in_chrome {display: none;}";
    }

    if (onDesktop) {
        var sectionBeforeCodetourNavigation =
            document.getElementById("SECTION-BEFORE-NAVIGATE-WITH-CODETOUR");
        if (sectionBeforeCodetourNavigation) {
            // Can't conditionally enable the following with CSS by having
            // <section class="only_on_desktop" ...> in HTML. Neither by applying CSS in Markdown
            // (https://revealjs.com/markdown/#element-attributes) by having:
            // <!-- .element: class="..." -->
            // Hence we inject it in Javascript:
            sectionBeforeCodetourNavigation.insertAdjacentHTML("afterend",
                '<section data-markdown="../present_markdown_reveal.js/README-NAVIGATE-VS_CODE-CODETOUR.md"></section>');
        }
    }
}

function present_markdown_reveal_after_ini() {
    if (!onDesktop) {
        Reveal.addEventListener( 'ready', function( event ) {
        // See also https://github.com/hakimel/reveal.js/issues/806
            for (var section of document.getElementsByTagName('section')) {
                section.insertAdjacentHTML("beforeend",
                    '<div><br/><br/></div>');
            }
        });
    }
}

var presentation_github_repo_owner;
var presentation_github_repo_project;

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
if (!presentation_github_repo_branch) {
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
if (!code_github_repo_branch) {
    code_github_repo_branch = 'main';
}

const HTTPS_DOUBLE_SLASH = "https://";

// This is `https://project-owner.github.io/presentation-repo` (without any trailing slash /).
// (It will be inferred if the presentation is accessed under GitHub Pages).
//var presentation_github_pages_webroot;

const DOT_GITHUB_IO_SLASH = ".github.io/";

// Extract a GitHub owner (user/organization) name from a given GitHub Pages URL
// (`https://owner-user-or-organization.github.io/some-repo/folder-path/`).
function github_pages_to_repo_owner(given_absolute_url) {
    var dot_github_io_substr_index = given_absolute_url.indexOf(DOT_GITHUB_IO_SLASH);
    if (dot_github_io_substr_index>0) {
        return given_absolute_url.substring(HTTPS_DOUBLE_SLASH.length, dot_github_io_substr_index);
    } else {
        console.info("Given URL: " +given_absolute_url+ " is not an absolute URL under *.github.io. Hence can't infer a GitHub user/organization.");
        return undefined;
    }
}

// Extract a GitHub repository name from a given GitHub Pages URL
// (`https://owner-user-or-organization.github.io/some-repo/folder-path/`).
function github_pages_to_repo_project(given_absolute_url) {
    var dot_github_io_substr_index = given_absolute_url.indexOf(DOT_GITHUB_IO_SLASH);
    if (dot_github_io_substr_index>0) {
        var path_and_query = given_absolute_url.substring(dot_github_io_substr_index);
        var slash_after_repo_index = path_and_query.indexOf('/');
        if (slash_after_repo_index>0) {
            return path_and_query.substring(0, slash_after_repo_index);
        } else {
            console.info("Given URL: " +given_absolute_url+ " is under *.github.io, but with no repository path. Hence can't infer a GitHub repo.");
            return undefined;
        }
    } else {
        console.info("Given URL: " +given_absolute_url+ " is not an absolute URL under *.github.io. Hence can't infer a GitHub user/organization.");
        return undefined;
    }
}

/** Get a highlighted source code ("blob") or a directory listing ("tree") for a given absolute URL
 *  for a GitHub Pages-served file or directory. It may be under the current presentation's root, or
 *  somewhere else under its repository (above or outside), or even under a different GitHub
 *  repository.
 *  @param link OLD: An `<a href="...">...</a>` element. The URL may be relative (to the presentation's
 *  webroot, NOT necessarily the repository's GitHub webroot). It may point above/outside the
 *  presentation's webroot. But it must be under the same `origin` (domain/host - and GitHub owner).
 *  It may be under a different GitHub repository - but under the same GitHub user/organization.
 *  (Browsers resolve `href` & update it to absolute.)
 *  NEW: Relative link. We do not support eccentric relative links like '../some-dir/../sibling/../and-so"
 *  @param is_dir Whether this is for a directory listing. Otherwise (by default) it's for a
 *  (highlighted) file content.
 *  // TODO For later: @param branch GIT branch ("main" by default).
 *  @return Relative URL for given `absolute_url`, if it's under the current document's URL;
 *  `undefined` otherwise.
 */
function change_link_github_pages_to_highlighted(link, is_dir) {
    is_dir = is_dir || false;
    //branch = branch || "main";

    var given_url = link.getAttribute("href");
    if (given_url.startsWith("http://") || given_url.startsWith("https://")) {
        console.error("change_link_github_pages_to_highlighted() used with a link that has an absolute URL: " +
            given_url + ". Use with a relative URL instead.");
        return;
    }

    if (!presentation_github_repo_owner || !presentation_github_repo_project) {
        console.info("Couldn't modify given link's URL: " +given_url+ " to a GitHub highlighted blog or a directory listing.");
        return;
    }

    // excluding search (query)
    //var presentation_url = document.location.origin + document.location.pathname;
    if (document.location.host != presentation_github_repo_owner+ '.github.io') {
        console.error("For now use change_link_github_pages_to_highlighted() only for the same GitHub user/organization.");
        return;
    }

    /*if (given_url.startsWith('/')) {
        given_url = given_url.substring(1);
    }*/
    var given_url_parts = given_url.split('/');
    var presentation_pathname_parts = document.location.pathname.split('/');
    given_url_parts = given_url_parts.filter(part => part!=='');
    presentation_pathname_parts = presentation_pathname_parts.filter(part => part!=='');

    // Adjust both given_url_parts and presentation_pathname_parts. Follow any parent directory
    // steps '..'. Then we can concatenate the leftover given_url_parts and
    // presentation_pathname_parts.
    while (given_url_parts[0]==='..') {
        given_url_parts.splice(0, 1);
        if (!presentation_pathname_parts.length) {
            console.error("The link's relative URL: " +given_url+ "  points outside of the presentation's domain: " +document.location.host);
            return;
        }
        presentation_pathname_parts.splice(-1, 1); // -1 means the very last item
    }

    var github_pages_pathname_incl_project = presentation_pathname_parts.join('/') + '/' +
         given_url_parts.join('/');
    var repo_project_length = github_pages_pathname_incl_project.indexOf('/');
    if (repo_project_length<0) {
        console.error("The link's relative URL: " +given_url+ " seemed OK, but can't be resolved for the presentation: " +document.location.href);
        return;
    }
    var repo_project = github_pages_pathname_incl_project.substring(0, repo_project_length);
    var github_pages_pathname_excl_project = github_pages_pathname_incl_project.substring(repo_project_length);

    //var resource_path_and_query_within_repo = given_url.substring(github_pages_root.length); // excluding the leading slash
    var new_absolute_url = HTTPS_DOUBLE_SLASH + "github.com/" +presentation_github_repo_owner+ "/" +
        repo_project + (is_dir ? "/tree" : "/blob") + "/" + presentation_github_repo_branch+ github_pages_pathname_excl_project;
    link.setAttribute("href", new_absolute_url);

    /*
    var given_absolute_url = link.getAttribute("href");
    var repo_owner = github_pages_to_repo_owner(given_absolute_url);
    var repo_project = github_pages_to_repo_project(given_absolute_url);

    if (!repo_owner || !repo_project) {
        console.info("Couldn't modify given_absolute_url: " +given_absolute_url+ " to a GitHub highlighted blog or a directory listing.");
        return;
    }

    var github_pages_root = HTTPS_DOUBLE_SLASH + repo_owner + DOT_GITHUB_IO_SLASH + repo_project + '/';
    var resource_path_and_query_within_repo = given_absolute_url.substring(github_pages_root.length); // excluding the leading slash
    var new_absolute_url = HTTPS_DOUBLE_SLASH + "github.com/" +repo_owner+ "/" + repo_project + (is_dir ? "tree" : "blob") + "/" + branch+ '/' + resource_path_and_query_within_repo;
    link.setAttribute("href", new_absolute_url);
    */
}

(() => {
    if (document.location.protocol.startsWith("http") && document.location.host.endsWith(".github.io")) {
        if (!presentation_github_repo_owner) {
            presentation_github_repo_owner = github_pages_to_repo_owner(document.location.href);
        }
        if (!presentation_github_repo_project) {
            presentation_github_repo_project = github_pages_to_repo_project(document.location.href);
        }
        if (!code_github_repo) {
            code_github_repo = presentation_github_repo_owner + '/' + presentation_github_repo_project;
        }
    } else {
        console.info("This is not being accessed from GitHub Pages (https://project-owner.github.io/project-name, hence can't infer some functionality.");
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
    change_link_github_pages_to_highlighted(link);
}

// Like `make_link_relative_to_presentation_github_repo_blob` but to list a directory on GitHub. Use
// with CSS class `link_relative_to_presentation_github_repo_tree`.
function make_link_relative_to_presentation_github_repo_tree(link, options) {
    change_link_github_pages_to_highlighted(link, true);
}

// Update `<code>` in `<pre><code>...</code></pre>` to have its code element have `data-url`
// pointing to a raw (unhighlighted) file content for relative URL given in `options` param.
//
// For use with `Anything` and `EmbedCode` plugins. We can't apply this through a CSS class (with
// Anything plugin) directly to `<code>...</code>`, because `<code>...</code>` and/or Reveal.js or
// `EmbedCode` ignore "class" attribute, and then `Anything` plugin couldn't select the
// `<code>...</code>` element.
//
// @param pre `<pre><code>...</code></pre>` element
//
// @param options Relative URI - relative to `code_github_repo`.
function make_pre_relative_to_code_github_repo_raw(pre, options) {
    if (!code_github_repo) {
        console.error("Either publish this with GitHub Pages under user-or-organization.github.io (or if published there, access it from there), or variable set code_github_repo.");
        return;
    }

    var code_element;

    for (var code of pre.getElementsByTagName('code')) {
        if (code_element) {
            console.error("More than one <code>...</code> under the given element " +pre.innerHtml);
            return;
        }
        code_element = code;
    }
    if (!code_element) {
        console.error("No <code>...</code> under the given element " +pre.innerHtml);
        return;
    }
    var data_url = code_element.getAttribute('data-url');
    if (!data_url[0] !== '/') {
        data_url = '/' + data_url;
    }
    // @TODO LATER ? local links -> store code_github_repo in 2 parts: code_project_owner and
    // code_project_name
    code_element.setAttribute('data-url', "https://raw.githubusercontent.com/" + code_github_repo + '/' + code_github_repo_branch + data_url);
}