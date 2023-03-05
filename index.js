let canvas = document.querySelector("canvas")
let c = canvas.getContext("2d")

canvas.style.width = innerWidth + "px"
canvas.style.height = innerHeight + "px"

canvas.width = innerWidth * devicePixelRatio 
canvas.height = innerHeight * devicePixelRatio

//variables
let size = 200
let minisize = size/2
let Hdist = Math.sqrt(3) * (size/2)
let Vdist = 3/2 * (size/2)
let shapes = []

let columns = 9
let maxcolumns = columns
let rows = Math.floor(columns/2)
let start = {x: 0 , y:0}
let hexominos = []
let mousedown = false;
let currentshape = undefined
let dx , dy
let indexes = []
let animatedshapes = []

RenderGrid()
Createhexominos()
RenderCanvas()

function RenderGrid(){

    start.x = canvas.width/2 - Math.floor(columns/2) * Hdist
    start.y = canvas.height/2
    offset = Hdist/2
    temp_columns = columns

    var rowNumber =  Math.floor(columns/2)

    for(var i = 0 ; i < rows + 1 ; i++){

        for(var c = 0 ; c < columns ; c++){

            shapes.push(new Hexagon(start.x + c * Hdist , start.y - i * Vdist , size , rowNumber , c , true))
        }

        columns--
        rowNumber--
        start.x += offset
    }

    columns = temp_columns - 1
    start.x = canvas.width/2 - Math.floor(columns/2) * Hdist + offset
    start.y = canvas.height/2 + Vdist 
    rowNumber =  Math.floor(columns/2) + 1
   
    for(var i = 0 ; i < rows ; i++){

        for(var c = 0 ; c < columns ; c++){

            shapes.push(new Hexagon(start.x + c * Hdist , start.y + i * Vdist , size , rowNumber , c , true))
        }

        columns--
        rowNumber++
        start.x += offset
    }

    
}

function Createhexominos(){

    for(var i = 0 ; i < 3 ; i++){

        do{

            var hexomino = new Hexomino(canvas.height/4 , canvas.height/4 + i * (canvas.height/4) , minisize)

        }while(!isValid(hexomino))
       
        hexominos.push(hexomino)
        hexomino.update()
    }
    
}

function isValid(hexomino){

    for(var i = 0 ; i < hexominos.length ; i++){

        if(hexominos[i].currentshape === hexomino.currentshape){

            return false
        }
    }

    return true
}

function RenderCanvas(){

    c.clearRect(0,0,canvas.width,canvas.height)

    //render hexomino gird
    shapes.forEach(shape => { shape.render() })

    displayCurrentTetrominoPosition(currentshape)

    //render hexominos
    hexominos.forEach(hexomino => { hexomino.render() })

    if(currentshape){

        currentshape.render()

    }

    //render animated hex shapes
    animatedshapes.forEach(shape => { 
        
        shape.render()
        shape.move()
    
    })

    //render animated hex shapes
    animatedshapes.forEach((shape,index) => { 
        
        if(shape.size < 1){

            animatedshapes.splice(index,1)
        }
    
    })
    

    requestAnimationFrame(RenderCanvas)
}

function canFit(hexomino){

    var count = 0

    for(var i = 0 ; i < hexomino.positions.length ; i++){

        for(var j = 0 ; j < shapes.length ; j++){

            if(shapes[j].isInside(hexomino.positions[i].x , hexomino.positions[i].y) && !shapes[j].filled){

                count++
            }
        }
    }

    if(count === hexomino.positions.length){

        return true;

    }else{

        return false;
    }
}

function placeHexomino(hexomino){

    for(var i = 0 ; i < hexomino.positions.length ; i++){

        for(var j = 0 ; j < shapes.length ; j++){

            if(shapes[j].isInside(hexomino.positions[i].x , hexomino.positions[i].y)){

               shapes[j].color = hexomino.color
               shapes[j].filled = true
            }
        }
    }
}

function removeHexomino(){

    for(var i = 0 ; i < hexominos.length ; i++){

        if(hexominos[i] === currentshape){

            hexominos.splice(i,1)
        }
    }
}

