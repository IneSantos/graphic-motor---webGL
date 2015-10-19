/**
 * MyRectangle
 * @constructor
 * @param scene - the scene
 * @param minS - minimum value of S
 * @param maxS - maximum value of S
 * @param minT - minimum value of T
 * @param maxT - maximum value of T
 * @param lTopX
 * @param lTopY
 * @param rBottomX
 * @param rBottomY
 */
 function MyRectangle(scene, lTopX, lTopY, rBottomX, rBottomY) {
 	CGFobject.call(this,scene);

    this.minS = 0;
    this.maxS = 1;
    this.minT = 0;
    this.maxT = 1;
    
    this.lTopX = lTopX;
    this.lTopY = lTopY;
    this.rBottomX = rBottomX;
    this.rBottomY = rBottomY;


    
 	this.initBuffers();
 };

 MyRectangle.prototype = Object.create(CGFobject.prototype);
 MyRectangle.prototype.constructor = MyRectangle;

/**
 * draw the rectangle
 * @constructor
 */
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

/**
* updating texture coordinates
* @constructor
*/
 MyRectangle.prototype.updateTextCoords = function(s,t){
      this.texCoords = [
        this.minS/s,this.maxT/t,
        this.maxS/s,this.maxT/t,
        this.minS/s,this.minT/t,
        this.maxS/s,this.minT/t,
        ];


   this.updateTexCoordsGLBuffers();
 };