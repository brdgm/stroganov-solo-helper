import findMandatory from "brdgm-commons/src/util/map/findMandatory";
import Card from "./Card";
import Action from "./enum/Action";
import HuntSelection from "./enum/HuntSelection";

const cards = [
  {
    id: 1,
    cardSelection: ['d'],
    moveEastSteps: 1,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 1,
    extendedAction: Action.OUTPOST
  },
  {
    id: 2,
    cardSelection: ['f'],
    moveEastSteps: 3,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 2,
    extendedAction: Action.TROPHY
  },
  {
    id: 3,
    cardSelection: ['a','c'],
    moveEastSteps: 3,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 2,
    extendedAction: Action.YURT
  },
  {
    id: 4,
    cardSelection: ['d','f'],
    moveEastSteps: 3,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 1,
    extendedAction: Action.OUTPOST
  },
  {
    id: 5,
    cardSelection: ['b','c'],
    moveEastSteps: 2,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 1,
    extendedAction: Action.TROPHY
  },
  {
    id: 6,
    cardSelection: ['f'],
    moveEastSteps: 3,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.OUTPOST
  },
  {
    id: 7,
    cardSelection: ['b','f'],
    moveEastSteps: 2,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 2,
    extendedAction: Action.TROPHY
  },
  {
    id: 8,
    cardSelection: ['d'],
    moveEastSteps: 2,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 2,
    extendedAction: Action.OUTPOST
  },
  {
    id: 9,
    cardSelection: ['d'],
    moveEastSteps: 5,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 2,
    extendedAction: Action.TSAR_WISH
  },
  {
    id: 10,
    cardSelection: ['e','f'],
    moveEastSteps: 4,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.OUTPOST
  },
  {
    id: 11,
    cardSelection: ['c','e'],
    moveEastSteps: 2,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 2,
    extendedAction: Action.CLAIM_LANDSCAPE_FULL_COST
  },
  {
    id: 12,
    cardSelection: ['e'],
    moveEastSteps: 1,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.OUTPOST
  },
  {
    id: 13,
    cardSelection: ['c','e'],
    moveEastSteps: 4,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 1,
    extendedAction: Action.YURT
  },
  {
    id: 14,
    cardSelection: ['a','b'],
    moveEastSteps: 2,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.TSAR_WISH
  },
  {
    id: 15,
    cardSelection: ['a','b'],
    moveEastSteps: 4,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.TSAR_WISH
  },
  {
    id: 16,
    cardSelection: ['b','c'],
    moveEastSteps: 1,
    huntSelection: HuntSelection.HIGHEST,
    huntCount: 1,
    extendedAction: Action.TROPHY
  },
  {
    id: 17,
    cardSelection: ['a','d'],
    moveEastSteps: 2,
    huntSelection: HuntSelection.LOWEST,
    huntCount: 1,
    extendedAction: Action.TSAR_WISH
  },
  {
    id: 18,
    cardSelection: ['a','e'],
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
