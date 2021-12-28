<template>
  <div class="home">
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
              <span class="card__text">神</span>
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
              <span class="card__text">経</span>
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
              <span class="card__text">衰</span>
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
              <span class="card__text">弱</span>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div class="button-container">
      <a class="button" @click="$router.push('practice')">れんしゅう</a>
      <a class="button" @click="$router.push({ name: 'Com', params: { comLevel: 1 } })">よわよわ</a>
      <a class="button" @click="$router.push({ name: 'Com', params: { comLevel: 2 } })">ふつう</a>
      <a class="button" @click="$router.push({ name: 'Com', params: { comLevel: 3 } })">つよつよ</a>
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
.home {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  display: flex;
  font-weight: bold;

  .card {
    text-align: center;
  }

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
  width: 90px;
  height: 115px;
  margin: 0 15px 20px;
  font-size: 6rem;
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

.card__text {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 200px;
  margin: 50px auto 0;
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
