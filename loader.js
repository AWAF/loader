/*jshint enforceall: true*/
/*jslint browser: true, devel: true*/
/*exported loader*/
/*globals ajax, eventManager, async*/

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
            // TODO
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
        
    };
    this.loadApp = function (metadata) {
        
    };
    
}

