import Vue from 'vue';
import Vuex from 'vuex';
import Localbase from 'localbase';
import { todoModule } from '@/store/todo';

let db = new Localbase('db');
db.config.debug = false;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appTitle: process.env.VUE_APP_TITLE,
    searchWord: null,
    searching: false,
    sorting: false,
    loading: false,
    snackbar: {
      show: false,
      text: '',
    },
  },
  mutations: {
    setSearchWord(state, value) {
      state.searchWord = value;
      if (state.searchWord) {
        state.searching = true;
      } else {
        state.searching = false;
      }
    },
    toggleSorting(state) {
      state.sorting = !state.sorting;
    },
    toggleLoading(state) {
      state.loading = !state.loading;
    },
    showSnackbar(state, text) {
      let timeout = 0;
      if (state.snackbar.show) {
        state.snackbar.show = false;
        timeout = 300;
      }
      setTimeout(() => {
        state.snackbar.show = true;
        state.snackbar.text = text;
      }, timeout);
    },
    hideSnackbar(state) {
      state.snackbar.show = false;
      state.snackbar.text = '';
    },
  },
  modules: {
    todo: todoModule,
  },
});
