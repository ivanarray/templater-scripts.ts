'use strict';

function getMarkdownFilesFromFolder(tp, folder) {
    if (typeof folder === "string") {
        const f = tp.app.vault.getAbstractFileByPath(folder);
        if (!(f instanceof tp.obsidian.TFolder)) {
            throw Error(`${folder} isn't folder`);
        }
        return getMarknownFiles(f);
    }
    return getMarknownFiles(folder);
}
function getBacklinksFiles(tp, file) {
    const resolvedLinks = tp.app.metadataCache.resolvedLinks;
    const links = Object.keys(resolvedLinks).filter((sourcePath) => sourcePath !== file.path && resolvedLinks[sourcePath] && resolvedLinks[sourcePath][file.path]);
    const result = [];
    for (const link of links) {
        const f = tp.app.vault.getFileByPath(link);
        if (f) {
            result.push(f);
        }
    }
    return result;
}
function getMarknownFiles(folder) {
    const allFiles = folder.children;
    return allFiles.filter((f) => f.extension === "md" || f.extension === ".md");
}

/**
 * Add properties 'Theme' and 'Previous Note' to the note
 *
 * @param {Tp} tp templater object
 * @param {string | TFolder} [themesFolder] folder with theme notes. Root folder by default
 */
async function addDefaultProperties(tp, themesFolder) {
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
async function definePrevNoteName(tp, prevNote) {
    if (prevNote) {
        return `[[${prevNote.basename}]]`;
    }
    const backLinksFiles = getBacklinksFiles(tp, tp.config.target_file).map((f) => f.basename);
    const suggestion = await tp.system.suggester(["--- leave empty ---", ...backLinksFiles], ["", ...backLinksFiles], false, "Choose previous note");
    return suggestion ? `[[${suggestion}]]` : "";
}
async function defineTheme(tp, prevFile, themesFolder) {
    if (prevFile) {
        const cache = tp.app.metadataCache.getFileCache(prevFile);
        const fm = cache?.frontmatter;
        if (fm?.Theme) {
            return fm.Theme;
        }
    }
    themesFolder ?? (themesFolder = tp.app.vault.getRoot());
    const themes = getMarkdownFilesFromFolder(tp, themesFolder).map((file) => file.basename);
    const suggestion = await tp.system.suggester(["--- leave empty ---", ...themes], ["", ...themes], false, "Choose note theme");
    return suggestion ? `[[${suggestion}]]` : "";
}

module.exports = addDefaultProperties;
