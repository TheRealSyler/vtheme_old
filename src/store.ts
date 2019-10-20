import { VThemeLoader, VThemeScrollbar, VThemeRouterLink, VThemeColor } from './helpers';
import { ThemeLogMutation, ThemeCannotBeModifiedWarning } from './console.internal';
export type Color = VThemeColor | string;

/**
 * TODO
 */
export interface ITheme {
  name: string;
  /**
   * If true the theme will be saved when the `SaveTheme` function gets called.
   */
  canBeModified: boolean;
  /**
   * Theme Colors
   */
  colors: {
    [key: string]: Color;
  };
  /**
   * Theme Fonts (font-family in css)
   */
  fonts: {
    [key: string]: string;
  };
  defaults: {
    /**
     * Default Text Color, Note the Color has to be in the theme colors.
     */
    color: string;
    /**
     * Default Background Color, Note the Color has to be in the theme colors.
     */
    background: string;
    /**
     * Default Font Family, Note the font has to be in the theme fonts.
     */
    font: string;
  };
  invertImageIcon: boolean;
  shadow?: {
    color: Color;
  };
  data?: {
    [key: string]: any;
  };
  scrollBar?: VThemeScrollbar;
  loader?: VThemeLoader;
  routerLink?: VThemeRouterLink;
}

/**
 * Vtheme Installation Options.
 */
export interface ThemeOptions {
  defaultTheme: string;
  themes: { [name: string]: ITheme };
  debug?: {
    ignoreCannotBeModified?: boolean;
  };
  Log?: {
    Mutations?: boolean;
    ThemeUpdates?: boolean;
    ThemeSaves?: boolean;
    Init?: boolean;
  };
}

export default class ThemeStore {
  public currentTheme: string = '';
  public themes: { [name: string]: ITheme } = {};
  public debug: ThemeOptions['debug'] = {
    ignoreCannotBeModified: false
  };
  public Log = {
    Mutations: false,
    ThemeUpdates: false,
    ThemeSaves: false
  };

  public Init(options?: ThemeOptions) {
    if (options) {
      this.currentTheme = options.defaultTheme;
      if (options.themes) {
        this.themes = options.themes;
      }
      if (options.debug) {
        this.debug = Object.assign(this.debug, options.debug);
      }
      if (options.Log && options.Log.Mutations !== undefined) {
        this.Log.Mutations = options.Log.Mutations;
      }
      if (options.Log && options.Log.ThemeUpdates !== undefined) {
        this.Log.ThemeUpdates = options.Log.ThemeUpdates;
      }
      if (options.Log && options.Log.ThemeSaves !== undefined) {
        this.Log.ThemeSaves = options.Log.ThemeSaves;
      }
    }
  }
  /**
   * Getter for a property on the current theme.
   */
  public GetCurrentThemeProperty(property: keyof ITheme) {
    return this.themes[this.currentTheme][property];
  }
  /**
   * Getter for the current theme.
   */
  public get GetCurrentTheme() {
    return this.themes[this.currentTheme];
  }
  /**
   * Setter for a property of the current theme.
   */
  public changeCurrentThemeProperty(input: { property: keyof ITheme; key?: string; value: any }) {
    if (this.themes[this.currentTheme].canBeModified || (this.debug && this.debug.ignoreCannotBeModified)) {
      if (input.key && this.themes[this.currentTheme][input.property]) {
        // @ts-ignore
        this.themes[this.currentTheme][input.property][input.key] = input.value;
      } else {
        // @ts-ignore
        this.themes[this.currentTheme][input.property] = input.value;
      }
      if (this.Log.Mutations) {
        ThemeLogMutation({
          property: input.property,
          value: input.value,
          key: input.key,
          theme: this.currentTheme
        });
      }
    } else {
      ThemeCannotBeModifiedWarning(this.currentTheme);
    }
  }
  /**
   * Changes the Current Theme.
   */
  public changeCurrentTheme(themeName: string) {
    this.currentTheme = themeName;
    if (this.Log.Mutations) {
      ThemeLogMutation({ property: 'currentTheme', value: themeName });
    }
  }
  /**
   * @deprecated
   */
  public changeCurrentColor(input: { key: string; value: string }) {
    if (this.themes[this.currentTheme].canBeModified || (this.debug && this.debug.ignoreCannotBeModified)) {
      this.themes[this.currentTheme].colors[input.key] = input.value;
      if (this.Log.Mutations) {
        ThemeLogMutation({ theme: this.currentTheme, property: 'color', value: input.value, key: input.key });
      }
    } else {
      ThemeCannotBeModifiedWarning(this.currentTheme);
    }
  }
  /**
   * @deprecated
   */
  public changeCurrentFont(input: { key: string; value: string }) {
    if (this.themes[this.currentTheme].canBeModified || (this.debug && this.debug.ignoreCannotBeModified)) {
      this.themes[this.currentTheme].fonts[input.key] = input.value;
    } else {
      ThemeCannotBeModifiedWarning(this.currentTheme);
    }
  }
  /**
   * @deprecated
   */
  public toggleInvertImageIcon() {
    if (this.themes[this.currentTheme].canBeModified || (this.debug && this.debug.ignoreCannotBeModified)) {
      this.themes[this.currentTheme].invertImageIcon = !this.themes[this.currentTheme].invertImageIcon;
    } else {
      ThemeCannotBeModifiedWarning(this.currentTheme);
    }
  }
  /**
   * Changes an entire theme.
   */
  public changeTheme(input: { themeName: string; value: ITheme }) {
    if (this.themes[input.themeName].canBeModified || (this.debug && this.debug.ignoreCannotBeModified)) {
      this.themes[input.themeName] = input.value;
    } else {
      ThemeCannotBeModifiedWarning(input.themeName);
    }
  }
}
