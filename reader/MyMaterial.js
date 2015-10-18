
function MyMaterial(id, shininess, specular, diffuse, ambient, emission){
	this.id = id;
	this.shininess = shininess;
	this.specular = specular;
	this.diffuse = diffuse;
	this.ambient = ambient;
	this.emission = emission;
};

MyMaterial.prototype.constructor = MyMaterial;

MyMaterial.prototype.getId = function(){
	return id;
};

MyMaterial.prototype.getShininess = function(){
	return shininess;
};

MyMaterial.prototype.getSpecular = function(){
	return specular;
};

MyMaterial.prototype.getDiffuse = function(){
	return diffuse;
};

MyMaterial.prototype.getAmbient = function(){
	return ambient;
};

MyMaterial.prototype.getEmission = function(){
	return emission;
};
