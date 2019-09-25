import { PluginObject } from 'vue';
import directive from './directive';
import ThemeStore, { ThemeOptions } from './store';
import { InitTheme } from './utility';

export class ThemeController {
  public static store = new ThemeStore();
  public static Init(options?: ThemeOptions) {
    this.store.Init(options);
  }
}

const ThemePlugin: PluginObject<ThemeOptions> = {
  install(Vue, options) {
    ThemeController.Init(options);
    const app = new Vue({
      data: {
        theme: ThemeController
      }
    });
    Vue.prototype.$theme = app.theme;
    Vue.directive('theme', directive);
    InitTheme();
  }
};

export { ITheme, IThemeColors, ThemeOptions } from './store';
export default ThemePlugin;
