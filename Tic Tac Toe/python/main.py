from collections import deque
from enum import Enum

class Codes(Enum):
    TIE = 0
    WINNER = 1
    INVALID = 2
    VALID = 3


class Player:
    def __init__(self,id,name,symbol):
        self.id = id
        self.name = name
        self.symbol = symbol

class Board:
    def __init__(self,size):
        self.size = size
        self.grid = [[' 'for i in range(size)]for i in range(size)]

    def checkValidCell(self,cr:int,cc:int):
        if (cr < 0) or (cc < 0) or (cr >= self.size) or (cc >= self.size):
            return Codes.INVALID
        
    def checkEmptyCell(self,cr,cc):
        if self.grid[cr][cc] != " ":
            return Codes.INVALID
        
    def checkRow(self,cr,symbol):
        for s in self.grid[cr]:
            if s != symbol:
                return False
        return True
    
    def checkCol(self,cc,symbol):
        for s in self.grid[cc]:
            if s != symbol:
                return False
        return True
    
    def checkDiagonal(self,symbol):
        for i in range(self.size):
            if(self.grid[i][i] != symbol):
                return False
        return True
    
    def checkAntiDiagonal(self,symbol):
        for i in range(self.size):
            if(self.grid[i][self.size-i-1] != symbol):
                return False
        return True

    def checkWinner(self,cc,cr,symbol):
        row = self.checkRow(cr,symbol)
        col = self.checkCol(cc,symbol)
        diagonal = self.checkDiagonal(symbol)
        antidiagonal = self.checkAntiDiagonal(symbol)
        if row or col or diagonal or antidiagonal:
            return Codes.WINNER
    
    def printGrid(self):
        for i in range(self.size):
            print(" | ",end='')
            for j in range(self.size):
                print(self.grid[i][j],end=" | ")
            print()

    def markCell(self,cr,cc,player:Player):
        if self.checkValidCell(cr,cc) == Codes.INVALID:
            return Codes.INVALID
        
        if self.checkEmptyCell(cr,cc) == Codes.INVALID:
            return Codes.INVALID
        
        self.grid[cr][cc] = player.symbol
        self.printGrid()
        if self.checkWinner(cr,cc,player.symbol) == Codes.WINNER:
            return Codes.WINNER



class Game:
    def __init__(self,size,players):
        self.size = size
        self.dq = deque([])
        for player in players:
            self.dq.append(player)
    
    def beginGame(self):
        board = Board(self.size)
        count = 0
        while(count < self.size*self.size):
            currPlayer = self.dq.popleft()
            print(currPlayer.name + "'s Turn ----->")
            row = int(input("Please enter row : "))
            col = int(input("Please enter column : "))
            boardStatus = board.markCell(row,col,currPlayer)
            if boardStatus == Codes.INVALID :
                print("Invalid Move !")
                self.dq.appendleft(currPlayer)
                continue
            if boardStatus == Codes.WINNER:
                print(currPlayer.name + " is the winner")
                return
            count = count+1
            self.dq.append(currPlayer)
        print("Game Tied")

boardSize = int(input("Enter Size of board ---> "))
numPlayers = int(input("Enter number of players ---> "))
playersList = []
for i in range(numPlayers):
    id = int(input("Enter id of player ---> "))
    name = input("Enter name of player --->")
    symbol = input("Enter symbol for player ---> ")
    player = Player(id,name,symbol)
    playersList.append(player)
game = Game(boardSize,playersList)
game.beginGame()

# Winner condition
# [0,0],[0,2],[2,2],[1,1],[2,0],[1,0],[2,1]]

# Tie condition
# moves = [
#     [0, 0],  # X
#     [0, 1],  # O
#     [0, 2],  # X
#     [1, 2],  # O
#     [1, 0],  # X
#     [2, 0],  # O
#     [1, 1],  # X
#     [2, 2],  # O
#     [2, 1],  # X
# ]