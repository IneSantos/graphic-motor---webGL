function MyRotation(ang,x,y,z) {
 	this.ang = ang;
    this.x = x;
    this.y =y;
    this.z =z;

 };

MyRotation.prototype.constructor = MyRotation;


MyRotation.prototype.apply = function(scene) {
    
    scene.rotate((this.ang*Math.PI)/180,this.x,this.y,this.z);

};