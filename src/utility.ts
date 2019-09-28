import Merge from 'deepmerge';
import { ThemeController } from './index';
import { ITheme } from './store';
import { UpdateTheme } from './update';
import { SaveTheme } from './save';
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
export function InitTheme() {
  GetTheme();
  UpdateTheme({
    updateColors: true,
    updateFonts: true,
    updateStatic: true,
    updateScrollbar: true,
    updateLoader: true,
    updateShadow: true
  });
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
    theme.changeCurrent(Data.currentTheme);
    for (const key in theme.themes) {
      if (theme.themes.hasOwnProperty(key)) {
        const Theme = theme.themes[key];
        if (Theme.canBeModified) {
          theme.changeTheme({ themeName: key, value: Merge(theme.themes[key], Data.customThemes[key]) });
        }
      }
    }
  }
}
