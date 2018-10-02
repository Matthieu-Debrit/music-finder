import Vue from 'vue';
import Router from 'vue-router';
import MainView from '@/views/Main';
import TopChartView from '@/views/TopChart';
import SearchResultView from '@/views/SearchResult';
import AlbumView from '@/views/Album';
import BookmarksView from '@/views/Bookmarks';
import LikesView from '@/views/Likes';
import NotFoundView from '@/views/NotFound';

Vue.use(Router);

const routerInstance = new Router({
  routes: [
    {
      path: '/',
      component: MainView,
      children: [
        {
          name: 'TopChartName',
          path: 'index',
          alias: '',
          component: TopChartView
        },
        {
          name: 'SearchResultName',
          path: 'search',
          alias: '',
          component: SearchResultView
        },
        {
          name: 'AlbumName',
          path: 'music/:artist/:album',
          component: AlbumView
        },
        {
          name: 'BookmarksName',
          path: 'bookmarks',
          component: BookmarksView
        },
        {
          name: 'LikesName',
          path: 'likes',
          component: LikesView
        },
        {
          name: 'NotFoundName',
          path: '*',
          component: NotFoundView
        }
      ]
    }
  ]
});

const pageTitle = {
  'TopChartName': 'Welcome',
  'SearchResultName': 'Search',
  'AlbumName': 'Album',
  'BookmarksName': 'Bookmarks',
  'LikesName': 'Likes',
  'NotFoundName': '404'
};

routerInstance.afterEach((toRoute, fromRoute) => {
  window.document.title = `${pageTitle[toRoute.name]} - Music finder`;
});

export default routerInstance;
