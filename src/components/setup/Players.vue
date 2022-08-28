<template>
  <h3 class="mt-4 mb-3">{{t('setup.players.titlePlayer')}}</h3>

  <div class="row mt-3" :key="playerColors[0]">
    <div class="col-5 col-md-3">
      <label for="playerCount" class="form-label">{{t('setup.players.playerColor', {index:1})}}</label>
    </div>
    <div class="col-5 col-md-3">
      <PlayerColorPicker :model-value="playerColors[0]" @update:model-value="color => playerColorChanged(0, color)"/>
    </div>
  </div>  

  <h3 class="mt-4 mb-3">{{t('setup.players.titleBot')}}</h3>

  <div class="row mt-3">
    <div class="col-4 col-md-3">
      <label for="botCount" class="form-label">{{t('setup.players.botCount')}}</label>
    </div>
    <div class="col-8 col-md-6">
      <select class="form-select" id="botCount" v-model="botCount">
        <option v-for="i in 3" :key="i" :value="i">{{t('setup.players.botCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>
  <div class="row mt-3" v-if="botCount > 1">
    <div class="offset-4 offset-md-3 col-8 col-md-8 text-muted small" v-html="t('setup.players.multipleBots')"></div>
  </div>

  <template v-for="bot in botCount" :key="bot+playerColors[bot]">
    <hr v-if="botCount > 1"/>
    <div class="row mt-3">
      <div class="col-4 col-md-3">
        <label :for="`opponent${bot}`" class="form-label">{{t('setup.players.opponent', {bot:bot}, botCount)}}</label>
      </div>
      <div class="col-8 col-md-6">
        <select class="form-select" :id="`opponent${bot}`" v-model="opponent[bot-1]">
          <option v-for="item of opponents" :key="item" :value="item">{{t('opponent.' + item)}}</option>
        </select>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-4 col-md-3">
        <label :for="`strategy${bot}`" class="form-label">{{t('setup.players.strategy', {bot:bot}, botCount)}}</label>
      </div>
      <div class="col-8 col-md-6">
        <select class="form-select" :id="`strategy${bot}`" v-model="strategy[bot-1]">
          <option v-for="item of strategies" :key="item" :value="item">{{t('strategy.' + item)}}</option>
        </select>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-5 col-md-3">
        <label for="playerCount" class="form-label">{{t('setup.players.botColor', {index:bot}, botCount)}}</label>
      </div>
      <div class="col-5 col-md-3">
        <PlayerColorPicker :model-value="playerColors[bot]" @update:model-value="color => playerColorChanged(bot, color)"/>
      </div>
    </div>  
  </template>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'
import Opponent from '@/services/enum/Opponent'
import Strategy from '@/services/enum/Strategy'
import PlayerColor from '@/services/enum/PlayerColor'
import PlayerColorPicker from './PlayerColorPicker.vue'

export default defineComponent({
  name: 'Players',
  components: {
    PlayerColorPicker
  },
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  data() {
    return {
      botCount: this.$store.state.setup.playerSetup.botCount,
      opponent: this.$store.state.setup.playerSetup.opponent,
      strategy: this.$store.state.setup.playerSetup.strategy,
      playerColors: this.$store.state.setup.playerSetup.playerColors,
      opponents: Object.values(Opponent),
      strategies: Object.values(Strategy)
    }
  },
  watch: {
    botCount() {
      this.opponent = this.opponent.splice(0, this.botCount)
      this.storePlayerSetup()
    },
    opponent: {
      handler() {
        this.storePlayerSetup()
      },
      deep: true
    },
    strategy: {
      handler() {
        this.storePlayerSetup()
      },
      deep: true
    },
    playerColors() {
      this.storePlayerSetup()
    }
  },
  methods: {
    storePlayerSetup() {
      for (let bot=1; bot<=this.botCount; bot++) {
        if (!this.opponent[bot-1]) {
          this.opponent[bot-1] = Opponent.IVAN
        }
        if (!this.strategy[bot-1]) {
          this.strategy[bot-1] = Strategy.NONE
        }
      }
      this.$store.commit('setupPlayer', {
        botCount: this.botCount,
        opponent: this.opponent,
        strategy: this.strategy,
        playerColors: this.playerColors
      })
    },
    playerColorChanged(index : number, color : PlayerColor) {
      const newPlayerColors = [...this.playerColors]
      newPlayerColors[index] = color
      for (let i=0; i<this.playerColors.length; i++) {
        if (i!=index && newPlayerColors[i]==color) {
          const newColor = Object.values(PlayerColor).find(c => !newPlayerColors.includes(c))
          if (newColor) {
            newPlayerColors[i] = newColor
          }
        }
      }
      this.playerColors = newPlayerColors
    }
  }
})
</script>
