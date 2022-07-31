<template>
  <div class="container">
    <div class="counter-container">
      <div class="turn-display" v-if="!isPlayerWin && !isComWin && !isDraw">
        <span class="you" v-if="!isComTurn">あなた</span><span class="com" v-else>COM</span> のターンです
      </div>
      <div class="result-display" v-else>
        <div class="result--player-win" v-if="isPlayerWin">あなたの勝ちです!!</div>
        <div class="result--com-win" v-if="isComWin">COMの勝ちです!!</div>
        <div v-if="isDraw">引き分けです</div>
      </div>
      <div class="card-counter"><span class="you">あなた</span>: {{ myCardCount }}枚</div>
      <div class="card-counter"><span class="com">COM </span>: {{ comCardCount }}枚</div>
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
import { Component, Prop, Vue } from "vue-property-decorator";

interface Card {
  id: number;
  number: number;
  symbol: string;
  isSelected: boolean;
  isOpen: boolean;
  isRemoved: boolean;
  isRevealed: boolean;
}

@Component
export default class CardField extends Vue {
  @Prop()
  comLevel!: number;

  deck: Card[] = [];
  totalCards = 0;
  myCardCount = 0;
  comCardCount = 0;
  isProcessing = false;
  isComTurn = false;
  isPlayerWin = false;
  isComWin = false;
  isDraw = false;

  //カードの配列をシャッフルする関数
  shuffleArray(array: Card[]) {
    const cardNum = array.length;
    for (let i = cardNum - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
  }

  created() {
    // トランプのカードの配列を生成する
    let id = 0;
    const symbols = ["heart", "tile", "clover", "pike"];
    for (let i = 1; i < 8; i++) {
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
    this.totalCards = this.deck.length;
    // カードの配列をシャッフルする;
    this.shuffleArray(this.deck);
  }

  selectCard(cardId: number) {
    if (this.isComTurn || this.isProcessing) return;
    // まだ誰にも取得されていないかつ一度でも表になったことがあるカードを抽出する
    // 1番目に選択したカードのIndex
    const firstSelectedCardIndex = this.deck.findIndex(card => card.isSelected === true);
    // 2番目に選択したカードのIndex
    const secondSelectedCardIndex = this.deck.findIndex(card => card.id === cardId);

    // クリックしたカードが除去済みのときはこれ以上処理を行わない
    if (this.deck[secondSelectedCardIndex].isRemoved) {
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
      this.isProcessing = true;
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
      if (this.isComTurn) {
        this.comCardCount += 2;
      } else {
        this.myCardCount += 2;
      }
      setTimeout(() => {
        this.deck[firstSelectedCardIndex].isOpen = false;
        this.deck[secondSelectedCardIndex].isOpen = false;
        this.deck[firstSelectedCardIndex].isRemoved = true;
        this.deck[secondSelectedCardIndex].isRemoved = true;
        // すべてのカードを取得したときゲーム終了
        if (this.myCardCount + this.comCardCount === this.totalCards) {
          if (this.myCardCount > this.comCardCount) {
            this.isPlayerWin = true;
            return;
          } else if (this.myCardCount < this.comCardCount) {
            this.isComWin = true;
            return;
          } else {
            this.isDraw = true;
            return;
          }
        }
        setTimeout(() => {
          this.isProcessing = false;
          this.manipulateByCOM();
        }, 1000);
      }, 1200);
    } else {
      // 2枚のカードの数字が一致しないとき
      setTimeout(() => {
        this.deck[firstSelectedCardIndex].isOpen = false;
        this.deck[secondSelectedCardIndex].isOpen = false;
        setTimeout(() => {
          this.isProcessing = false;
          this.isComTurn = !this.isComTurn;
          this.manipulateByCOM();
        }, 1000);
      }, 1500);
    }
  }

  // COMのカード選択処理
  manipulateByCOM() {
    // COMのターンでないならば処理を行わない
    if (!this.isComTurn) return;

    // isProcessingをtrueにし、プレイヤーがカードを選択できないようにする
    this.isProcessing = true;

    // これ以降の処理で選択される、2枚のカードのindex
    let firstSelectedCardIndex, secondSelectedCardIndex;

    // 誰にも取得されておらず、かつ一度でも表になったことがあるカードを抽出する
    const revealedCards = this.deck.filter(card => !card.isRemoved && card.isRevealed);

    // 上記のカード群の数字のうち、2回以上現れるものを抽出する
    const acquirableCardNum = [
      ...new Set(
        revealedCards
          .map(card => card.number)
          .filter((number, index, array) => array.indexOf(number) !== array.lastIndexOf(number))
      )
    ];

    const random = Math.random();
    let isSmart: boolean;
    if (this.comLevel === 1) {
      isSmart = random < 0.1 ? true : false;
    } else if (this.comLevel === 2) {
      isSmart = random < 0.5 ? true : false;
    } else {
      isSmart = true;
    }

    if (acquirableCardNum.length > 0 && isSmart) {
      // acquirableCardNumに要素が存在するとき( = 一度でも表になったことがあるカードの中に、取得可能なカードのペアが存在するとき)
      // acquirableCardNumからランダムに数字をひとつ選ぶ
      const selectedNum = acquirableCardNum[Math.floor(Math.random() * acquirableCardNum.length)];

      // revealedCardsのうち、選択した数字をもつカードを抽出する
      const selectableCards = revealedCards.filter(card => card.number === selectedNum);

      // selectableCardsをシャッフルする
      this.shuffleArray(selectableCards);

      // 選択した2枚のカードのindex
      firstSelectedCardIndex = this.deck.findIndex(card => card.id === selectableCards[0].id);
      secondSelectedCardIndex = this.deck.findIndex(card => card.id === selectableCards[1].id);
    } else {
      // acquirableCardNumに要素が存在しないとき( = 一度でも表になったことがあるカードの中に、取得可能なカードペアが存在しないとき)
      // まだ誰にも取得されていないカードを抽出し、シャッフルしたあと、そこからカードを2枚選ぶ
      const notRemovedCards = this.deck.filter(card => !card.isRemoved);
      this.shuffleArray(notRemovedCards);

      firstSelectedCardIndex = this.deck.findIndex(card => card.id === notRemovedCards[0].id);
      secondSelectedCardIndex = this.deck.findIndex(card => card.id === notRemovedCards[1].id);
    }
    // 選択したカードをオープンにし、数字が一致するか判定する
    this.deck[firstSelectedCardIndex].isOpen = true;
    this.deck[secondSelectedCardIndex].isOpen = true;
    this.deck[firstSelectedCardIndex].isRevealed = true;
    this.deck[secondSelectedCardIndex].isRevealed = true;
    this.checkCardNumber(firstSelectedCardIndex, secondSelectedCardIndex);
  }
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
}

.counter-container {
  padding: 20px;
  margin-bottom: 20px;
  color: #333;
  background-color: #eee;
  border-radius: 5px;
}

.you {
  color: #f00;
}

.com {
  color: #4169e1;
}

.turn-display {
  margin-bottom: 16px;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.result-display {
  margin-bottom: 16px;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.result--player-win {
  color: #f00;
}

.result--com-win {
  color: #4169e1;
}

.card-counter {
  margin-bottom: 16px;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.card-field {
  display: flex;
  flex-wrap: wrap;
  max-width: 820px;
  padding: 50px 100px;
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
  color: #333;
}

.card--red {
  color: #f00;
}
</style>
