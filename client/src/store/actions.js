import {lastfmAPI, serverAPI} from '@/api';

export default {
  querySearch({commit}, payload) {
    commit('setLoading', true);
    lastfmAPI.get('', {
      params: {
        method: 'album.search',
        album: payload
      }
    })
      .then(response => {
        commit('setSearchResult', response.data.results);
        commit('setLoading', false);
      })
      .catch(error => {
        console.error('error', error.response);
        commit('setError', error.response.statusText);
        commit('setLoading', false);
      });
  },
  login({commit, dispatch}, payload) {
    serverAPI.post('/connect', {
      email: payload.email,
      password: payload.password
    })
      .then(response => {
        const data = response.data;
        commit('setUser', {
          username: data.username,
          email: data.email,
          likes: null,
          bookmarks: null,
          token: data.token
        });
        dispatch('getBookmarks');
        dispatch('getLikes');
      })
      .catch(error => {
        if (error.response.data && error.response.data.msg) {
          console.error('Error: ', error.response.data.msg);
          commit('setLoginError', error.response.data.msg);
        } else {
          console.error('Error: ', error.response);
          commit('setLoginError', error.response.statusText);
        }
      });
  },
  logout({commit}) {
    commit('clearUser');
  },
  signup({commit, dispatch}, payload) {
    serverAPI.post('/signup', {
      username: payload.username,
      email: payload.email,
      password: payload.password
    })
      .then(response => {
        console.log(response);
        dispatch('login', payload);
      })
      .catch(error => {
        if (error.response.data && error.response.data.msg) {
          console.error('Error: ', error.response.data.msg);
          commit('setLoginError', error.response.data.msg);
        } else {
          console.error('Error: ', error.response);
          commit('setLoginError', error.response.statusText);
        }
      });
  },
  getBookmarks({state}) {
    serverAPI.get('/bookmarks', {
      headers: {
        'Authorization': (state.user && state.user.token) || ''
      }
    })
      .then((response) => {
        state.user.bookmarks = response.data.data;
      })
      .catch(() => {
        console.error('Error while loading bookmarks.');
      });
  },
  addBookmark({state, commit, dispatch}, payload) {
    serverAPI.post('/bookmark', payload, {
      headers: {
        'Authorization': (state.user && state.user.token) || ''
      }
    })
      .then(() => {
        dispatch('getBookmarks');
      })
      .catch(() => {
        console.error('Error while adding bookmark.');
      });
  },
  removeBookmark({state, commit, dispatch}, payload) {
    serverAPI.delete('/bookmark', {
      data: payload,
      headers: {
        'Authorization': (state.user && state.user.token) || ''
      }
    })
      .then(() => {
        dispatch('getBookmarks');
      })
      .catch(() => {
        console.error('Error while adding bookmark.');
      });
  },
  getLikes({state}) {
    serverAPI.get('/likes', {
      headers: {
        'Authorization': (state.user && state.user.token) || ''
      }
    })
      .then((response) => {
        state.user.likes = response.data.data;
      })
      .catch(() => {
        console.error('Error while loading likes.');
      });
  },
  addLike({state, commit, dispatch}, payload) {
    serverAPI.post('/like', payload, {
      headers: {
        'Authorization': (state.user && state.user.token) || ''
      }
    })
      .then(() => {
        dispatch('getLikes');
      })
      .catch(() => {
        console.error('Error while adding like.');
      });
  },
  removeLike({state, commit, dispatch}, payload) {
    serverAPI.delete('/like', {
      data: payload,
      headers: {
        'Authorization': (state.user && state.user.token) || ''
      }
    })
      .then(() => {
        dispatch('getLikes');
      })
      .catch(() => {
        console.error('Error while adding like.');
      });
  }
};
