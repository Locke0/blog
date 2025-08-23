module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("extractHeadings", function(content) {
    if (!content) return [];
    
    // Extract headings from HTML content (after markdown processing)
    const headings = [];
    
    // Method 1: Look for headings with IDs (from markdown-it-anchor)
    const htmlHeadingRegex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[1-6]>/gi;
    let match;
    
    while ((match = htmlHeadingRegex.exec(content)) !== null) {
      const level = parseInt(match[1]);
      const id = match[2];
      const text = match[3].replace(/<[^>]*>/g, '').trim();
      
      headings.push({
        level,
        text,
        id
      });
    }
    
    // Method 2: Look for headings without IDs and generate them
    if (headings.length === 0) {
      const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h[1-6]>/gi;
      
      while ((match = headingRegex.exec(content)) !== null) {
        const level = parseInt(match[1]);
        const text = match[2].replace(/<[^>]*>/g, '').trim();
        const id = text
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .replace(/^-|-$/g, '');
        
        headings.push({
          level,
          text,
          id
        });
      }
    }
    
    // Method 3: Fallback to markdown-style extraction
    if (headings.length === 0) {
      const markdownHeadingRegex = /^(#{1,6})\s+(.+)$/gm;
      const lines = content.split('\n');
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const markdownMatch = markdownHeadingRegex.exec(line);
        
        if (markdownMatch) {
          const level = markdownMatch[1].length;
          const text = markdownMatch[2].trim();
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
          
          headings.push({
            level,
            text,
            id
          });
        }
      }
    }
    
    console.log('ExtractHeadings filter found:', headings.length, 'headings:', headings.map(h => `${h.level}: ${h.text}`));
    return headings;
  });
};
