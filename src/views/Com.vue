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
