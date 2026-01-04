const todaysDate = new Date();
const isDev = require("../_data/isdevelopment")();

function showDraft(data) {
  // In development, show all posts including drafts
  if (isDev) return true;
  
  // In production, only show published posts
  const isDraft = "draft" in data && data.draft !== false;
  // A post is a draft only if explicitly set to true
  // const isDraft = data.draft === true;
  const isPostInFuture =
    "scheduled" in data ? data.scheduled > todaysDate : false;
  
  // Return true if post should be shown (not draft, not in future)
  return !isDraft && !isPostInFuture;
}

module.exports = () => {
  return {
    eleventyComputed: {
      eleventyExcludeFromCollections: (data) => {
        // If post should be shown, don't exclude it
        // If post should be hidden, exclude it
        return showDraft(data) ? false : true;
      },
      permalink: (data) => {
        // If post should be shown, use its permalink
        // If post should be hidden, don't generate a page
        return showDraft(data) ? data.permalink : false;
      },      
    },
    tags: ["posts"],
  };
};
