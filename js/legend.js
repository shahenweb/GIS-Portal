/*
=====================================================
 GIS Portal
 Legend Manager
=====================================================
*/

function initializeLegend(){

    let legendList =
    document.getElementById("legend-list");

    legendList.innerHTML = "";

    let layers = Object.values(LAYER_CONFIG);

    layers.sort(function(a,b){

        return a.order - b.order;

    });

    layers.forEach(function(layer){

        let div =
        document.createElement("div");

        div.className = "legend-item";

        div.id = "legend-" + layer.id;

        let symbol = "";

        if(layer.legend === "polygon"){

            symbol =
            '<span class="legend-symbol polygon"></span>';

        }

        else if(layer.legend === "line"){

            symbol =
            '<span class="legend-symbol line"></span>';

        }

        else if(layer.legend === "point"){

            symbol =
            '<span class="legend-symbol point"></span>';

        }

        else if(layer.legend === "raster"){

            symbol =
            '<span class="legend-symbol raster"></span>';

        }

        div.innerHTML = `

            ${symbol}

            <span>${layer.name}</span>

        `;

        legendList.appendChild(div);

    });

}


document.addEventListener("DOMContentLoaded",function(){

    const btn =
    document.getElementById("legend-toggle");

    const panel =
    document.getElementById("legend-panel");

    btn.onclick = function(e){

        e.stopPropagation();

        panel.classList.toggle("open");

    };

});