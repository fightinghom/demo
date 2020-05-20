let lang
$(document).ready(() => {
    lang = $('.lang')
    console.log(document.getElementsByClassName('lang-lua')[0].parentNode.children[2] === document.getElementsByClassName('lang-lua')[0])
    let liList = getDom('tag', 'li')
    changeDomCss(liList[1], {'transform': 'translateX(200px)'})
    setOneDomAttr(liList[1], {
        'data-aaa' : 'a',
        'data-bbb' : 'b'
    })
    haveCallback('mishle', 
    name => {
        console.log(name+' done')
    },
    name => {
        console.log(name+' can’t done')
    })

   otherCallback()(1)
 
})

showit = () => {
    lang
    .animate({marginTop: '100px'},'slow')
    .animate({marginLeft: '100px'},'slow')
    .animate({marginLeft: '0px'},'slow')
    .animate({marginTop: '0px'},'slow', () => {
        lang.toggleClass('animatio-add')
    })
    document.getElementsByClassName('lang')[0].setAttribute('data-val', 2)
    
}

stopit = () => {
    lang.stop(true, false)
}

haveCallback = (name, done, cantDone) => {
    if(name === 'mark') {
        done(name)
    } else {
        cantDone(name)
    }
}


otherCallback = function() {
    var v = 0
    return function(value) {
       if(value > v) {
           console.log(`then ${v}`)
       }
    }
}