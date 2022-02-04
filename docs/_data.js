// Remove the first directory ("/docs") of the path
export function url(page) {
  return page.dest.path.replace(/^\/docs/, "") + "/";
}
