# SEO + SSR Audit Conclusions

## Scope
- Project analyzed: `pokerplanets.com/frontend` (React + Vite SPA).
- Target requirement: implement SSR with domain-dependent SEO tags and `robots.txt`.
- Priority: SEO correctness with minimal regression risk for layout, responsiveness, validation, and animations.

## Existing State (Current Frontend)
- Stack: React 19, Vite, TypeScript, `react-router-dom`, Redux Toolkit + RTK Query, `styled-components`, i18n.
- Routing model: SPA (`BrowserRouter`) with `index.html` shell.
- SEO in `<head>` is not centralized and not consistently generated per page/domain.
- SEO text block in page body already exists (bottom content sections).
- Validation logic exists on client side (forms and input constraints).
- Animations are broad (Embla/Lottie/Marquee/CSS keyframes), with DOM-dependent parts.

## Main Feasibility Conclusion
- Full migration to Next.js SSR is feasible.
- Highest-impact requirement (SEO from API + domain-aware metadata + robots) can be implemented first.
- SEO-first phase is medium complexity and can be delivered without full UI rewrite.

## Complexity by Area
- Next.js + SSR migration: medium/high.
- SEO API integration (`title`, `description`, `seo content`, `hreflang`, `canonical`): medium.
- Preserving existing layout + responsiveness: medium/high.
- Preserving current validations: low/medium.
- Preserving animations and visual behavior: medium.

## Key Risks
- Missing or inconsistent backend SEO contract for domain/page level fields.
- SSR boundaries for DOM-only logic (`window/document/localStorage` usage).
- Potential hydration/FOUC issues if `styled-components` SSR setup is incomplete.
- Domain logic must be deterministic (Host parsing, canonical policy, language alternates).

## SEO-Critical Decision
- In Next.js, dynamic SEO must be generated server-side (not by editing static `index.html`).
- Proper implementation: per-request metadata generation from API + domain host.
- `robots.txt` should be generated dynamically when rules differ by domain/environment.

## Recommended Delivery Strategy
1. Lock API contract for SEO fields (including `canonical`, `hreflang`, robots policy).
2. Implement Next.js pilot for key pages with server metadata.
3. Add domain mapping and host-based metadata resolution.
4. Add dynamic `robots.txt` endpoint.
5. Roll out to remaining pages in batches with regression QA.

## Domain-Dependent SEO Requirements (Explicit)
- Resolve domain from request `Host`.
- Build metadata from API by `{domain, path, locale}`.
- Populate:
  - `title`
  - `description`
  - `canonical`
  - `hreflang` alternates
  - SEO body content block
- Generate `robots.txt` according to domain/environment rules.

## Effort Estimate (SEO-First)
- SEO-first SSR implementation (without full UI migration): typically 2-5 working days.
- Full careful migration preserving complete UX across all pages: typically 3-6 weeks (depends on scope and QA depth).

## Final Recommendation
- Start with SEO-first Next.js layer (server metadata + domain rules + robots), then migrate rendering progressively.
- This gives immediate SEO impact while reducing regression risk to current frontend behavior.
