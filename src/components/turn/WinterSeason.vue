<template>
  <div class="row mt-3">
    <div class="col">
      <p v-if="hasChipmunkMerchantExpansion">
        <span v-html="t('season.winterChipmunkTrade1')"></span>
        <AppIcon name="chipmunk" class="noteIcon"/>
        <span v-html="t('season.winterChipmunkTrade2')"></span>
      </p>
      <p v-html="t('season.winter')"></p>
    </div>
  </div>
  <div class="row mt-1 mb-3" v-if="year==4">
    <h3 v-html="t('season.endOfGame')"></h3>
    <div class="col">
      <p class="mt-3"><b v-html="t('season.endOfGameInfo')"></b></p>
      <p v-if="hasHuntingPlanExpansion" class="small" v-html="t('season.endOfGameHuntingPlanVP')"></p>
      <p class="small mt-4" v-html="t('season.endOfGameActualStrategies')"></p>
      <ul class="small">
        <li v-for="bot in botCount" :key="bot">
          <PlayerColorDisplay :player-color="playerColors[bot]" :size-rem="1"/>
          <b>{{t(`opponent.${getOpponent(bot-1)}`)}}</b>: {{t(`strategy.${getActualStrategy(bot-1)}`)}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import Strategy from '@/services/enum/Strategy'
import Opponent from '@/services/enum/Opponent'
import PlayerColor from '@/services/enum/PlayerColor'
import PlayerColorDisplay from '../structure/PlayerColorDisplay.vue'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'WinterSeason',
  components: {
    PlayerColorDisplay,
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
  computed: {
    year(): number {
      return this.navigationState.year
    },
    botCount(): number {
      return this.navigationState.botCount
    },
    playerColors(): PlayerColor[] {
      return this.navigationState.playerColors
    },
    hasChipmunkMerchantExpansion() {
      return this.state.hasExpansion(Expansion.TURUKHAN_CHIPMUNKS_MERCHANT)
    },
    hasHuntingPlanExpansion() : boolean {
      return this.state.hasExpansion(Expansion.TURUKHAN_HUNTING_PLAN)
    }
  },
  methods: {
    getOpponent(bot: number): Opponent | undefined {
      return this.state.setup.playerSetup.opponent[bot]
    },
    getActualStrategy(bot: number): Strategy | undefined {
      if (this.state.setup.actualStrategy) {
        return this.state.setup.actualStrategy[bot]
      }
    }
  }
})
</script>

<style lang="scss" scoped>
  .noteIcon {
    height: 1.75rem;
    margin-left: 0.25rem;
    margin-right: 0.25rem;
  }
</style>
