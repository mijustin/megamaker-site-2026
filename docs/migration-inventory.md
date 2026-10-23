# Migration inventory and launch gates

Inspected October 22, 2026 (UTC). This is a public-source inventory, not a traffic audit or a complete crawl. No authenticated member content was accessed. DNS, billing, Slack, and old hosting remain unchanged.

## Assets

| Original public source | Local copy / decision |
| --- | --- |
| `https://ucarecdn.com/9b6c3813-3ed8-4593-abf5-4b0a3a3ecc90/` | HTTP 404. Use an accessible text wordmark until a working logo is supplied. |
| `https://ucarecdn.com/3f957112-8148-43d9-90e2-bd6b2ed01c7d/` | HTTP 404. New simple M favicon in `public/favicon.svg`. |
| `https://ucarecdn.com/dae852fd-2f40-4caf-be95-2979eec8992b/-/stretch/off/-/resize/1000x/` | `src/assets/community.jpg`; public group photo, no private messages or contact details visible. Also in `public/images/community.jpg` for social cards. |
| `https://ucarecdn.com/a9a1888a-6609-49fe-aaa3-df7405bd522f/-/stretch/off/-/resize/1000x/` | `src/assets/world.jpg`; historical map with public profile photos, not a live directory or count. |
| `https://ucarecdn.com/22e2fb07-204c-4f84-a497-33d776bd7665/-/stretch/off/-/resize/1000x/` | `src/assets/slack.jpg`; contains names, avatars, chat text, and timestamps. Justin explicitly requested keeping this existing public screenshot after review. No additional Slack content fetched. |

The three marketing images are downloaded originals. Astro generates responsive WebP variants with dimensions at build time. The original homepage copy is preserved in [original-homepage.md](original-homepage.md). Replacement copy removes numeric member counts and the directory benefit, reframes lifetime access as the membership model rather than an available purchase, and preserves the lifetime-of-site qualification.

The retained external links (Product People, Panda, LA Tech, Folyo, YouTube) returned HTTP 200 using HTTPS; Folyo redirected to `https://www.folyo.me/`, which is used directly. HTTP success alone is not a guarantee of future availability or video playback.

## Public routes observed

| Route | Existing behavior | Replacement / launch decision |
| --- | --- | --- |
| `/` | 200, application-backed marketing page | Static homepage |
| `/join` | 200, old join flow | Static closed-membership page; ignores query parameters |
| `/login`, `/members`, `/lists/projects` | 200 | Helpful real 404; no replacement app |
| `/newsletter` | 302 to `/` | No archive discovered from this route; traffic and older post URLs still need review |
| `/podcast` and `?page=2`, `?page=3`, `?page=4` | 200, four archive pages | **Pending archival/redirect decision before cutover** |
| `/sitemap.xml` | 404 | New sitemap at `/sitemap-index.xml` |
| `/robots.txt` | Allows all | Production allows indexing; preview builds disallow it |
| `/review` | Referenced by podcast episode show notes; not yet verified | Include in legacy URL review before cutover |

### Podcast episode paths linked by the four archive pages

All paths below are under `https://megamaker.co`. The first episode detail page was fetched successfully; the other entries were discovered in archive links, not individually audited.

- `/podcast/bootstrapping-with-kids-and-waiting-to-launch`
- `/podcast/which-part-of-the-product-will-get-traction`
- `/podcast/how-many-early-access-customers-did-we-get`
- `/podcast/is-josh-ready-for-early-access`
- `/podcast/what-it-takes-to-run-a-paid-online-community-8-years`
- `/podcast/is-truly-possible-to-validate-a-product-idea-before-launch`
- `/podcast/josh-gets-some-runway`
- `/podcast/observing-customer-demand-plus-we-reveal-the-name`
- `/podcast/first-a-little-background`
- `/podcast/teaser-trying-something-new-for-2021`
- `/podcast/just-testing-something-for-transistorfm`
- `/podcast/archive-2019-a-time-capsule-of-bootstrapping-anxiety`

The archive embeds Transistor players, including `https://share.transistor.fm/e/c9e7f60b`. Its public player data identifies **https://feeds.transistor.fm/megamaker** as the RSS feed. That URL returned valid RSS titled “MegaMaker 2022” with **11 items**, and a website link to `https://megamaker.co`.

The feed is hosted separately from this website, but this does not establish that there are no legacy feed aliases or episode links on the MegaMaker domain. Check analytics, Search Console, podcast directories, and old hosting configuration before cutover. Do not cancel Transistor or redirect all missing routes to the homepage.

## Required before a domain switch

- Decide whether and where the podcast archive and episode pages should be preserved or redirected; inspect traffic and any other public post/feed URLs.
- Verify whether the old platform still provides billing, Slack invitations, existing-member access, email delivery, or other necessary services. Keep it running until those dependencies are understood.
- Review the Cloudflare Pages preview, including actual HTTP 404 responses, video playback, production indexing, and the `www` policy. Local preview checks do not replace this.
- Preserve MX/TXT and unrelated DNS records; save old DNS values and retain rollback hosting.
- Obtain explicit approval for Cloudflare deployment/domain changes. No deployment or DNS change is included in this implementation.

## Verification so far

On Node 24.22.1: `npm run check` and `npm test` pass. The production build emits static HTML, optimized images, CSS, robots, and sitemap with no first-party browser JavaScript. A top-level `404.html` prevents Cloudflare Pages' implicit SPA fallback (see [Pages serving behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/)).

The local Astro production preview returns 200 for `/` and `/join`, and 404 for `/login`, `/members`, `/members/example`, `/lists/projects`, `/lists/projects/example`, and `/unknown`. An email-bearing `/join` URL is not reflected in HTML. Preview responses carry `X-Robots-Tag: noindex, nofollow`; production HTML remains indexable. Cloudflare runtime behavior still needs verification after an authorized preview deployment.

`SITE_PREVIEW=1 npm run build` was separately checked for noindex metadata and `Disallow: /`, then a normal production build was restored. Chromium renders were inspected at desktop and narrow viewport sizes, with a 320px hero overflow found and fixed. These are responsive Chromium checks, not real-device Safari or touch tests. All three images loaded, headings have one H1 followed by H2s, the keyboard skip link focuses the main content, and link focus is visible. Normal text/link color pairs exceed 4.5:1 contrast. A recording verifies the closure page's home-link navigation.

The lazy YouTube player loads its title, thumbnail, and controls. Playback was attempted but did not advance during the orb check; successful playback remains a pre-launch check on the deployed origin. The normal YouTube fallback link is present.
