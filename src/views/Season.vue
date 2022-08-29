<template>
  <h1>
    {{t('season.title',{year:year})}}:
    <Icon type="season" :name="seasonName" class="seasonIcon"/>
    {{t(`seasonName.${seasonName}`)}}
  </h1>

  <SeasonActions v-if="season != 4" :navigationState="state"/>
  <template v-else>
    <div class="row mt-3 mb-3">
      <div class="col" v-html="t('season.winter')"></div>
    </div>
    <div class="row mt-3 mb-3" v-if="year==4">
      <div class="col"><b v-html="t('season.endOfGame')"></b></div>
    </div>
  </template> 

  <router-link v-if="nextButtonRouteTo" :to="nextButtonRouteTo" class="btn btn-primary btn-lg mt-3">
    {{t('action.next')}}
  </router-link>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" :endGameButtonType="endOfGame ? 'endGame' : 'abortGame'"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'
import Icon from '@/components/structure/Icon.vue'
import Season from '@/services/enum/Season'
import SeasonActions from '@/components/turn/SeasonActions.vue'

export default defineComponent({
  name: 'RoundTurn',
  components: {
    FooterButtons,
    Icon,
    SeasonActions
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const route = useRoute()

    const state = new NavigationState(route, store)
    const year = state.year
    const season = state.season

    return { t, year, season, state }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.year == 1 && this.season == 1) {
        return ''
      }
      else if (this.season == 1) {
        return `/year/${this.year-1}/season/4`
      }
      else {
        return `/year/${this.year}/season/${this.season-1}`
      }
    },
    nextButtonRouteTo() : string {
      if (this.endOfGame) {
        return ''
      }
      else if (this.season == 4) {
        return `/year/${this.year+1}/season/1`
      }
      else {
        return `/year/${this.year}/season/${this.season+1}`
      }
    },
    endOfGame() : boolean {
      return (this.year == 4 && this.season == 4)
    },
    seasonName() : string {
      switch (this.season) {
        case Season.SPRING:
          return 'spring'
        case Season.SUMMER:
          return 'summer'
        case Season.AUTUMN:
          return 'autumn'
        case Season.WINTER:
          return 'winter'
        default:
          return ''
      }
    }
  }
})
</script>

<style lang="scss">
.seasonIcon {
  height: 2rem;
  margin-top: -0.5rem;
}
</style>
