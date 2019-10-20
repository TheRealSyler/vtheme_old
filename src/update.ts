import { StringToRGB } from 's.color';
import ThemeStore, { ITheme } from './store';
import { ThemeController, VThemeColor } from '.';
import { VThemeColorOptions, defaultVThemeColorOptions } from './helpers.internal';
import { ConsoleLog } from './console.internal';

const ColorThemeStyleTagName = 't-style-tag-color';
const StaticThemeStyleTagName = 't-style-tag-static';
const ShadowThemeStyleTagName = 't-style-tag-shadow';
const ScrollBarThemeStyleTagName = 't-style-tag-scrollbar';
const FontThemeStyleTagName = 't-style-tag-font';
const LoaderThemeStyleTagName = 't-style-tag-loader';
const RouterLinkThemeStyleTagName = 't-style-tag-router-link';

interface UpdateThemeOptions {
  updateFonts?: boolean;
  updateColors?: boolean;
  updateStatic?: boolean;
  updateScrollbar?: boolean;
  updateShadow?: boolean;
  updateLoader?: boolean;
  updateRouterLink?: boolean;
}
const defaultOptions: UpdateThemeOptions = {
  updateColors: true,
  updateFonts: false,
  updateStatic: false,
  updateScrollbar: false,
  updateShadow: false,
  updateLoader: false,
  updateRouterLink: false
};

/**
 * Updates the Dom with the current theme based on the given options.
 * only updates the colors if no options are provided.
 */
export function UpdateTheme(options: UpdateThemeOptions | boolean = defaultOptions) {
  const theme = ThemeController.store;
  const all = typeof options === 'boolean' ? options : false;
  if (typeof options === 'boolean') {
    options = {};
  }
  if (all || options.updateColors) {
    HandleColorsUpdate(theme);
  }
  if (all || options.updateFonts) {
    HandleFontUpdate(theme);
  }
  if (all || options.updateStatic) {
    HandleStaticClasses();
  }
  if (all || options.updateScrollbar) {
    HandleScrollbar(theme.GetCurrentThemeProperty('scrollBar') as ITheme['scrollBar']);
  }
  if (all || options.updateShadow) {
    HandleShadow(theme.GetCurrentThemeProperty('shadow') as ITheme['shadow']);
  }
  if (all || options.updateLoader) {
    HandleLoader(theme.GetCurrentThemeProperty('loader') as ITheme['loader']);
  }
  if (all || options.updateRouterLink) {
    HandleRouterLink(theme.GetCurrentThemeProperty('routerLink') as ITheme['routerLink']);
  }
  if (theme.Log.ThemeUpdates) {
    let op = '';
    if (!all) {
      for (const key in options) {
        if (options.hasOwnProperty(key)) {
          // @ts-ignore
          if (options[key]) {
            op += key.replace('update', ' ');
          }
        }
      }
      ConsoleLog('Updated', op, theme.currentTheme);
    } else {
      ConsoleLog('Updated', ' All', theme.currentTheme);
    }
  }
}

