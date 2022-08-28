<template>
  <h3 class="mt-4 mb-3">{{t('setup.difficultyLevel.title')}}</h3>

  <div class="row">
    <div class="col-1 text-end">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.easy')}}</label>
    </div>
    <div class="col-8 col-md-4">
      <input type="range" class="form-range" min="1" max="3" id="difficultyLevel"
          :value="difficultyLevel" @input="updateDifficultyLevel($event)">
    </div>
    <div class="col-1">
      <label for="difficultyLevel" class="form-label">{{t('setup.difficultyLevel.hard')}}</label>
    </div>
  </div>
  <div class="row mt-3" v-if="difficultyLevel > 1">
    <div class="col-11 text-muted small">
      <ul>
        <li v-html="t('setup.difficultyLevel.mediumInfo')"></li>
        <li v-if="difficultyLevel > 2" v-html="t('setup.difficultyLevel.hardInfo')"></li>
      </ul>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from '@/store'

export default defineComponent({
  name: 'DifficultyLevel',
  setup() {
    const { t } = useI18n()
    useStore()
    return { t }
  },
  data() {
    return {
      difficultyLevel: this.$store.state.setup.difficultyLevel
    }
  },
  methods: {
    updateDifficultyLevel(event: Event) {
      this.difficultyLevel = parseInt((event.target as HTMLInputElement).value)
      this.$store.commit('setupDifficultyLevel', this.difficultyLevel)
    }
  }
})
</script>

<style lang="scss" scoped>
.difficultyLevelIcon {
  height: 1.5rem;
}
</style>