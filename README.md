# MegaMaker site 2026

Rebuild [megamaker.co](https://megamaker.co/) as a simple static Astro landing page hosted on Cloudflare Pages, replacing the public-facing membership website rather than recreating its application features.

**Status:** Plan only. No Astro implementation or deployment yet. The live site, existing memberships, Slack workspace, payments, and DNS have not been changed.

**GitHub repository:** [mijustin/megamaker-site-2026](https://github.com/mijustin/megamaker-site-2026) (private).

## Launch behavior

Display this message in place of joining prompts:

> Not accepting new members at this time.

Use readable status text, not a clickable or disabled “Join now” button. There must be no signup form, email collection, checkout, or waitlist at launch. This is a pause in new membership, not an announcement that the existing Slack community is closing.

Later, Justin will supply a Stripe-hosted checkout URL. At that point, replace the status message with a “Join now” link to that URL. Do not add Stripe.js, API keys, webhooks, an embedded checkout, or a payment backend for a simple external link. Leave payments disabled until the URL is supplied and checkout and fulfillment have been verified.

## What stays and what goes

Based on the live homepage and Justin's annotated screenshot, inspected October 21, 2026.

| Keep | Remove |
| --- | --- |
| MegaMaker name/logo and red-and-black visual identity | Members, Newsletter, Podcast, and Projects navigation, including mobile and footer copies |
| “A private Slack community for bootstrappers” headline | Sign-in links and account/authentication UI |
| “Serving indie makers since 2013” subheading | Hero email field and signup form |
| Community introduction, history, and audience description | Member directory and its advertised membership benefit |
| Folyo testimonial | Membership profiles, project listings, and other app features |
| Slack community benefit and relevant screenshots | Existing join/checkout flow and its backend dependencies |
| Lifetime-access explanation and its qualification | Live member count and avatar stack (recommended simplification; do not imply a live count) |
| Contact email: `words@megamaker.co` | Floating support-chat widget and its scripts (recommended simplification) |
| Existing introductory YouTube video | Old framework scripts, icon-font kit, and client-side Stripe integration |

Retain the public marketing content, not private member records. Remove references to the member directory throughout the copy. Frame the lifetime-access explanation as how membership works, without suggesting checkout is currently available. Preserve the existing qualification that “lifetime” refers to the lifetime of the site, not a person's lifetime; do not invent prices, new terms, or reopening dates.

The live homepage contains introduction/history sections beyond those visible in the supplied screenshot. Preserve those unless deliberately edited during the rebuild; do not treat their absence from the screenshot as a deletion instruction.

## Implementation plan

### 1. Preserve the source material

- Capture the full homepage copy before retiring the current platform, including the community story, testimonial attribution, and lifetime-access wording.
- Download the existing logo and relevant marketing images into the repository rather than hotlinking the old asset host. Check the logo: it appears broken in the supplied screenshot.
- Review existing Slack screenshots for information that should not be republished; do not pull in additional private Slack content or member records.
- Preserve the video reference and contact address. Check external links and remove or replace broken ones intentionally.
- Inventory existing public routes and any podcast-feed URLs before cutover. Removing navigation does not by itself decide whether old content can disappear safely.

### 2. Build a small static Astro site

- Use Astro static output with plain CSS and minimal browser JavaScript. No React, database, CMS, SSR adapter, authentication, or API is needed.
- Create a shared page layout, the homepage, a `/join` closure page for old bookmarks, and a helpful static 404 page.
- Keep the visual direction close to the existing site: dark header/footer, red hero, strong white headline, and a readable white content area. Adapt spacing and typography for phones as well as desktops.
- With the application navigation removed, do not retain an empty mobile menu or hamburger button.
- Use semantic headings, descriptive image text, accessible link contrast, visible keyboard focus, and responsive images with dimensions to avoid layout shifts.
- Use a privacy-enhanced, lazy-loaded YouTube embed for video `bgOowqCx8kM`, with a descriptive iframe title and a normal video link as a fallback.
- Use a single shared membership-status component for repeated prompts. Initially it renders only the closure text; when Stripe is ready, update that component to render the hosted checkout link. Do not build a general membership configuration system.
- Add an accurate description, canonical URL, social-sharing metadata, favicon, sitemap, and `robots.txt`. Set Astro's production `site` URL to `https://megamaker.co`.

### 3. Handle retired routes deliberately

| Route / content | Launch treatment |
| --- | --- |
| `/` | Static marketing homepage with closed-membership message. |
| `/join` | Static “Not accepting new members at this time.” page with a link home; ignore old signup query parameters and do not collect data. |
| `/login`, `/members`, `/lists/projects` and app-only child routes | No replacement app. Remove internal links and return a real not-found response with helpful navigation; do not accidentally serve the homepage with HTTP 200. |
| `/newsletter`, `/podcast`, individual public posts, and any feeds | Not included in the initial landing-page build. Inventory traffic/content and confirm archival or redirect decisions before domain cutover. Do not silently break podcast subscriptions or blanket-redirect every old URL to the homepage. |

No newsletter archive migration is assumed for this project. Unlike the Cowork Vernon plan, this is a landing-page-only rebuild. If old articles or feeds need preservation, decide that explicitly before launch.

### 4. Verify the preview

- Run Astro checks and a production build.
- Inspect desktop and mobile renders, including the header, hero status, long-form content, images, video, and footer.
- Check keyboard navigation, focus visibility, heading order, contrast, and horizontal overflow.
- Verify that no signup field, sign-in link, directory link, active checkout, chat widget, or old backend script remains.
- Verify the closed state both on `/` and directly at `/join`, including old email-bearing query URLs; never echo those values into the page.
- Check external links, email contact, video behavior, image loading, canonical metadata, and sitemap.
- Check retired and unknown paths on the Pages preview for actual HTTP 404 responses, not a single-page-app fallback.
- Keep previews out of search indexing without applying `noindex` to the production site.

### 5. Deploy and switch the domain

Connect the GitHub repository to Cloudflare Pages after implementation:

| Setting | Planned value |
| --- | --- |
| Production branch | `main` |
| Project root | Repository root |
| Build command | `npm run build` |
| Output directory | `dist` |
| Rendering | Static; no Cloudflare SSR adapter required |
| Node.js | Pin a version supported by the chosen Astro release, consistently in local development and Pages |

These are future build settings; there is no package or build script in this planning-only repository yet.

Review the Pages preview, then connect `megamaker.co` through Cloudflare's custom-domain flow. Check existing DNS, preserve email MX/TXT and unrelated records, and decide the `www` redirect. Save the old DNS values and keep old hosting available for rollback until production checks pass.

Before shutting down the old platform, confirm whether it still handles payments, existing-member access, Slack invitations, email delivery, public archives, or podcast feeds. Replacing the public website must not inadvertently revoke existing members' access or cancel billing. Any needed exports must be private, not committed here.

Cloudflare project creation, deployment, DNS changes, and retiring the old service are separate execution steps, not actions performed by this plan.

### 6. Enable Stripe later

1. Justin creates and supplies the Stripe-hosted checkout link and confirms price and purchase terms.
2. Decide how a successful payment results in a Slack invitation and how buyers get help. A hosted payment page alone does not grant Slack access; manual fulfillment is acceptable if intentional and communicated.
3. Replace the shared closed-membership message with a normal “Join now” link. Update `/join` to point to checkout as well so old links still work.
4. Verify the destination, checkout, confirmation, and agreed fulfillment flow using an authorized test before opening membership. Do not make a live purchase merely to test the site.

## Source references

These references were found in the public homepage HTML. Assets have not yet been downloaded or visually audited.

- [Current homepage](https://megamaker.co/)
- [Logo source](https://ucarecdn.com/9b6c3813-3ed8-4593-abf5-4b0a3a3ecc90/)
- [Content image 1](https://ucarecdn.com/dae852fd-2f40-4caf-be95-2979eec8992b/-/stretch/off/-/resize/1000x/)
- [Content image 2](https://ucarecdn.com/a9a1888a-6609-49fe-aaa3-df7405bd522f/-/stretch/off/-/resize/1000x/)
- [Content image 3](https://ucarecdn.com/22e2fb07-204c-4f84-a497-33d776bd7665/-/stretch/off/-/resize/1000x/)
- [Introductory video](https://www.youtube.com/watch?v=bgOowqCx8kM)
- [Cloudflare Pages Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

The inspected site currently includes Livewire, Alpine, Stripe.js, and a signup form that sends visitors to `/join`. These should not be copied into the static replacement.
