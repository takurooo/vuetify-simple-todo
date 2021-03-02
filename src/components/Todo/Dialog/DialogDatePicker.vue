<template>
  <v-dialog ref="dialog" :value="true" persistent width="290px">
    <v-date-picker v-model="date" color="green" scrollable>
      <v-spacer></v-spacer>
      <v-btn text @click="cancelDueDateDialog">
        Cancel
      </v-btn>
      <v-btn text @click="saveDueDateDialog">
        OK
      </v-btn>
    </v-date-picker>
  </v-dialog>
</template>

<script>
export default {
  props: {
    initDate: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      date: '',
    };
  },
  methods: {
    cancelDueDateDialog() {
      this.date = '';
      this.$emit('close', '');
    },
    saveDueDateDialog() {
      this.$emit('close', this.date);
    },
  },
  mounted() {
    if (this.initDate) {
      this.date = this.initDate;
    }
  },
};
</script>
