// Game code Mario Kart

const readline = require('readline')

// Input for the choice of players
function input(prompt){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise(resolve => {
        rl.question(prompt, answer => {
            rl.close();
            resolve(answer);
        });
    });
}

// Players
const players = [
    {
        NAME: "Mario",
        SPEED: 4,
        MANEUVERABILITY: 3,
        POWER: 3,
        POINTS: 0
    },
    {
        NAME: "Luigi",
        SPEED: 3,
        MANEUVERABILITY: 4,
        POWER: 4,
        POINTS: 0    
    },
    {
        NAME: "Peach",
        SPEED: 3,
        MANEUVERABILITY: 4,
        POWER: 2,
        POINTS: 0
    },
    {
        NAME: "Bowser",
        SPEED: 5,
        MANEUVERABILITY: 2,
        POWER: 5,
        POINTS: 0
    },
    {
        NAME: "Yoshi",
        SPEED: 2,
        MANEUVERABILITY: 4,
        POWER: 3,
        POINTS: 0
    },
    {
        NAME: "Donkey Kong",
        SPEED: 2,
        MANEUVERABILITY: 2,
        POWER: 5,
        POINTS: 0
    }
];
// Choose the player you want to play
async function choosePlayers() {
    console.log("Available players: ");
    players.forEach((player, index) => {
        console.log(`${index + 1}. ${player.NAME}`);
    });

    // Chosse the fist player
    let player1Index = -1;
    while (player1Index < 0 || player1Index >= players.length || isNaN(player1Index)){
        const input1 = await input("Enter the number of the first player: ");
        player1Index = parseInt(input1) - 1;
        
        if (player1Index < 0 || player1Index >= players.length || isNaN(player1Index)){
            console.log("choose invalid, try again with a valid value");
        }
    }

    // Chosse the second player
    let player2Index = -1;
    while (player2Index < 0 || player2Index >= players.length || isNaN(player2Index)){
        const input2 = await input("Enter the number of the second player: ");
        player2Index = parseInt(input2) - 1;

        if (player2Index < 0 || player2Index >= players.length || isNaN(player2Index)){
            console.log("choose invalid, try again with a valid value");
        } 
        while (player1Index === player2Index){
            console.log("You can't choose the same player as the first. Try again.");
            const input2 = await input("Enter the number of the second player: ");
            player2Index = parseInt(input2) - 1;
        }
    }

    return [players[player1Index], players[player2Index]];
}

// Random number for player ability
async function randomNumber() {
    const random = Math.floor(Math.random() * 6 + 1);
    return random
}

// Random terrain for challeng 
async function randomTerrain() {
    let random = Math.random()
    let terrain

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
    for (let round = 1; round <= 5; round ++){
        console.log(`\n➡️  Round ${round}`);
    
        let terrain = await randomTerrain();
        console.log(`Terrain: ${terrain} ⛰️`);

        let number1 = await randomNumber();
        let number2 = await randomNumber();

        totalSkill1 = 0;
        totalSkill2 = 0;
        
        if (terrain === "STRAIGHT"){
            totalSkill1 = number1 + player1.SPEED
            totalSkill2 = number2 + player2.SPEED

            await showResults(
                player1.NAME,
                number1,
                "STRAIGHT",
                player1.SPEED
            )

            await showResults(
                player2.NAME,
                number2,
                "STRAIGHT",
                player2.SPEED
            )

            if (totalSkill1 > totalSkill2){
                console.log(`The ${player1.NAME} win one point 🏎️ !`)
                player1.POINTS ++;
            }
            else if (totalSkill2 > totalSkill1){
                console.log(`The ${player2.NAME} win one point 🏎️ !`)
                player2.POINTS ++;
            }
            else{
                console.log("The players had the same amount of points. Nobody won 🍌!")
            }
        }

        if (terrain === "CURVE"){
            totalSkill1 = number1 + player1.MANEUVERABILITY
            totalSkill2 = number2 + player2.MANEUVERABILITY

            await showResults(
                player1.NAME,
                number1,
                "CURVE",
                player1.MANEUVERABILITY
            )

            await showResults(
                player2.NAME,
                number2,
                "CURVE",
                player2.MANEUVERABILITY
            )

            if (totalSkill1 > totalSkill2){
                console.log(`The ${player1.NAME} win one point 🏎️ !`)
                player1.POINTS ++;
            }
            else if (totalSkill2 > totalSkill1){
                console.log(`The ${player2.NAME} win one point 🏎️ !`)
                player2.POINTS ++;
            }
            else{
                console.log("The players had the same amount of points. Nobody won 🍌!")
            }
        }

        if (terrain === "CONFRONTATION"){
            totalSkill1 = number1 + player1.POWER
            totalSkill2 = number2 + player2.POWER

            await showResults(
                player1.NAME,
                number1,
                "CONFRONTATION",
                player1.POWER
            )

            await showResults(
                player2.NAME,
                number2,
                "CONFRONTATION",
                player2.POWER
            )

            if (totalSkill1 > totalSkill2){
                console.log(`The ${player1.NAME} win! ${player2.NAME} lose one point 🏎️ !`)
                if (player2.POINTS > 0){
                    player2.POINTS --;
                }
            }
            else if (totalSkill2 > totalSkill1){
                console.log(`The ${player2.NAME} win! ${player1.NAME} lose one point 🏎️ !`)
                if (player1.POINTS > 0){
                    player1.POINTS --;
                }
            }
            else{
                console.log("The players had the same amount of points. Nobody won 🍌!")
            }
        }
    }
}

async function showResults(playerName, number, terrain, skill) {
    console.log(`${playerName} launched a value die ${terrain} ${number} + ${skill} = ${number + skill}`);
}

//Show the player who won the game
async function winner(player1, player2) {
    console.log(`\n 🏁🚨 Result:`)

    console.log(`Points ${player1.NAME}: ${player1.POINTS} points.`)
    console.log(`Points ${player2.NAME}: ${player2.POINTS} points.`)

    if (player1.POINTS > player2.POINTS){
        console.log(`The winner is ${player1.NAME}! 🏆`)
    }
    else if (player2.POINTS > player1.POINTS){
        console.log(`The winner is ${player2.NAME}! 🏆`)
    }
    else {
        console.log("The players had the same amount of points. No one win! 🌪️")
    }
}

// Organize the order of functions and their impressions
(async function main() {
    const [selectedPlayer1, selectedPlayer2] = await choosePlayers();

    console.log(`\n🏁🚨 The race between ${selectedPlayer1.NAME} and ${selectedPlayer2.NAME} is starting...`);

    await gameEngineering(selectedPlayer1, selectedPlayer2);
    await winner(selectedPlayer1, selectedPlayer2);
})()