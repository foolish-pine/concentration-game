<template>
  <div class="title-container">
    <div class="title">
      <div
        class="card"
        :class="{
          'card--open': first
        }"
        @click="first = !first"
      >
        <div class="card__side card__side--back"></div>
        <div class="card__side card__side--front">
          <transition>
            <span>神</span>
          </transition>
        </div>
      </div>
      <div
        class="card"
        :class="{
          'card--open': second
        }"
        @click="second = !second"
      >
        <div class="card__side card__side--back"></div>
        <div class="card__side card__side--front">
          <transition>
            <span>経</span>
          </transition>
        </div>
      </div>
      <div
        class="card"
        :class="{
          'card--open': third
        }"
        @click="third = !third"
      >
        <div class="card__side card__side--back"></div>
        <div class="card__side card__side--front">
          <transition>
            <span>衰</span>
          </transition>
        </div>
      </div>
      <div
        class="card"
        :class="{
          'card--open': forth
        }"
        @click="forth = !forth"
      >
        <div class="card__side card__side--back"></div>
        <div class="card__side card__side--front">
          <transition>
            <span>弱</span>
          </transition>
        </div>
      </div>
    </div>
    <div class="button-container">
      <a class="button button--normal" @click="$router.push('practice')">れんしゅう</a>
      <a class="button button--crayon" @click="$router.push({ name: 'Com', params: { comLevel: 1 } })">よわよわ</a>
      <a class="button button--normal" @click="$router.push({ name: 'Com', params: { comLevel: 2 } })">ふつう</a>
      <a class="button button--Gkktt" @click="$router.push({ name: 'Com', params: { comLevel: 3 } })">つよつよ</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  first = false;
  second = false;
  third = false;
  forth = false;
  created() {
    setTimeout(() => {
      this.first = true;
    }, 300);
    setTimeout(() => {
      this.second = true;
    }, 420);
    setTimeout(() => {
      this.third = true;
    }, 540);
    setTimeout(() => {
      this.forth = true;
    }, 660);
  }
}
</script>

<style lang="scss" scoped>
.title-container {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  display: flex;
  font-family: "ＭＳ Ｐ明朝", "MS PMincho", sans-serif;
  font-size: 4.5rem;
  font-weight: bold;
  .card:nth-child(1) {
    color: #333;
  }
  .card:nth-child(2) {
    color: #f00;
  }
  .card:nth-child(3) {
    color: #333;
  }
  .card:nth-child(4) {
    color: #f00;
  }
}

.card {
  position: relative;
  box-sizing: border-box;
  width: 90px;
  height: 115px;
  margin: 0 15px 20px;
  user-select: none;
}

.card__side {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  border: 5px solid #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.6s ease;
  backface-visibility: hidden;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
}

.card__side--front {
  background-color: #fff;
  transform: rotateY(180deg);
}

.card__side--back {
  background-color: #cc1237;
}

.card--open .card__side--front {
  transform: rotate(0);
}

.card--open .card__side--back {
  transform: rotateY(-180deg);
}

.button-container {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 50px auto 0;
  .button:nth-of-type(1) {
    margin-bottom: 20px;
  }
  .button:nth-of-type(2) {
    margin-bottom: 20px;
  }
  .button:nth-of-type(3) {
    margin-bottom: 20px;
  }
}

.button {
  position: relative;
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

@font-face {
  font-family: "crayon";
  src: url(../assets/crayon.ttf);
}

@font-face {
  font-family: "851 Gkktt";
  src: url(../assets/851Gkktt.ttf);
}

.button--normal {
  padding: 6px 0;
  font-size: 1.6rem;
  font-weight: bold;
}

.button--crayon {
  font-family: crayon, Avenir, Helvetica, Arial, sans-serif;
  font-size: 2.5rem;
}

.button--Gkktt {
  padding: 7.5px 0;
  font-family: "851 Gkktt", Avenir, Helvetica, Arial, sans-serif;
  font-size: 2.2rem;
}
</style>
