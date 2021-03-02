<template>
  <div>
    <v-menu offset-y bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon dark v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-horizontal</v-icon>
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

    <dialog-delete-all-done-task
      v-if="dialogs.delete"
      @close="dialogs.delete = false"
    />
  </div>
</template>

<script>
export default {
  data: () => ({
    dialogs: {
      delete: false,
    },
    items: [
      {
        title: 'Delete all completed task',
        icon: 'mdi-trash-can-outline',
        click() {
          this.dialogs.delete = true;
        },
      },
    ],
  }),
  methods: {
    handleClick(index) {
      this.items[index].click.call(this);
    },
  },
  components: {
    'dialog-delete-all-done-task': require('@/components/Todo/Dialog/DialogDeleteAllDoneTask.vue')
      .default,
  },
};
</script>
