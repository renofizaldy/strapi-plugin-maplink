# Strapi plugin Maplink

This custom-fields plugin built on Strapi **v4.5.3** and using **React Google Maps Api v2.17.0**
You could copy this plugins folder `src` directory

Install dependency:
```
npm install @react-google-maps/api
```

Add this to `config/plugins.js` or create a new `plugins.js` file in `config` folder
```
module.exports = {
	'map-link': {
		enabled: true,
		resolve: './src/plugins/map-link'
	}
}
```

Add your Google Maps API Key on `STRAPI_ADMIN_GMAPSKEY` in your `.env`
```
STRAPI_ADMIN_GMAPSKEY=your_google_maps_api_key
```

Maplink on Custom-Field 
![enter image description here](https://i.postimg.cc/rFFXKJ3f/Screenshot-2022-12-11-160820.jpg)

Maplink on Content Manager
![enter image description here](https://i.postimg.cc/qMbfnKd4/Screenshot-2022-12-11-161013.jpg)