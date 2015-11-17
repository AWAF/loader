<a name="Loader"></a>
## Loader
**Kind**: global class  

* [Loader](#Loader)
  * [new Loader()](#new_Loader_new)
  * [.isLoaded(url)](#Loader+isLoaded) ⇒ <code>Boolean</code>
  * [.loadScript(url, callback)](#Loader+loadScript)
  * [.loadStyle(url, callback)](#Loader+loadStyle)
  * [.loadFragment(url, callback)](#Loader+loadFragment)
  * [.loadApp(metaUrl, callback)](#Loader+loadApp)
  * [.unloadScript(url, callback)](#Loader+unloadScript)
  * [.unloadStyle(url, callback)](#Loader+unloadStyle)
  * [.unloadFragment(url, callback)](#Loader+unloadFragment)

<a name="new_Loader_new"></a>
### new Loader()
Object Loader

<a name="Loader+isLoaded"></a>
### loader.isLoaded(url) ⇒ <code>Boolean</code>
Checks if a script/stylesheet/fragment is already loaded.
Loader#isLoaded

**Kind**: instance method of <code>[Loader](#Loader)</code>  
**Returns**: <code>Boolean</code> - Return true if file is loaded. False if not.  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL of file. |

<a name="Loader+loadScript"></a>
### loader.loadScript(url, callback)
Loads a JavaScript file.
Loader#loadScript

**Kind**: instance method of <code>[Loader](#Loader)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL of file. |
| callback | <code>function</code> | Callback function that sends a return value.                            0: Script loaded.                            -1: Script already loaded.                            -2: Generic error. Script not loaded. |

<a name="Loader+loadStyle"></a>
### loader.loadStyle(url, callback)
Loads a stylesheet file. At this moment, only CSS files.
Loader#loadStyle

**Kind**: instance method of <code>[Loader](#Loader)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL of file. |
| callback | <code>function</code> | Callback function that sends a return value.                            0: Stylesheet loaded.                            -1: Stylesheet already loaded.                            -2: Generic error. Stylesheet not loaded. |

<a name="Loader+loadFragment"></a>
### loader.loadFragment(url, callback)
Loads a HTML fragment.
Loader#loadFragment

**Kind**: instance method of <code>[Loader](#Loader)</code>  
**Throws**:

- <code>Error</code> If a div with 'content' id does not exist, an error is thrown.

**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to file. |
| callback | <code>function</code> | Callback function that sends a return value.                            0: Fragment loaded.                            -1: Fragment already loaded.                            -2: Generic error. Fragment not loaded.                            -4xx: HTTP 4xx error code.                            -5xx: HTTP 5xx error code. |

<a name="Loader+loadApp"></a>
### loader.loadApp(metaUrl, callback)
Loads a JSON metadata file and loads all scripts/stylesheets/fragments written in it.
Loader#loadApp

**Kind**: instance method of <code>[Loader](#Loader)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| metaUrl | <code>String</code> | URL to metadata file. |
| callback | <code>function</code> | Callback function that sends a return value.                            0: App loaded and executed. |

<a name="Loader+unloadScript"></a>
### loader.unloadScript(url, callback)
Unloads a JavaScript file.
Loader#unloadScript

**Kind**: instance method of <code>[Loader](#Loader)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to file (reference, network not used). |
| callback | <code>function</code> | Callback function that returns a value.                            0: Script unloaded.                            -1: Script not loaded. |

<a name="Loader+unloadStyle"></a>
### loader.unloadStyle(url, callback)
Unloads a stylesheet file.
Loader#unloadStyle

**Kind**: instance method of <code>[Loader](#Loader)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to file (reference). |
| callback | <code>function</code> | Callback function that returns a value.                            0: Style unloaded.                            -1: Style not loaded. |

<a name="Loader+unloadFragment"></a>
### loader.unloadFragment(url, callback)
Unloads a fragment file.
Loader#unloadFragment

**Kind**: instance method of <code>[Loader](#Loader)</code>  
**Access:** public  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to file (reference). |
| callback | <code>function</code> | Callback function that returns a value.                            0: Fragment unloaded.                            -1: Fragment not loaded. |

