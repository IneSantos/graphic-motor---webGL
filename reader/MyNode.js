function MyNode(id, mat, text, trans) {
     this.id = id;
     this.descendants = [];
     this.material = mat;
     this.text = text;
     this.transformation = trans;
 };

MyNode.prototype.constructor = MyNode;

MyNode.prototype.addDescendant = function(descendant_id){ 
	this.descendants.push(descendant_id);
};

