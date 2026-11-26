# Legal content integration

The app selects `releases/legal-draft-1.json` through the root `legal-release.json`. The pinned `shared/heartlog-legal` submodule is verified by SHA-256 before its selected markdown and consent JSON are bundled into `.generated/legal.ts`. The generated file is ignored and is never a second maintained copy.

Use `npm run legal:verify` for local development. It permits a manifest marked `draft`. Use `npm run legal:verify:production` before publication; it requires `status: published` and rejects placeholder content. `npm run build` runs the development verification path by default. Cloudflare Pages must use `LEGAL_RELEASE_MODE=production` and the build command `npm run legal:verify:production && npm run build` when publishing a production site.

The checkout must initialise submodules at the gitlink recorded by this repository and must not run `git submodule update --remote`. Configure the build system's repository integration or deploy key so it can read the private SSH submodule. Keep the local SSH URL in `.gitmodules`; do not replace the pinned commit with a branch checkout.

The current OpenAPI snapshot accepts only `email` and `password` and rejects additional properties. The frontend now sends `legalAcceptances` containing the selected release, each displayed version/hash, and the three distinct acceptance values. The backend contract must add that field (or provide its agreed equivalent) before registration can successfully persist these acceptances. Regenerate `src/shared/api/heartlog.generated.ts` after updating `docs/integrations/backend-api.openapi.json`.
