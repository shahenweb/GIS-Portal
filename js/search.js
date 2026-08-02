/*
=====================================================
 GIS Portal v2.0
 Search Engine
=====================================================
*/


function initializeSearch(){


    const input = 
    document.getElementById("search-input");


    const results =
    document.getElementById("search-results");



    if(!input || !results){

        return;

    }



    input.addEventListener("input",function(){


        let value =
        this.value.trim().toLowerCase();



        results.innerHTML="";



        if(value===""){


            results.style.display="none";

            return;

        }



        let matches=[];



        Object.keys(LAYER_CONFIG).forEach(function(key){


            let layer =
            LAYER_CONFIG[key];



            if(layer.searchable === true){



                let text =

                layer.name.toLowerCase()
                +
                " "
                +
                (layer.keywords || [])
                .join(" ")
                .toLowerCase();



                if(text.includes(value)){


                    matches.push(layer);

                }


            }


        });



        if(matches.length===0){


            results.style.display="none";

            return;

        }



        matches.forEach(function(layer){


    let div =
    document.createElement("div");


    div.className="search-item";


   let icon = "🗺";


if(layer.geometry === "polygon"){

    icon = "🏘";

}

else if(layer.geometry === "line"){

    icon = "🛣";

}

else if(layer.geometry === "raster"){

    icon = "🖼";

}



div.innerHTML =

icon + " " + layer.name +
"<br><small>" +
layer.geometry +
"</small>";



    div.addEventListener("click",function(){



        let key = layer.id;



        let mapLayer =
        GIS_LAYERS[key];



        if(mapLayer){



            // روشن کردن لایه

            if(!map.hasLayer(mapLayer)){

                map.addLayer(mapLayer);

            }



            // زوم به لایه

          if(mapLayer.getBounds){

    map.fitBounds(
        mapLayer.getBounds()
    );

}
else if(LAYER_CONFIG[key].bounds){


    map.fitBounds(
        LAYER_CONFIG[key].bounds
    );


    if(LAYER_CONFIG[key].maxZoom){

        map.setZoom(
            LAYER_CONFIG[key].maxZoom
        );

    }

}



        }



        results.style.display="none";


    });



    results.appendChild(div);



});



        results.style.display="block";



    });


}



document.addEventListener(
"DOMContentLoaded",
function(){

    initializeSearch();

});