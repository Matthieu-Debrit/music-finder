import axios from 'axios';

const lastfmAPI = axios.create({
  baseURL: 'http://ws.audioscrobbler.com/2.0/',
  params: {
    api_key: process.env.LASTFM_KEY,
    format: 'json'
  }
});

const serverAPI = axios.create({
  baseURL: 'http://localhost:3000/'
});

export {lastfmAPI, serverAPI};
