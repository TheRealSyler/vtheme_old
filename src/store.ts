import { VThemeLoader, VThemeScrollbar, VThemeRouterLink } from './helpers';

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
    [key: string]: string;
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
    color: string;
  };
  scrollBar?: VThemeScrollbar;
  loader?: VThemeLoader;
  routerLink?: VThemeRouterLink;
}

/**
 * Vtheme Installation Options.
 */
export interface ThemeOptions {
  defaults?: { defaultTheme: string; themes: { [name: string]: ITheme } };
}

export default class ThemeStore {
  public currentTheme: string = '';
  public themes: { [name: string]: ITheme } = {};

  public Init(options?: ThemeOptions) {
    if (options) {
      if (options.defaults) {
        this.currentTheme = options.defaults.defaultTheme;
        this.themes = options.defaults.themes;
      }
    }
  }

  public GetCurrentTheme(property: keyof ITheme) {
    return this.themes[this.currentTheme][property];
  }

  public changeCurrent(themeName: string) {
    this.currentTheme = themeName;
  }

  public changeCurrentColor(input: { key: string; value: string }) {
    this.themes[this.currentTheme].colors[input.key] = input.value;
  }

  public changeCurrentFont(input: { key: string; value: string }) {
    this.themes[this.currentTheme].fonts[input.key] = input.value;
  }

  public toggleInvertImageIcon() {
    this.themes[this.currentTheme].invertImageIcon = !this.themes[this.currentTheme].invertImageIcon;
  }

  public changeTheme(input: { themeName: string; value: ITheme }) {
    if (this.themes[input.themeName].canBeModified) {
      this.themes[input.themeName] = input.value;
    } else {
      console.warn(`[${input.themeName}] Cannot be Modified!`);
    }
  }
}
