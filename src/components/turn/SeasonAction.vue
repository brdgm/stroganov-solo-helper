<template>
  <ol>
    <li>Move east: {{moveEastSteps}}</li>
    <li>Hunt: {{huntSelection}} {{huntCount}} | {{huntCount}} coins</li>
    <li>Main action(s):
      <ul>
        <li>Claim Landscape (if empty) | visit village</li>
        <li>{{extendedAction}}</li>
      </ul>
    </li>
  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import CardDeck from '@/services/CardDeck'
import HuntSelection from '@/services/enum/HuntSelection';
import Action from '@/services/enum/Action';

export default defineComponent({
  name: "SeasonAction",
  setup() {
    const { t } = useI18n();
    return { t };
  },
  props: {
    cardDeck: {
      type: CardDeck,
      required: true
    }
  },
  computed: {
    moveEastSteps() : number {
      return this.cardDeck.moveHuntCard.moveEastSteps
    },
    huntSelection() : HuntSelection {
      return this.cardDeck.moveHuntCard.huntSelection
    },
    huntCount() : number {
      return this.cardDeck.moveHuntCard.huntCount
    },
    extendedAction() : Action {
      return this.cardDeck.mainActionCard.extendedAction
    }
  }
})
</script>

<style lang="scss">
</style>
