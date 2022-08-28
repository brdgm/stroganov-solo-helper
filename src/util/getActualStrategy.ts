import Strategy from "@/services/enum/Strategy";
import randomEnum from 'brdgm-commons/src/util/random/randomEnum'

/**
 * Map selected strategies to actual strategies.
 * Replaces "HIDDEN" strategy with a known strategy that is not HIDDEN or NONE.
 * @param selectedStrategy Selected strategies
 * @returns Actual strategies
 */
export default function (selectedStrategy : Strategy[]) : Strategy[] {
  return selectedStrategy.map(mapActualPlayerStrategyItem)
}

function mapActualPlayerStrategyItem(selectedStrategy : Strategy) : Strategy {
  if (selectedStrategy == Strategy.HIDDEN) {
    return pickRandomStrategy()
  }
  return selectedStrategy
}

function pickRandomStrategy() : Strategy {
  const randomStrategy = randomEnum(Strategy)
  if (randomStrategy == Strategy.NONE || randomStrategy == Strategy.HIDDEN) {
    return pickRandomStrategy()
  }
  return randomStrategy
}
