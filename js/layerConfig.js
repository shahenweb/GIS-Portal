/*
=====================================================
 GIS Portal
 Layer Configuration
=====================================================
*/


const LAYER_CONFIG = {


    districts: {

        id:"districts",

        name:"مرز نواحی کابل",

        type:"polygon",

        source:"data/vector/kabuldistrec.geojson",

        legend:"polygon",

        visible:true

    },


    roads: {

        id:"roads",

        name:"سرک های پلانی کابل",

        type:"line",

        source:"data/vector/kabulrods.geojson",

        legend:"line",

        visible:true

    },


    raster: {

        id:"raster",

        name:"پلان موقعیت",

        type:"raster",

        source:"data/raster/1.png",

        legend:"raster",

        visible:true

    }


};