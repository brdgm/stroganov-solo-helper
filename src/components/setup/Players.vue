<template>
  <h3 class="mt-4 mb-3">{{t('setup.players.title')}}</h3>

  <div class="row mt-3">
    <div class="col-5 col-md-3">
      <label for="botCount" class="form-label">{{t('setup.players.botCount')}}</label>
    </div>
    <div class="col-7 col-md-4">
      <select class="form-select" id="botCount" v-model="botCount">
        <option v-for="i in 3" :key="i" :value="i">{{t('setup.players.botCountItem', {count:i}, i)}}</option>
      </select>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'

export default defineComponent({
  name: 'Players',
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  data() {
    return {
      botCount: this.$store.state.setup.playerSetup.botCount
    }
  },
  watch: {
    botCount() {
      this.$store.commit('setupPlayer', {
        botCount: this.botCount
      })
    }
  }
})
</script>
