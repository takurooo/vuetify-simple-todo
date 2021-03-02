<template>
  <div>
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialogs.addTask = true"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <dialog-add-task
      v-if="dialogs.addTask"
      @close="dialogs.addTask = false"
    ></dialog-add-task>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogs: {
        addTask: false,
      },
    };
  },
  components: {
    'dialog-add-task': require('@/components/Todo/Dialog/DialogAddTask.vue')
      .default,
  },
};
</script>
