/**
 * MySceneGraph
 * @constructor
 * @param filename - name of the file to read
 * @param scene - the scene
 */
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
 * @constructor
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement;
	
	// Here should go the calls for different functions to parse the various blocks
	var error;

	error = this.parseInitials(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseIllumination(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseLights(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseTextures(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseMaterials(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseLeaves(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}

	error = this.parseNodes(rootElement);
	
	if (error != null) {
		this.onXMLError(error);
		return;
	}

		//console.warn("CENAS!!!!");
	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



/*
 * Method that parses elements of one block and stores information in a specific data structure
 * @constructor
 */
MySceneGraph.prototype.parseInitials= function(rootElement) {
	
	var elems =  rootElement.getElementsByTagName('INITIALS');
	if (elems == null) {
		return "INITIALS element is missing.";
	}

	if (elems.length != 1) {
		return "either zero or more than one 'INITIALS' element found.";
	}


	var frustum = elems[0].getElementsByTagName('frustum');
	
	console.log("Frustum: " + frustum);
	
	if (frustum == null)
		return "frustum element missing";
	if (frustum.length != 1)
		return "number of frustum planes wrong.";

	var near = this.reader.getFloat(frustum[0], 'near');
	var far = this.reader.getFloat(frustum[0], 'far');

	//this.scene.camera.near = near;
	//this.scene.camera.far = far;

	//this.scene.this.scene.matrixInitial = mat4.create();
		mat4.identity(this.scene.matrixInitial);


	
	// TRANSLATION
	var translation = elems[0].getElementsByTagName('translation');
	if (translation == null)
		return "translation element missing";
	if (translation.length != 1)
		return "number of translation elements wrong. Number was " + translation.length;

	var trnslt = translation[0];

	var initialTrans = vec3.fromValues(this.reader.getFloat(trnslt, 'x'), 
										  this.reader.getFloat(trnslt, 'y'), 
										  this.reader.getFloat(trnslt, 'z'));

	console.log(this.reader.getFloat(trnslt, 'x') + ' ' + this.reader.getFloat(trnslt, 'y') + ' ' + this.reader.getFloat(trnslt, 'z'));

	/*this.scene.translate(this.reader.getFloat(trnslt, 'x'), 
                         this.reader.getFloat(trnslt, 'y'),  
                         this.reader.getFloat(trnslt, 'z'));*/
                    
	mat4.translate(this.scene.matrixInitial, this.scene.matrixInitial, initialTrans);
	 
	// ROTATION
	var rotList = elems[0].getElementsByTagName('rotation');
	if (rotList == null || rotList.length == 0)
		return "rotation element missing.";
	if (rotList.length != 3)
		return "number of rotation elements wrong. Number was " + rotList.length;
	
	if(this.reader.getString(rotList[0], 'axis') != "x")
		return "wrong Axis reference. The reference was " + this.reader.getString(rotList[0], 'axis') + " it must be x";

	/*this.initialRotX = new MyRotation(this.reader.getFloat(rotList[0], 'angle'), 
									 1,0,0);*/

	/*this.scene.rotate((this.reader.getFloat(rotList[0], 'angle')*Math.PI)/180,
              1, 0, 0);*/
    
    mat4.rotateX(this.scene.matrixInitial, this.scene.matrixInitial, (this.reader.getFloat(rotList[0], 'angle')*Math.PI)/180);

	console.log("Rotation em X de: " + (this.reader.getFloat(rotList[0], 'angle')));
	

	if(this.reader.getString(rotList[1], 'axis') != "y")
		return "wrong Axis reference. The reference was " + this.reader.getString(rotList[1], 'axis') + " it must be y";

	/*this.initialRotX = new MyRotation(this.reader.getFloat(rotList[1], 'angle'), 
									 0,1,0);*/
	/*this.scene.rotate((this.reader.getFloat(rotList[1], 'angle')*Math.PI)/180,
             0, 1, 0);*/
	
	mat4.rotateY(this.scene.matrixInitial, this.scene.matrixInitial, (this.reader.getFloat(rotList[1], 'angle')*Math.PI)/180);

	if(this.reader.getString(rotList[2], 'axis') != "z")
		return "wrong Axis reference. The reference was " + this.reader.getString(rotList[2], 'axis') + " it must be z";

	/*this.initialRotX = new MyRotation(this.reader.getFloat(rotList[2], 'angle'), 
									 0,0,1);*/
	/*this.scene.rotate((this.reader.getFloat(rotList[2], 'angle')*Math.PI)/180,
             0, 0, 1);*/

     mat4.rotateZ(this.scene.matrixInitial, this.scene.matrixInitial, (this.reader.getFloat(rotList[2], 'angle')*Math.PI)/180);


	// SCALE
	var scale = elems[0].getElementsByTagName('scale');
	if (scale == null)
		return "scale element missing.";
	if (scale.length != 1)
		return "number of scale elements wrong. Number was " + scale.length;


	var initialScale = vec3.fromValues(this.reader.getFloat(scale[0], 'sx'), 
									 this.reader.getFloat(scale[0], 'sy'),
									 this.reader.getFloat(scale[0], 'sz'));

	/*this.scene.scale(this.reader.getFloat(scale[0], 'sx'),
					 this.reader.getFloat(scale[0], 'sy'),
					 this.reader.getFloat(scale[0], 'sz'));*/

	console.log("SCALE :  sx " + this.reader.getFloat(scale[0], 'sx') + " sy " + this.reader.getFloat(scale[0], 'sy')+ " sz "+
					 this.reader.getFloat(scale[0], 'sz'));
	

	mat4.scale(this.scene.matrixInitial, this.scene.matrixInitial, initialScale);

	// REFERENCE
	var reference = elems[0].getElementsByTagName('reference');
	if (reference == null)
		return "reference element missing.";
	if (reference.length != 1)
		return "number of reference elements wrong. Number was " + reference.length;
	
	console.log("Axis Length before: " + this.scene.axis.length);
	this.scene.axis.length = reference[0].attributes.getNamedItem("length").value;
	console.log("Axis Length after: " + this.scene.axis.length);
}

/**
* Method that reads the illumination aspects
* @constructor
*/
MySceneGraph.prototype.parseIllumination= function(rootElement) {

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

	this.scene.setGlobalAmbientLight(this.ambientRGBA.r, this.ambientRGBA.g, this.ambientRGBA.b, this.ambientRGBA.a);


	var b = rootElement.getElementsByTagName('background');
	if (b == null)
		return "b element missing.";
	if (b.length != 1)
		return "number of b elements wrong. Number was " + b.length;
	
	this.backgroundRGBA = new RGBA(this.reader.getFloat(b[0], 'r'),
								   this.reader.getFloat(b[0], 'g'),
								   this.reader.getFloat(b[0], 'b'),
								   this.reader.getFloat(b[0], 'a'));

	this.scene.gl.clearColor(this.backgroundRGBA.r, this.backgroundRGBA.g, this.backgroundRGBA.b, this.backgroundRGBA.a);


}

/**
* Method that reads the lights
* @constructor
*/
MySceneGraph.prototype.parseLights= function(rootElement) {
	//this.scene.shader.bind();
var light =  rootElement.getElementsByTagName('LIGHTS');
	
	if (light == null) 
		return "INITIALS element is missing.";
	

	if (light.length != 1) 
		return "either zero or more than one 'LIGHTS' element found.";

	
	var tempListLight =light[0].getElementsByTagName('LIGHT');

	if (tempListLight == null) 
		return "list element is missing.";
	
	// iterate over every element
	for(var j=0; j < tempListLight.length; j++){

		var nnodes=tempListLight[j].children.length;

		if(nnodes != 5)
			return "light elements missing."
				
				var id = tempListLight[j].getAttribute('id');
				var enable = tempListLight[j].getElementsByTagName('enable');
				var position = tempListLight[j].getElementsByTagName('position');
				var ambient = tempListLight[j].getElementsByTagName('ambient');
				var diffuse = tempListLight[j].getElementsByTagName('diffuse');
				var specular = tempListLight[j].getElementsByTagName('specular');


		//	this.lights[j] =  new CGFlight(this.scene, tempListLight[j].getElementsByTagName('id'));

			if(id == null)
				return "id element missing.";

			/*if(id.length != 1)
				return "elements missing in id element." + id.length;*/
			
			//console.warn(id);
			this.scene.luzesid.push(id);
		
			if(enable == null)
				return "enable element missing.";

			if(enable.length != 1)
				return "elements missing in enable element." + enable.length;

			if(this.reader.getInteger(enable[0], 'value') == 1){
					 //this.scene.lights[j].enable();
					 this.scene.onOff[j] = true;
			}
				else{ //this.scene.lights[j].disable();
				 this.scene.onOff[j] = false;
				}

			if(position == null)
				return "position element missing.";
	
			if(position.length != 1)
				return "elements missing in position element." + position.length;


	if(this.reader.getFloat(position[0], 'x') == null || this.reader.getFloat(position[0], 'y') == null ||   this.reader.getFloat(position[0], 'z') == null || this.reader.getFloat(position[0], 'w') == null)
		return "One or more elements null in position."


			this.scene.lights[j].setPosition(this.reader.getFloat(position[0], 'x'),
									   this.reader.getFloat(position[0], 'y'),
									   this.reader.getFloat(position[0], 'z'), 
									   this.reader.getFloat(position[0], 'w'));

	if(this.reader.getFloat(ambient[0], 'r')  == null  || this.reader.getFloat(ambient[0], 'g') == null || this.reader.getFloat(ambient[0], 'b') == null|| this.reader.getFloat(ambient[0], 'a') == null )
		return "One or more elements null in ambient property. "

			this.scene.lights[j].setAmbient(this.reader.getFloat(ambient[0], 'r'),
									  this.reader.getFloat(ambient[0], 'g'),
									  this.reader.getFloat(ambient[0], 'b'), 
									  this.reader.getFloat(ambient[0], 'a'));

	if(this.reader.getFloat(diffuse[0], 'r')  == null  || this.reader.getFloat(diffuse[0], 'g') == null || this.reader.getFloat(diffuse[0], 'b') == null|| this.reader.getFloat(diffuse[0], 'a') == null )
		return "One or more elements null in diffuse property. "

		   	this.scene.lights[j].setDiffuse(this.reader.getFloat(diffuse[0], 'r'),
									  this.reader.getFloat(diffuse[0], 'g'),
									  this.reader.getFloat(diffuse[0], 'b'), 
									  this.reader.getFloat(diffuse[0], 'a'));

	if(this.reader.getFloat(specular[0], 'r')  == null  || this.reader.getFloat(specular[0], 'g') == null || this.reader.getFloat(specular[0], 'b') == null|| this.reader.getFloat(specular[0], 'a') == null )
		return "One or more elements null in specular property. "

			this.scene.lights[j].setSpecular(this.reader.getFloat(specular[0], 'r'),
									  this.reader.getFloat(specular[0], 'g'),
									  this.reader.getFloat(specular[0], 'b'), 
									  this.reader.getFloat(specular[0], 'a'));


			this.scene.lights[j].setVisible(true); 
		}
		//this.scene.shader.unbind();
};

/**
* Method that reads the textures
* @constructor
*/
MySceneGraph.prototype.parseTextures= function(rootElement) {
		
	//TEXTURES

	var texture = rootElement.getElementsByTagName('TEXTURES');

	if (texture === null) {
		return "Textures element is missing.";
	}

	if (texture.length != 1){
		return "either zero or more than one Textures element found.";
	}

	var tempListTextures = texture[0].getElementsByTagName('TEXTURE');

	if (tempListTextures == null){
		return "list element is missing.";
	}


	for(var k = 0; k < tempListTextures.length; k++){

		var id = this.reader.getString(tempListTextures[k],'id',true);
		var path = this.reader.getString(tempListTextures[k].children[0],'path',true);
		var factorS = this.reader.getFloat(tempListTextures[k].children[1],'s',true);
		var factorT = this.reader.getFloat(tempListTextures[k].children[1],'t',true);

		var texture = new MyTexture(this.scene,id, path, factorS, factorT);

		this.scene.textures.push(texture);
	}

};

/**
* Method that reads the materials
* @constructor
*/
MySceneGraph.prototype.parseMaterials= function(rootElement) {

	var material = rootElement.getElementsByTagName('MATERIALS');

	if (material == null)
		return "Materials element is missing.";
	if (material.length != 1)
		return "either zero or more than one Textures element found.";

	var tempListMaterials = material[0].getElementsByTagName('MATERIAL');

	for (var m = 0; m < tempListMaterials.length; m++){

		var id = this.reader.getString(tempListMaterials[m], 'id',true);
		

		var shininess = tempListMaterials[m].getElementsByTagName('shininess');
		var specular = tempListMaterials[m].getElementsByTagName('specular');
		var diffuse = tempListMaterials[m].getElementsByTagName('diffuse');
		var ambient = tempListMaterials[m].getElementsByTagName('ambient');
		var emissison = tempListMaterials[m].getElementsByTagName('emission');


		if(shininess == null)
			return "shininess element missing.";
		
		if(shininess.length != 1)
			return "either zero or more than one shininess element found.";

	var shininessValue = this.reader.getFloat(shininess[0], 'value');

	var specular =  new RGBA(this.reader.getFloat(specular[0], 'r'),
							this.reader.getFloat(specular[0], 'g'),
							this.reader.getFloat(specular[0], 'b'),
							this.reader.getFloat(specular[0], 'a')); 

	var diffuse =  new RGBA(this.reader.getFloat(diffuse[0], 'r'),
						    this.reader.getFloat(diffuse[0], 'g'),
						    this.reader.getFloat(diffuse[0], 'b'),
						    this.reader.getFloat(diffuse[0], 'a'));

	var ambient =  new RGBA(this.reader.getFloat(ambient[0], 'r'),
							 this.reader.getFloat(ambient[0], 'g'),
							 this.reader.getFloat(ambient[0], 'b'),
						     this.reader.getFloat(ambient[0], 'a'));


	var emission =  new RGBA(this.reader.getFloat(emissison[0], 'r'),
							 this.reader.getFloat(emissison[0], 'g'),
							 this.reader.getFloat(emissison[0], 'b'),
						     this.reader.getFloat(emissison[0], 'a'));

	var material = new MyMaterial (this.scene,id, shininessValue, specular, diffuse, ambient, emission);

	this.scene.materials.push(material);


	}
};

/**
* Method that reads the leaves of the tree
* @constructor
*/
MySceneGraph.prototype.parseLeaves= function(rootElement) {
	var leaves = rootElement.getElementsByTagName('LEAVES');
	
	if (leaves == null)
		return "Laves element is missing.";
	if (leaves.length != 1)
		return "either zero or more than one Leaves element found.";		

	var leaf = leaves[0].getElementsByTagName('LEAF');

	if (leaf == null)
		return "Leaf element is missing.";

	console.log("Leaf Length: " + leaf.length);
	
	for(var i = 0; i<leaf.length ; i++){
		
		var id = this.reader.getString(leaf[i], 'id',true);
		var type = this.reader.getString(leaf[i], 'type',true);
		var args = this.reader.getString(leaf[i], 'args',true);

		if(id == null)
			return "id element null.";

		if(type == null)
			return "type element null.";

		if(args == null)
			return "args element null.";

		var coordLeaves = [];
			coordLeaves = args.split(/\s+/g);  // FEITO COM O DEUS!!! 

		
		var l = new MyLeave(this.scene,id, type, coordLeaves);
		this.scene.tree.leaves.push(l);
	
	}
};

/**
* Method that reads the nodes of the tree
* @constructor
*/
MySceneGraph.prototype.parseNodes= function(rootElement) {

	var nodes = rootElement.getElementsByTagName('NODES');

	if (nodes == null)
		return "no nodes found.";

	if (nodes.length != 1)
		return "zero or more nodes element found.";

	var root = nodes[0].getElementsByTagName('ROOT');

	if (root == null)
		return "no root found.";

	if (root.length != 1)
		return "zero or more root element found. " + root.length;

	var root_id = this.reader.getString(root[0], 'id');
	
	this.scene.tree.root = root_id;
	console.log("Root id: " + root_id);

	var node = nodes[0].getElementsByTagName('NODE');

	if (node == null)
		return "no node found.";

	if (node.length == 0)
		return "zero node elements found."; 

	for(var i = 0; i < node.length; i++){

		var node_id = this.reader.getString(node[i], 'id');

		console.log("NODE ID: " + node_id);
	
		if(node_id == null)
			return "Node ID null."

		var material = node[i].getElementsByTagName('MATERIAL');

		var material_id = this.reader.getString(material[0], 'id');

		console.log("Material " + material_id);

		var texture = node[i].getElementsByTagName('TEXTURE');

		var texture_id = this.reader.getString(texture[0], 'id');

			console.log("Texture " + texture_id);

		var nnodes=node[i].children.length;
		var transMatrix = mat4.create();
		mat4.identity(transMatrix);
		for (var m=0; m < nnodes; m++)
		{
			var e=node[i].children[m];
			var nCrianca = e.nodeName;

			if(nCrianca == 'TRANSLATION'){

				var translation = vec3.fromValues(this.reader.getFloat(e, 'x'), 
											  this.reader.getFloat(e, 'y'),  
											  this.reader.getFloat(e, 'z'));

				console.log("Translation : " + "x " + this.reader.getFloat(e, 'x') + " y " +  this.reader.getFloat(e, 'y') + " z " +  this.reader.getFloat(e, 'z'));
				
				mat4.translate(transMatrix, transMatrix, translation);

			}

			if(nCrianca == 'SCALE'){

				var scale = vec3.fromValues(this.reader.getFloat(e, 'sx'), 
										this.reader.getFloat(e, 'sy'),
										this.reader.getFloat(e, 'sz'));

				console.log("Scale : " + "sx " + this.reader.getFloat(e, 'sx') + " sy " +  this.reader.getFloat(e, 'sy') + " sz " +  this.reader.getFloat(e, 'sz'));

				mat4.scale(transMatrix, transMatrix, scale);
			}



		if(nCrianca == 'ROTATION'){	

			 var axis = this.reader.getString(e, 'axis');

			if(axis == 'x'){
				
				mat4.rotateX(transMatrix, transMatrix, (this.reader.getFloat(e, 'angle')*Math.PI)/180);

			}
			
			if(axis == 'y'){

				mat4.rotateY(transMatrix, transMatrix, (this.reader.getFloat(e, 'angle')*Math.PI)/180);

			}

			if(axis == 'z'){

				mat4.rotateZ(transMatrix, transMatrix, (this.reader.getFloat(e, 'angle')*Math.PI)/180);
				
			}
			}
		}

		var mynode = new MyNode(node_id, material_id, texture_id, transMatrix);
		this.scene.tree.addNode(mynode);

		
		var des = node[i].getElementsByTagName('DESCENDANTS');
		var encontrou = false;

		if(des != null && des.length != 0){

		var des_nodes = des[0].getElementsByTagName('DESCENDANT');

		for (var k = 0; k < des_nodes.length; k++){

			var des_id = this.reader.getString(des_nodes[k], 'id');

			console.log("Descendentes : " + des_id);
					
			mynode.addDescendant(des_id);		
		}
    }

  }
};


/*
 * Callback to be executed on any read error
 * @constructor
 */
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+ message);	
	this.loadedOk=false;
};


