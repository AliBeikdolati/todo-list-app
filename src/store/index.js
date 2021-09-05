import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);



export default new Vuex.Store({
    state: {
        todos: [],
        step: 1,
        token: '',
        expired_at: 0,
        user: {
            id: 0,
            name: "",
            family: "",
            phone_number: "",
            avatar: "",
            gender: 1
        },
        auth: false,
        permissions: [],
        loading: true,
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
        },

        changedLoginState: (state, payload) => {
            state.step = payload;
        },

        loginedSuccess: (state, payload) => {
            state.token = payload.token;
            state.expired_at = payload.expired_at;
            state.user = payload.user;
            state.permissions = payload.permissions;
            state.auth = true;
            localStorage.setItem("user", JSON.stringify(payload));
            localStorage.setItem("auth", JSON.stringify(state.auth));
        },
        setLoading: (state, payload) => {
            state.loading = payload;

        },

        setAuthentication: (state, payload) => {
            state.auth = payload;
        }
    },
    actions: {
        addTodos: ({commit}, payload) => {
            commit('addedTodo', payload);
        },

        editTodo: ({commit}, payload) => {
            commit('editedTodo', payload);
        },

        changeLoginState: ({ commit }, payload) => {
            commit('changedLoginState', payload);
        },

        loginSuccess: ({ commit }, payload) => {
            commit('loginedSuccess', payload);
        },

        loading: ({ commit }, payload) => {
            commit('setLoading', payload);
        },

        setAuth: ({ commit }, payload) => {
            commit('setAuthentication', payload);
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
