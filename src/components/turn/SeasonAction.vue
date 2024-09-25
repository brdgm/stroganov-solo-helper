<template>
  <ol>
    <li>
      <AppIcon type="move" :name="`move-${moveEastSteps}`"/>
      <span v-html="t('season.action.move',{steps:moveEastSteps})" class="desc"></span>
    </li>
    <li>
      <AppIcon name="hunting"/>:      
      <table class="hunting">
        <tbody>
          <tr>
            <td><AppIcon name="arrow" class="arrow" v-if="fur1Active"/></td>
            <td><AppIcon name="fur-hunt" class="fur" :class="{inactive:!fur1Active}"/></td>
          </tr>
          <tr>
            <td><AppIcon name="arrow" class="arrow" v-if="fur2Active"/></td>
            <td><AppIcon name="fur-hunt" class="fur" :class="{inactive:!fur2Active}"/></td>
          </tr>
          <tr>
            <td><AppIcon name="arrow" class="arrow" v-if="fur3Active"/></td>
            <td><AppIcon name="fur-hunt" class="fur" :class="{inactive:!fur3Active}"/></td>
          </tr>
        </tbody>
      </table>
      <span v-html="t('season.action.or')" class="or"></span>
      <AppIcon v-for="item in huntCount" :key="item" name="coin" class="coin"/>
      <span v-html="t('season.action.ifEmpty')" class="desc"></span>
    </li>
    <li>
      <span v-html="t('season.action.claimLandscape')"></span>
      <span v-html="t('season.action.or')" class="or"></span>
      <span v-html="t('season.action.visitVillage')"></span>
    </li>
    
    <li>
      <template v-if="extendedAction=='outpost'">
        <AppIcon name="fur-location" class="fur-location"/>
        <AppIcon name="arrow-grey" class="arrow-grey"/>
        <AppIcon name="outpost" class="outpost"/>
        <span v-html="t('season.action.outpost')" class="desc"></span>
      </template>
      <template v-if="extendedAction=='trophy'">
        <AppIcon name="trophy" class="trophy"/>
        <span v-html="t('season.action.trophy')" class="desc"></span>
      </template>
      <template v-if="extendedAction=='yurt'">
        <AppIcon name="fur-location" class="fur-location"/>
        <AppIcon name="arrow-grey" class="arrow-grey"/>
        <AppIcon name="yurt" class="yurt"/>
        <span v-html="t('season.action.yurt')" class="desc"></span>
      </template>
      <template v-if="extendedAction=='tsar-wish'">
        <AppIcon name="fur-location" class="fur-location"/>
        <AppIcon name="arrow-grey" class="arrow-grey"/>
        <AppIcon name="tsar-wish-card" class="tsar-wish-card"/>
        <span v-html="t('season.action.tsar-wish')" class="desc"></span>
      </template>
      <template v-if="extendedAction=='claim-landscape-full-cost'">
        <AppIcon name="landscape-buy-full-cost" class="landscape-buy-full-cost"/>
        <span v-html="t('season.action.claim-landscape-full-cost')" class="desc"></span>
      </template>
      <template v-if="difficultyLevel > 1">
        <span v-html="t('season.action.or')" class="or"></span>
        <AppIcon name="coin" class="coin"/>
      </template>
      <span v-else v-html="t('season.action.ifPossible')" class="desc"></span>
    </li>

  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import CardDeck from '@/services/CardDeck'
import HuntSelection from '@/services/enum/HuntSelection'
import Action from '@/services/enum/Action'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'SeasonAction',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    cardDeck: {
      type: CardDeck,
      required: true
    },
    difficultyLevel: {
      type: Number,
      required: true
    }
  },
  computed: {
    moveEastSteps() : number {
      return this.cardDeck.moveHuntCard.moveEastSteps
    },
    huntSelectionHighest() : boolean {
      return this.cardDeck.moveHuntCard.huntSelection == HuntSelection.HIGHEST
    },
    huntSelectionLowest() : boolean {
      return this.cardDeck.moveHuntCard.huntSelection == HuntSelection.LOWEST
    },
    huntCount() : number {
      return this.cardDeck.moveHuntCard.huntCount
    },
    extendedAction() : Action {
      return this.cardDeck.mainActionCard.extendedAction
    },
    fur1Active() : boolean {
      return this.huntSelectionLowest
    },
    fur2Active() : boolean {
      return this.huntCount == 2
    },
    fur3Active() : boolean {
      return this.huntSelectionHighest
    }
  }
})
</script>

<style lang="scss" scoped>
  li {
    margin-bottom: 1rem;
  }
  .desc {
    margin-left: 0.75rem;
  }
  .hunting {
    display: inline;
    vertical-align: middle;
    .arrow {
      height: 1.3rem;
    }
    .fur {
      height: 2rem;
      margin-top: -0.4rem;
      margin-bottom: -0.4rem;
      &.inactive {
        opacity: 0.4;
      }
    }
  }
  .or {
    font-weight: bold;
    font-style: italic;
    margin-left: 1rem;
    margin-right: 1rem;
  }
  .coin {
    height: 1.75rem;
    margin-left: 0;
    margin-right: 0;
  }
  .fur-location {
    height: 2.5rem;
  }
  .arrow-grey {
    height: 2rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
  .trophy {
    height: 4rem;
  }
  .tsar-wish-card {
    height: 2.75rem;
  }
  .yurt {
    height: 2.5rem;
  }
  .outpost {
    height: 5rem;
  }
  .landscape-buy-full-cost {
    height: 4rem;
  }
</style>
