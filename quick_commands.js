// Finds and clicks the whatnot header
document.querySelectorAll("[data-cy=\"Sold\"]").forEach(it => it.click())

// Observes changes to the dom
// TODO CLean up
var observeDOM = (function(){
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

  return function( obj, callback ){
    if( !obj || obj.nodeType !== 1 ) return; 

    if( MutationObserver ){
      // define a new observer
      var mutationObserver = new MutationObserver(callback)

      // have the observer observe for changes in children
      mutationObserver.observe( obj, { childList:true, subtree:true })
      return mutationObserver
    }
    
    // browser support fallback
    else if( window.addEventListener ){
      obj.addEventListener('DOMNodeInserted', callback, false)
      obj.addEventListener('DOMNodeRemoved', callback, false)
    }
  }
})()

// After setting the chat to $0 use this to bind to it to get the chat message.
observeDOM($0, (ele) => console.log(ele[0].addedNodes[0].childNodes[1].childNodes[1].textContent))