// ## ANCHOR Color
function HandleColorsUpdate(theme: ThemeStore) {
  let colorThemeElement = document.getElementById(ColorThemeStyleTagName);
  if (colorThemeElement === null) {
    const styleEl = document.createElement('style');
    styleEl.id = ColorThemeStyleTagName;
    document.head.appendChild(styleEl);
    colorThemeElement = styleEl;
  }

  const themeColors = theme.GetCurrentThemeProperty('colors') as ITheme['colors'];
  const themeDefaults = theme.GetCurrentThemeProperty('defaults') as ITheme['defaults'];
  let colorStyleContent = `
body, b, h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6, span, input {
  color: ${GetColor(themeColors[themeDefaults.color])};
}
body {
  font-family: ${(theme.GetCurrentThemeProperty('fonts') as ITheme['fonts'])[themeDefaults.font]};
  background: ${GetColor(themeColors[themeDefaults.background])};
}
`;
  for (const key in themeColors) {
    if (themeColors.hasOwnProperty(key)) {
      const color = GetColor(themeColors[key]);
      const options = GetOptions(themeColors[key]);

      if (options.background)
        colorStyleContent += `.t-bg-${key},
.t-h-bg-${key}:hover,
.t-f-bg-${key}:focus,
.t-a-bg-${key}:active,
.t-af-bg-${key}::after,
.t-bf-bg-${key}::before {
  background-color: ${color} !important;
}
`;
      if (options.color)
        colorStyleContent += `.t-c-${key},
.t-h-c-${key}:hover,
.t-f-c-${key}:focus,
.t-a-c-${key}:active,
.t-p-c-${key}::placeholder,
.t-p-h-c-${key}:hover::placeholder,
.t-p-f-c-${key}:focus::placeholder,
.t-af-c-${key}::after,
.t-bf-c-${key}::before {
  color: ${color} !important;
}
`;
      if (options.fill)
        colorStyleContent += `.t-f-${key},
.t-h-f-${key}:hover,
.t-a-f-${key}:active,
.t-f-f-${key}:focus,
.t-af-f-${key}::after,
.t-bf-f-${key}::before {
  fill: ${color} !important;
}
`;
      if (options.border)
        colorStyleContent += `.t-b-${key},
.t-h-b-${key}:hover,
.t-f-b-${key}:focus,
.t-a-b-${key}:active,
.t-af-b-${key}::after,
.t-bf-b-${key}::before {
  border-color: ${color} !important;
}
`;
    }
  }

  colorThemeElement.textContent = colorStyleContent;
}

