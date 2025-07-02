from collections import deque


class Player:
    def __init__(self,id,name,symbol):
        self.id = id
        self.name=name
        self.symbol = symbol

class Board:
    def __init__(self,size,player1:Player,player2:Player):
        self.size = size
        self.grid = [[' ' for _ in range(size)] for _ in range(size)]
        self.player1 = player1
        self.player2 = player2
        self.dq = deque([player1,player2])
    
    def checkCellEmpty(self,cr,cc):
        return self.grid[cr][cc] == ' '
    
    def checkValidEntry(self,cr,cc):
        if(cr < 0 or cc < 0 or cr >= self.size or cc >= self.size or self.checkCellEmpty(cr,cc) != True):
            return False
        return True
    
    def checkIfWon(self,cr,cc,symbol):
        if self.checkRow(cr,symbol) or self.checkCol(cc,symbol) or self.checkDiagonal(symbol) or self.checkAntiDiagonal(symbol):
            return True
        return False
    
    def checkForTie(self):
        for val in self.grid:
            if val == ' ':
                return False
        return True

    def checkRow(self,cr,symbol):
        for i in range(self.size):
            if self.grid[cr][i] != symbol:
                return False
        return True
    
    def checkCol(self,cc,symbol):
        for i in range(self.size):
            if self.grid[i][cc] != symbol:
                return False
        return True

    def checkDiagonal(self,symbol):
        for i in range(self.size):
            if self.grid[i][i] != symbol:
                return False
        return True

    def checkAntiDiagonal(self,symbol):
        for i in range(self.size):
            if self.grid[i][self.size-i-1] != symbol:
                return False
        return True

    def markCell(self,cr,cc):
        if self.checkValidEntry(cr,cc) == False:
            return False
        if self.checkCellEmpty(cr,cc) == False:
            return False
        player = self.dq.popleft()
        self.grid[cr][cc] = player.symbol
        self.printBoard()
        if self.checkIfWon(cr,cc,player.symbol):
            return player
        self.dq.append(player)
        return False

    def printBoard(self):
        for i in range(self.size):
            print("|",end=' ')
            for j in range(self.size):
                print(self.grid[i][j],end= " | ")
            print('')
        print('\n')
    

class Game:
    def __init__(self,size,player1:Player,player2:Player,moves):
        self.moves = moves
        self.board = Board(size,player1,player2)
        
    def beginGame(self):
        for move in self.moves:
            player = self.board.markCell(move[0],move[1])
            if player != False:
                print(player.name + " wins the game")
                return
        if self.board.checkForTie : 
            print("*********** Game is tie ! ***********\n")    
        
    

player1 = Player(1,"Chris","X")
player2 = Player(2,"Lewis","O")
# moves = [[0,0],[0,2],[2,2],[1,1],[2,0],[1,0],[2,1]]
moves = [[0, 0],[0, 1],[0, 2],[1, 1],[1, 0],[1, 2],[2, 1],[2, 0],[2, 2]]

game = Game(3,player1,player2,moves)
game.beginGame()