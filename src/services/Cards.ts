import findMandatory from 'brdgm-commons/src/util/map/findMandatory';
import Card from './Card';
import Action from './enum/Action';
import HuntSelection from './enum/HuntSelection';
import Strategy from './enum/Strategy';

const cards = [
  {
    id: 1,
    notStrategy: [Strategy.TROPHIES_LANDSCAPE_TILES],
    moveEastSteps: 1,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 1,
    extendedAction: Action.OUTPOST
  },
  {
    id: 2,
    notStrategy: [Strategy.LANDSCAPE_TILES_TSARS_WISHES],
    moveEastSteps: 3,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 2,
    extendedAction: Action.TROPHY
  },
  {
    id: 3,
    notStrategy: [Strategy.OUTPOSTS_TROPHIES,Strategy.OUTPOSTS_TSARS_WISHES],
    moveEastSteps: 3,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 2,
    extendedAction: Action.YURT
  },
  {
    id: 4,
    notStrategy: [Strategy.TROPHIES_LANDSCAPE_TILES,Strategy.LANDSCAPE_TILES_TSARS_WISHES],
    moveEastSteps: 3,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 1,
    extendedAction: Action.OUTPOST
  },
  {
    id: 5,
    notStrategy: [Strategy.OUTPOSTS_LANDSCAPE_TILES,Strategy.OUTPOSTS_TSARS_WISHES],
    moveEastSteps: 2,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 1,
    extendedAction: Action.TROPHY
  },
  {
    id: 6,
    notStrategy: [Strategy.LANDSCAPE_TILES_TSARS_WISHES],
    moveEastSteps: 3,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.OUTPOST
  },
  {
    id: 7,
    notStrategy: [Strategy.OUTPOSTS_LANDSCAPE_TILES,Strategy.LANDSCAPE_TILES_TSARS_WISHES],
    moveEastSteps: 2,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 2,
    extendedAction: Action.TROPHY
  },
  {
    id: 8,
    notStrategy: [Strategy.TROPHIES_LANDSCAPE_TILES],
    moveEastSteps: 2,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 2,
    extendedAction: Action.OUTPOST
  },
  {
    id: 9,
    notStrategy: [Strategy.TROPHIES_LANDSCAPE_TILES],
    moveEastSteps: 5,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 2,
    extendedAction: Action.TSAR_WISH
  },
  {
    id: 10,
    notStrategy: [Strategy.TROPHIES_TSARS_WISHES,Strategy.LANDSCAPE_TILES_TSARS_WISHES],
    moveEastSteps: 4,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.OUTPOST
  },
  {
    id: 11,
    notStrategy: [Strategy.OUTPOSTS_TSARS_WISHES,Strategy.TROPHIES_TSARS_WISHES],
    moveEastSteps: 2,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 2,
    extendedAction: Action.CLAIM_LANDSCAPE_FULL_COST
  },
  {
    id: 12,
    notStrategy: [Strategy.TROPHIES_TSARS_WISHES],
    moveEastSteps: 1,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.OUTPOST
  },
  {
    id: 13,
    notStrategy: [Strategy.OUTPOSTS_TSARS_WISHES,Strategy.TROPHIES_TSARS_WISHES],
    moveEastSteps: 4,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 1,
    extendedAction: Action.YURT
  },
  {
    id: 14,
    notStrategy: [Strategy.OUTPOSTS_TROPHIES,Strategy.OUTPOSTS_LANDSCAPE_TILES],
    moveEastSteps: 2,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.TSAR_WISH
  },
  {
    id: 15,
    notStrategy: [Strategy.OUTPOSTS_TROPHIES,Strategy.OUTPOSTS_LANDSCAPE_TILES],
    moveEastSteps: 4,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.TSAR_WISH
  },
  {
    id: 16,
    notStrategy: [Strategy.OUTPOSTS_LANDSCAPE_TILES,Strategy.OUTPOSTS_TSARS_WISHES],
    moveEastSteps: 1,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 1,
    extendedAction: Action.TROPHY
  },
  {
    id: 17,
    notStrategy: [Strategy.OUTPOSTS_TROPHIES,Strategy.TROPHIES_LANDSCAPE_TILES],
    moveEastSteps: 2,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.TSAR_WISH
  },
  {
    id: 18,
    notStrategy: [Strategy.OUTPOSTS_TROPHIES,Strategy.TROPHIES_TSARS_WISHES],
    moveEastSteps: 3,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 1,
    extendedAction: Action.CLAIM_LANDSCAPE_FULL_COST
  }
]

const cardsMap = new Map<number,Card>()
cards.forEach(card => cardsMap.set(card.id, card))

export default {

  /**
   * Get card by ID
   * @param id ID
   * @returns Card
   */
  get(id: number) : Card {
    return findMandatory(cardsMap, id)
  },

  /**
   * Get all cards
   * @returns cards
   */
  getAll() : Card[] {
    return cards
  },

}
