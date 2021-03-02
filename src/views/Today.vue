<template>
  <div>
    <v-chip class="ma-2" color="pink" label text-color="white">
      <v-icon left>
        mdi-label
      </v-icon>
      {{ $route.name }}
    </v-chip>
    <v-divider></v-divider>
    <loading v-if="$store.state.loading">loading</loading>
    <list-tasks today v-else-if="$store.getters['todo/numOfTaskToday']" />
    <no-tasks v-else />
  </div>
</template>

<script>
export default {
  name: 'Todos',

  components: {
    'list-tasks': require('@/components/Todo/ListTasks.vue').default,
    'no-tasks': require('@/components/Todo/NoTasks.vue').default,
    loading: require('@/components/Tools/Loading.vue').default,
  },
};
</script>
