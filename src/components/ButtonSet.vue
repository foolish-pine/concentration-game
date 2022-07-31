<template>
  <div class="button-container">
    <a class="button" @click="$router.go()">やりなおす</a>
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
  gap: 20px;
  width: 200px;
  margin: 0 auto;
}

.button {
  position: relative;
  padding: 12px 0;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  cursor: pointer;
  background-color: #eee;
  border-radius: 5px;

  &:hover {
    &::before {
      position: absolute;
      top: 0;
      bottom: 0;
      left: -30px;
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
