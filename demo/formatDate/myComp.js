window.onload = () => {
    var app = new Vue({
        el: '#my-comp',
        data() {
            return {
                message: '这 是 个 vue 组 件'
            }
        },
        components: {
            listItem: listItem
        },
        methods: {
            changeText() {
                this.message = this.message.split(' ').reverse().join(' ')
            }
        },
    })
}

var listItem = Vue.component('list-item',{
    /* name: 'listItem', */
    props:['item'],
    data() {
        return {
            list:[1,2,3,4,5]
        }
    },
    template:`<li>{{item}}---
        <div v-for="citem of list" :key="citem">{{citem}}</div>
    </li>`
})