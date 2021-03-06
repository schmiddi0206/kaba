"use strict";

/**
 * @typedef {{
 *      input: string,
 *      output: string,
 *      browsers: string[],
 *      ignoreLintFor: Array.<(string|RegExp)>,
 * }} ScssTaskConfig
 */

const fs = require("fs-extra");
const ScssTask = require("./scss/scss-task");
const _ = require("lodash");
const path = require("path");




/**
 * Main task for Sass
 *
 * @param {ScssTaskConfig} config
 *
 * @returns {Function}
 */
module.exports = function (config = {})
{
    // parse user config
    config = _.assign({
        // input directory (can be a glob to multiple directories)
        input: "src/**/Resources/assets/scss/",
        // output directory (relative to input directory)
        output: "../../public/css",
        // browsers to support
        browsers: ["last 2 versions", "IE 10"],
        // list of file path paths (string or regex). If the file path matches one of these entries, the file won't be linted
        ignoreLintFor: ["/node_modules/", "/vendor/"]
    }, config);

    // build internal config
    config.input = config.input.replace(/\/+$/, "") + "/";

    return function (done, debug)
    {
        let task = new ScssTask(config);
        task.run(done, debug);
    }
};
