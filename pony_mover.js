function PonyMover(pony, $log) {
  this.pony = pony
  this.$log = $log

  // Stack of all the moves. Eg.: ['left', 'up', 'down']
  this.commands = []
}

// Base class for commands

function Command(pony) {
  this.pony = pony;
}

// Helper methods

Command.prototype.move = function(direction) {
  switch (direction) {
    case 'up':
      this.pony.animate({'top': '-=30px'});
      break;
    case 'down':
      this.pony.animate({'top': '+=30px'});
      break;
    case 'left':
      this.pony.animate({'left': '-=30px'});
      break;
    case 'right':
      this.pony.animate({'left': '+=30px'});
      break;
  }
}

// Commands

function MoveUpCommand(pony) {
  Command.call(this, pony);
}

utils.inherit(MoveUpCommand, Command);

MoveUpCommand.prototype.run = function() {
  this.move('up');
}

MoveUpCommand.prototype.undo = function() {
  this.move('down');
}

function MoveDownCommand(pony) {
  Command.call(this, pony);
}

utils.inherit(MoveDownCommand, Command);

MoveDownCommand.prototype.run = function() {
  this.move('down');
}

MoveDownCommand.prototype.undo = function() {
  this.move('up');
}

function MoveLeftCommand(pony) {
  Command.call(this, pony);
}

utils.inherit(MoveLeftCommand, Command);

MoveLeftCommand.prototype.run = function() {
  this.move('left');
}

MoveLeftCommand.prototype.undo = function() {
  this.move('right');
}

function MoveRightCommand(pony) {
  Command.call(this, pony);
}

utils.inherit(MoveRightCommand, Command);

MoveRightCommand.prototype.run = function() {
  this.move('right');
}

MoveRightCommand.prototype.undo = function() {
  this.move('left');
}

PonyMover.prototype.createCommand = function(direction){
  switch (direction) {
    case 'up':
      return new MoveUpCommand(this.pony);
    case 'down': 
      return new MoveDownCommand(this.pony);
    case 'left':
      return new MoveLeftCommand(this.pony);
    case 'right': 
      return new MoveRightCommand(this.pony);
  }
}

PonyMover.prototype.moveDirection = function(direction) {
  switch (direction) {
    case 'up':
      this.pony.animate({'top': '-=30px'})
      break
    case 'down':
      this.pony.animate({'top': '+=30px'})
      break
    case 'left':
      this.pony.animate({'left': '-=30px'})
      break
    case 'right':
      this.pony.animate({'left': '+=30px'})
      break
  }
}

PonyMover.prototype.move = function(keyCode) {
  var direction = keyCodeToName[keyCode] // Convert key code to direction name

  if (direction) {
    var command = this.createCommand(direction);
    command.run();
    this.commands.push(command);
    this.$log.append('<li>' + direction + '</li>')
  }
}

PonyMover.prototype.undo = function(){
  var command = this.commands.pop();
  if (command) {
    command.undo();
    this.$log.find('li:last').remove();
  }
}