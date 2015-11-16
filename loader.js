/*jshint enforceall: true*/
/*jslint browser: true, devel: true*/
/*exported loader*/
/*globals ajax, eventManager, async, LZString*/

function Loader() {
    'use strict';
    var self = this;
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
        } else {
            callback(-1);
        }
    };
    this.loadFragment = function (url, callback) {
        var content = document.querySelector('div#content');
        if (content === null) {
            throw new Error("Missing content div in html page.");
        } else {
            ajax.request({
                method: 'Get',
                url: url,
                success: function (response) {
                    var fragment = document.createDocumentFragment();
                    fragment.appendChild(response);
                    content.appendChild(fragment);
                },
                error: function (errorCode) {
                    throw new Error("Error in loading file: " + url);
                }
            });
        }
    };
    this.loadApp = function (metadata) {
        
    };
    
}

