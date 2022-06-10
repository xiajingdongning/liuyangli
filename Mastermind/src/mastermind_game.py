'''
Yangli Liu
CS 5001, Spring 2021
Programming #1 -- mastermind game

This is a coding-breaking board game 
'''
import turtle
import random
from Marble import Marble
from Point import Point


BOUNDARY = 660
START_X = -270
START_Y = 270
SPACING_X = 70
SPACING_Y = 48
BUTTONSIZE = 60
R = 15 # MARBLE_RADIUS


class Game:
  ''' Class Game:
      The only and main control of the game: take input, process data and
      provide feedback using turtle graphics
      Attributes: self
      Methods: register_shapes, game_board, load_shape, draw_marble
      draw_marble_feedback, draw_marble_pegs, feedback_fill, chunk_guess,
      click_handler, count_bulls_and_cows, pegs_fill, read_leaderboard_file
  '''
  def __init__(self):
    '''
    Constructor -- Creates turtle screen; draw the play area, status area
    & leader board; read leaderboard file, generate four color randomw
    secret code; handle click and asking user name.  
    Parameters:
        self -- the current instance
    '''
    turtle.setup(BOUNDARY, BOUNDARY)
    turtle.title("CS5001 MasterMind Game")

    screen = turtle.Screen()
    self.screen = screen
    self.register_shapes()

    self.leaderboard = []
    self.guess = []
    self.final_guess = []
    self.pegs = []

    self.read_leaderboard_file()

    colors = ["red", "blue", "green", "yellow", "purple", "black"]
    self.secret_code = random.choices(colors,k = 4)

    self.player = screen.textinput("Welcome To MasterMind Game", \
                                        "Your Name:")
    if self.player == None:
      self.player = "Unknown"

    screen.onclick(self.click_handler)

  def register_shapes(self):
    '''
    Method -- register images into turtle.
    Parameters:
        self -- the current instance
    '''
    self.screen.register_shape("checkbutton.gif")
    self.screen.register_shape("file_error.gif")
    self.screen.register_shape("leaderboard_error.gif")
    self.screen.register_shape("lose.gif")
    self.screen.register_shape("quit.gif")
    self.screen.register_shape("quitmsg.gif")
    self.screen.register_shape("winner.gif")
    self.screen.register_shape("xbutton.gif")

  def game_board(self, position, color, width, height):
    '''
    Method -- draw game boad using same formula.
    Parameters:
        self -- the current instance
        position -- where to start drawing boards
        width -- the width of board
        height -- the height of board
    '''
    self.pen = turtle.Turtle()
    self.position = position
    self.pen.hideturtle()
    self.pen.speed(0)
    self.pen.up()
    self.pen.goto(self.position.x, self.position.y)
    self.pen.down()
    self.pen.pencolor(color)
    self.pen.pensize(6)
    self.pen.forward(width)
    self.pen.right(90)
    self.pen.forward(height)
    self.pen.right(90)
    self.pen.forward(width)
    self.pen.right(90)
    self.pen.forward(height)
    self.pen.right(90)
    self.pen.up()

  def load_shape(self, position, shape):
    '''
    Method -- load images buttons.
    Parameters:
        self -- the current instance
        position -- where to place images
        shape -- registed images
    '''
    self.pen = turtle.Turtle()
    self.position = position
    self.pen.speed(0)
    self.pen.up()
    self.pen.goto(self.position.x, self.position.y)
    self.pen.down()
    self.pen.shape(shape)
    self.pen.up()

  def draw_marble(self):
    '''
    Method -- draw 6 marble selections.
    Parameters:
        self -- the current instance
    '''
    Marble(Point(-270,-270), "red", R).draw()
    Marble(Point(-220,-270), "blue", R).draw()
    Marble(Point(-170,-270), "green", R).draw()
    Marble(Point(-120,-270), "yellow", R).draw()
    Marble(Point(-70,-270), "purple", R).draw()
    Marble(Point(-20,-270), "black", R).draw()

  def draw_marble_feedback(self):
    '''
    Method -- draw empty marble
    Parameters:
        self -- the current instance
    '''
    i = j = 0
    for i in range(10):
      b = START_Y - SPACING_Y * i
      i += 1
      for j in range(4):
        a = START_X + SPACING_X * j
        j += 1
        Marble(Point(a,b), "black", R).draw_empty()
        position = Point(a,b)       
    return position
        
  def draw_marble_pegs(self):
    '''
    Method -- draw small empty marble pegs
    Parameters:
        self -- the current instance
    '''
    i = j = l = 0
    for i in range(10):
      z = -3 + SPACING_Y * i
      i += 1
      for j in range(2):
        y = 285 - 15 * j
        j += 1
        for l in range(2):
          x = 20 + 15 * l
          l += 1
          Marble(Point(x,y-z), "black", R/3).draw_empty()
          position = Point(x,y-z)       
    return position
        
  def feedback_fill(self):
    '''
    Method -- fill the marble to indicate user's selections
    Parameters:
        self -- the current instance
    '''
    i = j = 0
    guess = self.guess[:]
    for i in range(10):
      b = START_Y - SPACING_Y * i
      i += 1
      for j in range(4):
        a = START_X + SPACING_X * j
        j += 1
        if guess != []:
          marble = Marble(Point(a,b), guess[0], R)
          marble.draw()
          guess = guess[1:]
          

  def chunk_guess(self, lst, n):
    '''
    Method -- chunk every four colors to make a sublist
    Parameters:
        self -- the current instance
        lst -- original list
        n -- how many itmes each chunk
    '''
    for i in range(0, len(lst), n):
        yield lst[i:i+n]
          
   
  def click_handler(self, x, y):
    '''
    Method -- handle all the selctions and give image or marble feedback
    Parameters:
        self -- the current instance
        x -- click cor
        y -- click cor
    '''

    if Marble(Point(-270,-270), "red", R).clicked_in_region(x, y)== True:
      self.guess.append("red")
        
    elif Marble(Point(-220,-270), "blue", R).clicked_in_region(x, y)== True:
      self.guess.append("blue")
      
    elif Marble(Point(-170,-270), "green", R).clicked_in_region(x, y)== True:
      self.guess.append("green")
      
    elif Marble(Point(-120,-270), "yellow", R).clicked_in_region(x, y)== True:
      self.guess.append("yellow")
      
    elif Marble(Point(-70,-270), "purple", R).clicked_in_region(x, y)== True:
      self.guess.append("purple")
      
    elif Marble(Point(-20,-270), "black", R).clicked_in_region(x, y)== True:
      self.guess.append("black")
      
    if len(self.guess) > 0:
       self.feedback_fill()
       
    if 190 <= x <= 290 and (-230 -BUTTONSIZE) <= y <= -230:
      self.pen.up()
      self.pen.goto(150,0)
      self.pen.down()
      self.pen.shape("quitmsg.gif")
    
     
    if len(self.guess) > 0 and 110 <= x <= (110+BUTTONSIZE)\
       and (-230 -BUTTONSIZE) <= y <= -230:
      self.guess = self.guess[:-1]# Delete the last one
      self.guess.append("white")
      self.feedback_fill()
      self.guess = self.guess[:-1]
    

    if len(self.guess) > 3 and 40 <= x <= (40+BUTTONSIZE)\
       and (-230 -+BUTTONSIZE) <= y <= -230:
      self.final_guess = list(self.chunk_guess(self.guess, 4))
      self.count_bulls_and_cows()
            
    filename = "gamefile.txt"
    line = ""
    with open(filename, 'w') as file:
      for sublist in self.final_guess:
        file.write(" ".join(map(str,sublist)))
        file.write("\n")       
    return True


  def count_bulls_and_cows(self):
    '''
    Method -- core methods to process the result by
    comparing selections with random secret codes
    Parameters:
        self -- the current instance
    '''
    cows_bulls = []
    bulls = []
    
    guess = []
    if len(self.final_guess) > 0:
      if len(self.final_guess[-1]) == 4:
        guess = self.final_guess[-1]
      else:
        guess = self.final_guess[-2]
    
    for color in guess:
      index1 = guess.index(color)
      if color in self.secret_code:
        cows_bulls.append(color)
        index2 = self.secret_code.index(color)
        if index1 == index2:
          bulls.append(color)   
    b = len(bulls)
    r = len(cows_bulls)-len(bulls)
    pegs = (b, r)
    self.pegs.append(pegs)
    self.pegs_fill()
    
    if pegs == (4, 0):
      self.pen.up()
      self.pen.goto(150,0)
      self.pen.down()
      self.pen.shape("winner.gif")
      self.leaderboard.append([self.player, len(self.final_guess)])

      line = ""
      with open('leaderboard.txt', 'a') as file:
        for sublist in self.leaderboard:
          file.write(" ".join(map(str,sublist)))
          file.write("\n")
          
      return pegs

    if len(self.final_guess) >= 10 and pegs != (4, 0):
      self.pen.up()
      self.pen.goto(150,0)
      self.pen.down()
      self.pen.shape("lose.gif")
      
    return pegs

  
  def pegs_fill(self):
    '''
    Method -- fill pegs marble
    Parameters:
        self -- the current instance
    '''
    i = j = 0
    peg = self.pegs[:]
    if len(self.pegs) > 1:
      b = peg[-1][0]
      r = peg[-1][1]
      print("Your have {} bulls and {} cows.".format(b,r))
      index = len(self.pegs)-2
      z = -3 + SPACING_Y * index
      for i in range(2):
        y = 285 - 15 * i
        i += 1
        for j in range(2):
          x = 20 + 15 * j
          j += 1
          if b > 0:
            Marble(Point(x,y-z),"black", R/3).draw()
            b = b-1
          elif r > 0:
            Marble(Point(x,y-z),"red", R/3).draw()
            r = r -1

              
  def read_leaderboard_file(self):
    '''
    Method -- read learderboard file, give error image if not exist
    Parameters:
        self -- the current instance
    '''
    count = 0
    turtle.hideturtle()
    turtle.up()
    turtle.goto(130,280)
    turtle.down()
    turtle.write("Leaderboard", font=("Verdana",15, "normal"))   
    try:
      with open("leaderboard.txt", "r") as file:
        line = file.readlines()
        
        for i in range(len(line)):
            turtle.hideturtle()
            turtle.up()
            turtle.goto(130, 230 - (i* 40))
            turtle.down()
            turtle.write(line[i], font=("Verdana",10, "normal"))
            i += 1              
    except FileNotFoundError:
        self.pen.up()
        self.pen.goto(0,0)
        self.pen.down()
        self.pen.shape("leaderboard_error.gif")
        self.pen.up()
        print("Leaderboard file does not exist!")
    else:
      return True 

    
def count_bulls_and_cows(secret_code, guess):
  cows_bulls = []
  bulls = []
  for color in secret_code:
    index1 = secret_code.index(color)
    if color in guess:
      cows_bulls.append(color)
      index2 = guess.index(color)
      if index1 == index2:
        bulls.append(color)
  pegs = (len(bulls), len(cows_bulls)-len(bulls))
  return pegs 
 

def main():
 
  game = Game()
  
  game.game_board(Point(-315,315), "black", 400, 500)
  game.game_board(Point(115,315), "orange", 200, 500)
  game.game_board(Point(-315,-200), "brown", 630, 115)
  
  game.load_shape(Point(70,-260), "checkbutton.gif")
  game.load_shape(Point(140,-260), "xbutton.gif")
  game.load_shape(Point(240,-260), "quit.gif")
  
  marble_selection = game.draw_marble()
  marble_feedback = game.draw_marble_feedback()
  marble_pegs = game.draw_marble_pegs()
  
  game.count_bulls_and_cows()

if __name__ == "__main__":
    main()

  
