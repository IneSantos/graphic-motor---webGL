/**
* MyTree
* saves the information of the created leaves and nodes
* @constructor
* @param root
*/
function MyTree(root) {
	this.root = root;
	this.nodes = [];
	this.leaves = [];

};

MyTree.prototype.constructor = MyTree;

/**
* Method that adds nodes
* @constructor
* @param node - the node to add
*/
MyTree.prototype.addNode = function(node){ 
	this.nodes.push(node);
};

/**
* Method that adds leaves
* @constructor
* @param leave - the leave to add
*/
MyTree.prototype.addLeaf = function(leave){
	this.leaves.push(leave);
};

/**
* Method that gets nodes
* @constructor
*/
MyTree.prototype.getNodes = function(){
	return nodes;
};

/**
* Method that gets leaves
* @constructor
*/
MyTree.prototype.getLeaves = function(){
	return leaves;
};