function displayCurrentTetrominoPosition(hexomino){

    if(hexomino){

        if(canFit(hexomino)){

            for(var i = 0 ; i < hexomino.positions.length ; i++){

                for(var j = 0 ; j < shapes.length ; j++){
        
                    if(shapes[j].isInside(hexomino.positions[i].x , hexomino.positions[i].y)){
        
                        c.save()
                        c.translate(shapes[j].x , shapes[j].y)
                        c.beginPath()
                        c.fillStyle = hexomino.color
                        c.strokeStyle = "grey"
                        c.globalAlpha = .1
                        c.moveTo(0 , size/2)
                        c.rotate(2 * Math.PI/6)
                        c.lineTo(0 , size/2)
                        c.rotate(2 * Math.PI/6)
                        c.lineTo(0 , size/2)
                        c.rotate(2 * Math.PI/6)
                        c.lineTo(0 , size/2)
                        c.rotate(2 * Math.PI/6)
                        c.lineTo(0 , size/2)
                        c.rotate(2 * Math.PI/6)
                        c.lineTo(0 , size/2)
                        c.rotate(2 * Math.PI/6)
                        c.lineTo(0 , size/2)
                        c.stroke()
                        c.fill()
                        c.closePath()
                        c.restore()
                    }
                }
            }
        }
    }
 
}

function checkBoard(){

    var count = 0

    for(var i = 0 ; i < hexominos.length ; i++){

        var current = hexominos[i]

        for(var j = 0 ; j < shapes.length ; j++){

            current.x = shapes[j].x 
            current.y = shapes[j].y 
            current.size = size 
            current.Vdist = 3/2 * (size/2)
            current.Hdist =  Math.sqrt(3) * (size/2)
            current.update()

            if(canFit(current)){

                count++

               /*  current.x = current.oldX
                current.y = current.oldY
                current.size = minisize
                current.Vdist = 3/2 * (minisize/2)
                current.Hdist =  Math.sqrt(3) * (minisize/2)
                current.update() */

            }//else{

                current.x = current.oldX
                current.y = current.oldY
                current.size = minisize
                current.Vdist = 3/2 * (minisize/2)
                current.Hdist =  Math.sqrt(3) * (minisize/2)
                current.update()

            //}
        }
    }

    if(count === 0){

        console.log("out of moves")
        shapes.forEach(shape => {shape.color = "rgba(99,99,99,.3)"})
    }
}


function getshape(row , column){

    for(var i = 0 ; i < shapes.length ; i++){

        if(shapes[i].row === row && shapes[i].column === column){

            return shapes[i]
        }
    }
}

function completeDiagonal(row , column , direction){

    if(direction === "bottomToright"){

        var temprow = row 
        var tempcol = column

        while(getshape(temprow,tempcol)){
    
            if(!getshape(temprow,tempcol).filled){
    
                return false
            }
    
            temprow--
        }
    
        temprow = row + 1
        tempcol--
    
        while(getshape(temprow,tempcol)){
    
            if(!getshape(temprow,tempcol).filled){
    
                return false
            }
    
            temprow++
            tempcol--
        }
    
        return true
    }

    if(direction === "bottomToleft"){

        var temprow = row 
        var tempcol = column

        while(getshape(temprow,tempcol)){
    
            //console.log(temprow,tempcol)

            if(!getshape(temprow,tempcol).filled){
    
                return false
            }
    
            temprow--
            tempcol--
        }
    
        temprow = row + 1
        tempcol = column

        while(getshape(temprow,tempcol)){

            //console.log(temprow,tempcol)
    
            if(!getshape(temprow,tempcol).filled){
    
                return false
            }
    
            temprow++
        }
    }

    return true
}


function getCompleteDiagonal(row ,column , direction){


    if(direction === "bottomToright"){

        var temprow = row 
        var tempcol = column

        while(getshape(temprow,tempcol)){
    
            if(indexes.indexOf(temprow + "," + tempcol) === -1){

                indexes.push(temprow + "," + tempcol)
            }
            //getshape(temprow,tempcol).filled = false
            //getshape(temprow , tempcol).color = "rgb(13, 27, 58)"
    
            temprow--
        }
    
        temprow = row + 1
        tempcol--
    
        while(getshape(temprow,tempcol)){
    
            //getshape(temprow,tempcol).filled = false
            //getshape(temprow , tempcol).color = "rgb(13, 27, 58)"

            if(indexes.indexOf(temprow + "," + tempcol) === -1){

                indexes.push(temprow + "," + tempcol)
            }
    
            temprow++
            tempcol--
        }
    }

    if(direction === "bottomToleft"){

        var temprow = row 
        var tempcol = column

        while(getshape(temprow,tempcol)){
    
            //getshape(temprow,tempcol).filled = false
            //getshape(temprow , tempcol).color = "rgb(13, 27, 58)"
    
            if(indexes.indexOf(temprow + "," + tempcol) === -1){

                indexes.push(temprow + "," + tempcol)
            }
            temprow--
            tempcol--
        }
    
        temprow = row + 1
        tempcol = column

        while(getshape(temprow,tempcol)){
    
            //getshape(temprow,tempcol).filled = false
            //getshape(temprow , tempcol).color = "rgb(13, 27, 58)"
            if(indexes.indexOf(temprow + "," + tempcol) === -1){

                indexes.push(temprow + "," + tempcol)
            }
    
            temprow++
        }

    }
   

}

