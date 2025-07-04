"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Codes;
(function (Codes) {
    Codes[Codes["TIE"] = 0] = "TIE";
    Codes[Codes["WINNER"] = 1] = "WINNER";
    Codes[Codes["INVALID"] = 2] = "INVALID";
    Codes[Codes["VALID"] = 3] = "VALID";
})(Codes || (Codes = {}));
var Player = /** @class */ (function () {
    function Player(id, name, symbol) {
        this.id = id;
        this.name = name;
        this.symbol = symbol;
    }
    return Player;
}());
var Board = /** @class */ (function () {
    function Board(size) {
        this.size = size;
        this.grid = [];
        for (var i = 0; i < size; i++) {
            this.grid[i] = [];
            for (var j = 0; j < size; j++) {
                this.grid[i][j] = ' ';
            }
        }
    }
    Board.prototype.checkValidCell = function (cr, cc) {
        if (cr < 0 || cc < 0 || cr >= this.size || cc >= this.size) {
            return Codes.INVALID;
        }
        return Codes.VALID;
    };
    Board.prototype.checkEmptyCell = function (cr, cc) {
        if (this.grid[cr][cc] !== " ") {
            return Codes.INVALID;
        }
        return Codes.VALID;
    };
    Board.prototype.checkRow = function (cr, symbol) {
        for (var _i = 0, _a = this.grid[cr]; _i < _a.length; _i++) {
            var s = _a[_i];
            if (s !== symbol) {
                return false;
            }
        }
        return true;
    };
    Board.prototype.checkCol = function (cc, symbol) {
        for (var i = 0; i < this.size; i++) {
            if (this.grid[i][cc] !== symbol) {
                return false;
            }
        }
        return true;
    };
    Board.prototype.checkDiagonal = function (symbol) {
        for (var i = 0; i < this.size; i++) {
            if (this.grid[i][i] !== symbol) {
                return false;
            }
        }
        return true;
    };
    Board.prototype.checkAntiDiagonal = function (symbol) {
        for (var i = 0; i < this.size; i++) {
            if (this.grid[i][this.size - i - 1] !== symbol) {
                return false;
            }
        }
        return true;
    };
    Board.prototype.checkWinner = function (cc, cr, symbol) {
        var row = this.checkRow(cr, symbol);
        var col = this.checkCol(cc, symbol);
        var diagonal = this.checkDiagonal(symbol);
        var antidiagonal = this.checkAntiDiagonal(symbol);
        if (row || col || diagonal || antidiagonal) {
            return Codes.WINNER;
        }
        return null;
    };
    Board.prototype.printGrid = function () {
        for (var i = 0; i < this.size; i++) {
            var row = " | ";
            for (var j = 0; j < this.size; j++) {
                row += this.grid[i][j] + " | ";
            }
            console.log(row);
        }
        console.log();
    };
    Board.prototype.markCell = function (cr, cc, player) {
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
    };
    return Board;
}());
var Game = /** @class */ (function () {
    function Game(size, players) {
        this.size = size;
        this.dq = __spreadArray([], players, true); // Copy players array
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    Game.prototype.getInput = function (prompt) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.rl.question(prompt, function (answer) {
                            resolve(answer);
                        });
                    })];
            });
        });
    };
    Game.prototype.beginGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var board, count, currPlayer, rowInput, colInput, row, col, boardStatus;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        board = new Board(this.size);
                        count = 0;
                        _a.label = 1;
                    case 1:
                        if (!(count < this.size * this.size)) return [3 /*break*/, 4];
                        currPlayer = this.dq.shift();
                        console.log(currPlayer.name + "'s Turn ----->");
                        return [4 /*yield*/, this.getInput("Please enter row : ")];
                    case 2:
                        rowInput = _a.sent();
                        return [4 /*yield*/, this.getInput("Please enter column : ")];
                    case 3:
                        colInput = _a.sent();
                        row = parseInt(rowInput);
                        col = parseInt(colInput);
                        if (isNaN(row) || isNaN(col)) {
                            console.log("Invalid input! Please enter valid numbers.");
                            this.dq.unshift(currPlayer); // Add back to front
                            return [3 /*break*/, 1];
                        }
                        boardStatus = board.markCell(row, col, currPlayer);
                        if (boardStatus === Codes.INVALID) {
                            console.log("Invalid Move !");
                            this.dq.unshift(currPlayer); // Add back to front
                            return [3 /*break*/, 1];
                        }
                        if (boardStatus === Codes.WINNER) {
                            console.log(currPlayer.name + " is the winner");
                            this.rl.close();
                            return [2 /*return*/];
                        }
                        count++;
                        this.dq.push(currPlayer); // Add to end
                        return [3 /*break*/, 1];
                    case 4:
                        console.log("Game Tied");
                        this.rl.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Game;
}());
// Main execution
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var rl, getInput, boardSizeInput, boardSize, numPlayersInput, numPlayers, playersList, i, idInput, id, name_1, symbol, player, game, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rl = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });
                    getInput = function (prompt) {
                        return new Promise(function (resolve) {
                            rl.question(prompt, function (answer) {
                                resolve(answer);
                            });
                        });
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, getInput("Enter Size of board ---> ")];
                case 2:
                    boardSizeInput = _a.sent();
                    boardSize = parseInt(boardSizeInput);
                    return [4 /*yield*/, getInput("Enter number of players ---> ")];
                case 3:
                    numPlayersInput = _a.sent();
                    numPlayers = parseInt(numPlayersInput);
                    playersList = [];
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < numPlayers)) return [3 /*break*/, 9];
                    return [4 /*yield*/, getInput("Enter id of player ---> ")];
                case 5:
                    idInput = _a.sent();
                    id = parseInt(idInput);
                    return [4 /*yield*/, getInput("Enter name of player --->")];
                case 6:
                    name_1 = _a.sent();
                    return [4 /*yield*/, getInput("Enter symbol for player ---> ")];
                case 7:
                    symbol = _a.sent();
                    player = new Player(id, name_1, symbol);
                    playersList.push(player);
                    _a.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 4];
                case 9:
                    rl.close();
                    game = new Game(boardSize, playersList);
                    return [4 /*yield*/, game.beginGame()];
                case 10:
                    _a.sent();
                    return [3 /*break*/, 12];
                case 11:
                    error_1 = _a.sent();
                    console.error("An error occurred:", error_1);
                    rl.close();
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
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
