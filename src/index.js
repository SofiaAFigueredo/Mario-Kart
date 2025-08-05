// Game code Mario Kart

// Players
const player1 = {
    NAME: "Mario",
    SPEED: 4,
    MANEUVERABILITY: 3,
    POWER: 3,
    POINTS: 0
}

const player2 = {
    NAME: "Luigi",
    SPEED: 3,
    MANEUVERABILITY: 4,
    POWER: 4,
    POINTS: 0
}

// Random number for player ability
async function randomNumber() {
    const random = Math.floor(Math.random() * 6 + 1);
    return random
}

// Random terrain for challeng 
async function randomTerrain() {
    const random = Math.random()
    const terrain

    switch (true) {
        case random < 0.33:
            terrain = "STRAIGHT"
            break;

        case random < 0.66:
            terrain = "CURVE"
            break;
    
        default:
            terrain = "CONFRONTATION";
    }

    return terrain
}

// Function of all functions of the game
async function gameEngineering(player1, player2) {
    
}



// Organize the order of functions and their impressions
(async function main() {
    console.log(`🏁🚨 The race between ${player1.NAME} and ${player2.NAME} is starting...`);

    await gameEngineering(player1,player2);
})()