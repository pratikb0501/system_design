import * as readline from 'readline';

enum Codes {
    TIE = 0,
    WINNER = 1,
    INVALID = 2,
    VALID = 3
}

class Player {
    id: number;
    name: string;
    symbol: string;

    constructor(id: number, name: string, symbol: string) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
    }
}

class Board {
    size: number;
    grid: string[][];

    constructor(size: number) {
        this.size = size;
        this.grid = [];
        for (let i = 0; i < size; i++) {
            this.grid[i] = [];
            for (let j = 0; j < size; j++) {
                this.grid[i][j] = ' ';
            }
        }
    }

    checkValidCell(cr: number, cc: number): Codes {
        if (cr < 0 || cc < 0 || cr >= this.size || cc >= this.size) {
            return Codes.INVALID;
        }
        return Codes.VALID;
    }

    checkEmptyCell(cr: number, cc: number): Codes {
        if (this.grid[cr][cc] !== " ") {
            return Codes.INVALID;
        }
        return Codes.VALID;
    }

    checkRow(cr: number, symbol: string): boolean {
        for (let s of this.grid[cr]) {
            if (s !== symbol) {
                return false;
            }
        }
        return true;
    }

    checkCol(cc: number, symbol: string): boolean {
        for (let i = 0; i < this.size; i++) {
            if (this.grid[i][cc] !== symbol) {
                return false;
            }
        }
        return true;
    }

    checkDiagonal(symbol: string): boolean {
        for (let i = 0; i < this.size; i++) {
            if (this.grid[i][i] !== symbol) {
                return false;
            }
        }
        return true;
    }

    checkAntiDiagonal(symbol: string): boolean {
        for (let i = 0; i < this.size; i++) {
            if (this.grid[i][this.size - i - 1] !== symbol) {
                return false;
            }
        }
        return true;
    }

    checkWinner(cc: number, cr: number, symbol: string): Codes | null {
        const row = this.checkRow(cr, symbol);
        const col = this.checkCol(cc, symbol);
        const diagonal = this.checkDiagonal(symbol);
        const antidiagonal = this.checkAntiDiagonal(symbol);
        
        if (row || col || diagonal || antidiagonal) {
            return Codes.WINNER;
        }
        return null;
    }

    printGrid(): void {
        for (let i = 0; i < this.size; i++) {
            let row = " | ";
            for (let j = 0; j < this.size; j++) {
                row += this.grid[i][j] + " | ";
            }
            console.log(row);
        }
        console.log();
    }

    markCell(cr: number, cc: number, player: Player): Codes | undefined {
        if (this.checkValidCell(cr, cc) === Codes.INVALID) {
            return Codes.INVALID;
        }

        if (this.checkEmptyCell(cr, cc) === Codes.INVALID) {
            return Codes.INVALID;
        }

        this.grid[cr][cc] = player.symbol;
        this.printGrid();
        
        if (this.checkWinner(cr, cc, player.symbol) === Codes.WINNER) {
            return Codes.WINNER;
        }
        
        return Codes.VALID;
    }
}

class Game {
    size: number;
    dq: Player[];
    rl: readline.Interface;

    constructor(size: number, players: Player[]) {
        this.size = size;
        this.dq = [...players]; // Copy players array
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    private async getInput(prompt: string): Promise<string> {
        return new Promise((resolve) => {
            this.rl.question(prompt, (answer) => {
                resolve(answer);
            });
        });
    }

    async beginGame(): Promise<void> {
        const board = new Board(this.size);
        let count = 0;
        
        while (count < this.size * this.size) {
            const currPlayer = this.dq.shift()!; // Remove first player
            console.log(currPlayer.name + "'s Turn ----->");
            
            const rowInput = await this.getInput("Please enter row : ");
            const colInput = await this.getInput("Please enter column : ");
            
            const row = parseInt(rowInput);
            const col = parseInt(colInput);
            
            if (isNaN(row) || isNaN(col)) {
                console.log("Invalid input! Please enter valid numbers.");
                this.dq.unshift(currPlayer); // Add back to front
                continue;
            }
            
            const boardStatus = board.markCell(row, col, currPlayer);
            
            if (boardStatus === Codes.INVALID) {
                console.log("Invalid Move !");
                this.dq.unshift(currPlayer); // Add back to front
                continue;
            }
            
            if (boardStatus === Codes.WINNER) {
                console.log(currPlayer.name + " is the winner");
                this.rl.close();
                return;
            }
            
            count++;
            this.dq.push(currPlayer); // Add to end
        }
        
        console.log("Game Tied");
        this.rl.close();
    }
}

// Main execution
async function main(): Promise<void> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const getInput = (prompt: string): Promise<string> => {
        return new Promise((resolve) => {
            rl.question(prompt, (answer) => {
                resolve(answer);
            });
        });
    };

    try {
        const boardSizeInput = await getInput("Enter Size of board ---> ");
        const boardSize = parseInt(boardSizeInput);
        
        const numPlayersInput = await getInput("Enter number of players ---> ");
        const numPlayers = parseInt(numPlayersInput);
        
        const playersList: Player[] = [];
        
        for (let i = 0; i < numPlayers; i++) {
            const idInput = await getInput("Enter id of player ---> ");
            const id = parseInt(idInput);
            
            const name = await getInput("Enter name of player --->");
            const symbol = await getInput("Enter symbol for player ---> ");
            
            const player = new Player(id, name, symbol);
            playersList.push(player);
        }
        
        rl.close();
        
        const game = new Game(boardSize, playersList);
        await game.beginGame();
        
    } catch (error) {
        console.error("An error occurred:", error);
        rl.close();
    }
}

// Test cases (commented out)
// Winner condition: [0,0],[0,2],[2,2],[1,1],[2,0],[1,0],[2,1]
// Tie condition moves:
// const moves = [
//     [0, 0],  // X
//     [0, 1],  // O
//     [0, 2],  // X
//     [1, 2],  // O
//     [1, 0],  // X
//     [2, 0],  // O
//     [1, 1],  // X
//     [2, 2],  // O
//     [2, 1],  // X
// ];

// Start the game
main().catch(console.error);