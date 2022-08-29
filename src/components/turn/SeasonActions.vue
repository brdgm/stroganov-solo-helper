<template>
  <div class="accordion" id="botActionsAccordion">
    <div class="accordion-item" v-for="bot in botCount" :key="bot">
      <h2 class="accordion-header" :id="`bot${bot}Heading`">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#bot${bot}Collapse`" aria-expanded="true" :aria-controls="`bot${bot}Collapse`">
          <PlayerColorDisplay :playerColor="botPlayerColors[bot-1]" class="playerColorIcon"/>
          <b>{{t('season.actions.turn',{opponent:t(`opponent.${botOpponent[bot-1]}`)})}}</b>
        </button>
      </h2>
      <div :id="`bot${bot}Collapse`" class="accordion-collapse collapse" aria-labelledby="`bot${bot}Heading`" data-bs-parent="#botActionsAccordion">
        <div class="accordion-body">
          <SeasonAction :card-deck="cardDeck[bot-1]" :difficultyLevel="difficultyLevel"/>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3" v-if="difficultyLevel > 2">
    <div class="col small">
      <span v-html="t('season.actions.tradeActionSpaceFur1')"></span>
      <Icon name="coin" class="coinNote"/>
      <span v-html="t('season.actions.tradeActionSpaceFur2')"></span>
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
import Icon from '../structure/Icon.vue'

export default defineComponent({
  name: "SeasonActions",
  components: {
    PlayerColorDisplay,
    SeasonAction,
    Icon
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
    difficultyLevel() : number {
      return this.navigationState.difficultyLevel
    },
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

<style lang="scss" scoped>
  .playerColorIcon {
    margin-top: 0.25rem;
  }
  .coinNote {
    height: 1.5rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
</style>
