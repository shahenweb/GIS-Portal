/*
=====================================================
 GIS Portal v0.1.0
 Configuration File
=====================================================
*/


const GIS_CONFIG = {


    map: {


        center: [
            34.5553,
            69.2075
        ],


        zoom: 12


    },


    basemap: {


        osm: {


            url:
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",


            attribution:
            "© OpenStreetMap"


        },


        satellite: {


            url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",


            attribution:
            "© Esri"


        },


        terrain: {


            url:
            "https://tile.opentopomap.org/{z}/{x}/{y}.png",


            attribution:
            "© OpenTopoMap"


        }


    }


};