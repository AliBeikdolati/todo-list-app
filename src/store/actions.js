export default {
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
}