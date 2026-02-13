import type { TFile } from "obsidian";
import type { Tp } from "templater";

async function addDefaultProperties(tp: Tp): Promise<void> {
  if (!tp) {
    throw new Error("templater object isn't present");
  }

  const targetFile = tp.config.target_file;
  const prevFile = targetFile === tp.config.active_file ? null : tp.config.active_file;

  let theme = "";
  let prevFileName = "";

  if (prevFile) {
    prevFileName = prevFile.name;
    const cache = tp.app.metadataCache.getFileCache(prevFile);
    const fm = cache?.frontmatter;
    if (fm?.Theme) {
      theme = fm.Theme as string;
    }
  }

  if (!theme) {
    const rootChildren = tp.app.vault.getRoot().children;
    const rootFiles = rootChildren.filter((af) => af instanceof tp.obsidian.TFile) as TFile[];
    const rootNotes = rootFiles.filter((f) => f.extension === "md").map((f) => f.basename);

    const suggestion = await tp.system.suggester<string | null>(
      ["--- leave empty ---", ...rootNotes],
      ["", ...rootNotes.map((n) => `[[${n.replace(".md", "")}]]`)],
      false,
      "Choose note theme",
    );

    theme = suggestion ?? "";
  }

  await tp.app.fileManager.processFrontMatter(targetFile, (frontmatter) => {
    if (!frontmatter.Theme) {
      frontmatter.Theme = `${theme.replace(".md", "")}`;
    }
    if (!frontmatter["Previous Note"]) {
      frontmatter["Previous Note"] = `[[${prevFileName.replace(".md", "")}]]`;
    }
  });
}

export default addDefaultProperties;
