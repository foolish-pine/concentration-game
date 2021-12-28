<template>
  <main id="app" class="main">
    <router-view />
  </main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "DotGothic16", sans-serif;
}

.main {
  padding-top: 50px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
