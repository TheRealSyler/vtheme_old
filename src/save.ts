import { ThemeController, ITheme } from '.';
import { ThemeDataStorageName, ThemeData } from './utility';
import { ConsoleLog } from './console';

/**
 * Save the Theme to local Storage.
 */
export function SaveTheme() {
  const theme = ThemeController.store;
  const ThemesToSave: { [name: string]: ITheme } = {};
  let saved = '';
  for (const key in theme.themes) {
    if (theme.themes.hasOwnProperty(key)) {
      const Theme = theme.themes[key];
      if (Theme.canBeModified) {
        ThemesToSave[key] = Theme;
        saved += ` ${key}`;
      }
    }
  }
  if (theme.Log.ThemeSaves) {
    ConsoleLog('Saved', saved);
  }

  window.localStorage.setItem(ThemeDataStorageName, JSON.stringify(new ThemeData(ThemesToSave, theme.currentTheme)));
}
