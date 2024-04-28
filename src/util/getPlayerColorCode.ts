import PlayerColor from '@/services/enum/PlayerColor'

/**
 * Get color code for player color.
 * @param playerColor Player color
 * @returns Color code
 */
export default function(playerColor: PlayerColor) : string {
  switch (playerColor) {
    case PlayerColor.YELLOW:
      return '#bbbb31'
    case PlayerColor.BLUE:
      return '#124ea3'
    case PlayerColor.RED:
      return '#9b1c17'
    case PlayerColor.GREEN:
      return '#2b9c4e'
    default:
      throw new Error(`Invalid player color: ${playerColor}.`)
  }
}