// ## ANCHOR Loader
function HandleLoader(loader: ITheme['loader']) {
  if (loader !== undefined) {
    let loaderThemeElement = document.getElementById(LoaderThemeStyleTagName);
    if (loaderThemeElement === null) {
      const styleEl = document.createElement('style');
      styleEl.id = LoaderThemeStyleTagName;
      document.head.appendChild(styleEl);
      loaderThemeElement = styleEl;
    }
    const content = `
  .loader {
    border: ${loader.borderWidth} solid ${loader.primary};
    border-top: ${loader.borderWidth} solid ${loader.accent};
    border-radius: 50%;
    background: #0000;
    width: ${loader.width};
    height: ${loader.height};
    animation: spin ${loader.speed} linear infinite;
    margin: ${loader.margin};
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  `;
    loaderThemeElement.textContent = content;
  }
}
// ## ANCHOR Scrollbar
function HandleScrollbar(scrollBar: ITheme['scrollBar']) {
  if (scrollBar !== undefined) {
    let scrollbarThemeElement = document.getElementById(ScrollBarThemeStyleTagName);
    if (scrollbarThemeElement === null) {
      const styleEl = document.createElement('style');
      styleEl.id = ScrollBarThemeStyleTagName;
      document.head.appendChild(styleEl);
      scrollbarThemeElement = styleEl;
    }
    const content = `
  body::-webkit-scrollbar, div::-webkit-scrollbar {
    width: ${scrollBar.width} !important;
    height: ${scrollBar.height} !important;
  }
  body::-webkit-scrollbar-track, div::-webkit-scrollbar-track {
    background: ${scrollBar.track};
  }
  body::-webkit-scrollbar-thumb, div::-webkit-scrollbar-thumb {
    background: ${scrollBar.thumb};
    border-radius: ${scrollBar.radius};
  }
  body::-webkit-scrollbar-thumb:hover, div::-webkit-scrollbar-thumb:hover {
    background: ${scrollBar.thumbHover};
  }
  `;
    scrollbarThemeElement.textContent = content;
  }
}
// ## ANCHOR Shadow
function HandleShadow(shadow: ITheme['shadow']) {
  if (shadow !== undefined) {
    let shadowThemeElement = document.getElementById(ShadowThemeStyleTagName);
    if (shadowThemeElement === null) {
      const styleEl = document.createElement('style');
      styleEl.id = ShadowThemeStyleTagName;
      document.head.appendChild(styleEl);
      shadowThemeElement = styleEl;
    }
    let shadowColor = StringToRGB(GetColor(shadow.color));
    if (!shadowColor) {
      shadowColor = { r: 0, a: 1, b: 0, g: 0 };
    }
    const content = `
  .t-shadow {
    box-shadow: 0 0 2rem 0 rgba(${shadowColor.r * 255}, ${shadowColor.g * 255}, ${shadowColor.b * 255}, .15) !important;
  }
  .t-shadow-sm {
    box-shadow: 0 0 .5rem rgba(${shadowColor.r * 255}, ${shadowColor.g * 255}, ${shadowColor.b * 255}, .2) !important;
  }
  .t-shadow-strong {
    box-shadow: 0 0 .5rem rgba(${shadowColor.r * 255}, ${shadowColor.g * 255}, ${shadowColor.b * 255}, .5) !important;
  }
  .t-shadow-lg {
    box-shadow: 0 0 3rem rgba(${shadowColor.r * 255}, ${shadowColor.g * 255}, ${shadowColor.b * 255}, .175) !important;
  }`;
    shadowThemeElement.textContent = content;
  }
}
// ## ANCHOR Font
function HandleFontUpdate(theme: ThemeStore) {
  let fontThemeElement = document.getElementById(FontThemeStyleTagName);
  if (fontThemeElement === null) {
    const styleEl = document.createElement('style');
    styleEl.id = FontThemeStyleTagName;
    document.head.appendChild(styleEl);
    fontThemeElement = styleEl;
  }

  const fonts = theme.GetCurrentThemeProperty('fonts') as ITheme['fonts'];
  let fontStyleContent = '';
  for (const key in fonts) {
    if (fonts.hasOwnProperty(key)) {
      const font = fonts[key];
      fontStyleContent += `.t-font-${key} {
    font-family: ${font} !important;
  }`;
    }
  }
  fontThemeElement.textContent = fontStyleContent;
}
// ## ANCHOR Static
function HandleStaticClasses() {
  let staticThemeElement = document.getElementById(StaticThemeStyleTagName);
  if (staticThemeElement === null) {
    const styleEl = document.createElement('style');
    styleEl.id = StaticThemeStyleTagName;
    document.head.appendChild(styleEl);
    staticThemeElement = styleEl;
  }
  const content = `
.t-image-icon-invert {
  filter: invert(100%);
}
.t-shadow-none {
  box-shadow: none;
}`;
  staticThemeElement.textContent = content;
}
// ## ANCHOR Router Link
function HandleRouterLink(router: ITheme['routerLink']) {
  if (router) {
    let routerThemeElement = document.getElementById(RouterLinkThemeStyleTagName);
    if (routerThemeElement === null) {
      const styleEl = document.createElement('style');
      styleEl.id = RouterLinkThemeStyleTagName;
      document.head.appendChild(styleEl);
      routerThemeElement = styleEl;
    }
    let content = `
a:-webkit-any-link {
  color: ${router.color};
  cursor: pointer;
  text-decoration: ${router.underline ? 'underline' : 'none'};
}
a:-webkit-any-link:hover {
  color: ${router.hoverColor};
}
.router-link-active {
  color: ${router.activeColor} !important;
}
.router-link-active:hover {
  color: ${router.activeHoverColor} !important;
}
`;
    if (router.activeClickColor) {
      content += `
router-link-active:active {
  color: ${router.activeClickColor} !important;
}
`;
    }
    if (router.clickColor) {
      content += `
a:-webkit-any-link:active {
  color: ${router.clickColor} !important;
}
`;
    }
    routerThemeElement.textContent = content;
  }
}
export function GetColor(input: string | VThemeColor) {
  return typeof input === 'object' ? input.value : input;
}
export function GetOptions(input: string | VThemeColor): VThemeColorOptions {
  return typeof input === 'object' ? input.options : defaultVThemeColorOptions;
}
