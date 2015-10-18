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
      		 
          for(var j=0; j<this.slices; j++){ 
				var phi = i*(Math.PI/2)/ this.stacks; 
				var theta = j * (2*Math.PI)/this.slices;     

 	    		var x = this.radius*Math.sin(theta)*Math.cos(phi); //x = rsin(theta)cos(phi)  
    	   		var y = this.radius*Math.sin(theta)*Math.sin(phi); //y = rsin(theta)sin(phi)
       			var z =  Math.cos(theta); // z

			//neste sistema de coordenadas x é z, y é x e z é y.
            	this.vertices.push(z,x,Math.abs(y));
            	this.normals.push(z,x,Math.abs(y));
				this.texCoords.push(stepS, stepT);
				stepT-= 1/this.stacks;
				
	        }
	      //stepS = 0;
	      stepS+=1/this.slices;
        }	


for (var stack = 0; stack < this.stacks; stack++)
	{
		for (var slice = 0; slice < this.slices; slice++)
		{
			if (slice == this.slices - 1)
			{
				this.indices.push((stack * this.slices + slice),  (stack * this.slices + slice) + 1 - this.slices, (((stack + 1) * this.slices + slice) + 1) - this.slices);
				this.indices.push((stack * this.slices + slice), (((stack + 1) * this.slices + slice) + 1) - this.slices, ((stack + 1) * this.slices + slice));
			}
			else
			{
				this.indices.push((stack * this.slices + slice), (stack * this.slices + slice) + 1, ((stack + 1) * this.slices + slice) + 1);
				this.indices.push((stack * this.slices + slice), ((stack + 1) * this.slices + slice) + 1, ((stack + 1) * this.slices + slice));
			}
		}
	}

       
        this.primitiveType=this.scene.gl.TRIANGLES;
        this.initGLBuffers();
};
