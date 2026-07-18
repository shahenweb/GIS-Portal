/*
=====================================================
 GIS Portal v1.0.0
 Raster Layer
=====================================================
*/


let rasterLayers = {};


rasterLayers.image1 = L.imageOverlay(

    "data/raster/1.png",

    [

        [34.4858115228, 69.113168431], // South West

        [34.5447365228, 69.204743431]  // North East

    ],

    {

        opacity:0.7

    }

);