/**
 * MyNode constructor
 * used to save the nodes read from the XML
 * @constructor
 * @param id - the id of the nodes
 * @param mat - the material of the node
 * @param text - the texture to apply on the node
 * @param trans - the trasnformation to apply to the node
 */
function MyNode(id, mat, text, trans) {
     this.id = id;
     this.descendants = [];
     this.material = mat;
     this.text = text;
     this.transformation = trans;
     this.isLeaf = false;
 };

MyNode.prototype.constructor = MyNode;

/**
* addDescendant function
* add a descendant to the node's array of descendants
* @constructor
* @param descendant_id
*/
MyNode.prototype.addDescendant = function(descendant_id){ 
	this.descendants.push(descendant_id);
};

