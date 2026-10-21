/** Injects the bookmarklet build (https://github.com/deckmasterbeam/SniffiesProjects/tree/main/bookmarklet) on browsers that can't run extensions or userscripts. */
export const bookmarkletCode =
  "javascript:(function(){var s=document.createElement('script');s.src='https://sniffies-projects-bookmarklet.vercel.app/inject.js?t='+Date.now();document.head.appendChild(s);})();";
