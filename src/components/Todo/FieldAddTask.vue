<template>
  <v-text-field
    v-model="newTaskTitle"
    @keyup.enter="addTask"
    class="pa-2"
    outlined
    placeholder="Add Task ..."
    hide-details=""
    color="green"
    clearable
  >
    <!-- 
      append-outer-iconでv-text-fieldにアイコンをつけてしまうと
      disabledが使用できないのでtemplateを使用してアイコンを貼り付ける
     -->
    <template v-slot:append>
      <v-icon @click="addTask" :disabled="newTaskTitleInvalid">mdi-plus</v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  data() {
    return {
      newTaskTitle: '',
    };
  },
  computed: {
    newTaskTitleInvalid() {
      return !this.newTaskTitle;
    },
  },
  methods: {
    addTask() {
      if (this.newTaskTitleInvalid) {
        return;
      }
      this.$store.dispatch('todo/addTask', {
        title: this.newTaskTitle,
        dueDate: '',
      });
      this.newTaskTitle = '';
    },
  },
};
</script>

<style lang="scss">
// .field-add-task.v-input--is-focused {
//   .v-input__slot {
//     background-color: rgba(31, 94, 129, 0.5) !important;
//   }
// }
//
</style>
