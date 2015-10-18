function MyTree(root) {
	this.root = root;
	this.nodes = [];

};

MyTree.prototype.constructor = MyTree;

MyTree.prototype.addNode = function(node){ 
	this.nodes.push(node);
};

MyTree.prototype.addLeaf = function(leave){
	this.leaves.push(leave);
};

MyTree.prototype.getNodes = function(){
	return nodes;
};

MyTree.prototype.getLeaves = function(){
	return leaves;
};