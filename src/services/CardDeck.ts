import { CardDeckPersistence } from '@/store'
import * as _ from 'lodash'
import Card from './Card'
import Cards from './Cards'
import Strategy from './enum/Strategy'
import rollDice from 'brdgm-commons/src/util/random/rollDice'

/**
 * Deck of automa cards.
 */
export default class CardDeck {

  private _deck : Card[]
  private _discard : Card[]

  public constructor(deck : Card[], discard : Card[]) {
    this._deck = deck
    this._discard = discard
  }

  public get deck() : readonly Card[] {
    return this._deck
  }

  public get discard() : readonly Card[] {
    return this._discard
  }

  public get moveHuntCard() : Card {
    return this._deck[0]
  }

  public get mainActionCard() : Card {
    return this._discard[0]
  }

  /**
   * Gets persistence view of card deck.
   */
  public toPersistence() : CardDeckPersistence {
    return {
      deck: this._deck.map(card => card.id),
      discard: this._discard.map(card => card.id)      
    }
  }

  /**
   * Draw next card.
   */
  public draw() : void {
    const drawnCard = this._deck.shift()
    if (drawnCard) {
      this._discard.unshift(drawnCard)
    }
    else {
      throw new Error('No card left in deck.')
    }
  }

  /**
   * Creates a shuffled new card deck matching with the given strategy.
   */
  public static new(strategy : Strategy) : CardDeck {
    let deck = [...Cards.getAll()]
    if (strategy == Strategy.HIDDEN) {
      throw new Error('Please pick an actual strategy.')
    }
    else if (strategy == Strategy.NONE) {
      // randomly remove 5 cards
      for (let i=0; i<5; i++) {
        const indexToRemove = rollDice(deck.length)-1
        deck.splice(indexToRemove, 1)
      }
    }
    else {
      // remove all cards not matching the selected strategy
      deck = deck.filter(item => !item.notStrategy.includes(strategy))
    }
    deck = _.shuffle(deck)
    return new CardDeck(deck, [])
  }

  /**
   * Re-creates a card deck from persistence.
   */
  public static fromPersistence(persistence : CardDeckPersistence) : CardDeck {
    return new CardDeck(
      persistence.deck.map(Cards.get),
      persistence.discard.map(Cards.get)
    )
  }

}
