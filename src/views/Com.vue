<template>
  <div>
    <ComMode :comLevel="comLevel" />
    <ButtonSet />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ComMode from "../components/ComMode.vue";
import ButtonSet from "../components/ButtonSet.vue";

@Component({
  components: {
    ComMode,
    ButtonSet
  }
})
export default class Practice extends Vue {
  @Prop()
  comLevel!: number;
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
