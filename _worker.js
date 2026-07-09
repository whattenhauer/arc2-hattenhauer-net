export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Serve static assets from the root directory
    const response = await env.ASSETS.fetch(request);

    // Only transform HTML responses
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) {
      return response;
    }

    // HTMLRewriter transformations
    const rewriter = new HTMLRewriter()
      // Rewrite absolute hattenhauer.net URLs to relative paths
      .on("[href]", {
        element(el) {
          const href = el.getAttribute("href");
          if (href && href.includes("hattenhauer.net")) {
            const relative = href.replace(/https?:\/\/[^\/]+(?::\d+)?/, "");
            el.setAttribute("href", relative);
          }
        }
      })
      .on("[src]", {
        element(el) {
          const src = el.getAttribute("src");
          if (src && src.includes("hattenhauer.net")) {
            const relative = src.replace(/https?:\/\/[^\/]+(?::\d+)?/, "");
            el.setAttribute("src", relative);
          }
        }
      })
      // TODO: Remove uncooperative scripts (add more as needed)
      .on("script[src*='old-analytics']", {
        element(el) {
          el.remove();
          console.log("TODO: Replace old-analytics script with modern version");
        }
      })
      // TODO: Remove broken iframes
      .on("iframe[src*='old-embed']", {
        element(el) {
          el.remove();
          console.log("TODO: Replace old-embed iframe with modern embed");
        }
      });

    return rewriter.transform(response);
  }
};
