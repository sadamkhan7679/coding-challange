// Note: Please do not use JSDOM or any other external library/package (sorry)
/*
type Metadata = {
  url: string;
  siteName: string;
  title: string;
  description: string;
  keywords: string[];
  author: string;
};
*/

/**
 * Gets the URL, site name, title, description, keywords, and author info out of the <head> meta tags from a given html string.
 * 1. Get the URL from the <meta property="og:url"> tag.
 * 2. Get the site name from the <meta property="og:site_name"> tag.
 * 3. Get the title from the the <title> tag.
 * 4. Get the description from the <meta property="og:description"> tag or the <meta name="description"> tag.
 * 5. Get the keywords from the <meta name="keywords"> tag and split them into an array.
 * 6. Get the author from the <meta name="author"> tag.
 * If any of the above tags are missing or if the values are empty, then the corresponding value will be null.
 * @param html The complete HTML document text to parse
 * @returns A Metadata object with data from the HTML <head>
 */
export default function getMetadata(html) {
  // TODO: delete and replace this with your code
  // parse html string without external libraries
  const dom = new DOMParser().parseFromString(html, "text/html");
    const {head} = dom;


  // // create a new element with the HTML string
  //   const element = document.createElement("div");
  //   element.innerHTML = html;
    // get the <head> element
    // const head = element.querySelector("head");

    // get the <meta> elements
    const meta = head.querySelectorAll("meta");
    // get url from <meta property="og:url">
    const url = head.querySelector("meta[property='og:url']")?.getAttribute("content");
    // get site name from <meta property="og:site_name">
    const siteName = head.querySelector("meta[property='og:site_name']")?.getAttribute("content");
    // get title from <title>
    const title = head.querySelector("title")?.textContent;
    // get description from <meta property="og:description"> or <meta name="description">
    const description = head.querySelector("meta[property='og:description']")?.getAttribute("content") || head.querySelector("meta[name='description']")?.getAttribute("content");
    // get keywords from <meta name="keywords">
    const keywords = head.querySelector("meta[name='keywords']")?.getAttribute("content")?.split(",").filter((keyword) => keyword.length > 0);
    // get author from <meta name="author">
    const author = head.querySelector("meta[name='author']")?.getAttribute("content");



    // if values are missing, return null. if values are empty, return empty string.

  return {
    url: url === "" ? "": url ? url : null,
    siteName: siteName === "" ? "": siteName ? siteName : null,
    title: title === "" ? "": title ? title : null,
    description: description === "" ? "": description ? description : null,
    keywords: keywords || null,
    author: author === "" ? "": author ? author : null,
  }
}
