/*
=====================================================
 GIS Portal v0.2.0
 Search Module
 Search by PD_NR
=====================================================
*/


let searchMarker = null;

let selectedDistrict = null;



function searchDistrict(){


const input =
document.getElementById("search-input");


let searchValue =
input.value.trim();



if(searchValue===""){

    return;

}



let districtLayer =
GIS_LAYERS.districts;



let found = false;



districtLayer.eachLayer(

function(layer){



let pdNumber =
layer.feature.properties.PD_NR;




if(String(pdNumber) === searchValue){



    found = true;



    /*
    Zoom to district
    */


    map.fitBounds(
        layer.getBounds(),
        {
            padding:[50,50]
        }
    );




    /*
    Open Popup
    */


    layer.openPopup();




    /*
    Highlight Boundary
    */


    if(selectedDistrict){

        selectedDistrict.setStyle({

            color:"#3388ff",

            weight:2,

            fillOpacity:0.1

        });

    }




    layer.setStyle({

        color:"red",

        weight:4,

        fillOpacity:0.25

    });



    selectedDistrict = layer;




    /*
    Add Arrow Marker
    */


    if(searchMarker){

        map.removeLayer(searchMarker);

    }



    let center =
    layer.getBounds().getCenter();




    searchMarker =
    L.marker(center,{

        icon:L.divIcon({

            className:"search-arrow",

            html:"⬇",

            iconSize:[35,35]

        })

    }).addTo(map);




}



});




if(!found){

alert(
"District PD_NR "+searchValue+" not found"
);

}



}




document.addEventListener(

"DOMContentLoaded",

function(){



const button =
document.getElementById("search-go");


const input =
document.getElementById("search-input");




if(button){


button.addEventListener(

"click",

searchDistrict

);


}





if(input){


input.addEventListener(

"keypress",

function(e){


if(e.key==="Enter"){


searchDistrict();


}


}

);


}



});