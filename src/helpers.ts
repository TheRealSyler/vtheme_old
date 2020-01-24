import { isValidStringColor } from 's.color';
import { VThemeColorOptions, defaultVThemeColorOptions } from './helpers.internal';
import Merge from 'deepmerge';

class VThemeBaseHelper<T extends Object> {
  options: T;
  constructor(defaults: T, options: Partial<T>) {
    this.options = Merge(defaults, options);
  }
}

export interface VThemeLoaderColors {
  /**
   * Loader primary color in Css color format, `#35a` etc.
   */
  primary: string;
  /**
   * Loader accent color in Css color format, `#35a` etc.
   */
  accent: string;
}
export interface VThemeLoaderCss {
  /**
   * Loader width in Css unit format, `1px` | `1rem` etc.
   */
  width: string;
  /**
   * Loader height in Css unit format, `1px` | `1rem` etc.
   */
  height: string;
  /**
   * Loader rotation speed in Css unit format, `1s` | `100ms` etc.
   */
  speed: string;
  /**
   * Loader margin in Css unit format, `1px` | `1rem` etc.
   */
  margin: string;
  /**
   * Loader border width in Css unit format, `1px` | `1rem` etc.
   */
  borderWidth: string;
}
export class VThemeLoader extends VThemeBaseHelper<VThemeLoaderColors> {
  width: string;
  height: string;
  speed: string;
  margin: string;
  borderWidth: string;
  constructor(options?: Partial<VThemeLoaderColors>, cssOptions?: Partial<VThemeLoaderCss>) {
    options = options || {};
    super(
      {
        primary: '#aaa',
        accent: '#f64'
      },
      options
    );
    cssOptions = cssOptions || {};
    this.width = ToCssUnit(cssOptions.width || 40);
    this.height = ToCssUnit(cssOptions.height || 40);
    this.speed = ToCssTimeUnit(cssOptions.speed || 1.5);
    this.margin = ToCssUnit(cssOptions.margin || 50);
    this.borderWidth = ToCssUnit(cssOptions.borderWidth || 5);
  }
}

export interface VThemeRouterLinkOptions {
  focusRadius: number;
  focusOffset: number;
  focusWidth: number;
  /**
   * Router Link color in Css color format, `#35a` etc.
   */
  color: string;
  /**
   * Router Link hover color in Css color format, `#35a` etc.
   */
  hoverColor: string;
  /**
   * Router Link active color in Css color format, `#35a` etc.
   */
  activeColor: string;
  /**
   * Router Link active hover color in Css color format, `#35a` etc.
   */
  activeHoverColor: string;
  clickColor: string;
  activeClickColor: string;
  underline: boolean;
  focusColor: string;
  focusColorBg: string;
}

export class VThemeRouterLink extends VThemeBaseHelper<VThemeRouterLinkOptions> {
  constructor(options?: Partial<VThemeRouterLinkOptions>) {
    options = options || {};
    super(
      {
        focusRadius: 5,
        focusOffset: 5,
        focusWidth: 1,
        activeClickColor: '#fff',
        clickColor: '#ddd',
        activeColor: '#eee',
        activeHoverColor: '#ccc',
        hoverColor: '#ddd',
        color: '#f64',
        focusColor: '#f86',
        focusColorBg: '#222',
        underline: false
      },
      options
    );
  }
}
export interface VThemeScrollbarColors {
  /**
   * Scrollbar track color in Css color format, `#35a` etc.
   */
  track: string;
  /**
   * Scrollbar thumb color in Css color format, `#35a` etc.
   */
  thumb: string;
  /**
   * Scrollbar thumb hover color in Css color format, `#35a` etc.
   */
  thumbHover: string;
}
export interface VThemeScrollbarCss {
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  width: string | number;
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  height: string | number;
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  radius: string | number;
}
export class VThemeScrollbar extends VThemeBaseHelper<VThemeScrollbarColors> {
  width: string;
  height: string;
  radius: string;
  constructor(options?: Partial<VThemeScrollbarColors>, cssOptions?: Partial<VThemeScrollbarCss>) {
    options = options || {};
    super(
      {
        thumb: '#333',
        thumbHover: '#555',
        track: '#222'
      },
      options
    );
    cssOptions = cssOptions || {};
    this.width = ToCssUnit(cssOptions.width || 10);
    this.height = ToCssUnit(cssOptions.height || 10);
    this.radius = ToCssUnit(cssOptions.radius || 12);
  }
}

export class VThemeColor {
  value: string;
  options: VThemeColorOptions = {};
  constructor(
    /**
     * Color value in Css color format, `#35a` etc.
     */
    color: string,
    /**
     * Settings, fill is false by Default.
     */
    options?: VThemeColorOptions
  ) {
    if (options === undefined) {
      this.options = defaultVThemeColorOptions;
    } else {
      this.options = options;
    }

    if (isValidStringColor(color)) {
      this.value = color;
    } else {
      this.value = '#000';
    }
  }
}

function ToCssUnit(input: number | string): string {
  if (typeof input === 'string') {
    return input;
  } else {
    return `${input}px`;
  }
}
function ToCssTimeUnit(input: number | string): string {
  if (typeof input === 'string') {
    return input;
  } else {
    return `${input}s`;
  }
}
