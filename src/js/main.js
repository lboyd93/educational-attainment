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
		popupTemplate: {
			title: "{NAME} in {COUNTY}, {STATE}",
			content: [
				{
					type: "text",
					text: `An estimated <b>{B15002_calc_numLTHSE}</b> adults age 25+ are not high school graduates, which is approximately <b>{B15002_calc_pctLTHSE}%</b> of all adults age 25+.`,
				},
				{
					type: "media",
					title: "Educational Attainment",
					mediaInfos: [
						{
							type: "column-chart",
							title: "Highest Education - All Adults",
							value: {
								fields: [
									"B15002_calc_numLTHSE",
									"B15002_calc_numHSE",
									"B15002_calc_numSomeCollE",
									"B15002_calc_numAAE",
									"B15002_calc_numGEBAE",
								],
							},
						},
						{
							type: "pie-chart",
							title: "Highest Degree - Female",
							value: {
								fields: [
									"B15002_028E",
									"B15002_031E",
									"B15002_032E",
									"B15002_033E",
									"B15002_034E",
									"B15002_035E",
								],
							},
						},
						{
							type: "pie-chart",
							title: "Highest Degree - Male",
							value: {
								fields: [
									"B15002_011E",
									"B15002_014E",
									"B15002_015E",
									"B15002_016E",
									"B15002_017E",
									"B15002_018E",
								],
							},
						},
					],
				},
			],
			fieldInfos: [
				// Field formatting for total adult population.
				{
					fieldName: "B15002_calc_numLTHSE",
					label: "No High School Degree",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_calc_numHSE",
					label: "High School Degree (or equivalent)",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_calc_numSomeCollE",
					label: "Some College",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_calc_numAAE",
					label: "Associates Degree",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_calc_numGEBAE",
					label: "Bachelor's Degree or Higher",
					format: {
						digitSeparator: true,
					},
				},
				// Field formatting for female fields.
				{
					fieldName: "B15002_028E",
					label: "High School",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_031E",
					label: "Associate's",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_032E",
					label: "Bachelor's",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_033E",
					label: "Master's",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_034E",
					label: "Professional School (beyond Bachelor's)",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_035E",
					label: "Doctorate",
					format: {
						digitSeparator: true,
					},
				},
				// Field formatting for male fields.
				{
					fieldName: "B15002_011E",
					label: "High School",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_014E",
					label: "Associate's",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_015E",
					label: "Bachelor's",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_016E",
					label: "Master's",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_017E",
					label: "Professional School (beyond Bachelor's)",
					format: {
						digitSeparator: true,
					},
				},
				{
					fieldName: "B15002_018E",
					label: "Doctorate",
					format: {
						digitSeparator: true,
					},
				},
			],
		},
	});

	const view = new MapView({
		container: viewDiv,
		map: new Map({
			basemap: "dark-gray-vector",
			layers: [tractsLayer],
		}),
		zoom: 9,
		center: [-117.66256, 33.93037],
		popup: {
			dockEnabled: true,
			dockOptions: {
				position: "top-right",
				breakpoint: false,
			},
		},
	});
	view.ui.add(new Legend({ view }), "bottom-left");
});
