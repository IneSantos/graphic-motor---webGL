function MyTree() {
	this.nodes = new Array();
};

MyTree.prototype.constructor = MyTree;

MyTree.prototype.addNode = function(node){ 
	this.nodes.push(node);
};