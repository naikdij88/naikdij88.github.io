/**
 * Adobe Edge: symbol definitions
 */
(function($, Edge, compId){
//images folder
var im='images/';

var fonts = {};
var opts = {
    'gAudioPreloadPreference': 'auto',

    'gVideoPreloadPreference': 'auto'
};
var resources = [
];
var symbols = {
"stage": {
    version: "4.0.0",
    minimumCompatibleVersion: "4.0.0",
    build: "4.0.0.359",
    baseState: "Base State",
    scaleToFit: "none",
    centerStage: "none",
    initialState: "Base State",
    gpuAccelerate: false,
    resizeInstances: false,
    content: {
            dom: [
            {
                id: '_----1920-1080',
                display: 'none',
                type: 'image',
                rect: ['0px', '0px','960px','540px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"%D0%92%D0%BE%D0%B7%D0%B4%D1%83%D1%88%D0%BD%D1%8B%D0%B9-%D1%88%D0%B0%D1%80-%D0%BD%D0%B0-%D0%B7%D0%B0%D0%BA%D0%B0%D1%82%D0%B5-1920-1080.jpg",'0px','0px']
            },
            {
                id: '_--1920-1080',
                display: 'none',
                type: 'image',
                rect: ['0', '0','960px','540px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"%D0%9A%D0%B0%D0%BC%D0%B5%D0%BD%D0%B8%D1%81%D1%82%D0%B0%D1%8F-%D0%BC%D0%B5%D1%81%D1%82%D0%BD%D0%BE%D1%81%D1%82%D1%8C-1920-1080.jpg",'0px','0px']
            },
            {
                id: '_--1920-10802',
                display: 'none',
                type: 'image',
                rect: ['0', '0','960px','540px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"%D0%9A%D1%80%D0%B0%D1%81%D0%B8%D0%B2%D1%8B%D0%B9-%D0%BF%D0%B5%D0%B9%D0%B7%D0%B0%D0%B6-1920-1080.jpg",'0px','0px']
            },
            {
                id: '_1402480',
                display: 'block',
                type: 'image',
                rect: ['0', '0','960px','540px','auto', 'auto'],
                fill: ["rgba(0,0,0,0)",im+"1402480.jpg",'0px','0px']
            }],
            symbolInstances: [

            ]
        },
    states: {
        "Base State": {
            "${__1402480}": [
                ["style", "height", '540px'],
                ["style", "display", 'block'],
                ["style", "width", '960px']
            ],
            "${_Stage}": [
                ["color", "background-color", 'rgba(255,255,255,1)'],
                ["style", "width", '960px'],
                ["style", "height", '540px'],
                ["style", "overflow", 'hidden']
            ],
            "${__--1920-10802}": [
                ["style", "height", '540px'],
                ["style", "display", 'none'],
                ["style", "width", '960px']
            ],
            "${__----1920-1080}": [
                ["style", "top", '0px'],
                ["style", "height", '540px'],
                ["style", "display", 'none'],
                ["style", "left", '0px'],
                ["style", "width", '960px']
            ],
            "${__--1920-1080}": [
                ["style", "height", '540px'],
                ["style", "display", 'none'],
                ["style", "width", '960px']
            ]
        }
    },
    timelines: {
        "Default Timeline": {
            fromState: "Base State",
            toState: "",
            duration: 1000,
            autoPlay: true,
            labels: {
                "1": 0,
                "2": 250,
                "3": 500,
                "4": 750
            },
            timeline: [
                { id: "eid8", tween: [ "style", "${__----1920-1080}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid9", tween: [ "style", "${__----1920-1080}", "display", 'block', { fromValue: 'none'}], position: 750, duration: 0 },
                { id: "eid10", tween: [ "style", "${__----1920-1080}", "display", 'none', { fromValue: 'block'}], position: 1000, duration: 0 },
                { id: "eid5", tween: [ "style", "${__--1920-1080}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid6", tween: [ "style", "${__--1920-1080}", "display", 'block', { fromValue: 'none'}], position: 500, duration: 0 },
                { id: "eid7", tween: [ "style", "${__--1920-1080}", "display", 'none', { fromValue: 'block'}], position: 750, duration: 0 },
                { id: "eid2", tween: [ "style", "${__--1920-10802}", "display", 'none', { fromValue: 'none'}], position: 0, duration: 0 },
                { id: "eid3", tween: [ "style", "${__--1920-10802}", "display", 'block', { fromValue: 'none'}], position: 250, duration: 0 },
                { id: "eid4", tween: [ "style", "${__--1920-10802}", "display", 'none', { fromValue: 'block'}], position: 500, duration: 0 },
                { id: "eid1", tween: [ "style", "${__1402480}", "display", 'none', { fromValue: 'block'}], position: 250, duration: 0 }            ]
        }
    }
}
};


Edge.registerCompositionDefn(compId, symbols, fonts, resources, opts);

/**
 * Adobe Edge DOM Ready Event Handler
 */
$(window).ready(function() {
     Edge.launchComposition(compId);
});
})(jQuery, AdobeEdge, "EDGE-28242316");
