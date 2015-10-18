/**
 * MyTriangle
 * @constructor
 */
 function MyTriangle(scene, leftX, leftY, leftZ, rightX, rightY, rightZ, topX, topY, topZ) {
        CGFobject.call(this,scene);
            
        this.leftX = leftX;
        this.leftY = leftY;
        this.leftZ = leftZ;
        this.rightX = rightX;
        this.rightY = rightY;
        this.rightZ = rightZ;
        this.topX = topX;
        this.topY = topY;
        this.topZ = topZ;
 
        this.initBuffers();
 };
 
 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyTriangle;
 
 MyTriangle.prototype.initBuffers = function() {
       
        this.vertices = [
        this.leftX,this.leftY,this.leftZ,
        this.rightX,this.rightY,this.rightZ,
        this.topX,this.topY,this.topZ,
        ];
 
        this.indices = [
        0, 1, 2,
        ];
 

       var vectorA = vec3.fromValues(this.rightX-this.leftX, this.rightY-this.leftY, this.rightZ-this.leftZ);
       var vectorB = vec3.fromValues(this.topX-this.leftX, this.topY-this.leftY, this.topZ-this.leftZ);
       var nor = vec3.create(); 
       var vec = vec3.cross(nor,vectorA, vectorB);
       vec3.normalize(nor,nor);
       
     this.texCoords = [
     0,0,
     1,0,
     1,1,];
        
        
      this.normals = [
      nor[0], nor[1], nor[2],
      nor[0], nor[1], nor[2],
      nor[0], nor[1], nor[2],
      ];
      this.initGLBuffers();
 };