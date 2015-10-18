
function MyMaterials(){
	this.materials = [];
};

MyMaterials.prototype.constructor = MyMaterials;

MyMaterials.prototype.addMaterial = function(material){

	this.materials.push(material);

};

MyMaterials.prototype.getMaterials = function(){

	return materials;

};