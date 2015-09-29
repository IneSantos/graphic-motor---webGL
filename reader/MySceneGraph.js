
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

	// INITIALS
	var init = rootElement.getElementsByTagName('INITIALS');
	if (init == null)
		return "initials element missing";
	if (init.length != 1)
		return "number of initials elements wrong. Number was " + init.length;

	// FRUSTUM PLANES
	var frustum = rootElement.getElementsByTagName('frustum');
	if (frustum == null)
		return "frustum element missing";
	if (frustum.length != 1)
		return "number of frustum planes wrong. Number was " + frustum.length;

	var frst = frustum[0];
	this.near = this.reader.getFloat(frst, 'near');
	this.far = this.reader.getFloat(frst, 'far');

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

	this.rotation[rotList.length*2];
	for(var k = 0; k < rotList.length; k++){
		for (var i = 0; i < 2; i++){
			// store the several rotations in arrays containing both the axis and angle
			var r = rotList[k];
			if(i == 0)
				this.rotation[i] = this.reader.getItem(r, 'axis', ["x","y","z"]);
			else
				this.rotation[i] = this.reader.getFloat(r, 'angle');
		};

	};
/*
	var r1 = rotation[0];
	this.rotation[];
	this.rotation[0] = this.reader.getItem(r1, 'axis', ["x","y","z"]);
	this.rotation[1] = this.reader.getFloat(r1, 'angle');
	var r2 = rotation[1];
	this.rotation2[];
	this.rotation2[0] = this.reader.getItem(r2, 'axis', ["x","y","z"]);
	this.rotation2[1] = this.reader.getFloat(r2, 'angle');
	var r3 = rotation[2];
	this.rotation3[];
	this.rotation3[0] = this.reader.getItem(r3, 'axis', ["x","y","z"]);
	this.rotation3[1] = this.reader.getFloat(r3, 'angle', ["x","y","z"]);
*/
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

};
	
/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


