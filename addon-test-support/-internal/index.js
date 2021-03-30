const TITLE_SELECTOR = 'head title';

/**
 * Get the page title of the provided document.
 * `window.document` is used as the default when no document is provided.
 *
 * @param {HTMLDocument} doc The document in which to search for the `<title>` element.
 * @return {String} The page title of the provided document.
 */
export function getPageTitle(doc) {
  let title = (doc || window.document).querySelector(TITLE_SELECTOR);

  return getTitleContent(title);
}

/**
 * Get the page title of the provided document in a FastBoot context.
 * `window.document` is used as the default when no document is provided.
 *
 * In a FastBoot context, we have two `<title>` elements if we don't remove one from `app/index.html`.
 * In real-world applications, it's mandatory to remove the `<title>` element from `app/index.html`.
 * We are keeping both for the sake of testing browser AND FastBoot scenarios.
 *
 * @param {HTMLDocument} doc The document in which to search for the `<title>` element.
 * @return {String} The page title of the provided document.
 */
export function getFastBootPageTitle(doc) {
  let title = [
    ...(doc || window.document).querySelectorAll(TITLE_SELECTOR),
  ].pop();

  return getTitleContent(title);
}

/**
 * Get the content of the provided `<title>` element.
 *
 * Testem appends progress to the title...
 * At the moment, there's no way to stop this.
 *
 * @param {HTMLTitleElement} title A `<title>` element.
 * @return {String} The title content.
 */
function getTitleContent(title) {
  return title && title.innerText.trim().replace(/^\(\d+\/\d+\)/, '');
}
