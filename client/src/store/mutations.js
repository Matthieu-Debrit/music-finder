export default {
  setSearchStr(state, payload) {
    state.searchStr = payload;
  },
  setSearchResult(state, payload) {
    state.searchResult = payload;
  },
  clearSearch(state) {
    state.searchStr = '';
    state.searchResult = null;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  clearError(state) {
    state.error = null;
  },
  setLoginError(state, payload) {
    state.loginError = payload;
  },
  clearLoginError(state) {
    state.loginError = null;
  },
  setUser(state, payload) {
    state.user = payload;
  },
  clearUser(state) {
    state.user = null;
  }
};
