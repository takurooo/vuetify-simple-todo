<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" :clipped="true" app>
      <v-list>
        <v-list-item-group color="black">
          <v-list-item
            v-for="item in drawerItems"
            :key="item.text"
            link
            :to="item.to"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="item.text"> </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-chip
                class="font-weight-black subtitle-2"
                small
                dark
                color="green"
              >
                <div v-if="item.text === 'All'">
                  {{ $store.getters['todo/numOfUnfinishedTask'] }}
                </div>
                <div v-else-if="item.text === 'Today'">
                  {{ $store.getters['todo/numOfUnfinishedTaskToday'] }}
                </div>
                <div v-else-if="item.text === 'Week'">
                  {{ $store.getters['todo/numOfUnfinishedTaskWeek'] }}
                </div>
              </v-chip>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="green darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="ml-0 mr-3 pl-4">
        <span class="hidden-sm-and-down">{{ $store.state.appTitle }} </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <search></search>
      <bar-menu />
      <v-btn icon @click="greeting">
        <v-icon>mdi-human-greeting</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      <snackbar />
      <div class="mt-15"></div>
      <button-add-task />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    dialogs: {
      delete: false,
    },
    drawer: null,
    drawerItems: [
      { icon: 'mdi-check-bold', text: 'All', to: '/' },
      { icon: 'mdi-calendar-today', text: 'Today', to: '/today' },
      { icon: 'mdi-calendar-week', text: 'Week', to: '/week' },
    ],
  }),
  mounted() {
    this.$store.dispatch('todo/getTasks');
  },
  methods: {
    greeting() {
      this.$store.commit('showSnackbar', 'Hey!! You can do it!!');
    },
  },
  components: {
    snackbar: require('@/components/Shared/Snackbar.vue').default,
    search: require('@/components/Tools/Search.vue').default,
    'bar-menu': require('@/components/Tools/BarMenu.vue').default,
    'button-add-task': require('@/components/Todo/ButtonAddTask.vue').default,
  },
};
</script>
