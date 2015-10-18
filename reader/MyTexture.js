function MyTexture(id,file_path,amplif_factorS,amplif_factorT) {
     this.id = id;
     this.file_path=file_path;
     this.amplif_factorS=amplif_factorS;
     this.amplif_factorT=amplif_factorT;
 };

MyTexture.prototype.constructor = MyTexture;

MyTexture.prototype.getId = function(){
	return id;
};

MyTexture.prototype.getPath = function(){
	return file_path;
};

MyTexture.prototype.getAmplifFactorS = function(){
	return amplif_factorS;
};

MyTexture.prototype.getAmplifFactorT = function(){
	return amplif_factorT;
};