<template>
  <div>
    <PracticeMode />
    <ButtonSet />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PracticeMode from "../components/PracticeMode.vue";
import ButtonSet from "../components/ButtonSet.vue";

@Component({
  components: {
    PracticeMode,
    ButtonSet
  }
})
export default class Practice extends Vue {
  created() {
    this.$store.dispatch("clearCounter");
  }
}
</script>

<style lang="scss" scoped>
.button-container {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: 50px auto 0;
  button:nth-of-type(1) {
    margin-bottom: 20px;
  }
}
</style>
