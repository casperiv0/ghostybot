import { buildSync } from "esbuild";
import { globby } from "globby";
import chalk from "chalk";
const { red, green, yellowBright } = chalk;

// pages dir is handled by Next.js
const paths = await globby(["./src/**/**/*.ts", "!./src/pages/**"]);

const data = buildSync({
  minify: true,
  sourcemap: "external",
  outdir: "dist",
  platform: "node",
  entryPoints: paths,
  target: "node16",
  format: "cjs",
  logLevel: "info",
});

if (data.warnings.length > 0) {
  console.info(yellowBright("GhostyBot built with errors"));
} else if (data.errors.length > 0) {
  console.error(red("Encountered errors when building"));
} else {
  console.info(green("\n\n 🎉🎉 Built GhostyBot without errors! 🎉🎉\n\n"));
}
