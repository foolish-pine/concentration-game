<template>
  <div class="button-container">
    <button @click="$router.go()">最初からやりなおす</button>
    <button @click="$router.push('/')">ホームに戻る</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ButtonSet extends Vue {}
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 50px auto 0;
  button:nth-of-type(1) {
    margin-bottom: 20px;
  }
}
</style>
