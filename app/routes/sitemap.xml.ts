import { fetchHackathons } from "../lib/supabase";

export async function loader() {
  const hackathons = await fetchHackathons();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://contribly.firstissue.dev/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${hackathons
    .map(
      (h) => `  <url>
    <loc>https://contribly.firstissue.dev/hackathon/${h.id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
