// Referenced by relative path (not the `types` compiler option) because this
// package ships a same-named `.ts` sibling alongside each `.d.ts` entry point,
// and bundler module resolution can pick the `.ts` source over the published
// `.d.ts`, which is missing the `declare module "cloudflare:workers"` block below.
// eslint-disable-next-line @typescript-eslint/triple-slash-reference -- referencing ambient types by file path, not an importable module.
/// <reference path="./node_modules/@cloudflare/workers-types/index.d.ts" />

// Augments the `Cloudflare.Env` namespace consumed by `env` in
// `import { env } from "cloudflare:workers"` (db/index.ts).
declare module "cloudflare:workers" {
  namespace Cloudflare {
    interface Env {
      DB: D1Database;
    }
  }
}
