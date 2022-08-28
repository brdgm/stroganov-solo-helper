import Action from "./enum/Action";
import HuntSelection from "./enum/HuntSelection";

export default interface Card {
  id: number
  cardSelection: string[]
  moveEastSteps: number
  huntSelection: HuntSelection
  huntCount: number
  extendedAction: Action
}
