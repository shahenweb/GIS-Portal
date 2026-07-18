/*
=====================================================
 GIS Portal v0.1.0
 Layer Control
=====================================================
*/


function initializeLayerControl(){


    let layerPanel = 
    document.getElementById("layer-list");



let layerList = [

    {
        name:"پلان موقعیت",
        id:"raster",
        layer:rasterLayers.image1
    },

    {
        name:"مرز نواحی کابل",
        id:"districts",
        layer:GIS_LAYERS.districts
    },

    {
        name:"سرک های پلانی کابل",
        id:"roads",
        layer:GIS_LAYERS.roads
    }

];





    layerList.forEach(function(item){



       let layer = item.layer;

        let div =
        document.createElement("div");

        div.className =
        "layer-item";

        div.innerHTML = `

<label class="layer-row">

<input type="checkbox" checked>

<span>${item.name}</span>

</label>

<input
type="range"
class="opacity-slider"
min="0"
max="100"
value="100">

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



        layerPanel.appendChild(div);





        /*
        نمایش اولیه لایه
        */


        layer.addTo(map);



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