/**
 * MyPrism
 * @constructor
 */
 function MyPrism(scene, slices, stacks) {
        CGFobject.call(this,scene);
       
        this.slices=slices;
        this.stacks=stacks;
 
        this.initBuffers();
 };
 
 MyPrism.prototype = Object.create(CGFobject.prototype);
 MyPrism.prototype.constructor = MyPrism;
 
 MyPrism.prototype.initBuffers = function() {
        /*
        * TODO:
        * Replace the following lines in order to build a prism with a **single mesh**.
        *
        * How can the vertices, indices and normals arrays be defined to
        * build a prism with varying number of slices and stacks?
        */
 
        this.vertices = [
        /*-0.5, -0.5, 0,
        0.5, -0.5, 0,
        -0.5, 0.5, 0,
        0.5, 0.5, 0
        */];
 
        this.indices = [
        /*0, 1, 2,
        3, 2, 1
        */];
 
      this.normals = [
      /*
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
        */
        ];

    var ang = 360 / this.slices;
  	var agrad = (ang*Math.PI)/180;
  	var inc = (1/(this.stacks));
  	var indice = 0;

for(var k = 0; k < this.slices*2; ++k){
        for(var i =0 ; i < this.stacks+1 ; ++i){
                this.vertices.push(Math.cos(agrad*k), Math.sin(agrad*k), i * inc );
                this.vertices.push(Math.cos(agrad*(k+1)), Math.sin(agrad*(k+1)), i * inc);

                this.normals.push(Math.cos((agrad+agrad/2)), Math.sin((agrad+agrad/2)),0);
                this.normals.push(Math.cos((agrad+agrad/2)), Math.sin((agrad+agrad/2)),0);

   		if(k != 0){
 		     this.indices.push(0+(indice*2), 1+(indice*2), 2+(indice*2));
 		     this.indices.push(1+(indice*2), 3+(indice*2), 2+(indice*2));
 		     indice++;
 		}
 	}
}
 
        console.log(this.vertices);     
        console.log(this.vertices.length);
        console.log(this.indices);
        console.log(this.indices.length);
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
 };