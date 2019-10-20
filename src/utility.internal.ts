import Merge from 'deepmerge';
import { ThemeController } from './index';
import { ITheme } from './store';
import { UpdateTheme } from './update';
import { SaveTheme } from './save';
import { consoleColors } from './console.internal';
/**
 * Internal
 */
export const ThemeDataStorageName = 't-theme-data';
/**
 * Internal
 */
export class ThemeData {
  constructor(public customThemes: { [theme: string]: ITheme }, public currentTheme: string) {}
}
/**
 * Internal
 */
export function InitTheme(logInit?: boolean) {
  GetTheme();
  UpdateTheme(true);
  if (logInit) {
    console.log(
      '%cVTheme Initialized',
      `
  background: ${consoleColors.bg};
  padding: 3rem;
  border-radius: 20px;
  font-size: 4rem;
  font-weight: bold;
  text-align: center;
  color: ${consoleColors.default};
  text-shadow: 1.5px 1.5px 1px red, -1.5px -1.5px 1px blue;
    `
    );
  }
}
/**
 * Internal
 */
export function GetTheme() {
  const theme = ThemeController.store;
  const SavedThemeData = window.localStorage.getItem(ThemeDataStorageName);
  if (SavedThemeData === null) {
    SaveTheme();
  } else {
    const Data: ThemeData = JSON.parse(SavedThemeData);
    if (theme.themes[Data.currentTheme]) {
      theme.changeCurrentTheme(Data.currentTheme);
      for (const key in theme.themes) {
        if (theme.themes.hasOwnProperty(key)) {
          const Theme = theme.themes[key];
          if (Theme.canBeModified) {
            theme.changeTheme({ themeName: key, value: Merge(Theme, Data.customThemes[key]) });
          }
        }
      }
    } else {
      SaveTheme();
    }
  }
}
