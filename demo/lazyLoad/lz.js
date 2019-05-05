let lazyList        //需要懒加载的图片列表
let wapper          //被滚动的容器
let screenHeigjt    //屏幕高度
let haveLookHeight  //经过可视区域总高度
window.onload = () => {
    wapper = document.getElementsByClassName('wapper')[0]
    screenHeigjt = document.documentElement.clientHeight || document.body.clientHeight
    initList()
    //加载可见区域已经出现的具有懒加载标记的图片
    checkLoad()
}

/**
 * 初始化懒加载列表
 * 
 */
initList = () => {
    //将html集合转换为数组后才能使用map方法，html集合没有map方法。
    lazyList = Array.prototype.slice.call(document.getElementsByClassName('lazy_load'))
    lazyList = lazyList.map(item => {
        //添加isLoad标记，避免重复赋值
        console.log(item.offsetTop)
        item.isLoad = false
        return item
    })  
}

/**
 * 被滚动容器的滚动事件
 * scrollTop表示容器的滑动长度
 * haveLookHeight表示经过可视区域的总高度，该值等于屏幕高度+容器滑动长度
 */
checkLoad = function() {
    let scrollTop = wapper.scrollTop || wapper.scrollTop
    haveLookHeight = scrollTop + screenHeigjt
    loadImg()
}

/**
 * 加载图片
 * 当倾国可视区域总高度大于图片距离容器顶部高度时才去加载图片
 * 图片的url地址放在data-img属性中
 */
loadImg = function() {
    lazyList = lazyList.map(item => {
        if(haveLookHeight - item.offsetTop >= 50) {
            if(!item.isLoad) {
                item.src = item.getAttribute('data-img')
                item.isLoad = true
            }
        }
        return item
    })
}

