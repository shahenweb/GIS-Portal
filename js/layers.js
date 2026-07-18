/*
=====================================================
 GIS Portal v1.0.0
 Layer Manager
=====================================================
*/


let GIS_LAYERS = {};



const LAYER_CONFIG = {


    districts: {

        id: "districts",

        name: "مرز نواحی کابل",

        type: "polygon",

        source:
        "data/vector/kabuldistrec.geojson"

    },

image1: {

    id: "image1",

    name: "1png",

    type: "raster"

},
    roads: {

        id: "roads",

        name: "سرک‌های پلانی کابل",

        type: "line",

        source:
        "data/vector/kabulrods.geojson"

    }


};





function initializeLayers(){


    Object.keys(LAYER_CONFIG).forEach(function(key){


        createGeoJSONLayer(

            key,

            LAYER_CONFIG[key]

        );


    });


}






function createGeoJSONLayer(id, config){


    GIS_LAYERS[id] = L.geoJSON(null, {


        style:

        getLayerStyle(config.type),


        onEachFeature:

        onEachFeature


    });




    fetch(config.source)


    .then(response => response.json())


    .then(data => {


        GIS_LAYERS[id].addData(data);


    });


}







function getLayerStyle(type){


    if(type === "polygon"){


        return {


            color:"#3388ff",

            weight:2,

            fillOpacity:0.1


        };


    }




    if(type === "line"){


        return {


            color:"#ff6600",

            weight:2


        };


    }


}

let selectedLayer = null;
function onEachFeature(feature, layer){


    // Mouse Over Highlight

    layer.on("mouseover", function(){


        layer.setStyle({

            weight:3,

            fillOpacity:0.3

        });


    });



    layer.on("mouseout", function(){


        if(layer !== selectedLayer){


            layer.setStyle({

                weight:2,

                fillOpacity:0.1

            });


        }


    });



    // Identify

    layer.on("click", function(){


        if(identifyActive){


            if(selectedLayer){

                selectedLayer.setStyle({

                    color:"#3388ff",

                    weight:2,

                    fillOpacity:0.1

                });

            }


            selectedLayer = layer;


            layer.setStyle({

                color:"red",

                weight:3

            });



            let pd = feature.properties.PD_NR;


            let html = `

            <b>PD_NR:</b> ${pd}

            `;


            layer.bindPopup(html).openPopup();


        }


    });


}
var planRaster = L.tileLayer('Raster_Data/{z}/{x}/{y}.png', {
    minZoom: 12,
    maxZoom: 12,
    opacity: 0.8,
    attribution: 'Raster Plan'
});