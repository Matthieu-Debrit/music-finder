<template>
  <v-content>
    <v-container fluid grid-list-md>
      <v-slide-y-transition mode="out-in">
        <v-layout v-if="bookmarks" row wrap>
          <h1>My bookmarks</h1>
          <v-flex v-for="bookmark in bookmarks" :key="bookmark.artist + ' - ' + bookmark.album" xs12>
            <v-card>
              <v-container fluid grid-list-lg>
                <v-layout row align-content-left>
                  <v-flex xs2>
                    <v-card-media
                      :src="bookmark.image"
                      width="100px"
                      height="100px"
                      contain
                    >
                      <router-link class="cover-link" :to="createAlbumLink(bookmark)"></router-link>
                    </v-card-media>
                  </v-flex>
                  <v-flex xs9>
                    <div>
                      <router-link class="album-link headline white--text" :to="createAlbumLink(bookmark)">{{bookmark.album}}</router-link><br>
                      <router-link class="album-link grey--text" :to="createArtistLink(bookmark)">{{bookmark.artist}}</router-link><br>
                    </div>
                  </v-flex>
                  <v-flex xs1>
                    <v-card-actions>
                      <v-btn icon @click="removeBookmark(bookmark)">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout v-else-if="!user" column>
          You must be connected to access this page
        </v-layout>
        <v-layout v-else column align-center>
          <v-progress-circular indeterminate v-bind:size="150" v-bind:width="5" color="green"></v-progress-circular>
        </v-layout>
      </v-slide-y-transition>
    </v-container>
  </v-content>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Bookmarks',
    data() {
      return {};
    },
    computed: {
      ...mapGetters([
        'user',
        'bookmarks'
      ])
    },
    methods: {
      createAlbumLink(album) {
        return `/music/${encodeURIComponent(album.artist)}/${encodeURIComponent(album.album)}`;
      },
      createArtistLink(album) {
        return `/person/${encodeURIComponent(album.artist)}`;
      },
      removeBookmark(album) {
        this.$store.dispatch('removeBookmark', album);
      }
    },
    created() {
      this.$store.dispatch('getBookmarks');
    },
    updated() {
      if (!this.user) {
        this.$router.push('/');
      }
    }
  };
</script>

<style>
  .album-link {
    text-decoration: none;
    outline: none;
  }
  .album-link:hover
  {
    text-shadow:0 0 3px #aaa;
    color:#fff;
  }
  .album-link:active
  {
    opacity:0.8;
    background:transparent;
  }

  .cover-link {
    display: block;
    outline: none;
    flex-grow: 100;
  }
  .cover-link:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transition-delay: 0s, 0s;
    transition-duration: 0.3s, 0.001s;
    transition-property: all, color;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.5, 1), ease
  }
</style>
