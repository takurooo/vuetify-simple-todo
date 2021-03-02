<template>
  <div>
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" color="black">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <dialog-edit-task
      v-if="dialogs.edit"
      @close="dialogs.edit = false"
      :task="task"
    />
    <dialog-delete-task
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
      :task="task"
    />
  </div>
</template>

<script>
export default {
  props: ['task'],

  data() {
    return {
      dialogs: {
        edit: false,
        dueDate: false,
        delete: false,
      },
      items: [
        {
          title: 'Edit',
          icon: 'mdi-pencil-outline',
          click() {
            this.dialogs.edit = true;
          },
        },
        {
          title: 'Delete',
          icon: 'mdi-trash-can-outline',
          click() {
            this.dialogs.delete = true;
          },
        },
      ],
    };
  },
  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    },
  },
  components: {
    'dialog-edit-task': require('@/components/Todo/Dialog/DialogEditTask.vue')
      .default,
    'dialog-delete-task': require('@/components/Todo/Dialog/DialogDeleteTask.vue')
      .default,
  },
};
</script>
