<template>
  <v-content>
    <v-container fluid grid-list-md>
      <v-slide-y-transition mode="out-in">
        <v-layout>
          This page doesn't exist.
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
