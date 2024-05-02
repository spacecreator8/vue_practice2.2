let eventBus = new Vue();

Vue.component('list_with_tasks', {
    props:{
        list: {
            type: Object,
            required: true,
        }
    },
    template: `
        <div class="list">
            <h3>{{list.title}}</h3>
            <p><input type="checkbox" v-model="list.tasks.task1.activity" @click="checkboxClick">{{list.tasks.task1.name}}</p>
            <p><input type="checkbox" v-model="list.tasks.task2.activity" @click="checkboxClick">{{list.tasks.task2.name}}</p>
            <p><input type="checkbox" v-model="list.tasks.task3.activity" @click="checkboxClick">{{list.tasks.task3.name}}</p>
            <p v-if="list.tasks.task4.name"><input type="checkbox" v-model="list.tasks.task4.activity" @click="checkboxClick">{{list.tasks.task4.name}}</p>
            <p v-if="list.tasks.task5.name"><input type="checkbox" v-model="list.tasks.task5.activity" @click="checkboxClick">{{list.tasks.task5.name}}</p>
        </div>
    `,
    methods:{//Метод реагирует. Есть подозрение что при дальнейшем написании логики она будет применяться ко всем экземплярам компонента - потому что нет идентификации. Данные изменяются в конкретном объекте не затрагивая сторонние объекты
        checkboxClick(){
            console.log(this.list);
        }
    }
})

Vue.component('column', {
    props:{
        column_name:{
            type: String,
            required: true,
        },
        column_id:{
            type: String,
            required: true,
        }
        
    },
    data(){
        return{
            listsArray: [],
        }
    },
    template:`
        <div class="column">
            <p>{{column_name}}</p>
            <div  v-if="listsArray" v-for="list in listsArray">
                <list_with_tasks :list="list"></list_with_tasks>
            </div>
        </div>
    `,
    mounted(){
        eventBus.$on('takeFromForm', function(copy){//Вроде работает нормально, данные выводятся в столбце
            if(this.column_id =='first'){
                this.listsArray.push(copy);
            }
        }.bind(this))
    },
})

Vue.component('creator', {
    template:`
        <form>
            <p><b>Заголовок:</b> <input type="text" v-model="blank.title"></p>
            <p>Задача - 1: <input type="text" v-model="blank.tasks.task1.name"></p>
            <p>Задача - 2: <input type="text" v-model="blank.tasks.task2.name"></p>
            <p>Задача - 3: <input type="text" v-model="blank.tasks.task3.name"></p>
            <p v-if="!hiddenFlag4">Задача - 4: <input type="text" v-model="blank.tasks.task4.name"></p>
            <p v-if="!hiddenFlag5">Задача - 5: <input type="text" v-model="blank.tasks.task5.name"></p>
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


        customSubmit(){//Проверил, копирование адекватное, после копирования обнулил болванку, вывел копию в консоль - данные сохранились в копии после сброса болванки.
            let copy = Object.assign({}, this.blank);
            
            copy.tasks = Object.assign({}, this.blank.tasks);
            for(let i in this.blank.tasks){
                copy.tasks[i] = Object.assign({}, this.blank.tasks[i]);
            }
            this.blank = {
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
            eventBus.$emit('takeFromForm', copy);
        }

    }
})

let app = new Vue({
    el: '#app',

})