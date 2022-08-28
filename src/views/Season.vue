<template>
  <h1>
    Season
  </h1>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" :endGameButtonType="endOfGame ? 'endGame' : 'abortGame'"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'RoundTurn',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const store = useStore()
    const route = useRoute()

    const state = new NavigationState(route, store)
    const year = state.year
    const season = state.season

    return { t, year, season }
  },
  computed: {
    backButtonRouteTo() : string {
      return ''
    },
    nextButtonRouteTo() : string {
      return ''
    },
    endOfGame() : boolean {
      return false
    }
  }
})
</script>
