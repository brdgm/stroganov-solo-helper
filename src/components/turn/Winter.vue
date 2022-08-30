<template>
  <div class="row mt-3 mb-3">
    <div class="col" v-html="t('season.winter')"></div>
  </div>
  <div class="row mt-3 mb-3" v-if="year==4">
    <h3 v-html="t('season.endOfGame')"></h3>
    <div class="col">
      <p class="mt-3 mb-4"><b v-html="t('season.endOfGameInfo')"></b></p>
      <p class="small" v-html="t('season.endOfGameActualStrategies')"></p>
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
import { useStore } from 'vuex';
import Strategy from '@/services/enum/Strategy';
import Opponent from '@/services/enum/Opponent';
import PlayerColor from '@/services/enum/PlayerColor';
import PlayerColorDisplay from '../structure/PlayerColorDisplay.vue';

export default defineComponent({
    name: "Winter",
    setup() {
        const { t } = useI18n();
        useStore();
        return { t };
    },
    props: {
        navigationState: {
            type: NavigationState,
            required: true
        }
    },
    computed: {
        year(): number {
            return this.navigationState.year;
        },
        botCount(): number {
            return this.navigationState.botCount;
        },
        playerColors(): PlayerColor[] {
            return this.navigationState.playerColors;
        }
    },
    methods: {
        getOpponent(bot: number): Opponent | undefined {
            return this.$store.state.setup.playerSetup.opponent[bot];
        },
        getActualStrategy(bot: number): Strategy | undefined {
            if (this.$store.state.setup.actualStrategy) {
                return this.$store.state.setup.actualStrategy[bot];
            }
        }
    },
    components: { PlayerColorDisplay }
})
</script>
