<template>
  <v-content>
    <v-container fluid grid-list-md>
      <v-slide-y-transition mode="out-in">
        <v-layout column align-center>
          <span>Welcome</span>
          <img
            src="/static/nocover.png"
            width="300px"
            height="300px"
          >
        </v-layout>
      </v-slide-y-transition>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    name: 'NotFound'
  };
</script>
