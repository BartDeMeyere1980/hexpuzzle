class Hexomino{

    constructor(x , y , size){

        this.x = x;
        this.y = y;
        this.size = size;
        this.shapes = [


            [
                [0,0,0],
                [0,1,0],
                [0,0,0]

            ],

            [
                [0,0,1],
                [0,1,0],
                [0,0,1]

            ],


            [

                [1,1,1]
            ],

            [

                [1],
                [1],
                [1]
            ],

            [

                [0,1,0],
                [1,1,0]
            ],

            [

                [0,1,1],
                [1,1,0]
            ]
        ]

        this.currentshape = Math.floor(Math.random() * this.shapes.length)

        switch(this.currentshape){

            case 0: this.color = "yellow";break;
            case 1: this.color = "dodgerblue";break;
            case 2: this.color = "magenta";break;
            case 3: this.color = "cyan";break;
            case 4: this.color = "orange";break;
            case 5: this.color = "lime";break;
        }

        this.positions = []
        this.Hdist = Math.sqrt(3) * (this.size/2)
        this.offset = this.Hdist / 2
        this.Vdist = 3/2 * (this.size/2)
        this.oldX = this.x 
        this.oldY = this.y
    }

    update(){

        this.positions = []

        for(var i = 0 ; i < this.shapes[this.currentshape].length ; i++){

            for(var j = 0 ; j < this.shapes[this.currentshape][i].length ; j++){

                if(this.shapes[this.currentshape][i][j] === 1){

                    if(i % 2 === 0){

                        this.positions.push({x: this.x + j * this.Hdist , y:this.y + i * this.Vdist})

                       
                    }else{

                        this.positions.push({x: this.x + j * this.Hdist + this.offset , y:this.y + i * this.Vdist})

                    }
                
                }
            }
        }

    }

    render(){

        for(var i = 0 ; i < this.shapes[this.currentshape].length ; i++){

            for(var j = 0 ; j < this.shapes[this.currentshape][i].length ; j++){

                if(this.shapes[this.currentshape][i][j] === 1){

                    //render hexagon
                    c.save()

                    if(i % 2 === 0){

                        c.translate(this.x + j * this.Hdist , this.y + i * this.Vdist)

                    }else{

                        c.translate(this.x + j * this.Hdist + this.offset , this.y + i * this.Vdist)
                    }

                    
                    c.beginPath()
                    c.strokeStyle = "white"
                    c.fillStyle = this.color
                    c.moveTo(0 , -this.size/2)
                    c.rotate(2 * Math.PI/6)
                    c.lineTo(0 , -this.size/2)
                    c.rotate(2 * Math.PI/6)
                    c.lineTo(0 , -this.size/2)
                    c.rotate(2 * Math.PI/6)
                    c.lineTo(0 , -this.size/2)
                    c.rotate(2 * Math.PI/6)
                    c.lineTo(0 , -this.size/2)
                    c.rotate(2 * Math.PI/6)
                    c.lineTo(0 , -this.size/2)
                    c.rotate(2 * Math.PI/6)
                    c.lineTo(0 , -this.size/2)
                    c.fill()
                    c.stroke()
                    c.closePath()
                    c.restore()

                }
            }
        }

    }

    isInside(x,y){

        for(var i = 0 ; i < this.positions.length ; i++){

            if(x > this.positions[i].x - this.Hdist/2 && x < this.positions[i].x + this.Hdist/2 && y > this.positions[i].y - this.size/2 && y < this.positions[i].y + this.size/2){

                return true
            }
        }
        
    }
    
}