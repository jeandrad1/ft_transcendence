/**
 * @file gameServices
 * @brief Import from the index.ts the types
 */
import { GameState, PaddleSide } from "../";

/**
 * @brief inicializes the paddles at the center of the height
 */
let gameState: GameState =
{
  paddles:
  {
    left: { y: 200 },
    right: { y: 200 },
  },
};

/**
 * @brief Set the const values for this
 * Maybe review it
 */
const PADDLE_SPEED = 20;  // 20px per minimal unit of time
const FIELD_HEIGHT = 400; // max height
const PADDLE_HEIGHT = 80; // paddle height

/**
 * @returns {GameState} a structure with the paddles positions
 */
export function getGameState(): GameState
{
  return gameState;
}

/**
 * Moves a specific paddle up
 * @param side the paddle side: left or right
 */
export function moveUp(side: PaddleSide)
{
  const paddle = gameState.paddles[side];
  paddle.y = Math.max(0, paddle.y - PADDLE_SPEED);
}

/**
 * Moves a specific padddle down
 * @param side the paddle side: left or right
 */
export function moveDown(side: PaddleSide)
{
  const paddle = gameState.paddles[side];
  paddle.y = Math.min(FIELD_HEIGHT - PADDLE_HEIGHT, paddle.y + PADDLE_SPEED);
}
