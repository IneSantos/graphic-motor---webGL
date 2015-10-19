/**
 * MyRotation
 * @constructor
 * @param ang - angle of the rotation
 * @param x - x axis of rotation
 * @param y - y axis of rotation
 * @param z - z axis of rotation
 */
function MyRotation(ang,x,y,z) {
 	this.ang = ang;
    this.x = x;
    this.y =y;
    this.z =z;
 };

MyRotation.prototype.constructor = MyRotation;

/**
* Apply the rotation
* @constructor
*/
MyRotation.prototype.apply = function(scene) {
    scene.rotate((this.ang*Math.PI)/180,this.x,this.y,this.z);
};