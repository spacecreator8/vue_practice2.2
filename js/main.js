let eventBus = new Vue();

Vue.component('list', {
 
})

Vue.component('column', {
    props:{
        column_name:{
            type: String,
            required: true,
        }
    },
    template:`
        <p>Колонка {{column_name}}</p>
    `,
})

Vue.component('creator', {
    template:`
        <p>Это creator</p>
    `
})

let app = new Vue({
    el: '#app',

})