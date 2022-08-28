<template>
  <div class="accordion" id="botActionsAccordion">
    <div class="accordion-item" v-for="bot in botCount" :key="bot">
      <h2 class="accordion-header" :id="`bot${bot}Heading`">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#bot${bot}Collapse`" aria-expanded="true" :aria-controls="`bot${bot}Collapse`">
          <PlayerColorDisplay :playerColor="botPlayerColors[bot-1]" class="playerColorIcon"/>
          <b>{{t('season.botActions.turn',{opponent:t(`opponent.${botOpponent[bot-1]}`)})}}</b>
        </button>
      </h2>
      <div :id="`bot${bot}Collapse`" class="accordion-collapse collapse" aria-labelledby="`bot${bot}Heading`" data-bs-parent="#botActionsAccordion">
        <div class="accordion-body">
          <SeasonAction :card-deck="cardDeck[bot-1]"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import PlayerColor from '@/services/enum/PlayerColor'
import PlayerColorDisplay from '../structure/PlayerColorDisplay.vue'
import Opponent from '@/services/enum/Opponent'
import SeasonAction from './SeasonAction.vue'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: "SeasonActions",
  components: {
    PlayerColorDisplay,
    SeasonAction
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    botCount() : number {
      return this.navigationState.botCount
    },
    botOpponent() : Opponent[] {
      return this.navigationState.botOpponent
    },
    botPlayerColors() : PlayerColor[] {
      return this.navigationState.botPlayerColors
    },
    cardDeck() : CardDeck[] {
      return this.navigationState.cardDeck as CardDeck[]
    }
  }
})
</script>

<style lang="scss">
  .playerColorIcon {
    margin-top: 0.25rem;
  }
</style>
