"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = require("react-dom");
var portals = [];
function canUseDOM() {
    return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}
function createUniversalPortal(children, selector) {
    if (!canUseDOM()) {
        portals.push([children, selector]); // yes, mutation (҂◡_◡)
        return null; // do not render anything on the server
    }
    // TODO: Do not cast to any when typings are updated for createPortal
    return ReactDOM.createPortal(children, document.querySelector(selector));
}
exports.createUniversalPortal = createUniversalPortal;
function flushUniversalPortals() {
    var copy = portals.slice();
    portals.length = 0; // it's important to flush one and only one time per render
    return copy;
}
exports.flushUniversalPortals = flushUniversalPortals;
function removeUniversalPortals() {
    if (canUseDOM()) {
        Array.prototype.slice.call(document.querySelectorAll("[data-react-universal-portal]")).forEach(function (node) {
            node.remove();
        });
    }
}
exports.removeUniversalPortals = removeUniversalPortals;
