/**
* Method that calls the scene
* @constructor
*/
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
* Method that initiates the scene
* @constructor
*/
XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.tree = new MyTree();

	this.materials = [];
	this.stackMaterials = [];
    this.textures = [];
	this.stackTextures = [];

	this.matrixInitial = mat4.create();

	//this.lights = [];
	this.onOff = [false,false,false,false,false,false,false,false];
	this.luzesid = [];
	

	this.interface = new CGFinterface(this,application);
	this.gui = new dat.GUI();

  	this.luzes=this.gui.addFolder("ON/OFF");
	this.luzes.open();

	
    //this.cyl = new MyCylinder(this,1,0.5,0,9,50);
    //this.tri = new MyTriangle(this,-0.5,-0.5,0,0.5,-0.5,0,0,0.5,0);
    //this.spe = new MySphere(this, 0.5,50,50);

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.test = new CGFtexture(this, "texture/floor.jpg");
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);
	this.enableTextures(true);
	this.axis=new CGFaxis(this);
};

/**
* Method that initiates the lights
* @constructor
*/
XMLscene.prototype.initLights = function () {

    this.shader.bind();
    this.shader.unbind();
};

/**
* Method that initiates the cameras
* @constructor
*/
XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

/**
* Method that sets the default appearance
* @constructor
*/
XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

/**
* Handler called when the graph is finally loaded. 
* As loading is asynchronous, this may be called already after the application has started the run loop
* @constructor
*/
XMLscene.prototype.onGraphLoaded = function () 
{
	for(var j=0; j < this.luzesid.length; j++){
		this.luzes.add(this.onOff, j,this.onOff[j]).name(this.luzesid[j]);
	}
	//this.gl.clearColor(this.graph.background[0],this.graph.background[1],this.graph.background[2],this.graph.background[3]);
};

/**
* Method that loads the textures
* @constructor
*/
XMLscene.prototype.loadTextures = function(){

	var textures = this.scene.texture_list.getTextures();

	for (var j = 0; j < textures.length; j++){

		var id = textures[j].getId();
		var path = textures[j].getPath();

		this.id = new CGFappearance(this);
		this.id.loadTexture(path);

	}

};

/**
* Method that displays the scene
* @constructor
*/
XMLscene.prototype.display = function () {
	// ---- BEGIN Background, camera and axis setup
    this.shader.bind();
	
	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation
	this.updateProjectionMatrix();
    this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	

	//Draw objects
	
	this.setDefaultAppearance();
	
	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
		
	
	if (this.graph.loadedOk)
	{
		this.multMatrix(this.matrixInitial);
	
		for(var i= 0; i< this.lights.length ; i++){

			if(this.onOff[i]){
				this.lights[i].enable();
			}else 
				this.lights[i].disable();
			this.lights[i].update();
		}

	//Draw objects
	this.displayNode(this.tree.root);
	//this.cyl.display();

	// Draw axis
	this.axis.display();

	};	
    this.shader.unbind();
};

/**
* Method that displays the nodes
* @constructor
* @param nodeID - the id of the node to be displayed
*/
XMLscene.prototype.displayNode = function (nodeID) {
	

	var node = null;

	//encontrar o node ou leave com esse id e depois chamar a funcao de novo

	for(var j=0; j < this.tree.nodes.length; j++){
		if(this.tree.nodes[j].id == nodeID){
			node = this.tree.nodes[j];
		}
	}

	for(var k=0; k < this.tree.leaves.length; k++){
		if(this.tree.leaves[k].id == nodeID){
			node = this.tree.leaves[k];
		}
	}

	if(node === null){
		return "ERRO!!";

	}

	if(node.isLeaf){
		var id_mat = this.stackMaterials[this.stackMaterials.length-1];
		var id_text = this.stackTextures[this.stackTextures.length-1];
		var s=1,t=1;
		var j=0;

		for(var i=0 ; i < this.materials.length; i++){
			if(this.materials[i].id == id_mat){
				this.materials[i].apply();
			}
		}

		for(j = 0; j < this.textures.length; j++){
			if(this.textures[j].id == id_text){
				this.textures[j].bind();
				s=this.textures[j].amplif_factorS;
				t=this.textures[j].amplif_factorT;
				break;
			}
		}
		
		node.primitive.updateTextCoords(s,t);
		node.primitive.display();
			
		//if((id_text != "null" && id_text !="clear" && j < this.textures.length) || id_text !== undefined)
			//this.textures[j].unbind();
		if(this.activeTexture != null)
			this.activeTexture.unbind();
	}
				
	else {
		
		this.pushMatrix(); // guarda a cena atual
		this.multMatrix(node.transformation);
		//adicionar textura 
		if(node.text != "null"){
			this.stackTextures.push(node.text);
		}

		//adicionar material
		if(node.material != "null"){
			this.stackMaterials.push(node.material);
		}

		//adicionar objectos
		for(var i=0; i < node.descendants.length; i++){				
				this.displayNode(node.descendants[i]);				
		}

		if(node.material != "null"){
			this.stackMaterials.pop();
		}
		if(node.text != "null"){
			this.stackTextures.pop();
		}
		this.popMatrix();

	}

};