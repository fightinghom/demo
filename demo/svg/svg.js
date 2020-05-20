let svg
let svgArea
let mouseStartX = 0
let mouseStartY = 0
let moveG = null
let moveP = null
let movePath = false
let movePoint = false
let moveText = false
let pointIndex = 0
let gIndex = 0
window.onload = () => {
    svgArea = document.getElementById('mysvg')
    svg = [
        {
            points: [[100, 100], [150, 400], [350, 400], [500, 100], [400, 100]],
            text: {
                content: 'I love svg',
                transform: 'translate(0,0)'
            },
            style: {
                background: 'lightblue'
            }
        },
        {
            points: [[400, 100], [450, 400], [650, 400], [800, 100], [700, 100]],
            text: {
                content: 'I love svg too',
                transform: 'translate(0,0)'
            },
            style: {
                background: '#f3f3f3d9'
            }
        }
    ]
    svg.map((item, gIndex) => {
        let g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
        let gid = 'myg' + gIndex
        g.setAttribute('id', gid)
        // 画路径
        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        let d = 'M'
        item.points.map((item , index) => {
            if (index == 0) {
                d += `${item[0]} ${item[1]} `
            } else {
                d += `L${item[0]} ${item[1]} `
            }
        })
        d += 'Z'
        path.setAttribute('d', d)
        path.setAttribute('fill', item.style.background)
        // path.setAttribute('stroke', 'black')
        path.addEventListener('mousedown', () => {startMove(gIndex)}, false)
        path.addEventListener('mouseup', () => {stopMove()}, false)
        g.appendChild(path)
        // 画顶点
        item.points.map((item, index) => {
            let c = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            c.setAttribute('cx', item[0])
            c.setAttribute('cy', item[1])
            c.setAttribute('fill', 'red')
            c.setAttribute('r', 5)
            c.addEventListener('mousedown', () => {startMovePoint(event, index, gIndex)}, false)
            c.addEventListener('mouseup', () => {stopMovePoint()}, false)
            g.appendChild(c)
        })
        // 画文本
        let text = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        text.setAttribute('text-anchor', 'middle')
        text.setAttribute('dominant-baseline', 'middle')
        text.setAttribute('fill', 'black')
        // 计算文本的位置
        let currentPoint = getPathRectCenter(item.points)
        text.setAttribute('x', currentPoint[0])
        text.setAttribute('y', currentPoint[1])
        text.setAttribute('transform', item.text.transform)
        text.innerHTML = item.text.content
        text.addEventListener('mousedown', () => {startMoveText(gIndex)})
        text.addEventListener('mouseup', () => {stopMoveText()})
        g.appendChild(text)
        svgArea.appendChild(g)
    })
}

getPathRectCenter = (points) => {
    let minX = null
    let minY = null
    let maxX = null
    let maxY = null
    points.map(item => {
        if (!Boolean(minX) || item[0] < minX) minX = item[0]
        if (!Boolean(minY) || item[1] < minY) minY = item[1]
        if (!Boolean(maxX) || item[0] > maxX) maxX = item[0]
        if (!Boolean(maxY) || item[1] > maxY) maxY = item[1]
    })
    return [(minX + maxX) / 2, (minY + maxY) / 2]
}

startMove = (objIndex) => {
    let ev = window.event
    mouseStartX = ev.x
    mouseStartY = ev.y
    gIndex = objIndex
    moveG = document.getElementById('myg' + gIndex)
    movePath = true
}



stopMove = () => {
    movePath = false
    mouseStartX = 0
    mouseStartY = 0
    moveG = null
}

mouseMove = (event) => {
    let moveX = event.x - mouseStartX
    let moveY = event.y - mouseStartY
    console.log(gIndex)
    if (movePath) {
        let d = 'M'
        svg[gIndex].points.map((item, index) => {
            item[0] = item[0] + moveX
            item[1] = item[1] + moveY
            if (index == 0) {
                d += `${item[0]} ${item[1]} `
            } else {
                d += `L${item[0]} ${item[1]} `
            }
        })
        d += 'Z'
        for (let item of moveG.children) {
            if (item.tagName === 'path') {
                item.setAttribute('d', d)
            } else if (item.tagName === 'circle') {
                item.setAttribute('cx', parseInt(item.attributes['cx'].nodeValue) + moveX)
                item.setAttribute('cy', parseInt(item.attributes['cy'].nodeValue) + moveY)
            } else if (item.tagName === 'text') {
                item.setAttribute('x', parseInt(item.attributes['x'].nodeValue) + moveX)
                item.setAttribute('y', parseInt(item.attributes['y'].nodeValue) + moveY)
            }
        }
    }
    if (movePoint) {
        moveP.setAttribute('cx', parseInt(moveP.attributes['cx'].nodeValue) + moveX)
        moveP.setAttribute('cy', parseInt(moveP.attributes['cy'].nodeValue) + moveY)
        svg[gIndex].points[pointIndex] = [parseInt(moveP.attributes['cx'].nodeValue), parseInt(moveP.attributes['cy'].nodeValue)]
        let d = 'M'
        svg[gIndex].points.map((item, index) => {
            if (index == 0) {
                d += `${item[0]} ${item[1]} `
            } else {
                d += `L${item[0]} ${item[1]} `
            }
        })
        d += 'Z'
        for (let item of moveG.children) {
            if (item.tagName === 'path') {
                item.setAttribute('d', d)
            } else if (item.tagName === 'text') {
                let currentPoint = getPathRectCenter(svg[gIndex].points)
                item.setAttribute('x', currentPoint[0])
                item.setAttribute('y', currentPoint[1])
            }
        }
    }
    if (moveText) {
        for (let item of moveG.children) {
            if (item.tagName === 'text') {
                let tfnv = item.attributes.transform.nodeValue
                let tfnvArray = tfnv.split(/\(|,|\)/)
                let tx = parseInt(tfnvArray[1])
                let ty = parseInt(tfnvArray[2])
                let tStr = `translate(${tx + moveX},${ty + moveY})`
                item.setAttribute('transform', tStr)
                svg[gIndex].text.transform = tStr
            }
        }
    }
    mouseStartX = mouseStartX + moveX
    mouseStartY = mouseStartY + moveY
}

startMovePoint = (ev, index, objIndex) => {
    movePoint = true
    mouseStartX = ev.x
    mouseStartY = ev.y
    gIndex = objIndex
    moveG = document.getElementById('myg' + gIndex)
    moveP = moveG.children[index + 1]
    pointIndex = index
}

stopMovePoint = () => {
    movePoint = false
    mouseStartX = 0
    mouseStartY = 0
    moveG = null
    moveP = null
    pointIndex = 0
}

startMoveText = (objIndex) => {
    let ev = window.event
    mouseStartX = ev.x
    mouseStartY = ev.y
    gIndex = objIndex
    moveG = document.getElementById('myg' + gIndex)
    moveText = true
}

stopMoveText = () => {
    moveText = false
    mouseStartX = 0
    mouseStartY = 0
    moveG = null
}