<a name="Loader"></a>
## Loader
Class that loads and unloads dependencies in an application.

**Kind**: global class  

* [Loader](#Loader)
  * _instance_
    * [.isLoaded(url)](#Loader+isLoaded) ⇒ <code>boolean</code>
    * [.load(url, callback)](#Loader+load)
    * [.unload(url, callback)](#Loader+unload)
  * _static_
    * [.supportsHTML5Imports()](#Loader.supportsHTML5Imports) ⇒ <code>boolean</code>


-

<a name="Loader+isLoaded"></a>
### loader.isLoaded(url) ⇒ <code>boolean</code>
Checks if a web application file (js/css/html) is already loaded.

**Kind**: instance method of <code>[Loader](#Loader)</code>  
**Returns**: <code>boolean</code> - True if file loaded. False if not.  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL of file. |


-

<a name="Loader+load"></a>
### loader.load(url, callback)
Loads a file (JS/CSS/HTML).

**Kind**: instance method of <code>[Loader](#Loader)</code>  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL of file. |
| callback | <code>function</code> | Function returned with a number value (status). |


-

<a name="Loader+unload"></a>
### loader.unload(url, callback)
Unloads a file (CSS/HTML).

**Kind**: instance method of <code>[Loader](#Loader)</code>  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>string</code> | URL of file. |
| callback | <code>function</code> | Function returned with a status value. |


-

<a name="Loader.supportsHTML5Imports"></a>
### Loader.supportsHTML5Imports() ⇒ <code>boolean</code>
Check if a browser interpreter has supported HTML5 imports.

**Kind**: static method of <code>[Loader](#Loader)</code>  
**Returns**: <code>boolean</code> - True -> Browser accepts HTML5 imports. False -> Browser can't use imports.  
**Since**: 0.0.1  

-

