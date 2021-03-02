<template>
  <div>
    <v-dialog :value="true" width="400px" persistent>
      <v-card>
        <v-card-title class="white--text green lighten-1">
          Edit task
        </v-card-title>

        <v-container>
          <v-row class="mx-2">
            <v-col cols="12">
              <v-text-field
                autofocus
                v-model="taskTitle"
                placeholder="Task title"
                color="green"
                hide-details=""
                clearable
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row class="mx-2">
            <v-col cols="12">
              <v-icon color="green" @click="dialogs.datePicker = true">
                mdi-calendar
              </v-icon>
            </v-col>
          </v-row>

          <v-row class="mx-2">
            <v-col cols="12">
              <v-chip v-if="dueDate" close @click:close="dueDate = ''" outlined>
                {{ dueDate | toDsplayableDate }}
              </v-chip>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="cancel">
            Cancel
          </v-btn>
          <v-btn
            text
            @click="addTask"
            :disabled="taskTitleInvalid || notEdited"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <dialog-date-picker
      v-if="dialogs.datePicker"
      :initDate="dueDate"
      @close="closeDialogDatePicker"
    ></dialog-date-picker>
  </div>
</template>

<script>
import { format } from 'date-fns';
import utilsMixin from '@/mixin/utils.js';

export default {
  props: ['task'],
  mixins: [utilsMixin],
  data() {
    return {
      dialogs: {
        datePicker: false,
      },
      taskTitle: '',
      dueDate: '',
    };
  },
  filters: {
    niceDate(value) {
      if (value) {
        return format(new Date(value), 'yyyy/MM/dd E');
      }
      return '';
    },
  },
  mounted() {
    this.taskTitle = this.task.title;
    this.dueDate = this.task.dueDate;
  },
  computed: {
    taskTitleInvalid() {
      return !this.taskTitle;
    },
    notEdited() {
      return (
        this.taskTitle === this.task.title && this.dueDate === this.task.dueDate
      );
    },
  },
  methods: {
    addTask() {
      if (this.taskTitleInvalid) {
        return;
      }

      if (this.notEdited) {
        return;
      }

      this.task.title = this.taskTitle;
      this.task.dueDate = this.dueDate;

      this.$store.dispatch('todo/updateTask', this.task);

      this.taskTitle = '';
      this.dueDate = '';
      this.$emit('close');
      // this.$vuetify.goTo(0, { duration: 0 });
    },
    closeDialogDatePicker(date) {
      if (date) {
        this.dueDate = date;
      }
      this.dialogs.datePicker = false;
    },
    cancel() {
      console.log('cancel');
      this.$emit('close');
    },
  },
  components: {
    'dialog-date-picker': require('@/components/Todo/Dialog/DialogDatePicker.vue')
      .default,
  },
};
</script>
