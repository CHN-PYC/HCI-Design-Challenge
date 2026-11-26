import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const readStyle = (name: string) =>
  readFileSync(path.resolve(process.cwd(), "src", name), "utf8");

describe("large-text CSS regression", () => {
  it("makes every explicit font size follow the text boost", () => {
    for (const file of [
      "styles.css",
      "styles/components.css",
      "styles/v11.css",
    ]) {
      const css = readStyle(file);
      expect(css, file).not.toMatch(/font-size:\s*\d+(?:\.\d+)?px/);
    }

    const tokens = readStyle("styles/tokens.css");
    expect(tokens).toContain("--text-boost: 0px;");
    expect(tokens).toMatch(
      /\[data-text-size="large"\][\s\S]*--text-boost: 2px;/,
    );
    expect(readStyle("styles/v11.css")).toContain(
      "font-size: max(16px, var(--fs-body));",
    );
  });
});
