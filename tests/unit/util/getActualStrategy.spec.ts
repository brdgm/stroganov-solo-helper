import Strategy from '@/services/enum/Strategy'
import getActualStrategy from '@/util/getActualStrategy'
import { expect } from 'chai'

describe('getActualStrategy', () => {
  it('get', () => {
    const strategy = [Strategy.NONE, Strategy.OUTPOSTS_TROPHIES, Strategy.HIDDEN, Strategy.HIDDEN]

    const actualStrategy = getActualStrategy(strategy)

    expect(actualStrategy[0]).to.eq(Strategy.NONE)
    expect(actualStrategy[1]).to.eq(Strategy.OUTPOSTS_TROPHIES)
    expect(actualStrategy[2]).to.not.eq(Strategy.HIDDEN)
    expect(actualStrategy[2]).to.not.eq(Strategy.NONE)
    expect(actualStrategy[3]).to.not.eq(Strategy.HIDDEN)
    expect(actualStrategy[3]).to.not.eq(Strategy.NONE)
  })

})
