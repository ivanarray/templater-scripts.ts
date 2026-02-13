import type { TFile, TFolder } from "obsidian";
import type { Tp } from "templater";

export function getMarkdownFilesFromFolder(tp: Tp, folder: TFolder | string) {
  if (typeof folder === "string") {
    const f = tp.app.vault.getAbstractFileByPath(folder);
    if (!(f instanceof tp.obsidian.TFolder)) {
      throw Error(`${folder} isn't folder`);
    }

    return getMarknownFiles(f);
  }

  return getMarknownFiles(folder);
}

export function getBacklinksFiles(tp: Tp, file: TFile): TFile[] {
  const resolvedLinks = tp.app.metadataCache.resolvedLinks;
  const links = Object.keys(resolvedLinks).filter(
    (sourcePath) =>
      sourcePath !== file.path && resolvedLinks[sourcePath] && resolvedLinks[sourcePath][file.path],
  );

  const result: TFile[] = [];

  for (const link of links) {
    const f = tp.app.vault.getFileByPath(link);
    if (f) {
      result.push(f);
    }
  }

  return result;
}

function getMarknownFiles(folder: TFolder) {
  const allFiles = folder.children as TFile[];
  return allFiles.filter((f) => f.extension === "md" || f.extension === ".md");
}
