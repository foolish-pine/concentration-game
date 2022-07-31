<template>
  <div class="container">
    <div class="counter-container">
      <div class="turn-counter">経過ターン: {{ turnCount }}ターン</div>
      <div class="card-counter">取得枚数: {{ cardCount }} / 20枚</div>
      <div class="done" v-if="isGameDone">Done!!</div>
    </div>
    <div class="card-field">
      <div
        v-for="card in deck"
        :key="card.id"
        class="card"
        @click="selectCard(card.id)"
        :class="{
          'card--open': card.isOpen
        }"
      >
        <transition>
          <div class="card--removed" v-if="card.isRemoved"></div>
        </transition>
        <div class="card__side card__side--back"></div>
        <div class="card__side card__side--front">
          <transition>
            <div
              class="card__number"
              v-if="card.isOpen"
              :class="{
                'card--red': card.symbol === 'heart' || card.symbol === 'tile',
                'card--black': card.symbol === 'clover' || card.symbol === 'pike'
              }"
            >
              {{ card.number }}
            </div>
          </transition>
          <transition>
            <div
              class="card__symbol"
              v-if="card.isOpen"
              :class="{
                'card--red': card.symbol === 'heart' || card.symbol === 'tile',
                'card--black': card.symbol === 'clover' || card.symbol === 'pike'
              }"
            >
              <span v-if="card.symbol === 'heart'">♥</span>
              <span v-else-if="card.symbol === 'tile'">♦</span>
              <span v-else-if="card.symbol === 'clover'">♣</span>
              <span v-else>♠</span>
            </div>
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
    isOpen: boolean;
    isRemoved: boolean;
    isRevealed: boolean;
  }[] = [];
  totalCards = 0;
  turnCount = 0;
  cardCount = 0;
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
          isOpen: false,
          isRemoved: false,
          isRevealed: false
        };
        this.deck.push(card);
        id++;
      }
    }
    this.totalCards = this.deck.length;
    // カードの配列をシャッフルする;
    const cardNum = this.deck.length;
    for (let i = cardNum - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[randomIndex]] = [this.deck[randomIndex], this.deck[i]];
    }
  }

  selectCard(cardId: number) {
    // 前に選択したカードのIndex
    const previousSelectedCardIndex = this.deck.findIndex(card => card.isOpen);
    // 選択したカードのIndex
    const currentSelectedCardIndex = this.deck.findIndex(card => card.id === cardId);
    const isProcessing = this.deck.filter(card => card.isOpen).length === 2;

    // クリックしたカードが除去済みのとき、または同じカードを選択したときはこれ以上処理を行わない
    if (
      this.deck[currentSelectedCardIndex].isRemoved ||
      previousSelectedCardIndex === currentSelectedCardIndex ||
      isProcessing
    ) {
      return;
    }

    if (previousSelectedCardIndex === -1) {
      // 前に選択したカードが存在しないとき（＝1番目のカードを選択したとき）
      this.deck[currentSelectedCardIndex].isOpen = true;
      this.deck[currentSelectedCardIndex].isRevealed = true;
    } else {
      // 2番目のカードを選択したとき
      this.deck[currentSelectedCardIndex].isOpen = true;
      this.deck[currentSelectedCardIndex].isRevealed = true;
      this.checkCardNumber(previousSelectedCardIndex, currentSelectedCardIndex);
    }
  }

  // 表にしたカードの数字が一致するかどうかチェックする
  checkCardNumber(previousSelectedCardIndex: number, currentSelectedCardIndex: number) {
    if (this.deck[previousSelectedCardIndex].number === this.deck[currentSelectedCardIndex].number) {
      // 2枚のカードの数字が一致するとき
      // 取得カードの枚数を+2する
      this.cardCount += 2;
      setTimeout(() => {
        this.deck[previousSelectedCardIndex].isOpen = false;
        this.deck[currentSelectedCardIndex].isOpen = false;
        this.deck[previousSelectedCardIndex].isRemoved = true;
        this.deck[currentSelectedCardIndex].isRemoved = true;
        // すべてのカードを取得したときゲーム終了
        if (this.cardCount === this.totalCards) this.isGameDone = true;
      }, 1200);
    } else {
      // 2枚のカードの数字が一致しないとき
      // 経過ターン数を+1する
      this.turnCount++;
      setTimeout(() => {
        this.deck[previousSelectedCardIndex].isOpen = false;
        this.deck[currentSelectedCardIndex].isOpen = false;
      }, 1200);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  max-width: 1000px;
  margin: 0 auto;
}

.counter-container {
  padding: 20px;
  margin-bottom: 20px;
  background-color: #eee;
  border-radius: 5px;
}

.turn-counter {
  margin-bottom: 16px;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.card-counter {
  margin-bottom: 16px;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.done {
  font-size: 2rem;
  font-weight: bold;
  color: #4169e1;
  text-align: center;
}

.card-field {
  display: flex;
  flex-wrap: wrap;
  gap: 20px 10px;
  max-width: 820px;
  padding: 50px 100px;
  margin: 0 auto;
}

.card {
  position: relative;
  box-sizing: border-box;
  width: 57px;
  height: 89px;
  font-size: 2rem;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
}

.card__number {
  margin-bottom: 8px;
}

.card__side {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 5px solid #fff;
  border-radius: 5px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.6s ease;
  backface-visibility: hidden;
}

.card__side--front {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.card--removed {
  position: absolute;
  top: 0;
  left: -5px;
  z-index: 100;
  width: 67px;
  height: 95px;
  cursor: default;
  background-color: #0d5b2b;
  border: 5px solid #0d5b2b;
  border-radius: 5px;
}

.card--black {
  color: #333;
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
