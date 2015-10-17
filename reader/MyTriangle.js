/**
 * MyTriangle
 * @constructor
 */
 function MyTriangle(scene, leftX, leftY, leftZ, rightX, rightY,rightZ, topX, topY, topZ) {
        CGFobject.call(this,scene);
            
        this.topX = topX;
        this.topY = topY;
        this.topZ = topZ;
        this.leftX = leftX;
        this.leftY = leftY;
        this.leftZ = leftZ;
        this.rightX = rightX;
        this.rightY = rightY;
        this.rightZ = rightZ;
 
        this.initBuffers();
 };
 
 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyTriangle;
 
 MyTriangle.prototype.initBuffers = function() {
       
        this.vertices = [
        this.leftX,this.leftY,this.leftZ,
        this.rightX,this.rightY,this.rightZ,
        this.topX,this.topY,this.topZ
        ];
 
        this.indices = [
        0, 1, 2
        ];
 

        

        
      this.normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        ];
 };