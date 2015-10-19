function MyTexture(scene,id,file_path,amplif_factorS,amplif_factorT) {
	//CGFtexture.call(this, scene, file_path);
	 this.file_path=file_path;
	this.tex = new CGFtexture(scene, file_path);
	//console.log(file_path);

     this.id = id;
    
     this.amplif_factorS=amplif_factorS;
     this.amplif_factorT=amplif_factorT;
 };

//MyTexture.prototype = Object.create(CGFtexture.prototype);
MyTexture.prototype.constructor = MyTexture;

MyTexture.prototype.bind = function(){
	this.tex.bind();
}

MyTexture.prototype.unbind = function(){
	this.tex.bind();
}


