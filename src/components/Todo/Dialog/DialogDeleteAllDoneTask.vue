<template>
  <v-dialog :value="true" persistent max-width="280">
    <v-card>
      <v-card-title class="headline">
        Delete all completed task?
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('close')" text>
          No
        </v-btn>
        <v-btn @click.stop="deleteAllDoneTask" color="red darken-1" text>
          Yes
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  methods: {
    deleteAllDoneTask() {
      const tasks = this.$store.getters['todo/taskDone'];
      for (const task of tasks) {
        this.$store.dispatch('todo/deleteTask', task.id);
      }
      this.$emit('close');
    },
  },
};
</script>
