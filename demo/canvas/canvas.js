let ctx
let rains = []
let timer = null
let dense = 1
let countTime = 0

window.onload = () => {
    canvas = document.getElementById('main')
    ctx = canvas.getContext('2d')
    /* drawRect(100, 100, 200, 200 ,'red', false)
    drawRect(150, 150, 200, 200 ,'red', true)
    drawLine(100,100,150,150,'red')
    drawLine(300,100,350,150,'red')
    drawLine(100,300,150,350,'red')
    drawLine(300,300,350,350,'red') */
    setInterval(function() {
        for(let i = 0 ; i < dense; i++){
            let rain = new Rain()
            rain.init()
            rains.push(rain)
        }

        countTime += 50
        if(countTime % 10000 === 0) {
            dense =  Math.abs(Math.sin(countTime) * 100)
            console.log(dense)
        }
    }, 50)
    setInterval(function() {
        ctx.clearRect(0,0,1000,700)
        for(let i = 0 ; i < rains.length; i++) {
            rains[i].move(function(out) {
                if(out) {
                    rains.shift()
                    i = i - 1
                }
            })
        }
        drawLine(0,500,1000,500,'#ffffff')
    }, 15)
}

function Rain() {
    this.color = '#ffffff'
    this.startX = 0
    this.startY = -100
    this.endX = 0
    this.endY = 0
    this.rainLength = 66
    this.speed = 2
    this.rainWidth = 1
    this.out = false
    /* *
     * 初始化 */
    
    this.init = function() {
        this.startX = Math.random()*1000
        this.endX = this.startX
        this.endY = this.startY + this.rainLength
        drawLine(this.startX, this.startY, this.endX, this.endY, this.color, this.rainWidth)
    }

    this.move = function(out) {
        let gradientColor = ctx.createLinearGradient(this.startX,this.startY,this.endX,this.endY)
        gradientColor.addColorStop(0,'rgba(255,255,255,0.2)')
        gradientColor.addColorStop(1,'rgba(255,255,255,1)')
        this.color = gradientColor
       if(this.out) {
            out(this.out)
       } else {
            this.speed = this.speed + 3
            if(this.speed >= 20) {
                this.speed = 20
            }
            if(this.endY <= 500) {
                /* this.startX = this.endX 
                this.endX = this.endX - this.speed */
                this.startY = this.startY + this.speed
                this.endY = this.endY + this.speed
                drawLine(this.startX, this.startY, this.endX, this.endY, this.color, this.rainWidth)
            } else {
                this.out = true
            }
       }
    }
}

drawRect = (x, y, width, height, color, fill, border) => {
    if(fill) {
        ctx.fillStyle = color
        ctx.fillRect(x,y,width,height)
    } else {
        if(typeof border === 'undefined') {
            border = 1
        }
        ctx.lineWidth = border
        ctx.strokeStyle = color
        ctx.strokeRect(x,y,width,height)
    }
}

drawLine = (sx,sy,ex,ey,color,width) => {
    if(typeof width === 'undefined') {
        width = 1
    }
    /* color = ctx.createLinearGradient() */
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.strokeStyle = color
    ctx.moveTo(sx,sy)
    ctx.lineTo(ex,ey)
    ctx.stroke()
}

changeRain  = (e) => {
    let evt = window.event || e
    if(evt.keyCode === 13) {
            dense = parseInt(evt.srcElement.value)
    }
}