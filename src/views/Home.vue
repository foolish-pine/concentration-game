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
      <a class="button" @click="$router.push('practice')">ひとりでれんしゅう</a>
      <a class="button" @click="$router.push('com')">コンピューターとたたかう</a>
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
  font-family: "ＭＳ Ｐ明朝", "MS PMincho", sans-serif;
  font-size: 4rem;
  font-weight: bold;
  .card:nth-child(2) {
    margin-left: 1.5em;
    color: #f00;
  }
  .card:nth-child(3) {
    margin-left: 3em;
  }
  .card:nth-child(4) {
    margin-left: 4.5em;
    color: #f00;
  }
}

.card {
  position: relative;
  box-sizing: border-box;
  width: 75px;
  height: 105px;
  margin-bottom: 20px;
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.8s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
