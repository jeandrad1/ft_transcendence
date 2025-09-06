/**
 * @file gameControllers.ts
 * @brief Import io to use socket.IO server side utils
 */

import { Server , Socket } from "socket.io";
import * as gameService from "../services/gameServices";


/**
 * @brief register the player status and the paddle movement
 */
