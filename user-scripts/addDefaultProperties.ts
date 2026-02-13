import type { TFile, TFolder } from "obsidian";
import type { Tp } from "templater";
import { getBacklinksFiles, getMarkdownFilesFromFolder } from "utils/files";
import type { Nullable } from "utils/types";

/**
 * Add properties 'Theme' and 'Previous Note' to the note
 *
 * @param {Tp} tp templater object
 * @param {string | TFolder} [themesFolder] folder with theme notes. Root folder by default
 */
async function addDefaultProperties(tp: Tp, themesFolder?: string | TFolder): Promise<void> {
  if (!tp) {
    throw new Error("templater object isn't present");
  }

  const targetFile = tp.config.target_file;
  const prevNote = targetFile.path === tp.config.active_file?.path ? null : tp.config.active_file;

  const theme = await defineTheme(tp, prevNote, themesFolder);
  const prevNoteName = await definePrevNoteName(tp, prevNote);

  await tp.app.fileManager.processFrontMatter(targetFile, (frontmatter) => {
    frontmatter.Theme = theme;
    frontmatter["Previous Note"] = prevNoteName;
  });
}

async function definePrevNoteName(tp: Tp, prevNote: Nullable<TFile>): Promise<string> {
  if (prevNote) {
    return `[[${prevNote.basename}]]`;
  }

  const backLinksFiles = getBacklinksFiles(tp, tp.config.target_file).map((f) => f.basename);

  const suggestion = await tp.system.suggester(
    ["--- leave empty ---", ...backLinksFiles],
    ["", ...backLinksFiles],
    false,
    "Choose previous note",
  );

  return suggestion ? `[[${suggestion}]]` : "";
}

async function defineTheme(
  tp: Tp,
  prevFile: Nullable<TFile>,
  themesFolder: Nullable<string | TFolder>,
): Promise<string | unknown> {
  if (prevFile) {
    const cache = tp.app.metadataCache.getFileCache(prevFile);
    const fm = cache?.frontmatter;
    if (fm?.Theme) {
      return fm.Theme;
    }
  }
  themesFolder ??= tp.app.vault.getRoot();
  const themes = getMarkdownFilesFromFolder(tp, themesFolder).map((file) => file.basename);

  const suggestion = await tp.system.suggester(
    ["--- leave empty ---", ...themes],
    ["", ...themes],
    false,
    "Choose note theme",
  );
  return suggestion ? `[[${suggestion}]]` : "";
}

export default addDefaultProperties;
