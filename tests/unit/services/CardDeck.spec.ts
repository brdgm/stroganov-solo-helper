import CardDeck from '@/services/CardDeck'
import Strategy from '@/services/enum/Strategy'
import { expect } from 'chai'

describe('CardDeck', () => {
  it('new-random', () => {
    const cardDeck = CardDeck.new(Strategy.NONE)

    expect(cardDeck.deck.length, 'deck size').to.eq(13)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)

    cardDeck.draw()

    expect(cardDeck.deck.length, 'deck size').to.eq(12)
    expect(cardDeck.discard.length, 'discard size').to.eq(1)
    expect(cardDeck.moveHuntCard, 'move hunt card').to.not.null
    expect(cardDeck.mainActionCard, 'main action card').to.not.null
  })

  it('new-strategy', () => {
    const cardDeck = CardDeck.new(Strategy.OUTPOSTS_TROPHIES)

    expect(cardDeck.deck.length, 'deck size').to.eq(13)
    expect(cardDeck.discard.length, 'discard size').to.eq(0)

    cardDeck.draw()

    expect(cardDeck.deck.length, 'deck size').to.eq(12)
    expect(cardDeck.discard.length, 'discard size').to.eq(1)
    expect(cardDeck.moveHuntCard, 'move hunt card').to.not.null
    expect(cardDeck.mainActionCard, 'main action card').to.not.null
  })
})
