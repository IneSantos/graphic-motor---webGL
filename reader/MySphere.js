/**
 * MySphere
 * @constructor
 */

function MySphere(scene,radius, slices, stacks) {
	CGFobject.call(this,scene);

	this.radius = radius;
	this.slices = slices;
	this.stacks = stacks;

	this.initBuffers();
};

MySphere.prototype = Object.create(CGFobject.prototype);
MySphere.prototype.constructor=MySphere;

 
MySphere.prototype.initBuffers = function () {
 
 //Initial coordinates
     var x_init = 0;
     var y_init = 0;
     var z_init = 0;

    r = 1;
  
     this.vertices = [];
     this.indices = [];
     this.normals = [];
   	 this.texCoords = [];
       
    var stepS = 0;
	var stepT = 1;
     
        for(var i=0; i<=this.stacks; i++){
      		 
          for(var j=0; j<=this.slices; j++){ 

				var teta = i * (Math.PI)/ this.stacks; // teta angle
				var pi = j * (2*Math.PI)/ this.slices;     // pi angle

 	    		var z = this.radius*Math.sin(teta)*Math.cos(pi); 
    	   		var x = this.radius*Math.sin(teta)*Math.sin(pi); 
       			var y =  Math.cos(teta); 

            	this.vertices.push(z,x,y);
            	this.normals.push(z,x,y);

				stepT = i/this.stacks;
				stepS = j/this.slices;

				this.texCoords.push(stepS, stepT);
				
	        }
	      //stepS = 0;
	      
        }	


for (var stack = 0; stack < this.stacks; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
				this.indices.push(stack * (this.slices + 1)+slice, (stack + 1) * (this.slices + 1)+slice, (stack + 1) * (this.slices+1) + slice+1);
				this.indices.push(stack * (this.slices + 1)+slice, (stack + 1) * (this.slices + 1)+slice+1, stack * (this.slices+1) + 1+slice);
		}
	}

       
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
};



 MySphere.prototype.updateTextCoords = function(s,t){};