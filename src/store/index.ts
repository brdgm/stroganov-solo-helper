import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Opponent from '@/services/enum/Opponent'
import PlayerColor from '@/services/enum/PlayerColor'
import Strategy from '@/services/enum/Strategy'
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

const LOCALSTORAGE_KEY = process.env.VUE_APP_LOCALSTORAGE_KEY_PREFIX + "store"

export interface State {
  language: string
  baseFontSize: number
  setup: Setup
  years: Year[]
}
export interface Setup {
  difficultyLevel: DifficultyLevel
  playerSetup: PlayerSetup
  actualStrategy?: Strategy[]
}
export interface PlayerSetup {
  botCount: number
  opponent: Opponent[]
  strategy: Strategy[]
  playerColors: PlayerColor[]
}
export interface Year {
  year: number
  seasons: Season[]
}
export interface Season {
  year: number
  season: number
  cardDeck: CardDeckPersistence[]
}
export interface CardDeckPersistence {
  deck: number[]
  discard: number[]
}

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    language: "en",
    baseFontSize: 1.0,
    setup: {
      difficultyLevel: DifficultyLevel.EASY,
      playerSetup: {
        botCount: 1,
        opponent: [Opponent.IVAN],
        strategy: [Strategy.NONE],
        playerColors: [PlayerColor.YELLOW,PlayerColor.BLUE,PlayerColor.RED,PlayerColor.GREEN]
      }
    },
    years: []
  },
  mutations: {
    // reload state from local storage
    initialiseStore(state) {
      const localStorageCache = localStorage.getItem(LOCALSTORAGE_KEY)
      if (localStorageCache) {
        this.replaceState(Object.assign(state, JSON.parse(localStorageCache)));
      }
    },
    language(state : State, language: string) {
      state.language = language
    },
    setupPlayer(state : State, playerSetup: PlayerSetup) {
      state.setup.playerSetup = playerSetup
    },
    setupDifficultyLevel(state : State, level: number) {
      state.setup.difficultyLevel = level
    },
    setupActualStrategy(state : State, strategy: Strategy[]) {
      state.setup.actualStrategy = strategy
    },
    season(state : State, season: Season) {
      let year = state.years.find(item => item.year == season.year)
      if (!year) {
        year = {
          year: season.year,
          seasons: []
        }
        state.years.push(year)
      }
      year.seasons = year.seasons.filter(item => item.season != season.season)
      year.seasons.push(season)
    },
    endGame(state : State) {
      state.setup.actualStrategy = undefined
      state.years = []
    },
    zoomFontSize(state : State, baseFontSize: number) {
      state.baseFontSize = baseFontSize
    }
  }
})

store.subscribe((_mutation, state) => {
	// store state asJSON string in local storage
	localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(state));
})

// define your own `useStore` composition function
export function useStore() : Store<State> {
  return baseUseStore(key)
}
