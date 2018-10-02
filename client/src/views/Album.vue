<template>
  <v-content>
    <v-container fluid grid-list-md>
      <v-slide-y-transition mode="out-in">
        <v-layout v-if="albumInfo" column>
          <v-layout row>
            <v-flex class="custom-image">
              <img
                class="image"
                :src="getAlbumImage(albumInfo)"
                width="300px"
                height="300px"
              >
            </v-flex>
            <v-flex>
              <span class="grey--text">ALBUM</span><br>
              <h1>{{albumInfo.name}}</h1><br>
              <span class="grey--text">By <router-link class="white--text artist-link"
                                                       :to="createArtistLink(albumInfo)">{{albumInfo.artist}}</router-link></span><br>
              <span class="grey--text">{{getAlbumYear(albumInfo)}}</span><br>
              <v-btn v-if="user" icon @click="like(albumInfo)">
                <v-icon>favorite</v-icon>
              </v-btn>
              <v-btn v-if="user" icon @click="bookmark(albumInfo)">
                <v-icon>bookmark</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
          <v-data-table
            v-bind:headers="headers"
            :items="trackList"
            hide-actions
          >
            <template slot="items" slot-scope="props">
              <td>{{props.item.n}}</td>
              <td>{{props.item.name}}</td>
              <td>{{props.item.duration}}</td>
            </template>
          </v-data-table>
        </v-layout>
        <v-layout v-else-if="error">
          An error was encountered.
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
  import {lastfmAPI} from '@/api';

  const yearRgx = /^\d{4}$/g;

  export default {
    name: 'Album',
    data() {
      return {
        headers: [
          {text: '#', align: 'left', sortable: false, value: 'n'},
          {text: 'TITLE', align: 'left', sortable: false, value: 'name'},
          {text: '◷', align: 'left', sortable: false, value: 'duration'}
        ],
        trackList: [],
        artist: (this.$route.params.artist || ''),
        album: (this.$route.params.album || ''),
        albumInfo: null,
        error: null
      };
    },
    computed: {
      ...mapGetters([
        'user',
        'bookmarks'
      ])
    },
    methods: {
      setTrackList(album) {
        this.trackList = [];
        for (let i = 0; i < album.tracks.track.length; ++i) {
          const track = album.tracks.track[i];
          const duration = parseInt(track.duration) || 0;
          const minutes = Math.floor(duration / 60);
          const seconds = duration % 60;
          const elmt = {n: i + 1, name: track.name, duration: `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`};
          this.trackList.push(elmt);
        }
      },
      queryAlbum(artist, album) {
        this.$store.commit('setLoading', true);
        lastfmAPI.get('', {
          params: {
            method: 'album.getInfo',
            artist,
            album
          }
        })
          .then((response) => {
            this.albumInfo = response.data.album;
            this.setTrackList(this.albumInfo);
            this.$store.commit('setLoading', false);
          })
          .catch(() => {
            this.error = true;
            this.$store.commit('setLoading', false);
          });
      },
      getAlbumImage(album) {
        let cover;
        if (album.image.length > 0) {
          cover = album.image[album.image.length - 1]['#text'];
        }
        return cover || '/static/nocover.png';
      },
      createArtistLink(album) {
        return `/person/${encodeURIComponent(album.artist)}`;
      },
      getAlbumYear(album) {
        for (let i = 0; i < album.tags.tag.length; ++i) {
          const tag = album.tags.tag[i];
          if (yearRgx.exec(tag.name)) {
            return tag.name;
          }
        }
        return 'Unknown year';
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
    },
    created() {
      this.queryAlbum(this.artist, this.album);
    }
  };
</script>

<style>
  .custom-image {
    flex-grow: 0;
  }

  .artist-link {
    outline: none;
  }

  .artist-link:hover {
    text-shadow: 0 0 3px #aaa;
    color: #fff;
  }

  .artist-link:active {
    opacity: 0.8;
    background: transparent;
  }

</style>
