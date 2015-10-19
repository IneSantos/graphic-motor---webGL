/**
 * MyScale
 * @constructor
 * @param x - x value of scaling
 * @param y - y value of scaling
 * @param z - z value of scaling
 */
function MyScale(x,y,z) {
 	 
    this.x = x;
    this.y =y;
    this.z =z;

 };

MyScale.prototype.constructor = MyScale;

/**
* Apply the scale
* @constructor
*/
MyScale.prototype.apply = function(scene) {
   scene.scale(this.x,this.y,this.z);
};