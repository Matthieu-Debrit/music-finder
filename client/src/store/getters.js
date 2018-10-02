export default {
  searchStr(state) {
    return state.searchStr;
  },
  searchResult(state) {
    return state.searchResult;
  },
  album(state) {
    return state.album;
  },
  loading(state) {
    return state.loading;
  },
  error(state) {
    return state.error;
  },
  loginError(state) {
    return state.loginError;
  },
  user(state) {
    return state.user;
  },
  bookmarks(state) {
    return (state.user && state.user.bookmarks) || null;
  },
  likes(state) {
    return (state.user && state.user.likes) || null;
  }
};
