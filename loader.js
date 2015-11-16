/*jshint enforceall: true*/
/*jslint browser: true, devel: true*/
/*exported loader*/
/*globals ajax, eventManager, async, LZString*/

function Loader() {
    'use strict';
    var self = this,
        supportsHTML5Imports = function () {
            return document.createElement('link')['import'] !== null;
        };
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
                            var fragment = document.createDocumentFragment();
                            fragment.appendChild(response);
                            content.appendChild(fragment);
                            content.setAttribute('id', LZString.compressToUTF16(url));
                        },
                        error: function (errorCode) {
                            callback(-2);
                        }
                    });
                }
            }
        } else {
            callback(-1);
        }
    };
    this.loadApp = function (metaUrl, callback) {

    };
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
    this.unloadFragment = function (url, callback) {
        var element;
        if (self.isLoaded(url)) {
            if (supportsHTML5Imports()) {
                element = document.querySelector('link[href=' + url + ']');
                element.parentNode.removeChild(element);
                callback(0);
            } else {
                element = document.querySelector('div#' + LZString.compressToUTF16(url));
                // TODO
            }
        } else {
            callback(-1);
        }
        
    };
    
}

