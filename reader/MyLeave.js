function MyLeave(id, type, coords) {
     this.id = id;
     this.type = type; 
     
     if(this.type == "rect")
         this.primitive = MyRectangle(scene, 0,1,0,1, this.coords[0], this.coords[1], this.coords[2], this.coords[3]);
        
        else if(this.type == "cyl")
          this.primitive = MyCylinder(scene,this.coords[0], this.coords[1], this.coords[2], this.coords[3], this.coords[4]);
     
        else if(this.type == "sphere")
           this.primitive = MySphere(scene,this.coords[0], this.coords[1], this.coords[2]);
           
        else if(this.type == "triangle")
            this.primitive = MyTriangle(scene, this.coords[0], this.coords[1], this.coords[2], this.coords[3], this.coords[4],this.coords[5], this.coords[6], this.coords[7], this.coords[8]);
           
    };

MyLeave.prototype.constructor = MyLeave;
