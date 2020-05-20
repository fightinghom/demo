

let showTime
let timer
let defaultFormat = `{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}`
let nowFormat = `{yyyy}-{MM}-{dd} {hh}:{mm}:{ss}`
window.onload = ()=> {
    showTime = document.getElementById('showTime')
    timer = setInterval(()=> {
        showTime.innerHTML = formatDate(null , null)
    }, 1000)
}

function getCurrentPosition(){
    var options={
        enableHighAccuracy:true,
        timeout:60000,
        maximumAge:60000
    }
    navigator.geolocation.getCurrentPosition(
    positon => {
        console.log(positon)
    }, 
    error => {
        console.log(error)
    },
    options)
}

formatDate = (format, dt) => {
    let matchList = {
        'yyyy': 'getFullYear',
        'MM': 'getMonth',
        'dd': 'getDate',
        'hh': 'getHours',
        'mm': 'getMinutes',
        'ss': 'getSeconds'
    }
    if(!format) {
        format = defaultFormat
    }
    let thisFormat = format
    if(!dt) {
        dt = new Date()
    }

    less10 = (value) => {
        return value < 10 ? '0' + value : value
    }

    /* matchList.map((item, index, key) => {
        if(thisFormat. match(key)) {
            let value = less10(dt[item]()
            thisFormat = thisFormat.replace(`{${key}}`, value)
        }
    }) */
    for(let key in matchList) {
        if(thisFormat.match(key)) {
            let value = less10(dt[matchList[key]]())
            thisFormat = thisFormat.replace(`{${key}}`,value)
        }
    }

    return thisFormat

}

changeFormat = () => {
    clearInterval(timer)
    let format = prompt(`请输入您的时间模板如: {yyyy}-{MM}-{dd} {hh}:{mm}:{ss}`)
    nowFormat = format === null ? nowFormat : format
    timer = setInterval(() => {
        showTime.innerHTML = formatDate(nowFormat , null)
    }, 1000)
}

reset = () => {
    clearInterval(timer)
    timer = setInterval(() => {
        showTime.innerHTML = formatDate(defaultFormat , null)
        nowFormat = defaultFormat
    }, 1000)
}