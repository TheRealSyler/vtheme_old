import { PluginObject } from 'vue';
import directive from './directive';
import ThemeStore, { ThemeOptions } from './store';
import { InitTheme } from './utility.internal';

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
    InitTheme(options && options.Log ? options.Log.Init : true);
  }
};

export { ITheme, ThemeOptions } from './store';
export { VThemeDirectiveInput } from './directive';
export * from './update';
export * from './extraFunctions';
export * from './save';
export * from './helpers';
export default ThemePlugin;
