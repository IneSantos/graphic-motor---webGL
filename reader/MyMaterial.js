
function MyMaterial(id, shininess, specular, diffuse, ambient, emission){
	this.id = id;
	this.shininess = shininess;
	this.specular = specular;
	this.diffuse = diffuse;
	this.ambient = ambient;
	this.emission = emission;
};

MyMaterial.prototype.constructor = MyMaterial;

MyMaterial.prototype.addMaterial = function(material){



};
