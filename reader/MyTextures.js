function MyTextures() {
     this.textures = [];
 };

MyTextures.prototype.constructor = MyTextures;

MyTextures.prototype.addTexture = function(texture){
	this.texture.push(texture);
};

MyTextures.prototype.getTextures = function(){
	return textures;
}