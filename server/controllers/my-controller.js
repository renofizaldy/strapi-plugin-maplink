'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('map-link')
      .service('myService')
      .getWelcomeMessage();
  },
});
