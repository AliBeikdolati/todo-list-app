import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);



export default new Vuex.Store({
    state: {
        // todos: [
        //     {
        //         id: 0,
        //         name: 'طراحی صفحه ورود',
        //         description: 'طراحی صفحه ورود که هویت فرد را بررسی میکند و در صورت عضویت لیست کارها را نمایش می دهد.',
        //         status: 0
        //     },
        //     {
        //         id: 1,
        //         name: 'پیاده سازی صفحه ورود',
        //         description: 'طراحی صفحه ورود که هویت فرد را بررسی میکند و در صورت عضویت لیست کارها را نمایش می دهد.',
        //         status: 0
        //     },
        //     {
        //         id: 2,
        //         name: 'بک اند صفحه ورود',
        //         description: 'طراحی صفحه ورود که هویت فرد را بررسی میکند و در صورت عضویت لیست کارها را نمایش می دهد.',
        //         status: 0
        //     },
        // ]
        todos: [],
    },
    mutations: {
        addedTodo: (state, payload) => {
            state.todos.push({
                id: state.todos.length,
                name: payload.name,
                description: payload.description,
                status: payload.status
            });
            localStorage.setItem("todo", JSON.stringify(state.todos));
        },

        editedTodo: (state, payload) => {
            state.todos = state.todos.map((key) => {
                if (key.id === payload.id) {
                    return payload
                } else {
                    return key;
                }
            });
            localStorage.setItem("todo", JSON.stringify(state.todos));
        }
    },
    actions: {
        addTodos: ({commit}, payload) => {
            commit('addedTodo', payload);
        },

        editTodo: ({commit}, payload) => {
            commit('editedTodo', payload);
        }
    },
    getters: {
        getTodoList: (state) => {
            return state.todos.filter((todo) => {
                return todo.status === 0;
            })
        },
        getInProgressTodoList: (state) => {
            return state.todos.filter((todo) => {
                return todo.status === 1;
            })
        },
        getDoneTodoList: (state) => {
            return state.todos.filter((todo) => {
                return todo.status === 2;
            })
        }
    },
    modules: {
    }
})
