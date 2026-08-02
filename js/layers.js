/*
=====================================================
 GIS Portal v1.0.0
 Layer Manager
=====================================================
*/


let GIS_LAYERS = {};


function initializeLayers(){

    Object.keys(LAYER_CONFIG).forEach(function(key){

        createLayer(key,LAYER_CONFIG[key]);

    });

}



function createLayer(id, config){


    // =========================
    // GeoJSON Layer
    // =========================

    if(config.type === "geojson"){


        GIS_LAYERS[id] = L.geoJSON(null,{

            style:getLayerStyle(id),


            onEachFeature:function(feature, layer){

                onEachFeature(feature, layer, id);

            }


        });



        fetch(config.source)

        .then(response=>response.json())

        .then(data=>{

            GIS_LAYERS[id].addData(data);

        });



    }




    // =========================
    // Raster Tile Layer
    // =========================

    else if(config.type === "tile"){


        GIS_LAYERS[id] = L.tileLayer(

            config.source,

            {

                minZoom: config.minZoom,

                maxZoom: config.maxZoom,

                opacity: config.opacity,

                tms:false

            }

        );


    }





    // =========================
    // GeoServer WMS Layer
    // =========================

    else if(config.type === "wms"){


GIS_LAYERS[id] = L.tileLayer.wms(
    config.source,
    {
        layers: config.layer,
        format:"image/png",
        transparent:true,
        version:"1.1.1",
        zIndex:500
    }
);


    }



}





function getLayerStyle(id){


    if(id === "districts"){


        return {

            color:"#3388ff",

            weight:2,

            fillOpacity:0.1

        };


    }



    if(id === "roads"){


        return {


            color:LAYER_CONFIG[id].styleColor,

            weight:2


        };


    }




    if(id === "developmentPlan"){


        return {


            color:"#008000",

            weight:2,

            fillColor:"#00ff00",

            fillOpacity:0.25


        };


    }



    return {};


}







let selectedLayer = null;





function onEachFeature(feature, layer, layerId){





    // Mouse Over Highlight

    layer.on("mouseover",function(){


        layer.setStyle({


            weight:3,

            fillOpacity:0.3


        });



    });







    // Mouse Out

    layer.on("mouseout",function(){


        if(layer !== selectedLayer){


            layer.setStyle({


                weight:2,

                fillOpacity:0.1


            });



        }



    });








    // Identify

    layer.on("click",function(){



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







            // ساخت Popup از تنظیمات Layer Config

            let html = createIdentifyContent(feature, layerId);






            layer.bindPopup(html).openPopup();




        }



    });






}