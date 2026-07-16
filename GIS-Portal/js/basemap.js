/*
=====================================================
 GIS Portal v0.1.0
 Basemap Manager
=====================================================
*/


let basemapLayers = {};

let currentBasemap;



function initializeBasemaps(){


    basemapLayers.osm = L.tileLayer(

        GIS_CONFIG.basemap.osm.url,

        {

            attribution:
            GIS_CONFIG.basemap.osm.attribution

        }

    );



    basemapLayers.satellite = L.tileLayer(

        GIS_CONFIG.basemap.satellite.url,

        {

            attribution:
            GIS_CONFIG.basemap.satellite.attribution

        }

    );



    basemapLayers.terrain = L.tileLayer(

        GIS_CONFIG.basemap.terrain.url,

        {

            attribution:
            GIS_CONFIG.basemap.terrain.attribution

        }

    );


    currentBasemap = basemapLayers.osm;


}



function changeBasemap(name){


    if(currentBasemap){

        map.removeLayer(currentBasemap);

    }


    currentBasemap = basemapLayers[name];


    currentBasemap.addTo(map);


}