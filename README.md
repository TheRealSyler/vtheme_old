## VTheme

<span id="DOC_GENERATION_MARKER_0"></span>

- **[directive](#directive)**

  - [SetColorInputBase](#setcolorinputbase)
  - [VThemeDirectiveInput](#vthemedirectiveinput)

- **[extraFunctions](#extrafunctions)**

  - [ThemeTransition](#themetransition)

- **[helpers](#helpers)**

  - [VThemeLoader](#vthemeloader)
  - [VThemeRouterLink](#vthemerouterlink)
  - [VThemeScrollbar](#vthemescrollbar)
  - [VThemeColor](#vthemecolor)

- **[index](#index)**

  - [ThemeController](#themecontroller)

- **[save](#save)**

  - [SaveTheme](#savetheme)

- **[store](#store)**

  - [Color](#color)
  - [ITheme](#itheme)
  - [ThemeOptions](#themeoptions)

- **[update](#update)**

  - [UpdateTheme](#updatetheme)
  - [GetColor](#getcolor)
  - [GetOptions](#getoptions)

# directive


#### SetColorInputBase

```typescript
interface SetColorInputBase {
    background: string;
    color: string;
    fill: string;
    border: string;
}
```

#### VThemeDirectiveInput

```typescript
interface VThemeDirectiveInput extends SetColorInputBase {
    isImage: boolean;
    hover: SetColorInputBase;
    focus: SetColorInputBase;
    active: SetColorInputBase;
    after: SetColorInputBase;
    before: SetColorInputBase;
    font: string;
    placeholder: {
        color: string;
        hover: string;
        focus: string;
    };
    shadow: boolean | 'sm' | 'lg' | 'strong';
    update: Array<{
        type: 'shadow' | 'color' | 'background' | 'fill' | 'border' | 'hover' | 'before' | 'after';
        value: string | SetColorInputBase;
    }> | true;
}
```

# extraFunctions


#### ThemeTransition

```typescript
function ThemeTransition(): void;
```

# helpers


#### VThemeLoader

```typescript
class VThemeLoader {
    /**
     * Loader primary color in Css color format, `#35a` etc.
     */
    primary: string;
    /**
     * Loader accent color in Css color format, `#35a` etc.
     */
    accent: string;
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
    constructor(
    /**
     * Loader primary color in Css color format, `#35a` etc.
     */
    primary: string, 
    /**
     * Loader accent color in Css color format, `#35a` etc.
     */
    accent: string, options?: {
        width?: number | string;
        height?: number | string;
        speed?: number | string;
        margin?: number | string;
        borderWidth?: number | string;
    });
}
```

#### VThemeRouterLink

```typescript
class VThemeRouterLink {
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
    /**
     * Adds underline to router link if true.
     */
    underline: boolean;
    /**
     * Router Link click (active selector) color in Css color format, `#35a` etc.
     */
    clickColor?: string | undefined;
    /**
     * Router Link active click (active selector) color in Css color format, `#35a` etc.
     */
    activeClickColor?: string | undefined;
    constructor(
    /**
     * Router Link color in Css color format, `#35a` etc.
     */
    color: string, 
    /**
     * Router Link hover color in Css color format, `#35a` etc.
     */
    hoverColor: string, 
    /**
     * Router Link active color in Css color format, `#35a` etc.
     */
    activeColor: string, 
    /**
     * Router Link active hover color in Css color format, `#35a` etc.
     */
    activeHoverColor: string, 
    /**
     * Adds underline to router link if true.
     */
    underline?: boolean, 
    /**
     * Router Link click (active selector) color in Css color format, `#35a` etc.
     */
    clickColor?: string | undefined, 
    /**
     * Router Link active click (active selector) color in Css color format, `#35a` etc.
     */
    activeClickColor?: string | undefined);
}
```

#### VThemeScrollbar

```typescript
class VThemeScrollbar {
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
    /**
     * Scrollbar width in Css unit format, `1px` | `1rem` etc.
     */
    width: string;
    /**
     * Scrollbar width in Css unit format, `1px` | `1rem` etc.
     */
    height: string;
    /**
     * Scrollbar width in Css unit format, `1px` | `1rem` etc.
     */
    radius: string;
    constructor(
    /**
     * Scrollbar track color in Css color format, `#35a` etc.
     */
    track: string, 
    /**
     * Scrollbar thumb color in Css color format, `#35a` etc.
     */
    thumb: string, 
    /**
     * Scrollbar thumb hover color in Css color format, `#35a` etc.
     */
    thumbHover: string, options?: {
        width?: number | string;
        height?: number | string;
        radius?: number | string;
    });
}
```

#### VThemeColor

```typescript
class VThemeColor {
    value: string;
    options: VThemeColorOptions;
    constructor(
    /**
     * Color value in Css color format, `#35a` etc.
     */
    color: string, 
    /**
     * Settings, fill is false by Default.
     */
    options?: VThemeColorOptions);
}
```

# index


#### ThemeController

```typescript
/**
 * TODO
 */
class ThemeController {
    static store: ThemeStore;
    static Init(options?: ThemeOptions): void;
}
```

# save


#### SaveTheme

```typescript
/**
 * Saves the Theme to local Storage.
 */
function SaveTheme(): void;
```

# store


#### Color

```typescript
type Color = VThemeColor | string;
```

#### ITheme

```typescript
/**
 * TODO
 */
interface ITheme {
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
```

#### ThemeOptions

```typescript
/**
 * Vtheme Installation Options.
 */
interface ThemeOptions {
    defaultTheme: string;
    themes: {
        [name: string]: ITheme;
    };
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
```

# update


#### UpdateTheme

```typescript
/**
 * Updates the Dom with the current theme based on the given options.
 * only updates the colors if no options are provided.
 */
function UpdateTheme(options?: UpdateThemeOptions | boolean): void;
```

#### GetColor

```typescript
function GetColor(input: string | VThemeColor): string;
```

#### GetOptions

```typescript
function GetOptions(input: string | VThemeColor): VThemeColorOptions;
```

<span id="DOC_GENERATION_MARKER_1"></span>