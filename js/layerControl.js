/*
=====================================================
 GIS Portal v0.1.0
 Layer Control
=====================================================
*/


function initializeLayerControl(){


    let layerPanel = 
    document.getElementById("layer-list");

let layerList = [];

Object.keys(LAYER_CONFIG)

.sort(function(a,b){

    return LAYER_CONFIG[a].order - LAYER_CONFIG[b].order;

})

.forEach(function(key){

    layerList.push({

        name:LAYER_CONFIG[key].name,

        id:LAYER_CONFIG[key].id,

        layer:GIS_LAYERS[key]

    });

});

    layerList.forEach(function(item){



       let layer = item.layer;

        let div =
        document.createElement("div");

        div.className =
        "layer-item";

div.innerHTML = `

<div class="layer-header">


<label class="layer-row">

<input type="checkbox" checked>

<span>

${

LAYER_CONFIG[item.id].geometry === "polygon"
?
"⬛"

:

LAYER_CONFIG[item.id].geometry === "line"
?
"➖"

:

"🖼"

}

${item.name}

</span>

</label>


<div class="layer-actions">

<button class="zoom-layer">
🔍
</button>


<button class="layer-expand">
▼
</button>

</div>


</div>


<div class="layer-details">


<div class="layer-info">

Type: ${LAYER_CONFIG[item.id].geometry}

</div>


<div class="opacity-label">

Opacity

</div>


<input
type="range"
class="opacity-slider"
min="0"
max="100"
value="100">


</div>

`;





        let checkbox =
        div.querySelector("input");






       checkbox.addEventListener(

"change",

function(){


    let legend =
    document.getElementById(
        "legend-" + item.id
    );


    if(this.checked){


        layer.addTo(map);


        if(legend){

            legend.style.display="flex";

        }


    }

    else{


        map.removeLayer(layer);


        if(legend){

            legend.style.display="none";

        }


    }


}

);

let slider = div.querySelector(".opacity-slider");

slider.addEventListener("input", function(){

    let opacity = this.value / 100;

    if(layer.setOpacity){

        layer.setOpacity(opacity);

    }

    else if(layer.eachLayer){

        layer.eachLayer(function(l){

            if(l.setStyle){

                l.setStyle({

                    opacity:opacity,

                    fillOpacity:opacity * 0.3

                });

            }

        });

    }

});

let zoomBtn =
div.querySelector(".zoom-layer");


zoomBtn.addEventListener("click",function(e){

    e.stopPropagation();


    let config = LAYER_CONFIG[item.id];


    // GeoJSON Layer
    if(layer.getBounds){

        map.fitBounds(
            layer.getBounds()
        );

    }


    // WMS Layer
    else if(config.type === "wms" && config.bounds){


        map.fitBounds([
            [config.bounds[1], config.bounds[0]],
            [config.bounds[3], config.bounds[2]]
        ]);


    }


    // Other layers
    else if(config.bounds){


        map.fitBounds(
            config.bounds
        );


        if(config.maxZoom){

            map.setZoom(config.maxZoom);

        }


    }


});

let expandBtn =
div.querySelector(".layer-expand");


let details =
div.querySelector(".layer-details");


expandBtn.addEventListener("click",function(){

    if(details.style.display==="none"){

        details.style.display="block";

        this.innerHTML="▲";

    }

    else{

        details.style.display="none";

        this.innerHTML="▼";

    }

});


details.style.display="none";

        layerPanel.appendChild(div);





        /*
        نمایش اولیه لایه
        */


        if(LAYER_CONFIG[item.id].visible){

    layer.addTo(map);

}



    });



}
document.addEventListener("DOMContentLoaded",function(){

    const btn=document.getElementById("layer-toggle");

    const panel=document.getElementById("layer-panel");

    btn.onclick=function(){

        panel.classList.toggle("open");

    };

});
document.addEventListener("DOMContentLoaded",function(){


    const layerBtn = document.getElementById("layer-toggle");
    const layerPanel = document.getElementById("layer-panel");


    const legendBtn = document.getElementById("legend-toggle");
    const legendPanel = document.getElementById("legend-panel");



    document.addEventListener("click",function(e){


        // Layer Panel

        if(
            !layerPanel.contains(e.target) &&
            !layerBtn.contains(e.target)
        ){

            layerPanel.classList.remove("open");

        }



        // Legend Panel

        if(
            !legendPanel.contains(e.target) &&
            !legendBtn.contains(e.target)
        ){

            legendPanel.classList.remove("open");

        }



    });


});