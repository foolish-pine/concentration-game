<template>
  <div class="container">
    <div class="counter">
      <div class="turn-counter">経過ターン: {{ turnCount }}ターン</div>
      <div class="card-counter">取得カード: {{ cardCount }}枚 / 20枚</div>
      <div class="done" v-if="isGameDone">Done!!</div>
    </div>
    <div class="card-field">
      <div class="card-container" v-for="card in deck" :key="card.id">
        <div
          class="card card--red"
          v-if="card.symbol === 'heart'"
          @click="selectCard(card.id)"
          v-bind:class="{
            'card--selected': card.isSelected
          }"
        >
          <transition>
            <div class="card--filter" v-if="card.isRemoved"></div>
          </transition>
          <transition>
            <div class="card__number" v-if="card.isOpen">{{ card.number }}</div>
          </transition>
          <transition>
            <div class="card__symbol" v-if="card.isOpen">♥</div>
          </transition>
        </div>
        <div
          class="card card--red"
          v-else-if="card.symbol === 'tile'"
          @click="selectCard(card.id)"
          v-bind:class="{
            'card--selected': card.isSelected
          }"
        >
          <transition>
            <div class="card--filter" v-if="card.isRemoved"></div>
          </transition>
          <transition>
            <div class="card__number" v-if="card.isOpen">{{ card.number }}</div>
          </transition>
          <transition>
            <div class="card__symbol" v-if="card.isOpen">♦</div>
          </transition>
        </div>
        <div
          class="card card--black"
          v-else-if="card.symbol === 'clover'"
          @click="selectCard(card.id)"
          v-bind:class="{
            'card--selected': card.isSelected
          }"
        >
          <transition>
            <div class="card--filter" v-if="card.isRemoved"></div>
          </transition>
          <transition>
            <div class="card__number" v-if="card.isOpen">{{ card.number }}</div>
          </transition>
          <transition>
            <div class="card__symbol" v-if="card.isOpen">♣</div>
          </transition>
        </div>
        <div
          class="card card--black"
          v-else
          @click="selectCard(card.id)"
          v-bind:class="{
            'card--selected': card.isSelected
          }"
        >
          <transition>
            <div class="card--filter" v-if="card.isRemoved"></div>
          </transition>
          <transition>
            <div class="card__number" v-if="card.isOpen">{{ card.number }}</div>
          </transition>
          <transition>
            <div class="card__symbol" v-if="card.isOpen">♠</div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CardField extends Vue {
  deck: {
    id: number;
    number: number;
    symbol: string;
    isSelected: boolean;
    isOpen: boolean;
    isRemoved: boolean;
  }[] = [];
  isGameDone = false;

  created() {
    // トランプのカードの配列を生成する
    let id = 0;
    const symbols = ["heart", "tile", "clover", "pike"];
    for (let i = 1; i < 6; i++) {
      for (let j = 0; j < symbols.length; j++) {
        const card = {
          id: id,
          number: i,
          symbol: symbols[j],
          isSelected: false,
          isOpen: false,
          isRemoved: false
        };
        this.deck.push(card);
        id++;
      }
    }
    // カードの配列をシャッフルする
    const cardNum = this.deck.length;
    for (let i = cardNum - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[randomIndex]] = [this.deck[randomIndex], this.deck[i]];
    }
  }
  private get turnCount(): number {
    return this.$store.getters.getTurnCount;
  }
  private get cardCount(): number {
    return this.$store.getters.getCardCount;
  }
  selectCard(cardId: number) {
    // 1番目に選択したカードのIndex
    const firstSelectedCardIndex = this.deck.findIndex(card => card.isSelected === true);
    // 2番目に選択したカードのIndex
    const secondSelectedCardIndex = this.deck.findIndex(card => card.id === cardId);
    const isCardOpen = this.deck.some(card => card.isOpen === true);

    // クリックしたカードが除去済み、もしくは表になっているカードがあるときはこれ以上処理を行わない
    if (this.deck[secondSelectedCardIndex].isRemoved || isCardOpen) {
      return;
    }

    if (firstSelectedCardIndex === -1) {
      // 1番目のカードを選択したとき
      this.deck[secondSelectedCardIndex].isSelected = true;
    } else if (firstSelectedCardIndex === secondSelectedCardIndex) {
      // 1番目と2番目で同じカードを選択したとき
      this.deck[secondSelectedCardIndex].isSelected = false;
    } else {
      // 1番目と2番目で異なるカードを選択したとき
      this.deck[firstSelectedCardIndex].isOpen = true;
      this.deck[secondSelectedCardIndex].isOpen = true;
      this.deck[firstSelectedCardIndex].isSelected = false;
      this.checkCardNumber(firstSelectedCardIndex, secondSelectedCardIndex);
    }
  }

  // 表にしたカードの数字が一致するかどうかチェックする
  checkCardNumber(firstSelectedCardIndex: number, secondSelectedCardIndex: number) {
    if (this.deck[firstSelectedCardIndex].number === this.deck[secondSelectedCardIndex].number) {
      // 2枚のカードの数字が一致するとき
      // 取得カードの枚数を+2する
      this.$store.dispatch("addCardCount");
      setTimeout(() => {
        this.deck[firstSelectedCardIndex].isOpen = false;
        this.deck[secondSelectedCardIndex].isOpen = false;
        this.deck[firstSelectedCardIndex].isRemoved = true;
        this.deck[secondSelectedCardIndex].isRemoved = true;
      }, 1500);
      // すべてのカードを取得したときゲーム終了
      if (this.cardCount === 52) this.isGameDone = true;
    } else {
      // 2枚のカードの数字が一致しないとき
      // 経過ターン数を+1する
      this.$store.dispatch("addTurnCount");
      setTimeout(() => {
        this.deck[firstSelectedCardIndex].isOpen = false;
        this.deck[secondSelectedCardIndex].isOpen = false;
      }, 1500);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.counter {
  margin-bottom: 20px;
}

.turn-counter {
  margin-bottom: 5px;
}

.card-counter {
  margin-bottom: 5px;
}

.done {
  font-size: 1.5rem;
  color: #4169e1;
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
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
}

.card--filter {
  position: absolute;
  width: 57px;
  height: 89px;
  background-color: #fff;
  cursor: default;
  transition: 0.3s;
}

.card--selected {
  border: 3px solid #4169e1;
}

.card--black {
  color: #000;
}

.card--red {
  color: #f00;
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
