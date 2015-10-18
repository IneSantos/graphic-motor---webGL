function MyLeave(scene,id, type, coords) {
     this.id = id;
     this.type = type; 
     this.coords = coords;
     this.isLeaf = true;
     this.primitive={};
     
     if(this.type == "rectangle")
         this.primitive = new MyRectangle(scene,0,1,0,1, parseFloat(this.coords[0]), parseFloat(this.coords[1]), parseFloat(this.coords[2]), parseFloat(this.coords[3]));
        
        else if(this.type == "cylinder")
          this.primitive = new MyCylinder(scene, parseFloat(this.coords[0]), parseFloat(this.coords[1]), parseFloat(this.coords[2]), parseFloat(this.coords[3]), parseFloat(this.coords[4]));
    
     
        else if(this.type == "sphere")
          this.primitive = new MySphere(scene,parseFloat(this.coords[0]), parseFloat(this.coords[1]), parseFloat(this.coords[2]));

        else if(this.type == "triangle")
          this.primitive = new MyTriangle(scene, parseFloat(this.coords[0]), parseFloat(this.coords[1]), parseFloat(this.coords[2]), parseFloat(this.coords[3]), parseFloat(this.coords[4]), parseFloat(this.coords[5]), parseFloat(this.coords[6]), parseFloat(this.coords[7]), parseFloat(this.coords[8]));
           
    };

MyLeave.prototype.constructor = MyLeave;
