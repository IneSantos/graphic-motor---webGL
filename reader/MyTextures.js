function MyTextures() {
     this.textures = [];
 };

MyTextures.prototype.constructor = MyTextures;

MyTextures.prototype.addTexture = function(texture){
	this.textures.push(texture);
};

MyTextures.prototype.getTextures = function(){
	return textures;
}