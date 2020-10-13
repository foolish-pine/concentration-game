<template>
  <div class="button-container">
    <a class="button" @click="$router.go()">最初からやりなおす</a>
    <a class="button" @click="$router.push('/')">ホームに戻る</a>
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
  width: 250px;
  margin: 50px auto 0;
  .button:nth-of-type(1) {
    margin-bottom: 20px;
  }
}

.button {
  padding: 15px 10px;
  font-weight: bold;
  color: #000;
  cursor: pointer;
  background-color: #fff;
  border-radius: 100vh;
}
</style>
