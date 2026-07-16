/*
=====================================================
 GIS Portal v0.1.0
 Toolbar Manager
=====================================================
*/


document.addEventListener(

"DOMContentLoaded",

function(){



    /*
    ==========================
    Basemap Menu
    ==========================
    */


    const basemapButton =
    document.getElementById("basemap-button");



    const basemapMenu =
    document.getElementById("basemap-menu");



    const basemapOptions =
    document.querySelectorAll(".basemap-option");



    if(basemapButton){


        basemapButton.addEventListener(

            "click",

            function(){


                if(
                    basemapMenu.style.display==="block"
                ){

                    basemapMenu.style.display="none";

                }

                else{

                    basemapMenu.style.display="block";

                }


            }

        );


    }





    basemapOptions.forEach(

        function(option){


            option.addEventListener(

                "click",

                function(){


                    let selectedMap =
                    this.getAttribute("data-map");



                    changeBasemap(selectedMap);



                    basemapMenu.style.display="none";


                }


            );


        }


    );

    /*
    ==========================
    Home Button
    ==========================
    */


    document.querySelectorAll(".tool-button")[0]

    .addEventListener(

        "click",

        function(){


            if(map){


                map.setView(

                    GIS_CONFIG.map.center,

                    GIS_CONFIG.map.zoom

                );


            }


        }

    );



}

);