
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
	console.log("Frustum: " + frustum);
	if (frustum == null)
		return "frustum element missing";
	if (frustum.length != 1)
		return "number of frustum planes wrong.";

	var near = frustum[0].attributes.getNamedItem("near").value;
	var far = frustum[0].attributes.getNamedItem("far").value;
	
	// TRANSLATION
	var translation = rootElement.getElementsByTagName('translation');
	if (translation == null)
		return "translation element missing";
	if (translation.length != 1)
		return "number of translation elements wrong. Number was " + translation.length;

	var trnslt = translation[0];
	this.initialTrans = new MyTranslation(this.reader.getFloat(trnslt, 'x'), 
										  this.reader.getFloat(trnslt, 'y'),  
										  this.reader.getFloat(trnslt, 'z'));

	console.log(this.reader.getFloat(trnslt, 'x')+ ' '+ this.reader.getFloat(trnslt, 'y') + ' '+ this.reader.getFloat(trnslt, 'z'));
	

	//FALTA APLICAR 


	// ROTATION
	var rotList = rootElement.getElementsByTagName('rotation');
	if (rotList == null || rotList.length == 0)
		return "rotation element missing.";
	if (rotList.length != 3)
		return "number of rotation elements wrong. Number was " + rotList.length;
	
	if(this.reader.getString(rotList[0], 'axis') != "x")
		return "wrong Axis reference. The reference was " + this.reader.getString(rotList[0], 'axis') + " it must be x";

	this.initialRotX = new MyRotation(this.reader.getFloat(rotList[0], 'angle'), 
									 1,0,0);

	if(this.reader.getString(rotList[1], 'axis') != "y")
		return "wrong Axis reference. The reference was " + this.reader.getString(rotList[1], 'axis') + " it must be y";

	this.initialRotX = new MyRotation(this.reader.getFloat(rotList[1], 'angle'), 
									 0,1,0);
	
	if(this.reader.getString(rotList[2], 'axis') != "z")
		return "wrong Axis reference. The reference was " + this.reader.getString(rotList[2], 'axis') + " it must be z";

	this.initialRotX = new MyRotation(this.reader.getFloat(rotList[2], 'angle'), 
									 0,0,1);


	//FALTA APLICAR 

	// SCALE
	var scale = rootElement.getElementsByTagName('scale');
	if (scale == null)
		return "scale element missing.";
	if (scale.length != 1)
		return "number of scale elements wrong. Number was " + scale.length;


	this.initialScale = new MyScale(this.reader.getFloat(scale[0], 'sx'), 
									 this.reader.getFloat(scale[0], 'sy'),
									 this.reader.getFloat(scale[0], 'sz'));
	
	//FALTA APLICAR 

	// REFERENCE
	var reference = rootElement.getElementsByTagName('reference');
	if (reference == null)
		return "reference element missing.";
	if (reference.length != 1)
		return "number of reference elements wrong. Number was " + reference.length;

	var rf = reference[0];
	this.reference_length = this.reader.getFloat(rf, 'length');

	// ILLUMINATION
	var ilum = rootElement.getElementsByTagName('ILLUMINATION');
	if (ilum == null)
		return "illumination element missing";
	if (ilum.length != 1)
		return "number of illumination elements wrong. Number was " + ilum.length;
	

	var amb = ilum[0].getElementsByTagName('ambient');

	if (amb == null)
		return "ambient element missing.";
	if (amb.length != 1)
		return "number of ambient elements wrong. Number was " + amb.length;


	this.ambientRGBA = new RGBA(this.reader.getFloat(amb[0], 'r'),
								this.reader.getFloat(amb[0], 'g'),
								this.reader.getFloat(amb[0], 'b'),
								this.reader.getFloat(amb[0], 'a'));
	
	//falta aplicar
							
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
	
	this.backgroundRGBA = new RGBA(this.reader.getFloat(b[0], 'r'),
								   this.reader.getFloat(b[0], 'g'),
								   this.reader.getFloat(b[0], 'b'),
								   this.reader.getFloat(b[0], 'a'));


	console.log(this.background);

	var light =  rootElement.getElementsByTagName('LIGHTS');
	if (light == null) {
		return "INITIALS element is missing.";
	}

	if (light.length != 1) {
		return "either zero or more than one 'INITIALS' element found.";
	}
	
	var tempListLight=rootElement.getElementsByTagName('LIGHT');

	if (tempListLight == null) 
		return "list element is missing.";
	
	this.lights = [];
	// iterate over every element
	for(var j=0; j < light.length; j++){

		var nnodes=tempListLight[j].children.length;

		if(nnodes != 5)
			return "light elements missing."
		

		for (var i=0; i < nnodes; i++)
		{
				var e=light[j].children[i];
				var enable = e.getElementsByTagName('enable'); 
				var position = light[j].children[1].getElementsByTagName('position'); 

				this.lights[j] =  new CGFlight(this.scene, light[j].getElementsByTagName('id'));
				
				if(this.reader.getBoolean(enable[0], 'value'))
					 this.lights[j].enable();
				else this.lights[j].disable();

			if(position == null)
				return "position element missing.";
	
			if(position.length != 4)
				return "elements missing in position element.";

			this.lights[j].setPosition(this.reader.getFloat(position[0], 'x'),
									   this.reader.getFloat(position[0], 'y'),
									   this.reader.getFloat(position[0], 'z'), 
									   this.reader.getFloat(position[0], 'w'));

		}
	};

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


