<template>
  <div class="title-container">
    <h1 class="title">神<br /><span></span>経<br /><span></span>衰<br /><span></span>弱</h1>
    <div>
      <button @click="$router.push('game')">ひとりでれんしゅう</button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.title-container {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  margin-left: -2em;
  font-family: "ＭＳ Ｐ明朝", "MS PMincho", sans-serif;
  font-style: italic;
  font-size: 4rem;
  span {
    &:nth-of-type(1) {
      margin-left: 1.5em;
    }
    &:nth-of-type(2) {
      margin-left: 3em;
    }
    &:nth-of-type(3) {
      margin-left: 4.5em;
    }
  }
}
</style>
