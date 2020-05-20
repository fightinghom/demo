getDom = (mykey, value) => {
    keyList = {
        'class': 'getElementsByClassName',
        'id': 'getElementById',
        'tag': 'getElementsByTagName'
    }

    if('undefined' !== typeof keyList[mykey]) {
        return document[keyList[mykey]](value)
    } else {
        return null
    }
   
}

changeDomCss = (dom, options) => {
    //是dom集合
    if(typeof dom.length !== 'undefined') {
        let domArr = Array.prototype.slice.call( dom )
        domArr.map(item => {
            changeOneDomCss(item, options)
            return ;
        })
    } else {
        changeOneDomCss(dom, options)
    }
}

changeOneDomCss = (dom, options) => {
    if(dom instanceof Object) {
        if( options instanceof Object) {
           if(typeof dom.style !== 'undefined') {
                for(let item in options) {
                    dom.style[item] = options[item]
                }
                return ;
           } else {
            throw new Error('dom error, style is undefined!')
           }
        } else {
            throw new Error('options error!')
        } 
    } else {
       throw new Error('dom error!')
    }
}

/**
 * @param dom
 * @param params
 * 
 */
setOneDomAttr = (dom, params) => {
     params instanceof Object ? function() {
        for(let key in params) {
            dom.setAttribute(key, params[key])
        }
     }() : function() {
        throw new Error('params type error!')
     }()
   /*  if(params instanceof Object) {
        for(let key in params) {
            dom.setAttribute(key, params[key])
        }
    } else {
        throw new Error('params type error!')
    } */
}