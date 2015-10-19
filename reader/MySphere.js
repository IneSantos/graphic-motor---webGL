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
 
 /**
 Initial coordinates
 */
     var x_init = 0;
     var y_init = 0;
     var z_init = 0;

/**
Radius dimension
*/
    r = 1;
  
     this.vertices = [];
     this.indices = [];
     this.normals = [];
   	 this.texCoords = [];
       
    /**
    for the texture coordinates
    */
    var stepS = 0;
	var stepT = 1;
     
        for(var i=0; i <= this.stacks; i++){
      		 
          for(var j=0; j <= this.slices; j++){ 

          		/**
          		teta angle
          		*/
				var theta = i * (Math.PI)/ this.stacks; 
				/**
				phi angle
				*/
				var phi = j * (2*Math.PI)/ this.slices; 

 	    		/**
				x = rsin(theta)cos(phi)  
				*/
 	    		var x = this.radius*Math.sin(theta)*Math.cos(phi); 
 	    		/**
 	    		y = rsin(theta)sin(phi) 
 	    		*/
    	   		var y = this.radius*Math.sin(theta)*Math.sin(phi); 
    	   		/**
    	   		z = cos(theta)
    	   		*/
       			var z =  Math.cos(theta); 

       			/**
       			push the vertices and the normals
       			*/
            	this.vertices.push(x,y,z);
            	this.normals.push(x,y,z);

            	/**
            	texture coordinates
            	*/
				this.texCoords.push(j/this.slices, i/this.stacks);
				
	        }
	      
        }	


/**
draw the sphere
*/
	for (var stack = 0; stack < this.stacks; stack++){
		for (var slice = 0; slice < this.slices; slice++)
		{
			this.indices.push(slice + (stack * (this.slices + 1)), slice + ((stack + 1) * (this.slices)), slice + 1 + (stack * (this.slices + 1)));
			this.indices.push(slice + (stack * (this.slices + 1)), slice + 1 + ((stack + 1) * (this.slices)), slice + 1 + (stack * (this.slices + 1)));
		}
	}

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
};



 MySphere.prototype.updateTextCoords = function(s,t){};