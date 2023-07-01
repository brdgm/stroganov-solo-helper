import Action from './enum/Action';
import HuntSelection from './enum/HuntSelection';
import Strategy from './enum/Strategy';

export default interface Card {
  id: number
  notStrategy: Strategy[]
  moveEastSteps: number
  huntSelection: HuntSelection
  huntCount: number
  extendedAction: Action
}
