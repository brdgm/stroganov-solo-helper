import DifficultyLevel from '@/services/enum/DifficultyLevel'
import { useStateStore } from '@/store/state'
import { RouteLocation } from 'vue-router'
import CardDeck from '@/services/CardDeck'
import getActualStrategy from './getActualStrategy'
import Strategy from '@/services/enum/Strategy'
import Season from '@/services/enum/Season'
import PlayerColor from '@/services/enum/PlayerColor'
import Opponent from '@/services/enum/Opponent'

export default class NavigationState {

  readonly state
  readonly difficultyLevel : DifficultyLevel
  readonly botCount : number
  readonly botOpponent : Opponent[]
  readonly playerColors : PlayerColor[]
  readonly year : number
  readonly season : number
  readonly cardDeck? : CardDeck[]

  constructor(route : RouteLocation) {
    this.state = useStateStore()
    const setup = this.state.setup
    this.difficultyLevel = setup.difficultyLevel
    this.botCount = setup.playerSetup.botCount
    this.botOpponent = setup.playerSetup.opponent
    this.playerColors = setup.playerSetup.playerColors

    this.year = parseInt(route.params['year'] as string)
    this.season = parseInt(route.params['season'] as string)
    this.cardDeck = this.getCardDecks(this.year, this.season, this.botCount)
  }

  private getCardDecks(year : number, season : number, botCount : number) : CardDeck[] | undefined {
    if (season == Season.WINTER) {
      return undefined
    }

    let yearData = this.state.years[year - 1]
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
      let cardDeck = this.getPreviousCardDecks(year, season)
      if (!cardDeck) {
        cardDeck = this.createNewCardDecks(botCount)
      }
      // draw next card for each card deck
      cardDeck.forEach(item => item.draw())
      seasonData.cardDeck = cardDeck.map(item => item.toPersistence())
      this.state.season(seasonData)
    }

    return seasonData.cardDeck.map(item => CardDeck.fromPersistence(item))
  }

  private getPreviousCardDecks(year : number, season : number) : CardDeck[] | undefined {
    let seasonData
    if (season > 1) {
      const yearData = this.state.years[year - 1]
      if (yearData) {
        seasonData = yearData.seasons[season - 2]
      }
    }
    else {
      const yearData = this.state.years[year - 2]
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

  private createNewCardDecks(botCount : number) : CardDeck[] {
    const strategy = this.getActualStrategy()
    const cardDeck = [] as CardDeck[]
    for (let bot = 0; bot<botCount && bot<strategy.length; bot++) {
      cardDeck.push(CardDeck.new(strategy[bot]))
    }
    return cardDeck
  }

  private getActualStrategy() : Strategy[] {
    if (this.state.setup.actualStrategy) {
      return this.state.setup.actualStrategy
    }
    const actualStrategy = getActualStrategy(this.state.setup.playerSetup.strategy)
    this.state.setup.actualStrategy = actualStrategy
    return actualStrategy
  }

}
