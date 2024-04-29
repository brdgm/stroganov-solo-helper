import DifficultyLevel from '@/services/enum/DifficultyLevel'
import Opponent from '@/services/enum/Opponent'
import PlayerColor from '@/services/enum/PlayerColor'
import Strategy from '@/services/enum/Strategy'
import { defineStore } from 'pinia'
import { name } from '@/../package.json'

export const useStateStore = defineStore(`${name}.store`, {
  state: () => {
    return {
      language: 'en',
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
    } as State
  },
  actions: {
    season(season: Season) {
      let year = this.years.find(item => item.year == season.year)
      if (!year) {
        year = {
          year: season.year,
          seasons: []
        }
        this.years.push(year)
      }
      year.seasons = year.seasons.filter(item => item.season != season.season)
      year.seasons.push(season)
    },
    resetGame() {
      this.setup.actualStrategy = undefined
      this.years = []
    }
  },
  persist: true
})

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
