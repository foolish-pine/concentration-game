<template>
  <div class="container">
    <div class="counter">
      <div class="turn-counter">ターン数: {{ turnCount }}</div>
      <div class="card-counter">カード数: {{ cardCount }}</div>
    </div>
    <div class="card-field">
      <div class="card-container" v-for="card in deck" :key="card.id">
        <div class="card card--red" v-if="card.symbol === 'heart'">
          <div class="card__number">{{ card.number }}</div>
          <div class="card__symbol">♥</div>
        </div>
        <div class="card card--red" v-else-if="card.symbol === 'tile'">
          <div class="card__number">{{ card.number }}</div>
          <div class="card__symbol">♦</div>
        </div>
        <div class="card card--black" v-else-if="card.symbol === 'clover'">
          <div class="card__number">{{ card.number }}</div>
          <div class="card__symbol">♣</div>
        </div>
        <div class="card card--black" v-else>
          <div class="card__number">{{ card.number }}</div>
          <div class="card__symbol">♠</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CardField extends Vue {
  deck: { id: number; number: number; symbol: string }[] = [];
  created() {
    let id = 0;
    const symbols = ["heart", "tile", "clover", "pike"];
    for (let i = 1; i < 14; i++) {
      for (let j = 0; j < symbols.length; j++) {
        const card = { id: id, number: i, symbol: symbols[j] };
        this.deck.push(card);
        id++;
      }
    }
    const cardNum = this.deck.length;
    for (let i = cardNum - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[randomIndex]] = [this.deck[randomIndex], this.deck[i]];
    }
    console.log(this.deck);
  }
  private get turnCount(): number {
    return this.$store.getters.getTurnCount;
  }
  private get cardCount(): number {
    return this.$store.getters.getCardCount;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.counter {
  margin-bottom: 30px;
}

.card-field {
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin: 0 auto;
}

.card-container {
  margin: 0 10px 10px;
}

.card {
  width: 57px;
  height: 89px;
  background-color: #eee;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
}

.card--black {
  color: #000;
}

.card--red {
  color: #f00;
}
</style>
