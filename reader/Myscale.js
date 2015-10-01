function Myscale(x,y,z) {
 	 
    this.x = x;
    this.y =y;
    this.z =z;

 };

Myscale.prototype.apply = function(scene) {
    
    scene.scale(this.x,this.y,this.z);

};