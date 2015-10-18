function MyLeave(id, type, coords) {
     this.id = id;
     this.type = type;
     this.coords = coords;

 };

MyLeave.prototype.constructor = MyLeave;

MyLeave.prototype.display = function(scene){
    
        if(this.type == "rect"){
          var rect = MyRectangle(scene, 0,1,0,1, this.coords[0], this.coords[1], this.coords[2], this.coords[3]);
          this.rect.display();
        }
        else if(this.type == "cyl"){
          var cyl = MyCylinder(scene,this.coords[0], this.coords[1], this.coords[2], this.coords[3], this.coords[4]);
          this.cyl.display();
        }
        else if(this.type == "sphere"){
           var spe = MySphere(scene,this.coords[0], this.coords[1], this.coords[2]);
           this.spe.display();
        }
        else if(this.type == "triangle"){
           var tri = MyTriangle(scene, this.coords[0], this.coords[1], this.coords[2], this.coords[3], this.coords[4],this.coords[5], this.coords[6], this.coords[7], this.coords[8]);
            this.tri.display();
        }
    


     
};