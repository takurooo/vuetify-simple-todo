<template>
  <v-text-field
    @input="$store.commit('setSearchWord', $event)"
    @focus="hasFocus = true"
    @blur="hasFocus = false"
    :value="$store.state.searchWord"
    :disabled="$store.state.sorting"
    class="expanding-search mt-1"
    :class="{ closed: !hasFocus && !$store.state.searchWord }"
    :solo-inverted="searchFieldActive"
    color="green"
    placeholder="Search"
    prepend-inner-icon="mdi-magnify"
    dense
    :clearable="searchFieldActive"
    hide-details
    flat
  ></v-text-field>
</template>

<script>
export default {
  data() {
    return {
      hasFocus: false,
    };
  },
  computed: {
    searchFieldActive() {
      if (this.hasFocus || this.$store.state.searchWord) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.expanding-search {
  transition: max-width 0.3s;
  .v-input__slot {
    cursor: pointer !important;
    &:before,
    &:after {
      border-color: transparent !important;
    }
  }
  &.closed {
    max-width: 25px;
    .v-input__slot {
      background: transparent !important;
    }
  }
}
</style>
