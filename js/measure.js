/*
=====================================================
 GIS Portal v1.0.0
 Measure Tool
=====================================================
*/


let measureLayer = L.layerGroup();


function initializeMeasure(){


    measureLayer.addTo(map);



    let points = [];

    let line = null;



    map.on("click", function(e){


        points.push(e.latlng);



        L.marker(e.latlng)

        .addTo(measureLayer);



        if(points.length > 1){



            if(line){

                measureLayer.removeLayer(line);

            }



            line = L.polyline(

                points,

                {

                    color:"red",

                    weight:3

                }

            ).addTo(measureLayer);



            let distance = 0;



            for(let i=0; i<points.length-1; i++){


                distance +=

                points[i].distanceTo(

                    points[i+1]

                );


            }



            alert(

                "Distance: " +

                (distance/1000).toFixed(3) +

                " km"

            );


        }


    });


}