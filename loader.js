/*jshint esnext: true, enforceall: true, browser: true*/
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
export class Loader{
    constructor(){
        const LOAD_OK = 0;
        const LOAD_ERROR = 1;
        const URL_NOT_DEFINED = 10;
        const FILE_LOADED = 11;
        const FILE_NOT_LOADED = 12;
        const MISSING_CONTENT_DIV = 20;
        const CANT_UNLOAD = 30;
    }
    /**
     * Check if a browser interpreter has supported HTML5 imports.
     * @since 0.0.1
     * @returns {boolean} True -> Browser accepts HTML5 imports. False -> Browser can't use imports.
     */
    static supportsHTML5Imports(){
        return document.createElement('link')['import'] !== null;
    }
    /**
     * Checks if a web application file (js/css/html) is already loaded.
     * @since 0.0.1
     * @param   {string}  url URL of file.
     * @returns {boolean} True if file loaded. False if not.
     */
    isLoaded(url){
        if (url === undefined) {
            return false;
        }
        let urlFragmented = url.split('.');
        switch (urlFragmented[urlFragmented.length - 1]) {
            case 'js':
                return document.querySelector('script[src="' + url + '"]') !== null;
            case 'css':
                return document.querySelector('link[href="' + url + '"]') !== null;
            case 'html':
                return document.querySelector('div#' + LZString.compressToUTF16(url)) !== null;
        }
        return false;
    }

    load(url, callback){
        if (url === undefined) {
            return callback(this.URL_NOT_DEFINED);
        }
        if(this.isLoaded(url)){
           return callback(this.FILE_LOADED);
        }
        let urlFragmented = url.split('.'),
            element;
        switch (urlFragmented[urlFragmented.length - 1]) {
            case 'js':
                element = document.createElement('script');
                element.setAttribute('type', 'text/javascript');
                element.setAttribute('src', url);
                element.addEventListener('load', function () {
                    return callback(this.LOAD_OK);
                });
                element.addEventListener('error', function () {
                    return callback(this.LOAD_ERROR);
                });
                document.body.appendChild(element);
                break;
            case 'css':
                element = document.createElement('link');
                element.setAttribute('type', 'text/css');
                element.setAttribute('rel', 'stylesheet');
                element.setAttribute('href', url);
                element.addEventListener('load', function () {
                    return callback(this.LOAD_OK);
                });
                element.addEventListener('error', function () {
                    return callback(this.LOAD_ERROR);
                });
                document.head.appendChild(element);
                break;
            case 'html':
                let content = document.querySelector('div#content');
                if (content === null) {
                    return callback(this.MISSING_CONTENT_DIV);
                }
                if (Loader.supportsHTML5Imports()) {
                    element = document.createElement('link');
                    element.setAttribute('rel','import');
                    element.setAttribute('href',url);
                    element.addEventListener('load', function () {
                        content = element['import'];
                        content.setAttribute('id',LZString.compressToUTF16(url));
                        return callback(this.LOAD_OK);
                    });
                    element.addEventListener('error', function () {
                        return callback(this.LOAD_ERROR);
                    });
                    document.head.appendChild(element);
                } else {
                    ajax.get(url, function (response) {
                        element = document.createDocumentFragment();
                        element.appendChild(response);
                        content.appendChild(element);
                        content.setAttribute('id', LZString.compressToUTF16(url));
                        return callback(this.LOAD_OK);
                    }, function (status) {
                        return callback(status);
                    });
                }
                break;
        }
    }

    unload(url, callback){
        if (url === undefined) {
            return callback(this.URL_NOT_DEFINED);
        }
        if (!this.isLoaded(url)) {
            return callback(this.FILE_NOT_LOADED);
        }
        let urlFragmented = url.split('.');
        switch(urlFragmented[urlFragmented.length - 1]) {
            case 'js':
                //Can't unload added Javascript files yet.
                return callback(this.CANT_UNLOAD);
            case 'css':
                break;
            case 'html':
                break;
        }
    }
}
    //TODO
    function loadAppDependencies(metaData, callback) {
        async.each(metaData.modules.styles, function (file, callback) {
            self.loadStyle(metaData.modules.ref + file, function (status) {
                if (status < -1) {
                    return callback('Load error: ' + file);
                } else {
                    return callback();
                }
            });
        }, function (err) {
            if (err) {
                throw new Error('Load application error. Error produced: ' + err);
            }
        });
        async.each(metaData.modules.scripts, function (file, callback) {
            self.loadScript(metaData.modules.ref + file, function (status) {
                if (status < -1) {
                    return callback('Load error: ' + file);
                } else {
                    return callback();
                }
            });
        }, function (err) {
            if (err) {
                throw new Error('Load application error. Error produced: ' + err);
            }
        });
    }
    /**
     * Loads a JSON metadata file and loads all scripts/stylesheets/fragments written in it.
     * @memberof! Loader#
     * @alias loadApp
     * @access public
     * @since 0.0.1
     * @param {String}   metaUrl  URL to metadata file.
     * @param {Function} callback Callback function that sends a return value.
     *                            0: App loaded and executed.
     */
    this.loadApp = function (metaUrl, callback) {
        ajax.request({
            method: 'Get',
            url: metaUrl,
            success: function (response) {
                loadAppDependencies(JSON.parse(response.responseText), function (status) {
                   //TODO
                });
            },
            error: function (errorCode) {
                if (errorCode >= 400 && errorCode < 600) {
                    return callback(-errorCode);
                } else {
                    return callback(-2);
                }
            }
        });
    };
    /**
     * Unloads a stylesheet file.
     * @memberof! Loader#
     * @alias unloadStyle
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
            return callback(0);
        } else {
            return callback(-1);
        }

    };
    /**
     * Unloads a fragment file.
     * @memberof! Loader#
     * @alias unloadFragment
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
            return callback(0);
        } else {
            return callback(-1);
        }
        
    };
    
}


