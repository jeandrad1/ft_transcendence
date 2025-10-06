export function Game() : string {
    return `
        <div class="game-modes">
        <h1>Select a Game Mode</h1>
        <hr class="game-hr">
        <div class="game-card-flex">
            <div class="game-card local">
            <div class="overlay">
                <h2>Local</h2>
            </div>
            </div>
            <div class="game-card remote">
            <div class="overlay">
                <h2>Remote</h2>
            </div>
            </div>
            <div class="game-card tournament">
            <div class="overlay">
                <h2>Tournament</h2>
            </div>
            </div>
        </div>
        </div>
    `
}