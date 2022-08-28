<template>
  <ol>
    <li>
      <Icon type="move" :name="`move-${moveEastSteps}`"/>
      Move {{moveEastSteps}}
    </li>
    <li>
      <icon name="hunting"/>:
      
      <table class="hunting">
        <tr>
          <td><icon name="arrow" class="arrow" v-if="fur1Active"/></td>
          <td><icon name="fur-hunt" class="fur" :class="{inactive:!fur1Active}"/></td>
        </tr>
        <tr>
          <td><icon name="arrow" class="arrow" v-if="fur2Active"/></td>
          <td><icon name="fur-hunt" class="fur" :class="{inactive:!fur2Active}"/></td>
        </tr>
        <tr>
          <td><icon name="arrow" class="arrow" v-if="fur3Active"/></td>
          <td><icon name="fur-hunt" class="fur" :class="{inactive:!fur3Active}"/></td>
        </tr>
      </table>
      
      <span class="or">or</span>
      {{huntCount}} <icon name="coin" class="coin"/> (if empty)
    </li>
    <li>
      Buy Landscape (if empty)
      <span class="or">or</span>
      Visit village (cosack's region)
    </li>
    
    <li v-if="extendedAction=='outpost'">
      <icon name="fur-location" class="fur-location"/>
      <icon name="arrow-grey" class="arrow-grey"/>
      <icon name="outpost" class="outpost"/>
      Build outpost or take new outpost
    </li>
    <li v-if="extendedAction=='trophy'">
      <icon name="trophy" class="trophy"/>
      Receive Trophy
    </li>
    <li v-if="extendedAction=='yurt'">
      <icon name="fur-location" class="fur-location"/>
      <icon name="arrow-grey" class="arrow-grey"/>
      <icon name="yurt" class="yurt"/>
      Use a Yurt
    </li>
    <li v-if="extendedAction=='tsar-wish'">
      <icon name="fur-location" class="fur-location"/>
      <icon name="arrow-grey" class="arrow-grey"/>
      <icon name="tsar-wish-card" class="tsar-wish-card"/>
      Take a Tsar's Wish
    </li>
    <li v-if="extendedAction=='claim-landscape-full-cost'">
      <icon name="landscape-buy-full-cost" class="landscape-buy-full-cost"/>
      Buy Landscape Tile with full cost (if possible)
    </li>

  </ol>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import CardDeck from '@/services/CardDeck'
import HuntSelection from '@/services/enum/HuntSelection';
import Action from '@/services/enum/Action';
import Icon from '../structure/Icon.vue';

export default defineComponent({
  name: "SeasonAction",
  components: {
    Icon
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  props: {
    cardDeck: {
      type: CardDeck,
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

<style lang="scss">
  li {
    margin-bottom: 1rem;
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
    margin-right: 0.5rem;
  }
  .yurt {
    height: 2.5rem;
    margin-right: 0.5rem;
  }
  .outpost {
    height: 5rem;
    margin-right: 0.5rem;
  }
  .landscape-buy-full-cost {
    height: 4rem;
    margin-right: 0.5rem;
  }
</style>
