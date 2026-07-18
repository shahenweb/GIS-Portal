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
