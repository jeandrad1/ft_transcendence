import { getRoom } from "../db/roomRepository";
import { deleteRoom } from "./gameServices";

const creationTimers = new Map<string, NodeJS.Timeout>();

export function scheduleAutoDeleteIfEmpty(roomId: string, delayMs: number = 60_000) {
    if (creationTimers.has(roomId)) return;
    const t = setTimeout(() => {
        try {
            const room = getRoom(roomId);
            if (!room || (Array.isArray(room.players) && room.players.length === 0)) {
                console.log(`[AutoDelete] Removing public room ${roomId} (no players joined within ${delayMs}ms)`);
                deleteRoom(roomId);
            } else {
                console.log(`[AutoDelete] Room ${roomId} has players, skipping removal`);
            }
        } catch (err) {
            console.error("[AutoDelete] Failed checking/removing room", roomId, err);
        } finally {
            creationTimers.delete(roomId);
        }
    }, delayMs);
    creationTimers.set(roomId, t);
}

export function clearCreationTimer(roomId: string) {
    const t = creationTimers.get(roomId);
    if (t) {
        clearTimeout(t);
        creationTimers.delete(roomId);
        console.log(`[AutoDelete] Cleared creation timer for room ${roomId}`);
    }
}

export function hasCreationTimer(roomId: string) {
    return creationTimers.has(roomId);
}