"use strict";

// For use with presentation_github_repo_blob_relative_link.
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

(() => {
    /** Get an URL relative to this project's webroot.
     *  @param absolute_url Must be under this project's webroot.
     */
    function relative_url_to(absolute_url) {
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
function make_blob_link_relative_to_presentation_github_repo(link, options) {
    if (presentation_github_repo_blob_dir!=='./') {
        link.href = presentation_github_repo_blob_dir + options;
    }
}

function make_tree_link_relative_to_presentation_github_repo(link, options) {
    if (presentation_github_repo_tree_dir!=='./') {
        link.href = presentation_github_repo_tree_dir + options;
    }
}

// Update <pre><code>...</code></pre> to have its code element have `data-url` pointing.... TODO
//
// For use with EmbedCode plugin. We can't apply this (with Anything plugin) directly to
// <code>...</code>, because <code>...</code> ignores "class" attribute, and then Anything plugin
// couldn't select the <code>...</code> element.
//
// @param code <code>...</code> element
function make_blob_code_relative_to_project_github_repo(pre, options) {
    var code_element = null;

    for (var code of pre.getElementsByTagName('code')) {
        if (code_element!==null) {
            console.error("More than one <code>...</code> under the given element " +pre.tagName);
            return;
        }
        code_element = code;
    }
    if (code_element===null) {
        console.error("No <code>...</code> under the given element " +pre.tagName);
        return;
    }
    code_element.setAttribute('data-url', "https://raw.githubusercontent.com/" +project_github_repo+ "/main/Cargo.toml");
}