import axios from 'axios';
// import { format, isWithinInterval } from 'date-fns';
import { format, isWithinInterval, parseISO } from 'date-fns';

export const todoModule = {
  namespaced: true,
  state: {
    tasks: [],
  },
  getters: {
    taskDone(state) {
      const tasks = state.tasks.filter(task => task.done);
      return tasks;
    },
    taskToday(state) {
      let today = format(new Date(), 'yyyy-MM-dd');
      let tasks = state.tasks.filter(task => task.dueDate === today);
      return tasks;
    },
    taskWeek(state) {
      let sunday = new Date();
      sunday.setDate(sunday.getDate() - sunday.getDay());
      sunday = format(sunday, 'yyyy-MM-dd'); // remove HH:mm:ss

      let saturday = new Date();
      saturday.setDate(saturday.getDate() + (6 - saturday.getDay()));
      saturday = format(saturday, 'yyyy-MM-dd'); // remove HH:mm:ss

      let tasks = state.tasks.filter(task => {
        const ret = isWithinInterval(parseISO(task.dueDate), {
          start: parseISO(sunday),
          end: parseISO(saturday),
        });
        return ret;
      });
      return tasks;
    },
    numOfTask(state) {
      return state.tasks.length;
    },
    numOfTaskToday(state, getters) {
      return getters.taskToday.length;
    },
    numOfTaskWeek(state, getters) {
      return getters.taskWeek.length;
    },
    numOfUnfinishedTask(state) {
      const unfinishedTasks = state.tasks.filter(task => !task.done);
      return unfinishedTasks.length;
    },
    numOfUnfinishedTaskToday(state, getters) {
      const tasks = getters.taskToday;
      const unfinishedTasks = tasks.filter(task => !task.done);
      return unfinishedTasks.length;
    },
    numOfUnfinishedTaskWeek(state, getters) {
      const tasks = getters.taskWeek;
      const unfinishedTasks = tasks.filter(task => !task.done);
      return unfinishedTasks.length;
    },
    taskFiltered(state, getters, rootState /*, rootGetters*/) {
      if (rootState.searchWord) {
        return state.tasks.filter(task =>
          task.title.toLowerCase().includes(rootState.searchWord.toLowerCase()),
        );
      }
      return state.tasks;
    },
    taskFilteredToday(state, getters, rootState /*, rootGetters*/) {
      const tasks = getters.taskToday;
      if (rootState.searchWord) {
        return tasks.filter(task =>
          task.title.toLowerCase().includes(rootState.searchWord.toLowerCase()),
        );
      }
      return tasks;
    },
    taskFilteredWeek(state, getters, rootState /*, rootGetters*/) {
      const tasks = getters.taskWeek;
      if (rootState.searchWord) {
        return tasks.filter(task =>
          task.title.toLowerCase().includes(rootState.searchWord.toLowerCase()),
        );
      }
      return tasks;
    },
  },
  mutations: {
    addTask(state, newTask) {
      state.tasks.push(newTask);
    },
    doneTask(state, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      task.done = !task.done;
    },
    deleteTask(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    updateTask(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.title = payload.title;
      task.dueDate = payload.dueDate;
    },
    updateTaskTitle(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.title = payload.title;
    },
    updateTaskDueDate(state, payload) {
      let task = state.tasks.filter(task => task.id === payload.id)[0];
      task.dueDate = payload.dueDate;
    },
    setTasks(state, payload) {
      state.tasks = payload;
    },
  },
  actions: {
    async addTask({ state, commit }, payload) {
      let newDisplayOrder = 0;
      if (state.tasks.length) {
        const task = state.tasks[state.tasks.length - 1];
        newDisplayOrder = task.displayOrder + 1;
      }

      const newTask = {
        id: String(Date.now()),
        title: payload.title,
        done: false,
        dueDate: payload.dueDate,
        displayOrder: newDisplayOrder,
      };

      try {
        const res = await axios.post('/tasks', newTask);
        console.log('addTask', res);
        if (res.data) {
          commit('addTask', res.data);
          commit('showSnackbar', 'Task added!!', { root: true });
        }
      } catch (error) {
        alert(error);
      }
    },

    async doneTask({ state, commit }, id) {
      let task = state.tasks.filter(task => task.id === id)[0];
      const body = {
        id: task.id,
        done: !task.done,
      };
      try {
        const res = await axios.put('/tasks/' + id, body);
        if (res.data.id) {
          commit('doneTask', res.data.id);
        }
        console.log('doneTask', res);
      } catch (error) {
        alert(error);
      }
    },

    async deleteTask({ commit }, id) {
      try {
        const res = await axios.delete('/tasks/' + id);
        if (res.data.id) {
          commit('deleteTask', res.data.id);
          commit('showSnackbar', 'Task deleted', { root: true });
        }
        console.log('deleteTask', res);
      } catch (error) {
        alert(error);
      }
    },

    async updateTask({ commit }, task) {
      try {
        const res = await axios.put('/tasks/' + task.id, task);
        if (res.data) {
          commit('updateTask', res.data);
          commit('showSnackbar', 'Task updated', { root: true });
        }
        console.log('updateTask', res);
      } catch (error) {
        alert(error);
      }
    },

    async updateTaskTitle({ commit }, payload) {
      try {
        const res = await axios.put('/tasks/' + payload.id, payload);
        if (res.data) {
          commit('updateTaskTitle', res.data);
          commit('showSnackbar', 'Task title updated', { root: true });
        }
        console.log('updateTaskTitle', res);
      } catch (error) {
        alert(error);
      }
    },

    async updateTaskDueDate({ commit }, payload) {
      try {
        const res = await axios.put('/tasks/' + payload.id, payload);
        if (res.data) {
          commit('updateTaskDueDate', res.data);
          commit('showSnackbar', 'Due Date updated', { root: true });
        }
        console.log('updateTaskDueDate', res);
      } catch (error) {
        alert(error);
      }
    },

    async setTasks({ commit }, tasks) {
      // axiosの後にcommitを呼ぶとドラッグで並び替えた時に一瞬タスクがぶれる現象がでる.
      // 表示側の反映を優先させるためにcommitを先に実行する.
      commit('setTasks', tasks);

      const body = {
        tasks: tasks,
      };

      try {
        const res = await axios.put('/tasks', body);
        console.log('setTasks', res);
      } catch (error) {
        alert(error);
      }
    },

    async getTasks({ commit }) {
      commit('toggleLoading', null, { root: true });
      commit('setTasks', []);

      try {
        const res = await axios.get('/tasks');
        if (res.data.tasks) {
          const tasks = res.data.tasks;
          tasks.sort(function(a, b) {
            // ascending order by displayOrder
            if (a.displayOrder < b.displayOrder) return -1;
            if (a.displayOrder > b.displayOrder) return 1;
          });
          commit('setTasks', tasks);
        }
      } catch (error) {
        alert(error);
      }
      commit('toggleLoading', null, { root: true });
    },
  },
};
