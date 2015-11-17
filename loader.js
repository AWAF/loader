/*jshint enforceall: true*/
/*jslint browser: true, devel: true*/
/*exported loader*/
/*globals ajax, eventManager, async, LZString*/

/**
 * @file
 * @author Ángel González <aglezabad@gmail.com>
 * @version 0.0.1
 */

/**
 * @class
 * @classdesc Class that loads and unloads dependencies in an application.
 * @requires AWAF/ajax
 * @requires AWAF/eventmanager
 * @requires caolan/async
 * @requires pieroxy/lz-string
 */
function Loader() {
    'use strict';
    /**
     * @access private
     */
    var self = this;
    /**
     * Check if a browser interpreter has supported HTML5 imports.
     * @member supportsHTML5Imports
     * @access private
     * @since 0.0.1
     * @returns {Boolean} Return true if browser supports HTML5 imports. Return false if not.
     */
    function supportsHTML5Imports() {
        return document.createElement('link')['import'] !== null;
    }
    /**
     * Checks if a script/stylesheet/fragment is already loaded.
     * @member isLoaded
     * @access public
     * @since 0.0.1
     * @param   {String}  url URL of file.
     * @returns {Boolean} Return true if file is loaded. False if not.
     */
    this.isLoaded = function (url) {
        var urlFragmented = url.split('.');
        switch (urlFragmented[urlFragmented.length - 1]) {
        case 'js':
            if (document.querySelector('script[src="' + url + '"]') !== null) {
                return true;
            }
            break;
        case 'css':
            if (document.querySelector('link[href="' + url + '"]') !== null) {
                return true;
            }
            break;
        case 'html':
            if (document.querySelector('div#' + LZString.compressToUTF16(url)) !== null) {
                return true;
            }
            break;
        }
        return false;
    };
    /**
     * Loads a JavaScript file.
     * @member loadScript
     * @access public
     * @since 0.0.1
     * @param {String}   url      URL of file.
     * @param {Function} callback Callback function that sends a return value.
     *                            0: Script loaded.
     *                            -1: Script already loaded.
     *                            -2: Generic error. Script not loaded.
     */
    this.loadScript = function (url, callback) {
        if (!self.isLoaded(url)) {
            var element = document.createElement('script');
            element.setAttribute('type', 'text/javascript');
            element.setAttribute('src', url);
            eventManager.on(element, 'loaded', function () {
                callback(0);
            });
            eventManager.on(element, 'error', function () {
                callback(-2);
            });
            document.body.appendChild(element);
        } else {
            callback(-1);
        }
    };
    /**
     * Loads a stylesheet file. At this moment, only CSS files.
     * @member loadStyle
     * @access public
     * @since 0.0.1
     * @param {String}   url      URL of file.
     * @param {Function} callback Callback function that sends a return value.
     *                            0: Stylesheet loaded.
     *                            -1: Stylesheet already loaded.
     *                            -2: Generic error. Stylesheet not loaded.
     */
    this.loadStyle = function (url, callback) {
        if (!self.isLoaded(url)) {
            var element = document.createElement('link');
            element.setAttribute('type', 'text/css');
            element.setAttribute('rel', 'stylesheet');
            element.setAttribute('href', url);
            eventManager.on(element, 'loaded', function () {
                callback(0);
            });
            eventManager.on(element, 'error', function () {
                callback(-2);
            });
            document.head.appendChild(element);
        } else {
            callback(-1);
        }
    };
    /**
     * Loads a HTML fragment.
     * @member loadFragment
     * @access public
     * @since 0.0.1
     * @throws {Error} If a div with 'content' id does not exist, an error is thrown.
     * @param {String}   url      URL to file.
     * @param {Function} callback Callback function that sends a return value.
     *                            0: Fragment loaded.
     *                            -1: Fragment already loaded.
     *                            -2: Generic error. Fragment not loaded.
     *                            -4xx: HTTP 4xx error code.
     *                            -5xx: HTTP 5xx error code.
     */
    this.loadFragment = function (url, callback) {
        if (!self.isLoaded(url)) {
            var content = document.querySelector('div#content'),
                element;
            if (content === null) {
                throw new Error("Missing content div in html page.");
            } else {
                if (supportsHTML5Imports()) {
                    element = document.createElement('link');
                    element.setAttribute('rel', 'import');
                    element.setAttribute('href', url);
                    eventManager.on(element, 'loaded', function () {
                        content = element['import'];
                        content.setAttribute('id', LZString.compressToUTF16(url));
                    });
                    eventManager.on(element, 'error', function () {
                        callback(-2);
                    });
                    document.head.appendChild(element);
                } else {
                    ajax.request({
                        method: 'Get',
                        url: url,
                        success: function (response) {
                            element = document.createDocumentFragment();
                            element.appendChild(response);
                            content.appendChild(element);
                            content.setAttribute('id', LZString.compressToUTF16(url));
                        },
                        error: function (errorCode) {
                            if (errorCode >= 400 && errorCode < 600) {
                                callback(-errorCode);
                            } else {
                                callback(-2);
                            }
                        }
                    });
                }
                callback(0);
            }
        } else {
            callback(-1);
        }
    };
    /**
     * Loads a JSON metadata file and loads all scripts/stylesheets/fragments written in it.
     * @member loadApp
     * @access public
     * @since 0.0.1
     * @param {String}   metaUrl  URL to metadata file.
     * @param {Function} callback Callback function that sends a return value.
     *                            0: App loaded and executed.
     */
    this.loadApp = function (metaUrl, callback) {
        //Downloads JSON metafile.
        ajax.request({
            method: 'Get',
            url: metaUrl,
            success: function (response) {
                //Parses file to JavaScript object.
                //Loads each dependency.
                //Loads main function indicated.
            },
            error: function (errorCode) {
                if (errorCode >= 400 && errorCode < 600) {
                    callback(-errorCode);
                } else {
                    callback(-2);
                }
            }
        });
    };
    /**
     * Unloads a JavaScript file.
     * @member unloadScript
     * @access public
     * @since 0.0.1
     * @param {String}   url      URL to file (reference, network not used).
     * @param {Function} callback Callback function that returns a value.
     *                            0: Script unloaded.
     *                            -1: Script not loaded.
     */
    this.unloadScript = function (url, callback) {
        var element;
        if (self.isLoaded(url)) {
            element = document.querySelector('script[src=' + url + ']');
            element.parentNode.removeChild(element);
            callback(0);
        } else {
            callback(-1);
        }
    };
    /**
     * Unloads a stylesheet file.
     * @member unloadStyle
     * @access public
     * @since 0.0.1
     * @param {String}   url      URL to file (reference).
     * @param {Function} callback Callback function that returns a value.
     *                            0: Style unloaded.
     *                            -1: Style not loaded.
     */
    this.unloadStyle = function (url, callback) {
        var element;
        if (self.isLoaded(url)) {
            element = document.querySelector('link[href=' + url + ']');
            element.parentNode.removeChild(element);
            callback(0);
        } else {
            callback(-1);
        }

    };
    /**
     * Unloads a fragment file.
     * @member unloadFragment
     * @access public
     * @since 0.0.1
     * @param {String}   url      URL to file (reference).
     * @param {Function} callback Callback function that returns a value.
     *                            0: Fragment unloaded.
     *                            -1: Fragment not loaded.
     */
    this.unloadFragment = function (url, callback) {
        var element,
            clonedElement;
        if (self.isLoaded(url)) {
            if (supportsHTML5Imports()) {
                element = document.querySelector('link[href=' + url + ']');
                element.parentNode.removeChild(element);
            }
            element = document.querySelector('div#' + LZString.compressToUTF16(url));
            clonedElement = element.cloneNode(false);
            element.parentNode.replaceChild(clonedElement, element);
            element.setAttribute('id', 'content');
            callback(0);
        } else {
            callback(-1);
        }
        
    };
    
}

var loader = new Loader();

