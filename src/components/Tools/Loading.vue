<template>
  <div class="loading">
    <v-progress-circular
      :size="70"
      :width="7"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<style>
.loading {
  left: 50%;
  opacity: 0.8;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%); /* %は自身の幅に対する割合 */
}
</style>
