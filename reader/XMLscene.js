function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.initCameras();

    this.initLights();

    this.tree = new MyTree();

    //this.cyl = new MyCylinder(this,1,0.85,0.5,9,50);
    this.tri = new MyTriangle(this,-0.5,-0.5,0,0.5,-0.5,0,0,0.5,0);
    //this.spe = new MySphere(this, 0.5,50,50);

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

	this.axis=new CGFaxis(this);
};

XMLscene.prototype.initLights = function () {

    this.shader.bind();
    this.shader.unbind();
};

XMLscene.prototype.initCameras = function () {
    this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function () {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{
	//this.gl.clearColor(this.graph.background[0],this.graph.background[1],this.graph.background[2],this.graph.background[3]);
	
};

XMLscene.prototype.loadTextures = function(){

	var textures = this.scene.texture_list.getTextures();

	for (var j = 0; j < textures.length; j++){

		var id = textures[j].getId();
		var path = textures[j].getPath();

		this.id = new CGFappearance(this);
		this.id.loadTexture(path);

	}

};

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

	// Draw axis
	this.axis.display();

	//Draw objects
	
	this.setDefaultAppearance();
	
	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it

	if (this.graph.loadedOk)
	{
		for(var i= 0; i< this.lights.length ; i++){
			this.lights[i].update();
		}
	};	
	this.tri.display();
	console.log(this.tri);
    this.shader.unbind();
};

XMLscene.prototype.displayNode = function (node) {

	var encontrouNode = false;
	var encontrouLeaf = false;

	if(node.isLeaf)
		this.leaves.primitive.display();				
	else {
		this.pushMatrix(); // guarda a cena atual
		this.multMatrix(node.transformation);
		//adicionar ttextura 
		//adicionar material
		for(var i=0; i < node.descendants.length; i++){
			//encontrar o node ou leave com esse id e depois chamar a funcao de novo

		//	for(var j=0; j < )

		}
		this.popMatrix();

	}

};