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

    this.lTopX = lTopX;
    this.lTopY = lTopY;
    this.rBottomX = rBottomX;
    this.rBottomY = rBottomY;


    
 	this.initBuffers();
 };

 MyRectangle.prototype = Object.create(CGFobject.prototype);
 MyRectangle.prototype.constructor = MyRectangle;

 MyRectangle.prototype.initBuffers = function() {
 	this.vertices = [
 	this.lTopX, this.rBottomY, 0,
 	this.rBottomX, this.rBottomY, 0,
 	this.lTopX, this.lTopY, 0,
 	this.rBottomX, this.lTopY, 0
 	];

 	this.indices = [
 	0, 1, 2, 
 	3, 2, 1
 	];

 	
     
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

    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
