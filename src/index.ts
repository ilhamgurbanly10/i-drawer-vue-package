import IDrawer, {
  type IDrawerOptions,
  type IDrawerProps
} from "./components/IDrawer";

import type { App } from "vue";

export { IDrawer };
export type { IDrawerProps, IDrawerOptions };

export default {
  install(app: App) {
    app.component("IDrawer", IDrawer);
  }
};
