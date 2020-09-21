// import axios from 'axios'

import axios from "axios";

const state = {
  todos: [
    {
      id: 1,
      title: "Todo one",
    },
    {
      id: 2,
      title: "Todo two",
    },
  ],
};

const getters = {
  allTodos: (state) => state.todos,
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    commit("setTodos", response.data);
  },
  async addTodo({ commit }, title) {
    const response = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title,
        completed: false,
      }
    );

    commit("newTodo", response.data);
  },
  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit("deleteTodo", id);
  },
  async filterTodos({ commit }, count) {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${parseInt(count)}`
    );

    commit("setTodos", response.data);
  },
  async updateTodo({ commit }, updTodo) {
    await axios.put(`https://jsonplaceholder.typicode.com/todos/${updTodo.id}`);

    commit("updTodo", updTodo);
  },
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  deleteTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updTodo: (state, updTodo) => {
    const index = state.todos.findIndex((todo) => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
