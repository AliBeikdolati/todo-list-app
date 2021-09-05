<template>
    <div class="home">
        <vs-row vs-w="11" vs-justify="center">
            <vs-col vs-type="flex" class="page-title-header">
                <h2 class="page-title">لیست کارها</h2>
                <AddTodo class="add-todo-btn"/>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-lg="4" vs-sm="4" vs-xs="12">
                <div class="todo-list todo">
                    <div class="list-header">
                        <h3 class="list-title">
                            کارهای شروع نشده
                        </h3>
                        <span class="todo-list--count">
                            {{ getTodoList.length }}
                        </span>
                    </div>
                    <!--                    {{ todos }}-->
                    <template v-for="(todo, key) in getTodoList">
                        <TodoCard :key="key" :todo="todo"/>
                    </template>
                    <template v-if="getTodoList.length === 0">
                        چیزی برای نمایش وجود ندارد.
                    </template>

                </div>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-lg="4" vs-sm="4" vs-xs="12">
                <div class="todo-list inProgress">
                    <div class="list-header">
                        <h3 class="list-title">
                            کارهای درحال انجام
                        </h3>
                        <span class="todo-list--count">
                            {{ getInProgressTodoList.length }}
                        </span>
                    </div>
                    <!--                    {{ todos }}-->
                    <template v-for="(todo, key) in getInProgressTodoList">
                        <TodoCard :key="key" :todo="todo"/>
                    </template>
                    <template v-if="getInProgressTodoList.length === 0">
                        چیزی برای نمایش وجود ندارد.
                    </template>
                </div>
            </vs-col>
            <vs-col vs-type="flex" vs-justify="center" vs-lg="4" vs-sm="4" vs-xs="12">
                <div class="todo-list done">
                    <div class="list-header">
                        <h3 class="list-title">
                            کارهای انجام شده
                        </h3>
                        <span class="todo-list--count">
                            {{ getDoneTodoList.length }}
                        </span>
                    </div>
                    <!--                    {{ todos }}-->
                    <template v-for="(todo, key) in getDoneTodoList">
                        <TodoCard :key="key" :todo="todo"/>
                    </template>
                    <template v-if="getDoneTodoList.length === 0">
                        چیزی برای نمایش وجود ندارد.
                    </template>

                </div>
            </vs-col>
        </vs-row>
    </div>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'
    import {mapState, mapActions, mapGetters} from 'vuex';
    import { gsap } from 'gsap'

    // import { PlusIcon } from 'vue-feather-icons'

    import TodoCard from "../components/TodoCard";
    import AddTodo from "../components/AddTodo";

    export default {
        name: 'Home',
        components: {
            // HelloWorld
            TodoCard,
            AddTodo,
            // PlusIcon,
        },
        methods: {
            ...mapActions([
                "addTodos",
                'loading',
                'setAuth'
            ])
        },
        computed: {
            ...mapState([
                'todos',
                'auth'
            ]),
            ...mapGetters([
                'getTodoList',
                'getInProgressTodoList',
                'getDoneTodoList'
            ]),
        },
        mounted() {
            let storedNames = JSON.parse(localStorage.getItem("todo"));
            console.log(storedNames);
            if (storedNames.length && this.todos.length === 0) {
                for (let i = 0; i < storedNames.length; i++) {
                    this.addTodos(storedNames[i]);
                }
            }
            this.loading(false);

            gsap.from('.todo', {
                duration: 1,
                y: 100,
                opacity: 0
            })

            gsap.from('.inProgress', {
                duration: 1,
                delay: .5,
                y: 100,
                opacity: 0,
            })

            gsap.from('.done', {
                duration: 1,
                delay: 1,
                y: 100,
                opacity: 0
            })

            gsap.from('.page-title', {
                duration: 2,
                x: 100,
                opacity: 0,
            })

            gsap.from('.add-todo-btn', {
                duration: 2,
                x: -100,
                opacity: 0
            })
        },
        created() {
            let auth1 = JSON.parse(localStorage.getItem("auth"));
            // if( ! user || user.expired_at > Date.now() ) {
            //     this.$router.push('/login');
            // }
            if (auth1 == null) {
                localStorage.setItem("auth", JSON.stringify(this.auth));
            } else {
                this.setAuth(auth1);
            }

        }
    }
</script>


<style lang="scss" scoped>
    .home {
        display: flex;
        justify-content: center;
    }

    .page-title-header {
        display: flex;
        justify-content: space-between;
        padding: 15px;


    }

    .addtodo-btn__text {
        display: flex !important;
        align-items: center;

        .custom-class {
            margin: 0 5px;
        }
    }

    .todo-list {
        background-color: #f2f2f2;
        border-radius: 10px;
        width: 100%;
        padding: 15px 25px;
        margin: 10px;
        text-align: right;

        .list-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
    }
</style>
