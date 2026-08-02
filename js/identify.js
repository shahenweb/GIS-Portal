/*
=====================================================
 GIS Portal v1.0.0
 Identify Tool
=====================================================
*/


let identifyActive = false;



L.Control.Identify = L.Control.extend({

    onAdd: function(map){


        let button = L.DomUtil.create(
            "button",
            "leaflet-bar leaflet-control leaflet-control-custom"
        );


        button.innerHTML = "ℹ";


        button.title = "Identify";


        button.style.width = "34px";
        button.style.height = "34px";
        button.style.background = "white";
        button.style.cursor = "pointer";
        button.style.fontSize = "20px";



        button.onclick = function(e){

            L.DomEvent.stopPropagation(e);


            identifyActive = !identifyActive;


            if(identifyActive){

                button.style.background="#3388ff";
                button.style.color="white";

            }

            else{

                button.style.background="white";
                button.style.color="black";

            }


        };


        return button;

    }

});



L.control.identify = function(opts){

    return new L.Control.Identify(opts);

}
function createIdentifyContent(feature, layerId){

    let properties = feature.properties;

    let config = LAYER_CONFIG[layerId];
    console.log("Layer ID:", layerId);
console.log(config);
    let html = `
        <div class="identify-box">

            <h4>${config.name}</h4>

            <hr>
    `;

    if(config.identifyFields){

        config.identifyFields.forEach(function(item){

            html += `
                <b>${item.label}:</b>
                ${properties[item.field] ?? "-"}
                <br><br>
            `;

        });

    }else{

        html += `
            اطلاعات Identify برای این لایه تعریف نشده است.
        `;

    }

    html += `
        </div>
    `;

    return html;

}
// ===============================
// WMS Identify
// ===============================

mapClickIdentify = function(e){

    console.log("WMS Identify Click", e.latlng);

    if(!identifyActive){
        return;
    }
    


    Object.keys(GIS_LAYERS).forEach(function(id){


        let config = LAYER_CONFIG[id];
    
console.log("Checking Layer:", id, config.type, map.hasLayer(GIS_LAYERS[id]));

        if(config.type === "wms" && map.hasLayer(GIS_LAYERS[id])){


            let url = config.source +
            "?service=WMS" +
            "&version=1.1.1" +
            "&request=GetFeatureInfo" +
            "&layers=" + config.layer +
            "&query_layers=" + config.layer +
            "&styles=" +
            "&bbox=" + map.getBounds().toBBoxString() +
            "&width=" + map.getSize().x +
            "&height=" + map.getSize().y +
            "&crs=EPSG:4326" +
            "&x=" + Math.floor(map.mouseEventToContainerPoint(e).x) +
            "&y=" + Math.floor(map.mouseEventToContainerPoint(e).y) +
            "&info_format=application/json";


            fetch(url)

            .then(response=>response.json())

            .then(data=>{


                if(data.features && data.features.length > 0){


                    let props = data.features[0].properties;


                    let html = "<b>اطلاعات پلان</b><br>";


                    Object.keys(props).forEach(function(key){


                        html += key + " : " + props[key] + "<br>";


                    });


                    L.popup()

                    .setLatLng(e.latlng)

                    .setContent(html)

                    .openOn(map);


                }


            });


        }


    });


};