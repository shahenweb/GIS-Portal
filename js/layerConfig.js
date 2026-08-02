/*
=====================================================
 GIS Portal
 Layer Configuration
=====================================================
*/


const LAYER_CONFIG = {


districts: {

    id:"districts",

    name:"مرز نواحی کابل",

    searchable:true,

    identifyFields:[

        {
            field:"نام_ن",
            label:"نام ناحیه"
        },

        {
            field:"AREA_KM_2",
            label:"مساحت (Km²)"
        }

    ],

    keywords:[
"کابل",
"ناحیه",
"Boundary",
"شهرداری"
],

    type:"geojson",

geometry:"polygon",

    category:"Boundary",

    source:"data/vector/kabuldistrec.geojson",

    legend:"polygon",

    styleColor:"#3388ff",

    visible:true,

    order:1

},

roads: {

    id:"roads",

    name:"سرک های پلانی کابل",

    searchable:true,
    identifyFields:[

    {
        field:"NAME",
        label:"نام سرک"
    },

    {
        field:"LENGTH_KM",
        label:"طول (Km)"
    }

],

identifyFields:[

{
 field:"NAME",
 label:"نام سرک"
},

{
 field:"LENGTH_KM",
 label:"طول (Km)"
}

],

    keywords:[
"سرک",
"جاده",
"Road",
"Street"
],

    type:"geojson",
    

    geometry:"line",

    source:"data/vector/kabulrods.geojson",

    legend:"line",

    styleColor:"#ff6600",

    visible:true,

    order:3

},
plan:{

    id:"plan",

    name:"حدود نواحی اول ودوم شهر کابل",

    searchable:true,

    keywords:[
"حدود نواحی",
"ناحیه اول",
"ناحیه",
"کابل"
],

    type:"tile",

    geometry:"raster",

    source:"data/raster/plan/{z}/{x}/{y}.png",

    minZoom:10,

    maxZoom:15,

    opacity:1,

    visible:true,

    legend:"raster",

    bounds:[
        [34.4858115227569968,69.1131684309811618],
        [34.5447365227569989,69.2047434309811678]
    ],

    order:10

},

};
