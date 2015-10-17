/**
 * MyRectangle
 * @constructor
 */
 function MyRectangle(scene, minS,maxS,minT,maxT, lTopX, lTopY, rBottomX, rBottomY) {
 	CGFobject.call(this,scene);

    this.minS = minS||0;
    this.maxS = maxS||1;
    this.minT = minT||0;
    this.maxT = maxT||1;
    
 	this.initBuffers();
 };

 MyRectangle.prototype = Object.create(CGFobject.prototype);
 MyRectangle.prototype.constructor = MyRectangle;

 MyRectangle.prototype.initBuffers = function() {
 	this.vertices = [
 	lTopX, rBottomY, 0,
 	rBottomX, rBottomY, 0,
 	lTopX, lTopY, 0,
 	rBottomX, lTopY, 0
 	];

 	this.indices = [
 	0, 1, 2, 
 	3, 2, 1
 	];

 	this.primitiveType = this.scene.gl.TRIANGLES;
     
    this.normals = [
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1,
     ];


     this.texCoords = [
        this.minS,this.maxT,
        this.maxS,this.maxT,
        this.minS,this.minT,
        this.maxS,this.minT,
        ];


 	this.initGLBuffers();
 };
