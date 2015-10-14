function MyScale(x,y,z) {
 	 
    this.x = x;
    this.y =y;
    this.z =z;

 };

MyScale.prototype.constructor = MyScale;

MyScale.prototype.apply = function(scene) {
    
    scene.scale(this.x,this.y,this.z);

};