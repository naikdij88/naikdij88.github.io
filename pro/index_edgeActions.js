/***********************
* Adobe Edge Animate Composition Actions
*
* Edit this file with caution, being careful to preserve 
* function signatures and comments starting with 'Edge' to maintain the 
* ability to interact with these actions from within Adobe Edge Animate
*
***********************/
(function($, Edge, compId){
var Composition = Edge.Composition, Symbol = Edge.Symbol; // aliases for commonly used Edge classes

   //Edge symbol: 'stage'
   (function(symbolName) {
      
      
      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 125, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 390, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 635, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindTriggerAction(compId, symbolName, "Default Timeline", 895, function(sym, e) {
         // insert code here
         sym.stop();

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${__1402480}", "click", function(sym, e) {
         // insert code for mouse click here
         
         sym.play("2");

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${__--1920-10802}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.play("3");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${__--1920-1080}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.play("4");
         

      });
      //Edge binding end

      Symbol.bindElementAction(compId, symbolName, "${__----1920-1080}", "click", function(sym, e) {
         // insert code for mouse click here
         sym.play("1");
         

      });
      //Edge binding end

   })("stage");
   //Edge symbol end:'stage'

})(jQuery, AdobeEdge, "EDGE-28242316");