"use strict";

/**
 * @typedef {{
 *      input: string,
 *      output: string,
 *      ignoreLintFor: Array.<(string|RegExp)>,
 * }} JsTaskConfig
 */

let fs = require("fs");
let JsTask = require("./js/js-task");
const _ = require("lodash");


/**
 * Main task for Sass
 *
 * @param {JsTaskConfig} config
 *
 * @returns {Function}
 */
module.exports = function (config = {})
{
    config = _.assign({
        input: "src/**/Resources/assets/js/",
        output: "../../public/js",
        // list of file path paths (string or regex). If the file path matches one of these entries, the file won't be linted
        ignoreLintFor: ["/node_modules/", "/vendor/"]
    }, config);

    // build internal config
    config.input = config.input.replace(/\/+$/, "") + "/";

    return function (done, debug)
    {
        let task = new JsTask(config);
        task.run(debug);
    }
};
