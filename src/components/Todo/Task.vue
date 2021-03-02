<template>
  <div>
    <v-list-item
      @click="$store.dispatch('todo/doneTask', task.id)"
      :class="{ 'green lighten-5': task.done }"
      class="white"
      :ripple="false"
    >
      <template v-slot:default>
        <v-list-item-action>
          <v-checkbox :input-value="task.done" color="green"></v-checkbox>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title
            :class="{ 'text-decoration-line-through': task.done }"
          >
            {{ task.title }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ task.dueDate | toDsplayableDate }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
          <task-menu :task="task" />
        </v-list-item-action>

        <v-list-item-action v-if="$route.path === '/'">
          <v-btn
            @click.stop="dummyClick"
            class="handle"
            color="black"
            :disabled="$store.state.searching"
            icon
          >
            <v-icon>mdi-drag-horizontal-variant</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-list-item>

    <v-divider></v-divider>
  </div>
</template>

<script>
import utilsMixin from '@/mixin/utils.js';

export default {
  props: ['task'],
  mixins: [utilsMixin],
  methods: {
    dummyClick() {
      // DO NOTHING
    },
  },
  components: {
    'task-menu': require('@/components/Todo/TaskMenu.vue').default,
  },
};
</script>

<style lang="scss">
.sortable-ghost {
  opacity: 0;
}
.sortable-drag {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>
