function MyTranslation(x,y,z) {
 	 
    this.x = x;
    this.y =y;
    this.z =z;

 };

MyTranslation.prototype.apply = function(scene) {
    
    scene.translate(this.x,this.y,this.z);

};