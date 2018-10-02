<template>
  <v-content>
    <v-container fluid grid-list-md>
      <v-slide-y-transition mode="out-in">
        <v-layout v-if="searchResult" row justify-space-between wrap>
          <v-flex
            xs12 sm6 md4 lg3 xl2
            v-for="album in searchResult.albummatches.album"
            :key="album.url"
          >
            <v-card class="custom-card">
              <v-card-media
                :src="getAlbumImage(album)"
                height="300px"
              >
                <router-link class="cover-link" :to="createAlbumLink(album)"></router-link>
              </v-card-media>
              <v-card-title>
                <div>
                  <router-link class="album-link grey--text" :to="createArtistLink(album)">{{album.artist}}</router-link><br>
                  <router-link class="album-link white--text" :to="createAlbumLink(album)">{{album.name}}</router-link><br>
                </div>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if="user" icon @click="like(album)">
                  <v-icon>favorite</v-icon>
                </v-btn>
                <v-btn v-if="user" icon @click="bookmark(album)">
                  <v-icon>bookmark</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
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
    name: 'SearchResult',
    data() {
      return {};
    },
    computed: {
      ...mapGetters([
        'searchResult',
        'user'
      ])
    },
    methods: {
      getAlbumImage(album) {
        let cover;
        if (album.image.length > 0) {
          cover = album.image[album.image.length - 1]['#text'];
        }
        return cover || '/static/nocover.png';
      },
      createAlbumLink(album) {
        return `/music/${encodeURIComponent(album.artist)}/${encodeURIComponent(album.name)}`;
      },
      createArtistLink(album) {
        return `/person/${encodeURIComponent(album.artist)}`;
      },
      bookmark(album) {
        let cover;
        if (album.image.length > 0) {
          cover = album.image[album.image.length - 1]['#text'] || '/static/nocover.png';
        }
        this.$store.dispatch('addBookmark', {
          album_id: album.url,
          album: album.name,
          artist: album.artist,
          image: cover
        });
      },
      like(album) {
        let cover;
        if (album.image.length > 0) {
          cover = album.image[album.image.length - 1]['#text'] || '/static/nocover.png';
        }
        this.$store.dispatch('addLike', {
          album_id: album.url,
          album: album.name,
          artist: album.artist,
          image: cover
        });
      }
    }
  };
</script>

<style>
  .custom-card {
    max-width: 300px;
  }

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
