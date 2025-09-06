
/**
 * @file index.ts
 * @brief Paddle id and the vertical position. Game state: paddles positions.
 */

export type PaddleSide = "left" | "right";

export interface PaddleState
{
  y: number;
}

export interface GameState
{
  paddles: {
    left: PaddleState;
    right: PaddleState;
  };
}

