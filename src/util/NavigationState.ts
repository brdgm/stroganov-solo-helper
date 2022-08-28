import DifficultyLevel from "@/services/enum/DifficultyLevel"
import { State } from "@/store"
import { RouteLocation } from "vue-router"
import { Store } from "vuex"
import CardDeck from "@/services/CardDeck"
import getActualStrategy from "./getActualStrategy"
import Strategy from "@/services/enum/Strategy"
import Season from "@/services/enum/Season"
import PlayerColor from "@/services/enum/PlayerColor"
import Opponent from "@/services/enum/Opponent"

export default class NavigationState {

  readonly difficultyLevel : DifficultyLevel
  readonly botCount : number
  readonly botOpponent : Opponent[]
  readonly botPlayerColors : PlayerColor[]
  readonly year : number
  readonly season : number
  readonly cardDeck? : CardDeck[]

  constructor(route : RouteLocation, store : Store<State>) {    
    const setup = store.state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.botCount = setup.playerSetup.botCount
    this.botOpponent = setup.playerSetup.opponent
    this.botPlayerColors = setup.playerSetup.playerColors.slice(1)

    this.year = parseInt(route.params['year'] as string)
    this.season = parseInt(route.params['season'] as string)
    this.cardDeck = NavigationState.getCardDecks(this.year, this.season, this.botCount, store)
  }

  private static getCardDecks(year : number, season : number, botCount : number, store : Store<State>) : CardDeck[] | undefined {
    if (season == Season.WINTER) {
      return undefined
    }

    let yearData = store.state.years[year - 1]
    if (!yearData) {
      yearData = {
        year: year,
        seasons: []
      }
    }
    let seasonData = yearData.seasons[season - 1]
    if (!seasonData) {
      seasonData = {
        year: year,
        season: season,
        cardDeck: []
      }
    }

    if (seasonData.cardDeck.length < botCount) {
      let cardDeck = this.getPreviousCardDecks(year, season, store)
      if (!cardDeck) {
        cardDeck = this.createNewCardDecks(botCount, store)
      }
      // draw next card for each card deck
      cardDeck.forEach(item => item.draw())
      seasonData.cardDeck = cardDeck.map(item => item.toPersistence())
      store.commit('season', seasonData)
    }

    return seasonData.cardDeck.map(item => CardDeck.fromPersistence(item))
  }

  private static getPreviousCardDecks(year : number, season : number, store : Store<State>) : CardDeck[] | undefined {
    let seasonData
    if (season > 1) {
      const yearData = store.state.years[year - 1]
      if (yearData) {
        seasonData = yearData.seasons[season - 2]
      }
    }
    else {
      const yearData = store.state.years[year - 2]
      if (yearData) {
        seasonData = yearData.seasons[yearData.seasons.length - 1]
      }
    }
    if (seasonData) {
      return seasonData.cardDeck.map(item => CardDeck.fromPersistence(item))
    }
    else {
      return undefined
    }
  }

  private static createNewCardDecks(botCount : number, store : Store<State>) : CardDeck[] {
    const strategy = this.getActualStrategy(store)
    const cardDeck = [] as CardDeck[]
    for (let bot = 0; bot<botCount && bot<strategy.length; bot++) {
      cardDeck.push(CardDeck.new(strategy[bot]))
    }
    return cardDeck
  }

  private static getActualStrategy(store : Store<State>) : Strategy[] {
    if (store.state.setup.actualStrategy) {
      return store.state.setup.actualStrategy
    }
    const actualStrategy = getActualStrategy(store.state.setup.playerSetup.strategy)
    store.commit('setupActualStrategy', actualStrategy)
    return actualStrategy
  }

}
