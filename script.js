"use strict";

// For use with link_relative_to_presentation_github_repo_blob.
//
// If index.html is loaded from
// project-owner.github.io/project-name/some/path/index.html (on GitHub Pages), then
// presentation_github_repo_blob_dir will be a URL to the "main" branch's "blob" base
// URL for the same "some/path" (sub)directory. (For the above example, this URL would be
// https://github.com/project-owner/project-name/blob/main/some/path/). That allows us
// to show highlighted source code on GitHub.
//
// The above requires that the GitHub project is NOT the "primary" GitHub page of its
// project-owner (which, if used, usually has a project name project-name.github.io)!
//
// The above doesn't work with "master" (branch), only with "main".
//
// Otherwise this is the current folder (so that the user can open the files from the
// non-GitHub Pages webserver).
var presentation_github_repo_blob_dir = './';
// Like presentation_github_repo_blob_dir, but for listing directories.
var presentation_github_repo_tree_dir = './';

// GitHub repo of the code to present. (By default it's same as the presentation repo). In format
// "project-owner/repository-name". No trailing slash!
//
// This will be inferred only if it was not set, and only if the presentation is accessed from
// GitHub Pages.
//
// If set (rather than inferred to be the same as the repo of the presentation being shown), then
// you must set this before inclusing this file (script.js).
var code_github_repo;

var code_github_repo_branch;
if (code_github_repo_branch===undefined) {
    code_github_repo_branch = 'main';
}

(() => {
    /** Get an URL relative to `code_github_repo`.
     *  @param absolute_url Must be under `code_github_repo`.
     *
     *  TODO or REMOVE
     */
    function relative_url_to_code_github_repo(absolute_url) {
        document.location.href;
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
                project_name + "/blob/main/" + presentation_directory_and_slash;
            presentation_github_repo_tree_dir = "https://github.com/" +project_owner+ "/" +
                project_name + "/tree/main/" + presentation_directory_and_slash;
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
// pointing to a raw (unhighlighted) file contentfor relative URL given in `options` param.
//
// For use with `Anything` and `EmbedCode` plugins. We can't apply this (with Anything plugin)
// directly to <code>...</code>, because <code>...</code> ignores "class" attribute, and then
// Anything plugin couldn't select the <code>...</code> element.
//
// @param code <code>...</code> element
//
// @param options URL relative to `code_github_repo`. TODO infer with
// relative_url_to_code_github_repo()
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
    // @TODO LATER local links -> store code_github_repo in 2 parts: code_project_owner and code_project_name
    code_element.setAttribute('data-url', "https://raw.githubusercontent.com/" + code_github_repo + '/' + code_github_repo_branch + data_url);
}