/*jshint esnext: true, enforceall: true, browser: true*/
/*exported loader*/
/*globals ajax, eventManager, async, LZString*/

/**
 * @file
 * @author Ángel González <aglezabad@gmail.com>
 * @version 0.0.1
 */

/**
 * @class Loader
 * @classdesc Class that loads and unloads dependencies in an application.
 * @requires AWAF/ajax
 * @requires AWAF/eventmanager
 * @requires caolan/async
 * @requires pieroxy/lz-string
 */
export class Loader{
    constructor(){
        const LOAD_OK = 0;
        const UNLOAD_OK = 0;
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

    /**
     * Loads a file (JS/CSS/HTML).
     * @param   {string}   url      URL of file.
     * @param   {function} callback Function returned with a number value (status).
     */
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

    /**
     * Unloads a file (CSS/HTML).
     * @param   {string}   url      URL of file.
     * @param   {function} callback Function returned with a status value.
     */
    unload(url, callback){
        let element, clonedElement;
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
                element = document.querySelector('link[href="' + url + '"]');
                element.parentNode.removeChild(element);
                return callback(this.UNLOAD_OK);
            case 'html':
                if (Loader.supportsHTML5Imports()) {
                    element = document.querySelector('link[href=' + url + ']');
                    element.parentNode.removeChild(element);
                }
                element = document.querySelector('div#' + LZString.compressToUTF16(url));
                if (element === null) {
                    return callback(this.MISSING_CONTENT_DIV);
                }
                clonedElement = element.cloneNode(false);
                element.parentNode.replaceChild(clonedElement, element);
                element.setAttribute('id', 'content');
                return callback(this.UNLOAD_OK);
        }
    }
}


