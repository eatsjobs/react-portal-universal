"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOMServer = require("react-dom/server");
var cheerio_1 = require("cheerio");
var index_1 = require("./index");
function appendUniversalPortals(html) {
    var portals = index_1.flushUniversalPortals();
    if (!portals.length) {
        return html;
    }
    var $ = cheerio_1.load(html);
    portals.forEach(function (_a) {
        var children = _a[0], selector = _a[1];
        var markup = ReactDOMServer.renderToStaticMarkup(children);
        $(markup).attr("data-react-universal-portal", "").appendTo(selector);
    });
    return $.html({ decodeEntities: false });
}
exports.appendUniversalPortals = appendUniversalPortals;
