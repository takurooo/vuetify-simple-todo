<template>
  <v-list class="pt-0" flat>
    <draggable
      v-model="tasks"
      handle=".handle"
      @start="startDrag"
      @end="endDrag"
    >
      <task v-for="task in tasks" :key="task.id" :task="task" />
    </draggable>
  </v-list>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  props: {
    today: {
      type: Boolean,
      default: false,
    },
    week: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    tasks: {
      get() {
        if (this.today) {
          return this.$store.getters['todo/taskFilteredToday'];
        } else if (this.week) {
          return this.$store.getters['todo/taskFilteredWeek'];
        } else {
          return this.$store.getters['todo/taskFiltered'];
        }
      },
      set(value) {
        for (let i = 0; i < value.length; ++i) {
          value[i].displayOrder = i;
        }
        this.$store.dispatch('todo/setTasks', value);
      },
    },
  },
  methods: {
    startDrag() {
      this.$store.commit('toggleSorting');
    },
    endDrag() {
      this.$store.commit('toggleSorting');
    },
  },
  components: {
    task: require('@/components/Todo/Task.vue').default,
    draggable,
  },
};
</script>
