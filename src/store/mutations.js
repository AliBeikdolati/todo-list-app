export default {
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
}