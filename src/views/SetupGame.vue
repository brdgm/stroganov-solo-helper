<template>
  <h1>{{t('setup.title')}}</h1>

  <PlayersSetup/>
  <DifficultyLevel/>
  <ExpansionsSetup/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame">
    {{t('action.startGame')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import PlayersSetup from '@/components/setup/PlayersSetup.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import ExpansionsSetup from '@/components/setup/ExpansionsSetup.vue'

export default defineComponent({
  name: 'SetupGame',
  components: {
    PlayersSetup,
    DifficultyLevel,
    ExpansionsSetup,
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    useRoute()
    return { t, state }
  },
  methods: {
    startGame() {
      this.state.resetGame()
      this.$router.push('/year/1/season/1')
    }
  }
})
</script>
