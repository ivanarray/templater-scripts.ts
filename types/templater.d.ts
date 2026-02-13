declare module "templater" {
  import type { App, TFile, TFolder, CachedMetadata } from "obsidian";
  //
  // tp.config
  //
  // Docs: https://silentvoid13.github.io/Templater/internal-functions/internal-modules/config-module.html
  //
  /**
   * This module exposes Templater's running configuration.
   *
   * This is mostly useful when writing scripts requiring some context information.
   */
  export interface TpConfig {
    /**
     * The `TFile` object representing the template file.
     * Definition: tp.config.template_file
     */
    template_file: TFile;

    /**
     * The `TFile` object representing the target file where the template will be inserted.
     * Definition: tp.config.target_file
     */
    target_file: TFile;

    /**
     * The run mode used to launch Templater
     * (Create new from template, Append to active file, ...).
     * Definition: tp.config.run_mode
     */
    run_mode: string;

    /**
     * The active file (if existing) when launching Templater.
     * Definition: tp.config.active_file?
     */
    active_file?: TFile | null;
  }

  //
  // tp.date
  //
  // Docs: https://silentvoid13.github.io/Templater/internal-functions/internal-modules/date-module.html
  //
  /**
   * This module contains every internal function related to dates.
   */
  export interface TpDate {
    /**
     * Retrieves the date.
     * Signature: tp.date.now(format: string = "YYYY-MM-DD", offset?: number|string, reference?: string, reference_format?: string)
     */
    now(
      format?: string,
      offset?: number | string,
      reference?: string,
      reference_format?: string,
    ): string;

    /**
     * Retrieves tomorrow's date.
     * Signature: tp.date.tomorrow(format: string = "YYYY-MM-DD")
     */
    tomorrow(format?: string): string;

    /**
     * Retrieves yesterday's date.
     * Signature: tp.date.yesterday(format: string = "YYYY-MM-DD")
     */
    yesterday(format?: string): string;

    /**
     * Retrieves the date of a given weekday.
     * Signature: tp.date.weekday(format: string = "YYYY-MM-DD", weekday: number, reference?: string, reference_format?: string)
     */
    weekday(
      format?: string,
      weekday: number,
      reference?: string,
      reference_format?: string,
    ): string;
  }

  //
  // tp.file
  //
  // Docs: https://silentvoid13.github.io/Templater/internal-functions/internal-modules/file-module.html
  //
  /**
   * This module contains every internal function related to files.
   */
  export interface TpFile {
    /**
     * The string contents of the file at the time that Templater was executed.
     * Manipulating this string will not update the current file.
     * Definition: tp.file.content
     */
    readonly content: string;

    /**
     * Retrieves the file's title.
     * Definition: tp.file.title
     */
    readonly title: string;

    /**
     * Retrieves the file's tags (array of string).
     * Definition: tp.file.tags
     */
    readonly tags: string[];

    /**
     * Creates a new file using a specified template or with a specified content.
     * Definition: tp.file.create_new(template: TFile | string, filename?: string, open_new: boolean = false, folder?: TFolder | string)
     */
    create_new(
      template: TFile | string,
      filename?: string,
      open_new?: boolean,
      folder?: TFolder | string,
    ): Promise<TFile | undefined>;

    /**
     * Retrieves the file's creation date.
     * Definition: tp.file.creation_date(format: string = "YYYY-MM-DD HH:mm")
     */
    creation_date(format?: string): string;

    /**
     * Retrieves the file's last modification date.
     * Definition: tp.file.last_modified_date(format: string = "YYYY-MM-DD HH:mm")
     */
    last_modified_date(format?: string): string;

    /**
     * Sets the cursor to this location after the template has been inserted.
     * Definition: tp.file.cursor(order?: number)
     */
    cursor(order?: number): string;

    /**
     * Appends some content after the active cursor in the file.
     * Definition: tp.file.cursor_append(content: string)
     */
    cursor_append(content: string): string | undefined;

    /**
     * Check to see if a file exists by its file path.
     * The full path to the file, relative to the vault and containing the extension, must be provided.
     * Definition: tp.file.exists(filepath: string)
     */
    exists(filepath: string): Promise<boolean>;

    /**
     * Search for a file and return its `TFile` instance.
     * Definition: tp.file.find_tfile(filename: string)
     */
    find_tfile(filename: string): TFile | null;

    /**
     * Retrieves the file's folder name.
     * Definition: tp.file.folder(absolute: boolean = false)
     */
    folder(absolute?: boolean): string;

    /**
     * Includes the file's link content. Templates in the included content will be resolved.
     * Definition: tp.file.include(include_link: string | TFile)
     */
    include(include_link: string | TFile): Promise<string>;

    /**
     * Moves the file to the desired vault location.
     * Definition: tp.file.move(new_path: string, file_to_move?: TFile)
     */
    move(new_path: string, file_to_move?: TFile): Promise<string>;

    /**
     * Retrieves the file's absolute path on the system.
     * Definition: tp.file.path(relative: boolean = false)
     */
    path(relative?: boolean): string;

    /**
     * Renames the file (keeps the same file extension).
     * Definition: tp.file.rename(new_title: string)
     */
    rename(new_title: string): Promise<string>;

    /**
     * Retrieves the active file's text selection.
     * Definition: tp.file.selection()
     */
    selection(): string;
  }

  //
  // tp.frontmatter
  //
  // Docs: https://silentvoid13.github.io/Templater/internal-functions/internal-modules/frontmatter-module.html
  //
  /**
   * This module exposes all the frontmatter variables of a file as variables.
   * Keys correspond to frontmatter property names.
   */
  export interface TpFrontmatter {
    [key: string]: unknown;
  }

  //
  // tp.hooks
  //
  // Docs: https://silentvoid13.github.io/Templater/internal-functions/internal-modules/hooks-module.html
  //
  export interface TpHooks {
    /**
     * Hooks into when all actively running templates have finished executing.
     * Signature: tp.hooks.on_all_templates_executed(callback_function: () => any)
     */
    on_all_templates_executed(callback_function: () => unknown): void;
  }

  //
  // tp.obsidian
  //
  // Docs: https://silentvoid13.github.io/Templater/internal-functions/internal-modules/obsidian-module.html
  //
  /**
   * This module exposes all the functions and classes from the Obsidian API.
   */

  //
  // tp.system
  //
  // Docs: https://silentvoid13.github.io/Templater/internal-functions/internal-modules/system-module.html
  //
  /**
   * This module contains system related functions.
   */
  export interface TpSystem {
    /**
     * Retrieves the clipboard's content.
     * Signature: tp.system.clipboard()
     */
    clipboard(): Promise<string | null>;

    /**
     * Spawns a prompt modal and returns the user's input.
     * Signature: tp.system.prompt(prompt_text?: string, default_value?: string, throw_on_cancel: boolean = false, multiline?: boolean = false)
     */
    prompt(
      prompt_text?: string,
      default_value?: string | null,
      throw_on_cancel?: boolean,
      multiline?: boolean,
    ): Promise<string | null>;

    /**
     * Spawns a suggester prompt and returns the user's chosen item.
     * Signature: tp.system.suggester(text_items: string[] | ((item: T) => string), items: T[], throw_on_cancel: boolean = false, placeholder: string = "", limit?: number)
     */
    suggester<T>(
      text_items: string[] | ((item: T) => string),
      items: T[],
      throw_on_cancel?: boolean,
      placeholder?: string,
      limit?: number,
    ): Promise<T | null>;

    /**
     * Spawns a suggester prompt that supports selecting multiple items and returns the user's chosen items.
     * Signature: tp.system.multi_suggester(text_items: string[] | ((item: T) => string), items: T[], throw_on_cancel: boolean = false, title: string = "", limit?: number)
     */
    multi_suggester<T>(
      text_items: string[] | ((item: T) => string),
      items: T[],
      throw_on_cancel?: boolean,
      title?: string,
      limit?: number,
    ): Promise<T[]>;
  }

  //
  // tp.web
  //
  // Docs: https://silentvoid13.github.io/Templater/internal-functions/internal-modules/web-module.html
  //
  /**
   * This module contains every internal function related to the web (making web requests).
   */
  export interface TpWeb {
    /**
     * Retrieves and parses the daily quote as a callout.
     * Signature: tp.web.daily_quote()
     */
    daily_quote(): Promise<string>;

    /**
     * Gets a random image from https://unsplash.com/.
     * Signature: tp.web.random_picture(size?: string, query?: string, include_size?: boolean)
     */
    random_picture(size?: string, query?: string, include_size?: boolean): Promise<string>;

    /**
     * Makes an HTTP request to the specified URL.
     * Optionally extracts specific data from the JSON response by path.
     * Signature: tp.web.request(url: string, path?: string)
     */
    request(url: string, path?: string): Promise<unknown>;
  }

  //
  // tp.user
  //
  // Docs: https://silentvoid13.github.io/Templater/user-functions/system-user-functions.html
  //
  /**
   * User‑defined system command user function.
   * Arguments are passed as a single object and exposed as environment variables.
   */
  export type TpUserFunction = (args?: Record<string, unknown>) => unknown | Promise<unknown>;

  /**
   * This module exposes custom made scripts, written by yourself within the script file folder location.
   */
  export interface TpUser {
    [name: string]: TpUserFunction;
  }

  //
  // tp.root
  //
  // Main tp object exposed in templates and user scripts.
  //
  export interface Tp {
    /**
     * Wrapper around Obsidian `App` instance.
     * Prefer to use this over the global app instance.
     */
    app: App;

    /** Templater configuration */
    config: TpConfig;

    /** Date/time utilities */
    date: TpDate;

    /** Operations on active file and filesystem helpers */
    file: TpFile;

    /** Access and modifications for active file frontmatter */
    frontmatter: TpFrontmatter;

    /** Template lifecycle hooks */
    hooks: TpHooks;

    /** Full Obsidian API (classes, utilities) */
    obsidian: typeof import("obsidian");

    /** System helpers: suggester, shell, clipboard, etc. */
    system: TpSystem;

    /** Web utilities */
    web: TpWeb;

    /** User‑defined system command functions */
    user: TpUser;

    /** Raw metadata for active file */
    metadata?: CachedMetadata;
  }
}
