<template>
  <div>
    <v-container>
      <v-row class="mt-10 " justify="center">
        <div class="font-weight-black text-h5 green--text ">
          {{ items[itemIndex].message }}
        </div>
      </v-row>
      <v-row class="mt-1" justify="center">
        <v-img
          :src="items[itemIndex].src"
          max-height="400"
          max-width="400"
        ></v-img>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemIndex: null,
      items: [
        { src: 'notask1.jpg', message: 'No Tasks Well Done' },
        { src: 'notask2.jpg', message: 'No Tasks Good For You' },
      ],
    };
  },
  created() {
    const min = 0;
    const max = this.items.length;
    this.itemIndex = Math.floor(Math.random() * (max - min) + min);
  },
};
</script>

<style>
.no-tasks-img {
  left: 50%;
  opacity: 0.8;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%); /* %は自身の幅に対する割合 */
}
</style>
