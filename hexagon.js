class Hexagon{

    constructor(x , y , size , row , column , hasstroke , showindex){

        this.x = x;
        this.y = y;
        this.size = size;
        this.Hdist = Math.sqrt(3) * (this.size/2)
        this.Vdist = 3/2 * (this.size/2)
        this.color = "rgb(13, 27, 58)"
        this.filled = false;
        this.row = row;
        this.column = column
        this.hasstroke = hasstroke
        this.showindex = true
        this.rotation = 0
        this.velocity = {

            x: RandomNumber(-20,20),
            y: RandomNumber(-20,20)
        }

        this.rotationspeed = RandomNumber(-.05,.05)
    }

    render(){

        c.save()
        c.translate(this.x , this.y)
        c.rotate(this.rotation)
        c.beginPath()
        c.fillStyle = this.color
        if(this.hasstroke){

            c.strokeStyle = "white"

        }else{

            c.strokeStyle = "rgb(13, 27, 58)"
        }
       
        c.globalAlpha = .8
        c.lineWidth = .5
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
        c.stroke()
        c.globalAlpha = .5
        c.fill()
        c.closePath()
        c.restore()

        if(this.showindex){

            //render row and column index
            c.save()
            c.translate(this.x , this.y)
            c.beginPath()
            c.textAlign = "center"
            c.textBaseline = "middle"
            c.fillStyle = "white"
            c.font = this.size/8 + "px Roboto"
            c.fillText(this.row + "," +this.column , 0 ,0)
            c.closePath()
            c.restore()

        }
    

    }

    isInside(x, y){

        if(x > this.x - this.Hdist/2 && x < this.x + this.Hdist/2 && y > this.y - this.Vdist/2 && y < this.y + this.Vdist/2){

            return true
        }
    }

    move(){

        if(this.size > 0){

            this.size -= 5
        }


        this.x += this.velocity.x 
        this.y += this.velocity.y
        this.rotation += this.rotationspeed

    }
}