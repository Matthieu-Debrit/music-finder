<template>
  <v-app dark>
    <v-toolbar fixed app>
      <v-toolbar-title>Music Finder</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="doSearch">
        <v-icon>search</v-icon>
      </v-btn>
      <v-text-field
        name="input-1-3"
        label="Search"
        single-line
        v-model="searchStr"
        @keyup.enter="doSearch"
        @focus="displaySearchView()"
      ></v-text-field>
      <v-btn icon @click="clearSearch">
        <v-icon>close</v-icon>
      </v-btn>
      <v-menu
        offset-x
        :close-on-content-click="false"
        :nudge-width="320"
        v-model="menu"
      >
        <v-btn icon @click="resetActive()" slot="activator">
          <v-icon>person</v-icon>
        </v-btn>
        <v-card v-if="user">
          <v-list>
            <v-list-tile avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{user.username}}</v-list-tile-title>
                <v-list-tile-sub-title>{{user.email}}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon @click="logout">
                  <v-icon>exit_to_app</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-list-tile v-for="userLink in userLinks" v-bind:key="userLink.url" @click="changeView(userLink.url)">
              <v-list-tile-action>
                <v-icon v-if="userLink.icon">{{userLink.icon}}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="userLink.title"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card>
        <v-tabs v-else v-model="active">
          <v-tabs-bar class="grey darken-3">
            <v-tabs-slider color="green"></v-tabs-slider>
            <v-tabs-item href="#tab-1" ripple>Login</v-tabs-item>
            <v-tabs-item href="#tab-2" ripple>Signup</v-tabs-item>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content key="tab-1" id="tab-1">
              <v-card flat>
                <v-layout row>
                  <v-flex xs10 offset-xs1>
                    <v-form v-model="validLogin" ref="formLogin" lazy-validation>
                      <v-text-field
                        label="E-mail"
                        v-model="email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Password"
                        v-model="password"
                        :rules="passwordRules"
                        :append-icon="pwToggle ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (pwToggle = !pwToggle)"
                        :type="pwToggle ? 'password' : 'text'"
                        required
                      ></v-text-field>
                      <v-btn
                        color="green"
                        @click="login"
                        :disabled="!validLogin"
                      >
                        login
                      </v-btn>
                    </v-form>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-tabs-content>
            <v-tabs-content key="tab-2" id="tab-2">
              <v-card flat>
                <v-layout row>
                  <v-flex xs10 offset-xs1>
                    <v-form v-model="validSignup" ref="formSignup" lazy-validation>
                      <v-text-field
                        label="Username"
                        v-model="username"
                        :rules="usernameRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="E-mail"
                        v-model="email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                      <v-text-field
                        label="Password"
                        hint="At least 6 caracters"
                        v-model="password"
                        :rules="passwordRules"
                        :append-icon="pwToggle ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (pwToggle = !pwToggle)"
                        :type="pwToggle ? 'password' : 'text'"
                        required
                      ></v-text-field>
                      <v-btn
                        color="green"
                        @click="signup"
                        :disabled="!validSignup"
                      >
                        signup
                      </v-btn>
                    </v-form>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-menu>
    </v-toolbar>
    <v-container fluid>
      <v-slide-y-transition mode="out-in">
        <router-view></router-view>
      </v-slide-y-transition>
    </v-container>
  </v-app>
</template>

<script>
  import {mapGetters} from 'vuex';
  /* eslint-disable no-useless-escape */
  const emailRgx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  export default {
    name: 'Main',
    data() {
      return {
        searchStr: '',
        menu: false,
        active: 'tab-1',
        validLogin: true,
        validSignup: true,
        username: '',
        usernameRules: [
          (v) => !!v || 'Username is required',
          (v) => (v && v.length <= 32) || 'Must be less than 32 characters',
          (v) => (v && v.length >= 3) || 'Must be more than 3 characters'
        ],
        email: '',
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => emailRgx.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
          (v) => !!v || 'Password is required',
          (v) => (v && v.length <= 64) || 'Must be less than 32 characters',
          (v) => (v && v.length >= 6) || 'Must be more than 6 characters'
        ],
        pwToggle: true,
        userLinks: [
          {url: '/likes', title: 'Likes', icon: 'favorite'},
          {url: '/bookmarks', title: 'Bookmarks', icon: 'bookmark'}
        ]
      };
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      doSearch() {
        this.$store.commit('clearSearch');
        this.displaySearchView();
        if (this.searchStr !== '') {
          this.$store.commit('setSearchStr', this.searchStr);
          this.$store.dispatch('querySearch', this.searchStr);
        }
      },
      clearSearch() {
        this.searchStr = '';
        this.$store.commit('clearSearch');
      },
      displaySearchView() {
        this.$router.push('/search');
      },
      resetActive() {
        this.active = 'tab-1';
        this.pwToggle = true;
      },
      login() {
        if (this.$refs.formLogin.validate()) {
          this.$store.dispatch('login', {
            email: this.email,
            password: this.password
          });
        }
      },
      signup() {
        if (this.$refs.formSignup.validate()) {
          this.$store.dispatch('signup', {
            username: this.username,
            email: this.email,
            password: this.password
          });
        }
      },
      logout() {
        console.log(this.user.username);
        this.$store.dispatch('logout');
      },
      changeView(route) {
        this.$router.push(route);
        this.menu = false;
      }
    }
  };
</script>
