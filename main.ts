import { mkdirSync, realpathSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const MONOLOGUE = [
  "Hush, knight—sheathe that sun-steel; its glare cuts straight behind my eyes. Yes, I'm Margrave Pell. Thirty years of border wars, seven burnt abbeys, and every winter some squire kicks in my oak doors, demanding thunder.",
  "...Where was I? Oh, Crowsford. I forged your prior's seal at dusk. At first bell the weir-gates drop, drowning the river-barracks and sparing me another siege in wet wool. Go on, take the corridor—spare us both a duel. Wait. Your knuckles are greying already? Damn that mage. I paid for a slower threshold-hex, so you'd at least reach the stairs.",
].join('\n\n');

export function resolveOutputDir(env: NodeJS.ProcessEnv = process.env): string {
  const configured = env.MAKEFUN_OUTPUT_DIR?.trim();
  return configured && configured.length > 0 ? configured : '/output';
}

export function writeEntry(outputDir: string = resolveOutputDir()): string {
  mkdirSync(outputDir, { recursive: true });
  const outputPath = join(outputDir, 'entry.txt');
  writeFileSync(outputPath, MONOLOGUE, 'utf8');
  return outputPath;
}

function isMainModule(): boolean {
  if (typeof import.meta.main === 'boolean') return import.meta.main;
  if (!process.argv[1]) return false;
  return realpathSync(resolve(process.argv[1])) === realpathSync(fileURLToPath(import.meta.url));
}

if (isMainModule()) {
  writeEntry();
}
