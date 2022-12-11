'use strict';

module.exports = ({ strapi }) => {
  strapi.customFields.register({
    name: 'maplink',
    plugin: 'map-link',
    type: 'string',
  });
};
