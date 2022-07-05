/*
type Metadata = {
  url: string | null;
  siteName: string | null;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  author: string | null;
};
*/

/**
 * Filters the given Metadata array to only include the objects that match the given search query.
 * If the search query has multiple words,
 * treat each word as a separate search term to filter by,
 * in addition to gathering results from the overall query.
 * If the search query has special characters,
 * run the query filter with the special characters removed.
 * Can return an empty array if no Metadata objects match the search query.
 * @param {Metadata[]} metadata - An array of Metadata objects
 * @param {string} query - The search query string
 * @returns {Metadata[]} - An array of Metadata objects that match the given search query
 */
export default function filterMetadata(metadata, query) {
  // TODO: delete and replace this with your code

  if(query === "") return metadata;


  if(!query || !metadata) return [];

  if(typeof query !== "string") return [];

  // Acronym: remove query periods
  query = query.replace(/\./g, "");

  // split query into words
    const words = query.split(" ");
    // remove special characters from query excluding fullstops, hiphens, and spaces
    const cleanQuery = words.map((word) => word.replace(/[^-a-zA-Z0-9]/g, ""));

// filter metadata by query
    const filteredMetadata = metadata.filter((obj) => {
      let match = false;

      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (typeof value === "string") {
            // remove periods from value
            const cleanValue = value.replace(/\./g, "");
        // map over each word in query
            cleanQuery.forEach((word) => {
                // let's check if word has hyphens
                if(word.includes("-")){
                    // if word has hyphens, split into separate words
                    const hyphenWords = word.split("-");
                    // check if any of the hyphen words are in the value
                    if(hyphenWords.some((hyphenWord) => cleanValue.includes(hyphenWord))){
                        match = true;
                    }
                    return;
                }


                if (cleanValue.toLowerCase().includes(word.toLowerCase())) {
                    match = true;
                }
            })
        }
        // if value is array
        if (Array.isArray(value)) {
            value.forEach((item) => {
                if (typeof item === "string") {
                    cleanQuery.forEach((word) => {
                        // let's check if word has hyphens
                        if(word.includes("-")){
                            // if word has hyphens, split into separate words
                            const hyphenWords = word.split("-");
                            // check if any of the hyphen words are in the value
                            if(hyphenWords.some((hyphenWord) => item.includes(hyphenWord))){
                                match = true;
                            }
                            return
                        }


                        if (item.toLowerCase().includes(word.toLowerCase())) {
                            match = true;
                        }
                    })
                }
            });
        }

      });
      return match;
    }
    );





  return filteredMetadata;
}
