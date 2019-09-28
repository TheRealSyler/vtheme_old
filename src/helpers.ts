export class VThemeLoader {
  /**
   * Loader width in Css unit format, `1px` | `1rem` etc.
   */
  width: string = '';
  /**
   * Loader height in Css unit format, `1px` | `1rem` etc.
   */
  height: string = '';
  /**
   * Loader rotation speed in Css unit format, `1s` | `100ms` etc.
   */
  speed: string = '';
  /**
   * Loader margin in Css unit format, `1px` | `1rem` etc.
   */
  margin: string = '';
  /**
   * Loader border width in Css unit format, `1px` | `1rem` etc.
   */
  borderWidth: string = '';
  constructor(
    /**
     * Loader primary color in Css color format, `#35a` etc.
     */
    public primary: string,
    /**
     * Loader accent color in Css color format, `#35a` etc.
     */
    public accent: string,
    options?: {
      width?: number | string;
      height?: number | string;
      speed?: number | string;
      margin?: number | string;
      borderWidth?: number | string;
    }
  ) {
    if (!options) {
      options = {};
    }
    this.width = ToCssUnit(options.width || 40);
    this.height = ToCssUnit(options.height || 40);
    this.speed = ToCssTimeUnit(options.speed || 1.5);
    this.margin = ToCssUnit(options.margin || 50);
    this.borderWidth = ToCssUnit(options.borderWidth || 5);
  }
}
export class VThemeScrollbar {
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  width: string = '';
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  height: string = '';
  /**
   * Scrollbar width in Css unit format, `1px` | `1rem` etc.
   */
  radius: string = '';
  constructor(
    /**
     * Scrollbar track color in Css color format, `#35a` etc.
     */
    public track: string,
    /**
     * Scrollbar thumb color in Css color format, `#35a` etc.
     */
    public thumb: string,
    /**
     * Scrollbar thumb hover color in Css color format, `#35a` etc.
     */
    public thumbHover: string,
    options?: {
      width?: number | string;
      height?: number | string;
      radius?: number | string;
    }
  ) {
    if (!options) {
      options = {};
    }
    this.width = ToCssUnit(options.width || 10);
    this.height = ToCssUnit(options.height || 10);
    this.radius = ToCssUnit(options.radius || 12);
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