function completeRow(row,column){

    var temprow = row 
    var tempcol = column

    //to left
    while(getshape(temprow , tempcol)){

        //console.log(temprow,tempcol)

        if(!getshape(temprow , tempcol).filled){

            return false
        }

        tempcol--
    }

    tempcol = column + 1

    //to right
    while(getshape(temprow,tempcol)){

        //console.log(temprow,tempcol)

        if(!getshape(temprow , tempcol).filled){

            return false
        }

        tempcol++
    }

    return true
}

function getCompleteRows(row , column){

    var temprow = row 
    var tempcol = column

    //to left
    while(getshape(temprow,tempcol)){

       //getshape(temprow , tempcol).filled = false 
       //getshape(temprow , tempcol).color = "rgb(13, 27, 58)"
       if(indexes.indexOf(temprow + "," + tempcol) === -1){

        indexes.push(temprow + "," + tempcol)


       }
       tempcol--
    }

    tempcol = column + 1

    //to right
    while(getshape(temprow,tempcol)){

        //getshape(temprow , tempcol).filled = false 
        //getshape(temprow , tempcol).color = "rgb(13, 27, 58)"
        if(indexes.indexOf(temprow + "," + tempcol) === -1){

            indexes.push(temprow + "," + tempcol)
        }

        tempcol++
    }


}

addEventListener("mousedown" , function(event){

    mousedown = true

    var coordX = event.clientX * devicePixelRatio 
    var coordY = event.clientY * devicePixelRatio


    for(var i = 0 ; i < hexominos.length ; i++){

        if(hexominos[i].isInside(coordX,coordY)){

            currentshape = hexominos[i]

            currentshape.size = size

            currentshape.Vdist = 3/2 * (size/2)
            currentshape.Hdist =  Math.sqrt(3) * (size/2)
            currentshape.offset = currentshape.Hdist  / 2

            dx = coordX - currentshape.x 
            dy = coordY - currentshape.y

            return

        }
    }

})

addEventListener("mousemove" , function(event){

    if(mousedown){

        var coordX = event.clientX * devicePixelRatio 
        var coordY = event.clientY * devicePixelRatio

        if(currentshape){

            currentshape.x = coordX - dx 
            currentshape.y = coordY - dy 
            currentshape.update()

        }
    }
})

addEventListener("mouseup" , function(){

    indexes = []

    mousedown = false;

    if(currentshape){

        if(canFit(currentshape)){

           
            placeHexomino(currentshape)
            removeHexomino()
            currentshape = undefined

            if(hexominos.length === 0){

                Createhexominos()
            }

        }else{

            currentshape.x = currentshape.oldX
            currentshape.y = currentshape.oldY
            currentshape.size = minisize
            currentshape.Vdist = 3/2 * (minisize/2)
            currentshape.Hdist =  Math.sqrt(3) * (minisize/2)
            currentshape.offset = currentshape.Hdist  / 2
            currentshape.update()
            currentshape = undefined

        }

        currentshape = undefined

        checkBoard()

        //get complete diagonals
        var startrow = Math.floor(maxcolumns/2)

        for(var c = 0 ; c < maxcolumns ; c++){

            if(completeDiagonal(startrow , c ,"bottomToright")){

                getCompleteDiagonal(startrow , c ,"bottomToright")
            }

        }
        
        for(var c = 0 ; c < maxcolumns ; c++){

            if(completeDiagonal(startrow , c ,"bottomToleft")){

                getCompleteDiagonal(startrow , c ,"bottomToleft")
            }
        }

        //get complete rows

        shapes.forEach(shape => {

            if(completeRow(shape.row , shape.column)){
        
                //clearRows(shape.row , shape.column)
                getCompleteRows(shape.row , shape.column)
            }
        })
       
  
        //clear hexshapes
        for(var i = 0 ; i < indexes.length ; i++){

           var j = 0

            var temp = indexes[i].split(",")
            var row  = parseInt(temp[0])
            var col = parseInt(temp[1])

            var currentcolor =  getshape(row , col).color

            getshape(row , col).filled = false 
            getshape(row , col).color = "rgb(13, 27, 58)"


            while(j < 5){

                var newHex = new Hexagon(getshape(row , col).x , getshape(row , col).y , size , undefined , undefined , false , false)
                newHex.color = currentcolor
                newHex.showindex = false
                animatedshapes.push(newHex)
                j++
            }
          
        }

    

    }
  
})