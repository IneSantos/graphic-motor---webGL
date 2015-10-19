
function MyMaterial(scene,id, shininess, specular, diffuse, ambient, emission){

 	CGFappearance.call(this,scene);

	this.id = id;
	this.shininess = shininess;
	this.specular = specular;
	this.diffuse = diffuse;
	this.ambient = ambient;
	this.emission = emission;

	this.setShininess(this.shininess);

	var r = this.ambient.r;
	var g = this.ambient.g;
	var b = this.ambient.b;
	var a = this.ambient.a;

	console.log("Ambient : " + r + " , "+ g + " , "+ b  +" , " + a);

	this.setAmbient(r,g,b,a);

	r = this.diffuse.r;
	g = this.diffuse.g;
	b = this.diffuse.b;
	a = this.diffuse.a;
	console.log("Diffuse : " + r + " , "+ g + " , "+ b  +" , " + a);

	this.setDiffuse(r,g,b,a);
	
	r = this.specular.r;
	g = this.specular.g;
	b = this.specular.b;
	a = this.specular.a;

	console.log("Specular : " + r + " , "+ g + " , "+ b  +" , " + a);
	this.setSpecular(r,g,b,a);


	r = this.emission.r;
	g = this.emission.g;
	b = this.emission.b;
	a = this.emission.a;

console.log("Emission : " + r + " , "+ g + " , "+ b  +" , " + a);
	this.setEmission(r,g,b,a);
	

};


MyMaterial.prototype = Object.create(CGFappearance.prototype);
MyMaterial.prototype.constructor = MyMaterial;