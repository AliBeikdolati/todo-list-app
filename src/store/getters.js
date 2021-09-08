export default {
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
}