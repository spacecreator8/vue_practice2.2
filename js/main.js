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
        <form>
            <p><b>Заголовок:</b> <input type="text" v-model="blank.title"></p>
            <p>Задача - 1: <input type="text" v-model="blank.tasks[0].name"></p>
            <p>Задача - 2: <input type="text" v-model="blank.tasks[1].name"></p>
            <p>Задача - 3: <input type="text" v-model="blank.tasks[2].name"></p>
            <p v-if="!hiddenFlag4">Задача - 4: <input type="text" v-model="blank.tasks[3].name"></p>
            <p v-if="!hiddenFlag5">Задача - 5: <input type="text" v-model="blank.tasks[4].name"></p>
            <button v-if="hiddenFlag5" @click.prevent="addTask">+++</button>
            <button  @click.prevent="customSubmit">Добавить</button>
        </form>
    `,
    data(){
        return {
            hiddenFlag4: true,
            hiddenFlag5: true,

            blank:{
                title: null,
                tasks:{
                    task1: {
                        name: null,
                        activity: false
                    },
                    task2: {
                        name: null,
                        activity: false
                    },
                    task3: {
                        name: null,
                        activity: false
                    },
                    task4: {
                        name: null,
                        activity: false
                    },
                    task5: {
                        name: null,
                        activity: false
                    },
                }
            }
        }
    },
    methods:{
        addTask(){
            if(this.hiddenFlag4){
                this.hiddenFlag4 = false;
            }else{
                this.hiddenFlag5 = false;
            }
        },
        customSubmit(){//Буду делать через object.assign - 
            let copy = Object.assign({}, this.blank);
            copy
        }

    }
})

let app = new Vue({
    el: '#app',

})