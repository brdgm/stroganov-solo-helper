<template>
  <div class="accordion" id="actionsAccordion">
    <div class="accordion-item">
      <h2 class="accordion-header" id="playerHeading">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#playerCollapse" aria-expanded="false" aria-controls="playerCollapse"
            @click="makeTurn(0)" :key="'player:'+turnDone[0]" :class="{done:turnDone[0]}">
          <PlayerColorDisplay :playerColor="playerColors[0]" class="playerColorIcon"/>
          <b>{{t('season.actions.playerTurn')}}</b>
          <input class="form-check-input turn-done" type="checkbox" :value="true" v-model="turnDone[0]">
        </button>
      </h2>
      <div id="playerCollapse" class="accordion-collapse collapse" aria-labelledby="playerHeading" data-bs-parent="#actionsAccordion">
        <div class="accordion-body">
          {{t('season.actions.playerTurnInfo')}}
        </div>
      </div>
    </div>
    <div class="accordion-item" v-for="bot in botCount" :key="bot">
      <h2 class="accordion-header" :id="`bot${bot}Heading`">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="`#bot${bot}Collapse`" aria-expanded="false" :aria-controls="`bot${bot}Collapse`"
            @click="makeTurn(bot)" :key="bot+':'+turnDone[bot]" :class="{done:turnDone[bot]}">
          <PlayerColorDisplay :playerColor="playerColors[bot]" class="playerColorIcon"/>
          <b>{{t('season.actions.botTurn',{opponent:t(`opponent.${botOpponent[bot-1]}`)})}}</b>
          <input class="form-check-input turn-done" type="checkbox" :value="true" v-model="turnDone[bot]">
        </button>
      </h2>
      <div :id="`bot${bot}Collapse`" class="accordion-collapse collapse" :aria-labelledby="`bot${bot}Heading`" data-bs-parent="#actionsAccordion">
        <div class="accordion-body">
          <SeasonAction :card-deck="cardDeck[bot-1]" :difficultyLevel="difficultyLevel"/>
        </div>
      </div>
    </div>
  </div>

  <ul class="small mt-3">
    <li v-if="difficultyLevel > 2">
      <span v-html="t('season.actions.tradeActionSpaceFur1')"></span>
      <AppIcon name="coin" class="noteIcon"/>
      <span v-html="t('season.actions.tradeActionSpaceFur2')"></span>
    </li>
    <li v-if="hasChipmunkMerchantExpansion">
      <span v-html="t('season.actions.chipmunkMerchantTradeTwo1')"></span>
      <AppIcon name="chipmunk" class="noteIcon"/>
      <span v-html="t('season.actions.chipmunkMerchantTradeTwo2')"></span>
    </li>
    <li v-if="hasNewLandscapeTilesExpansion">
      <a href="#newLandscapeTilesExpansionDetailsCollapse" data-bs-toggle="collapse" v-html="t('season.actions.newLandscapeTile.title')"></a>
      <ul class="collapse" id="newLandscapeTilesExpansionDetailsCollapse">
        <li v-html="t('season.actions.newLandscapeTile.getATile')"></li>
        <li v-html="t('season.actions.newLandscapeTile.getBTile')"></li>
        <li v-html="t('season.actions.newLandscapeTile.bTileSummerStart')"></li>
        <li v-html="t('season.actions.newLandscapeTile.settlementOfYurtsTile')"></li>
      </ul>
    </li>
  </ul>
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
import AppIcon from '../structure/AppIcon.vue'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'SeasonActions',
  components: {
    PlayerColorDisplay,
    SeasonAction,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  data() {
    return {
      turnDone: [] as boolean[]
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
    playerColors() : PlayerColor[] {
      return this.navigationState.playerColors
    },
    cardDeck() : CardDeck[] {
      return this.navigationState.cardDeck as CardDeck[]
    },
    hasChipmunkMerchantExpansion() {
      return this.state.hasExpansion(Expansion.TURUKHAN_CHIPMUNKS_MERCHANT)
    },
    hasNewLandscapeTilesExpansion() {
      return this.state.hasExpansion(Expansion.TURUKHAN_NEW_LANDSCAPE_TILES)
    }
  },
  methods: {
    makeTurn(index : number) : void {
      this.turnDone[index] = true
    }
  }
})
</script>

<style lang="scss" scoped>
  .playerColorIcon {
    margin-top: 0.25rem;
  }
  .noteIcon {
    height: 1.5rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
  input.turn-done {
    margin-top: 0rem;
    margin-left: 0.5rem;
  }
  button.done {
    color: #ccc;
  }
</style>
