/**
* MyTexture
* @constructor
* @param scene -  the scene
* @param id - the id of the texture
* @param file_path - the path of the texture's image
* @param amplif_factorS - the amplification factor S
* @param amplif_factorT - the amplification factor T
*/
function MyTexture(scene,id,file_path,amplif_factorS,amplif_factorT) {
	//CGFtexture.call(this, scene, file_path);
	 this.file_path=file_path;
	this.tex = new CGFtexture(scene, file_path);
	//console.log(file_path);

     this.id = id;
    
     this.amplif_factorS=amplif_factorS;
     this.amplif_factorT=amplif_factorT;
 };

MyTexture.prototype.constructor = MyTexture;

/**
* Method that binds the texture
* @constructor
*/
MyTexture.prototype.bind = function(){
	this.tex.bind();
}

/**
* Method that unbinds the texture
* @constructor
*/
MyTexture.prototype.unbind = function(){
	this.tex.bind();
}


