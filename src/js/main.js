require([
	"esri/Map",
	"esri/views/MapView",
	"esri/layers/FeatureLayer",
	"esri/widgets/Legend",
	"esri/core/reactiveUtils",
], (Map, MapView, FeatureLayer, Legend, reactiveUtils) => {
	const tractsLayer = new FeatureLayer({
		url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Educational_Attainment_Boundaries/FeatureServer/2",
		outFields: ["*"],
		fieldInfos: [
			{
				fieldName: "B15002_calc_numLTHSE",
				label: "Adults(25+) Not High School Graduates",
				format: {
					digitSeparator: true,
				},
			},
		],
		popupTemplate: {
			title: "{NAME} in {COUNTY}, {STATE}",
			content: [
				{
					type: "text",
					text: `An estimated <b>{B15002_calc_numLTHSE}</b> adults age 25+ are not high school graduates, which is approximately <b>{B15002_calc_pctLTHSE}%</b> of all adults age 25+.`,
				},
			],
		},
	});

	const map = new Map({
		basemap: "dark-gray-vector",
		layers: [tractsLayer],
	});

	const view = new MapView({
		container: viewDiv,
		map: map,
		zoom: 9,
		center: [-117.66256, 33.93037],
	});

	view.ui.add(new Legend({ view }), "bottom-left");

	reactiveUtils.watch(
		() => !view.updating,
		() => {
			console.log(view.zoom);
			console.log(view.center);
		}
	);
});
