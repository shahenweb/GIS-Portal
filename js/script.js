/*
=====================================================
 GIS Portal v1.0.0
 Main Script
=====================================================
*/

let map;

function initializeMap() {

    // Create Map
    map = L.map("map").setView(
        GIS_CONFIG.map.center,
        GIS_CONFIG.map.zoom
    );
    L.control.identify({
    position:"topleft"
}).addTo(map);

// Basemap
initializeBasemaps();
basemapLayers.osm.addTo(map);
rasterLayers.image1.addTo(map);

// Raster Plan
planRaster.addTo(map);


// Scale Bar

L.control.scale({

    position:"bottomleft",

    metric:true,

    imperial:false

}).addTo(map);



// Mouse Coordinates

map.on("mousemove", function(e){

    document.getElementById("coordinate-display").innerHTML =

    "Lat: " + e.latlng.lat.toFixed(6) +

    " | Lon: " + e.latlng.lng.toFixed(6);

});
    // GIS Layers
    initializeLayers();

    // Wait until GeoJSON is loaded
    setTimeout(function () {

        GIS_LAYERS.districts.addTo(map);
        GIS_LAYERS.roads.addTo(map);

        initializeLayerControl();
        initializeLegend();

    }, 500);

}

document.addEventListener("DOMContentLoaded", function () {

    initializeMap();

    setTimeout(function () {
        map.invalidateSize();
    }, 300);

});
