function MyNode(id, mat, text, rot, trans, scale) {
     this.id = id;
     this.descendants = new Array();
     this.material = mat;
     this.text = text;
     this.rotation = rot;
     this.translation = trans;
     this.scale = scale;
 };

MyNode.prototype.constructor = MyNode;

MyNode.prototype.addDescendant = function(descendant_id){ 
	this.descendants.push(descendant_id);
};