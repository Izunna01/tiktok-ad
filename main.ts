// main.ts — the TikTok ad entry's program (Node 22, standard library only).
//
// Its one job is to hand the house the video's address: it copies VIDEO.json
// from the repository root into the output directory, where the gate reads it.
// The entry itself is the video: an original short vertical ad for make.fun,
// posted publicly on TikTok, with the bounty's line and the entrant's play code
// in its caption. The views the house reads from TikTok are the score; nothing
// this program writes about the video counts toward it.
//
// The ad was made in the recorded session that built this repository: the
// make.fun brand badge from the press pack runs from its first frame to the
// referral end card, which closes the video with the entrant's own referral
// code in its field. This repository holds no copy of any press file.
//
// Run the way the grader does:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Where the repository and the output live. The grader mounts them at /bot
// and /output; the env vars let the same program run outside the grader.
const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = process.env.MAKEFUN_BOT_DIR ?? here;
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

function main(): void {
  mkdirSync(outDir, { recursive: true });
  const source = join(repoRoot, 'VIDEO.json');
  const target = join(outDir, 'VIDEO.json');
  try {
    copyFileSync(source, target);
  } catch (err) {
    console.error(`could not copy VIDEO.json from ${repoRoot}: ${(err as Error).message}`);
    process.exit(1);
  }
}

main();
