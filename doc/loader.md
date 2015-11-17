## Classes
<dl>
<dt><a href="#Loader">Loader</a></dt>
<dd><p>Class that loads and unloads dependencies in an application.</p>
</dd>
</dl>
## Functions
<dl>
<dt><a href="#isLoaded">isLoaded(url)</a> ⇒ <code>Boolean</code></dt>
<dd><p>Checks if a script/stylesheet/fragment is already loaded.</p>
</dd>
<dt><a href="#loadScript">loadScript(url, callback)</a></dt>
<dd><p>Loads a JavaScript file.</p>
</dd>
<dt><a href="#loadStyle">loadStyle(url, callback)</a></dt>
<dd><p>Loads a stylesheet file. At this moment, only CSS files.</p>
</dd>
<dt><a href="#loadFragment">loadFragment(url, callback)</a></dt>
<dd><p>Loads a HTML fragment.</p>
</dd>
<dt><a href="#loadApp">loadApp(metaUrl, callback)</a></dt>
<dd><p>Loads a JSON metadata file and loads all scripts/stylesheets/fragments written in it.</p>
</dd>
<dt><a href="#unloadScript">unloadScript(url, callback)</a></dt>
<dd><p>Unloads a JavaScript file.</p>
</dd>
<dt><a href="#unloadStyle">unloadStyle(url, callback)</a></dt>
<dd><p>Unloads a stylesheet file.</p>
</dd>
<dt><a href="#unloadFragment">unloadFragment(url, callback)</a></dt>
<dd><p>Unloads a fragment file.</p>
</dd>
</dl>
<a name="Loader"></a>
## Loader
Class that loads and unloads dependencies in an application.

**Kind**: global class  
<a name="isLoaded"></a>
## isLoaded(url) ⇒ <code>Boolean</code>
Checks if a script/stylesheet/fragment is already loaded.

**Kind**: global function  
**Returns**: <code>Boolean</code> - Return true if file is loaded. False if not.  
**Access:** public  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL of file. |

<a name="loadScript"></a>
## loadScript(url, callback)
Loads a JavaScript file.

**Kind**: global function  
**Access:** public  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL of file. |
| callback | <code>function</code> | Callback function that sends a return value.                            0: Script loaded.                            -1: Script already loaded.                            -2: Generic error. Script not loaded. |

<a name="loadStyle"></a>
## loadStyle(url, callback)
Loads a stylesheet file. At this moment, only CSS files.

**Kind**: global function  
**Access:** public  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL of file. |
| callback | <code>function</code> | Callback function that sends a return value.                            0: Stylesheet loaded.                            -1: Stylesheet already loaded.                            -2: Generic error. Stylesheet not loaded. |

<a name="loadFragment"></a>
## loadFragment(url, callback)
Loads a HTML fragment.

**Kind**: global function  
**Throws**:

- <code>Error</code> If a div with 'content' id does not exist, an error is thrown.

**Access:** public  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to file. |
| callback | <code>function</code> | Callback function that sends a return value.                            0: Fragment loaded.                            -1: Fragment already loaded.                            -2: Generic error. Fragment not loaded.                            -4xx: HTTP 4xx error code.                            -5xx: HTTP 5xx error code. |

<a name="loadApp"></a>
## loadApp(metaUrl, callback)
Loads a JSON metadata file and loads all scripts/stylesheets/fragments written in it.

**Kind**: global function  
**Access:** public  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| metaUrl | <code>String</code> | URL to metadata file. |
| callback | <code>function</code> | Callback function that sends a return value.                            0: App loaded and executed. |

<a name="unloadScript"></a>
## unloadScript(url, callback)
Unloads a JavaScript file.

**Kind**: global function  
**Access:** public  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to file (reference, network not used). |
| callback | <code>function</code> | Callback function that returns a value.                            0: Script unloaded.                            -1: Script not loaded. |

<a name="unloadStyle"></a>
## unloadStyle(url, callback)
Unloads a stylesheet file.

**Kind**: global function  
**Access:** public  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to file (reference). |
| callback | <code>function</code> | Callback function that returns a value.                            0: Style unloaded.                            -1: Style not loaded. |

<a name="unloadFragment"></a>
## unloadFragment(url, callback)
Unloads a fragment file.

**Kind**: global function  
**Access:** public  
**Since**: 0.0.1  

| Param | Type | Description |
| --- | --- | --- |
| url | <code>String</code> | URL to file (reference). |
| callback | <code>function</code> | Callback function that returns a value.                            0: Fragment unloaded.                            -1: Fragment not loaded. |

