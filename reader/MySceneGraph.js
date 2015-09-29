
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	 
	this.reader.open('scenes/'+filename, this);

}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;
	
	// Here should go the calls for different functions to parse the various blocks
	var error = this.parseGlobalsExample(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}	

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseGlobalsExample= function(rootElement) {
	
	/*var elems =  rootElement.getElementsByTagName('globals');
	if (elems == null) {
		return "globals element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}
*/
	// FRUSTUM PLANES
	var frustum = rootElement.getElementsByTagName('frustum');
	if (frustum == null)
		return "frustum element missing";
	if (frustum.length != 1)
		return "number of frustum planes wrong. Number was " + frustum.length;

	var n = frustum[0];
	this.near = this.reader.GetFloat(n, 'near');
	var f = frustum[1];
	this.far = this.reader.GetFloat(f, 'far');

	// TRANSLATION
	var translate = rootElement.getElementsByTagName('translate');
	if (translate == null)
		return "translate element missing";
	if (translate.length != 3)
		return "translate axis missing";

	var translate_x = translate[0];
	this.x = this.reader.GetFloat(translate_x, 'x');
	var translate_y = translate[1];
	this.y = this.reader.GetFloat(translate_y, 'y');
	var translate_z = translate[2];
	this.z = this.reader.GetFloat(translate_z, 'z');

	// ROTATION
	var rotation = rootElement.getElementsByTagName('rotation');
	if (rotation == null)
		return "rotation element missing.";
	if (rotation.length != 6)
		return "number of rotation elements wrong.";

	var r1 = rotation[0];
	this.rotation_x = this.reader.getItem(r1, 'axis', ["x","y","z"]);






	// various examples of different types of access
	/*var globals = elems[0];
	this.background = this.reader.getRGBA(globals, 'background');
	this.drawmode = this.reader.getItem(globals, 'drawmode', ["fill","line","point"]);
	this.cullface = this.reader.getItem(globals, 'cullface', ["back","front","none", "frontandback"]);
	this.cullorder = this.reader.getItem(globals, 'cullorder', ["ccw","cw"]);

	console.log("Globals read from file: {background=" + this.background + ", drawmode=" + this.drawmode + ", cullface=" + this.cullface + ", cullorder=" + this.cullorder + "}");

	var tempList=rootElement.getElementsByTagName('list');

	if (tempList == null) {
		return "list element is missing.";
	}
	
	this.list=[];
	// iterate over every element
	var nnodes=tempList[0].children.length;
	for (var i=0; i< nnodes; i++)
	{
		var e=tempList[0].children[i];

		// process each element and store its information
		this.list[e.id]=e.attributes.getNamedItem("coords").value;
		console.log("Read list item id "+ e.id+" with value "+this.list[e.id]);
	};*/

};
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


