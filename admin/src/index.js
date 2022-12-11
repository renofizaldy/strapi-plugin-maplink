import { prefixPluginTranslations } from '@strapi/helper-plugin'
import pluginPkg from '../../package.json'
import pluginId from './pluginId'
import Initializer from './components/Initializer'
import PluginIcon from './components/PluginIcon'
import getTrad from './utils/getTrad';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: "maplink",
      pluginId: "map-link",
      type: "string",
      intlLabel: {
        id: getTrad('map-link.label'),
        defaultMessage: "Maplink",
      },
      intlDescription: {
        id: getTrad('map-link.description'),
        defaultMessage: "Google Maps Lat-Lon Picker",
      },
      icon: PluginIcon,
      components: {
        Input: async () => import("./components/MapInput"),
      },
      options: {},
    });
  },

  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(
          /* webpackChunkName: "translation-[request]" */ `./translations/${locale}.json`
        )
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
