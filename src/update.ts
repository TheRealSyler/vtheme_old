import { StringToRGB } from 's.color';
import ThemeStore, { ITheme } from './store';
import { ThemeController } from '.';

const ColorThemeStyleTagName = 't-style-tag-color';
const StaticThemeStyleTagName = 't-style-tag-static';
const ShadowThemeStyleTagName = 't-style-tag-shadow';
const ScrollBarThemeStyleTagName = 't-style-tag-scrollbar';
const FontThemeStyleTagName = 't-style-tag-font';
const LoaderThemeStyleTagName = 't-style-tag-loader';

interface UpdateThemeOptions {
  updateFonts?: boolean;
  updateColors?: boolean;
  updateStatic?: boolean;
  updateScrollbar?: boolean;
  updateShadow?: boolean;
  updateLoader?: boolean;
}
const defaultOptions: UpdateThemeOptions = {
  updateColors: true,
  updateFonts: false,
  updateStatic: false,
  updateScrollbar: false,
  updateShadow: false,
  updateLoader: false
};
/**
 * Updates the Dom with the current theme based on the given options.
 * only updates the colors if no options are provided.
 */
export function UpdateTheme(options: UpdateThemeOptions = defaultOptions) {
  const theme = ThemeController.store;
  if (options.updateColors) {
    HandleColorsUpdate(theme);
  }
  if (options.updateFonts) {
    HandleFontUpdate(theme);
  }
  if (options.updateStatic) {
    HandleStaticClasses();
  }
  if (options.updateScrollbar) {
    HandleScrollbar(theme.GetCurrentTheme('scrollBar') as ITheme['scrollBar']);
  }
  if (options.updateShadow) {
    HandleShadow(theme.GetCurrentTheme('shadow') as ITheme['shadow']);
  }
  if (options.updateLoader) {
    HandleLoader(theme.GetCurrentTheme('loader') as ITheme['loader']);
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

  const themeColors = theme.GetCurrentTheme('colors') as ITheme['colors'];
  const themeDefaults = theme.GetCurrentTheme('defaults') as ITheme['defaults'];

  let colorStyleContent = `
body, b, h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6, span {
  color: ${themeColors[themeDefaults.color]};
}
body {
  font-family: ${(theme.GetCurrentTheme('fonts') as ITheme['fonts'])[themeDefaults.font]} !important;
  background: ${themeColors[themeDefaults.background]};
}
`;
  for (const key in themeColors) {
    if (themeColors.hasOwnProperty(key)) {
      const color = themeColors[key];
      colorStyleContent += `.t-bg-${key},
.t-h-bg-${key}:hover,
.t-f-bg-${key}:active,
.t-af-bg-${key}::after,
.t-bf-bg-${key}::before {
  background-color: ${color} !important;
}
`;
      colorStyleContent += `.t-c-${key},
.t-h-c-${key}:hover,
.t-a-c-${key}:active,
.t-p-c-${key}::placeholder,
.t-p-h-c-${key}:hover::placeholder,
.t-p-f-c-${key}:focus::placeholder,
.t-af-c-${key}::after,
.t-bf-c-${key}::before {
  color: ${color} !important;
}
`;
      colorStyleContent += `.t-f-${key},
.t-h-f-${key}:hover,
.t-f-f-${key}:active,
.t-af-f-${key}::after,
.t-bf-f-${key}::before {
  fill: ${color} !important;
}
`;
      colorStyleContent += `.t-b-${key},
.t-h-b-${key}:hover,
.t-f-b-${key}:active,
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
    let shadowColor = StringToRGB(shadow.color);
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
  return new Promise<boolean>((resolve, reject) => {
    let fontThemeElement = document.getElementById(FontThemeStyleTagName);
    if (fontThemeElement === null) {
      const styleEl = document.createElement('style');
      styleEl.id = FontThemeStyleTagName;
      document.head.appendChild(styleEl);
      fontThemeElement = styleEl;
    }

    const fonts = theme.GetCurrentTheme('fonts') as ITheme['fonts'];
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
    resolve(true);
  });
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
  filter: invert(100%)
}
.t-shadow-none {
  box-shadow: none;
}
  `;
  staticThemeElement.textContent = content;
}
