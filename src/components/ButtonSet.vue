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
  position: relative;
  padding: 15px 10px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  background-color: #eee;
  border-radius: 5px;
  &:hover {
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -30px;
      box-sizing: border-box;
      width: 20px;
      height: 20px;
      margin: auto;
      content: "";
      border: 10px solid transparent;
      border-left: 14px solid #eee;
    }
  }
}
</style>
