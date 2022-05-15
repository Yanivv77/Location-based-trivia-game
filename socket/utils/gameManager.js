// const { GameManager } = require("js-gamemanager");
const { getQuestions } = require("./questionService");

class GameManager {
  constructor() {
    this.quizzes = {};
    this.players = [];
    this.games = [];
  }

  addGame(hostId, game) {
    game.hostId = hostId;

    this.games.push(game);

    const quiz = {
      qs: game.questions,
      currentQuestionNumber: game.currentQuestionNumber,
      waiting: 0,
    };

    this.quizzes[game.gameId] = quiz;

    return game;
  }

  addPlayer(player) {
    this.players.push(player);
  }

  removePlayer(socketId) {
    const player = this.getPlayerBySocket(socketId);
    if (player) {
      this.players = this.players.filter(
        (player) => player.socketId !== socketId
      );
      console.log(this.players);
      return player;
    } else {
      return null;
    }
  }
  getPlayersByRoom(roomID) {
    return this.players.filter((player) => player.roomId === roomID);
  }
  getGameByHost(hostId) {
    return this.games.find((game) => game.hostId === hostId);
  }

  getGameByRoom(roomId) {
    let game = this.games.find((game) => game.gameId === roomId);
    return game;
  }

  getPlayerBySocket(socketId) {
    let player = this.players.find((p) => p.socketId === socketId);
    return player;
  }

  checkHostOrPlayer(socketId) {
    let type = this.games.find((game) =>
      game.hostId === socketId ? "HOST" : "PLAYER"
    );
    return type;
  }

  checkIsAvailable(roomId) {
    let isNotAvailable = this.games.find((game) => game.gameId === roomId);
    return isNotAvailable ? false : true;
  }

  getCurrentQuestion(room) {
    let currentNumber = this.quizzes[room].currentQuestionNumber;
    return {
      question: this.quizzes[room].qs[currentNumber - 1],
      number: currentNumber,
    };
  }

  nextQuestion(room) {
    this.quizzes[room].currentQuestionNumber += 1;
    //console.log(this.quizzes[room].qs);
  }

  availableQuestions(room) {
    return (
      this.quizzes[room].qs.length - this.quizzes[room].currentQuestionNumber
    );
  }

  setWaiting(room) {
    let val = this.getPlayersByRoom(room).length;
    this.quizzes[room].waiting = val;
    //console.log("waiting", val);
  }

  updateWaiting(room) {
    if (this.quizzes[room].waiting > 0) {
      this.quizzes[room].waiting -= 1;
    }
    //console.log("updated waiting!");
  }

  getWaiting(room) {
    return this.quizzes[room].waiting;
  }

  updateScore(socketID, points) {
    let player = this.getPlayerBySocket(socketID);
    if (player) {
      //  var i = this.players.findIndex((p) => {
      //    return p.id === socketID;
      //  });
      //  this.players[i].score += points;
      player.score += points;
    }
    //console.log("Updated Score!");
    return player;
  }
}

module.exports = { GameManager };
