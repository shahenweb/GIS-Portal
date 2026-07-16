/*
=====================================================
 GIS Portal v1.0.0
 Legend Manager
=====================================================
*/


function initializeLegend(){



}



document.addEventListener("DOMContentLoaded",function(){


    const btn = document.getElementById("legend-toggle");

    const panel = document.getElementById("legend-panel");



    btn.addEventListener("click",function(e){


        e.stopPropagation();


        panel.classList.toggle("open");


    });



});