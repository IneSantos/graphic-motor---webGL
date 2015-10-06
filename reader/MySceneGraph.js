
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
	
	var elems =  rootElement.getElementsByTagName('INITIALS');
	if (elems == null) {
		return "INITIALS element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'INITIALS' element found.";
	}


	var frustum = rootElement.getElementsByTagName('frustum');
	if (frustum == null)
		return "frustum element missing";
	if (frustum.length != 2)
		return "number of frustum planes wrong.";

	var near = frustum[0].attributes.getNamedItem("near").value;
	var far = frustum[1].attributes.getNamedItem("near").value;
	
	// TRANSLATION
	var translate = rootElement.getElementsByTagName('translate');
	if (translate == null)
		return "translate element missing";
	if (translate.length != 1)
		return "number of translate elements wrong. Number was " + translate.length;

	var trnslt = translate[0];
	this.translate_x = this.reader.getFloat(trnslt, 'x');
	this.translate_y = this.reader.getFloat(trnslt, 'y');
	this.translate_z = this.reader.getFloat(trnslt, 'z');

	// ROTATION
	var rotList = rootElement.getElementsByTagName('rotation');
	if (rotList == null || rotList.length == 0)
		return "rotation element missing.";
	if (rotList.length != 3)
		return "number of rotation elements wrong. Number was " + rotList.length;

	// FALTA GUARDAR A ROTAÇÃO!!

	// SCALE
	var scale = rootElement.getElementsByTagName('scale');
	if (scale == null)
		return "scale element missing.";
	if (scale.length != 1)
		return "number of scale elements wrong. Number was " + scale.length;

	var sc = scale[0];
	this.scale_x = this.reader.getFloat(sc, 'sx');
	this.scale_y = this.reader.getFloat(sc, 'sy');
	this.scale_z = this.reader.getFloat(sc, 'sz');

	// REFERENCE
	var reference = rootElement.getElementsByTagName('reference');
	if (reference == null)
		return "reference element missing.";
	if (reference.length != 1)
		return "number of reference elements wrong. Number was " + reference.length;

	var rf = reference[0];
	this.reference_length = this.reader.getFloat(rf, 'length');

	// INITIALS
	var ilum = rootElement.getElementsByTagName('ILUMINATION');
	if (ilum == null)
		return "ilumination element missing";
	if (ilum.length != 1)
		return "number of ilumination elements wrong. Number was " + ilum.length;

	// ILUMINATION
	var elems =  rootElement.getElementsByTagName('ILUMINATION');
	if (elems == null) {
		return "globals element is missing.";
	}
	if (elems.length != 1) {
		return "either zero or more than one 'globals' element found.";
	}
	
	var ambient = rootElement.getElementsByTagName('ambient');
	if (ambient == null)
		return "ambient element missing.";
	if (ambient.length != 7)
		return "number of ambient elements wrong. Number was " + ambient.length;

	var amb = ambient[0];
	this.ambient = this.reader.getRGBA(amb, 'ambient');

	var doubleside = rootElement.getElementsByTagName('doubleside');
	if (doubleside == null)
		return "doubleside element missing.";
	if (doubleside.length != 1)
		return "number of doubleside elements wrong. Number was " + doubleside.length;

	var ds = doubleside[0];
	this.doubleside = this.reader.getBoolean(ds, 'value');

	var b = rootElement.getElementsByTagName('background');
	if (b == null)
		return "b element missing.";
	if (b.length != 1)
		return "number of b elements wrong. Number was " + b.length;

	var bck = b[0];
	this.background = this.reader.getRGBA(bck, 'background');
	console.log(this.background);

	


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
	console.error("XML Loading Error: "+ message);	
	this.loadedOk=false;
};


