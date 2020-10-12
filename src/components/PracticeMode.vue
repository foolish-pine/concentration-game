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
          class="card"
          @click="selectCard(card.id)"
          :class="{
            'card--open': card.isOpen,
            'card--selected': card.isSelected
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
    isRevealed: boolean;
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
          isRemoved: false,
          isRevealed: false
        };
        this.deck.push(card);
        id++;
      }
    }
    // カードの配列をシャッフルする;
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
      this.deck[firstSelectedCardIndex].isRevealed = true;
      this.deck[secondSelectedCardIndex].isRevealed = true;
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
        // すべてのカードを取得したときゲーム終了
        if (this.cardCount === 20) this.isGameDone = true;
      }, 1500);
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
  margin: 0 10px 20px;
}

.card {
  position: relative;
  box-sizing: border-box;
  width: 57px;
  height: 89px;
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
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
  z-index: 100;
  width: 57px;
  height: 89px;
  cursor: default;
  background-color: #eee;
  border: 5px solid #fff;
  border-radius: 5px;
}

.card--selected .card__side--back {
  position: relative;
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 12px;
    height: 20px;
    margin: auto;
    content: "";
    border-right: 5px solid #fff;
    border-bottom: 5px solid #fff;
    transform: rotate(45deg);
  }
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
