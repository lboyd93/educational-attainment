require([
	"esri/Map",
	"esri/views/MapView",
	"esri/layers/FeatureLayer",
	"esri/widgets/Legend",
	"esri/core/reactiveUtils",
], (Map, MapView, FeatureLayer, Legend, reactiveUtils) => {
	// Create a feature layer.
	const tractsLayer = new FeatureLayer({
		url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/ArcGIS/rest/services/ACS_Educational_Attainment_Boundaries/FeatureServer/2",
		outFields: ["*"],
		// Create a popup template.
		popupTemplate: {
			title: "{NAME} in {COUNTY}, {STATE}",
			content: [
				// Text content that shows information from specific fields that are formatted using the FieldInfos.
				{
					type: "text",
					text: `An estimated <b>{B15002_calc_numLTHSE}</b> adults age 25+ are not high school graduates, which is approximately <b>{B15002_calc_pctLTHSE}%</b> of all adults age 25+.`,
				},
				// Media content that will display multiple charts that can be paged through.
				{
					type: "media",
					title: "Educational Attainment",
					description:
						"The educational attainment for adults (male & female) 25 years and older.",
					// Define individual charts to showcase in the media pagination.
					mediaInfos: [
						// This will be a column chart to show information regarding all adults within
						// the selected county tract.
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
						// This will be a pie chart to show information regarding all adult females within
						// the selected county tract.
						{
							type: "pie-chart",
							title: "Highest Education - Female",
							value: {
								fields: [
									"expression/no-hs-degree-female",
									"B15002_028E",
									"B15002_031E",
									"B15002_032E",
									"B15002_033E",
									"B15002_034E",
									"B15002_035E",
								],
							},
						},
						// This will be a pie chart to show information regarding all adult males within
						// the selected county tract.
						{
							type: "pie-chart",
							title: "Highest Education - Male",
							value: {
								fields: [
									"expression/no-hs-degree-male",
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
			// Create Arcade expressions to create your own value from available fields.
			expressionInfos: [
				{
					// Females with no high school degree.
					name: "no-hs-degree-female",
					title: "No High School Degree",
					expression:
						"$feature.B15002_020E + $feature.B15002_021E + $feature.B15002_022E + $feature.B15002_023E + $feature.B15002_024E + $feature.B15002_025E + $feature.B15002_026E + $feature.B15002_027E",
				},
				{
					// Males with no high school degree.
					name: "no-hs-degree-male",
					title: "No High School Degree",
					expression:
						"$feature.B15002_003E + $feature.B15002_004E + $feature.B15002_005E + $feature.B15002_006E + $feature.B15002_007E + $feature.B15002_008E + $feature.B15002_009E + $feature.B15002_010E",
				},
			],
			// Format the fields so that they have an understandable label and a digit separator.
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
					fieldName: "expression/no-hs-degree-female",
					format: {
						digitSeparator: true,
					},
				},
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
					fieldName: "expression/no-hs-degree-male",
					format: {
						digitSeparator: true,
					},
				},
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

	// Create a MapView that references a map with the feature layer configured above.
	const view = new MapView({
		container: viewDiv,
		map: new Map({
			basemap: "dark-gray-vector",
			layers: [tractsLayer],
		}),
		zoom: 9,
		center: [-117.66256, 33.93037],
		// Dock the popup in the upper right corner of the view.
		popup: {
			dockEnabled: true,
			dockOptions: {
				position: "top-right",
				breakpoint: false,
			},
		},
		// Add constraints on the view so that user's cannot zoom out where the data doesn't exist.
		constraints: {
			minScale: 2000000,
			maxScale: 0,
			snapToZoom: false,
		},
	});
	// Add a Legend to the view.
	view.ui.add(new Legend({ view }), "bottom-left");
});
