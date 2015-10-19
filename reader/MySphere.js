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
 
 //Coordenadas iniciais
     var x0 = 0;
     var y0 = 0;
     var z0 = 0;

 //Dimensao do Raio

    r = 1;


//Angulos Theta e Phi

  
     this.vertices = [];
     this.indices = [];
     this.normals = [];
   	 this.texCoords = [];
       
    var stepS = 0;
	var stepT = 1;
     
        for(var i=0; i<=this.stacks; i++){
      		 
          for(var j=0; j<=this.slices; j++){ 
				var theta = i*(Math.PI)/ this.stacks; 
				var phi = j * (2*Math.PI)/this.slices;     

 	    		var x = this.radius*Math.sin(theta)*Math.cos(phi); //x = rsin(theta)cos(phi)  
    	   		var y = this.radius*Math.sin(theta)*Math.sin(phi); //y = rsin(theta)sin(phi)
       			var z =  Math.cos(theta); // z

			//neste sistema de coordenadas x é z, y é x e z é y.
            	this.vertices.push(x,y,z);
            	this.normals.push(x,y,z);

				stepT= i/this.stacks;
				stepS=j/this.slices;


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

       
        this.primitiveType=this.scene.gl.TRIANGLES;
        this.initGLBuffers();
};



 MySphere.prototype.updateTextCoords = function(s,t){};