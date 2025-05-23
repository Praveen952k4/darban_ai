
import React, { createContext, useContext, useReducer, useEffect } from "react";
import AudioService from "../Music/AudioService"; 
import { boardThemes } from "../../assets/assets";

const audio = AudioService.getInstance();

const fallbackBoardThemes = [
  { name: "default", background: "#ffffff" },
  { name: "dark", background: "#333333" }
];

const createEmptyBoard = () => [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const initialPlayerState = {
  category: null,
  selectedEmoji: null,
  placements: [],
  score: 0
};

const initialState = {
  status: "category-selection",
  board: createEmptyBoard(),
  currentPlayer: 1,
  player1: { ...initialPlayerState },
  player2: { ...initialPlayerState },
  winner: null,
  winningCells: null,
  selectedTheme: boardThemes?.[0] || fallbackBoardThemes[0],
  pendingMove: null,
  audioInitialized: false
};

const checkWinner = (board) => {
  const lines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    const cellA = board[a[0]][a[1]];
    const cellB = board[b[0]][b[1]];
    const cellC = board[c[0]][c[1]];

    if (
      cellA &&
      cellB &&
      cellC &&
      cellA.player === cellB.player &&
      cellB.player === cellC.player
    ) {
      return {
        winner: cellA.player,
        winningCells: [
          { row: a[0], col: a[1] },
          { row: b[0], col: b[1] },
          { row: c[0], col: c[1] }
        ]
      };
    }
  }

  return { winner: null, winningCells: null };
};

const placeEmojiOnBoard = (state, row, col, emoji) => {
  const newState = { ...state };
  const currentPlayer = state.currentPlayer;
  const playerKey = currentPlayer === 1 ? "player1" : "player2";
  const playerState = state[playerKey];

  if (!playerState.category) return state;

  const timestamp = Date.now();
  const newBoard = state.board.map((r, i) =>
    r.map((c, j) =>
      i === row && j === col ? { player: currentPlayer, emoji, timestamp } : c
    )
  );

  const newPlacements = [...playerState.placements, { row, col, timestamp }];

  if (newPlacements.length > 3) {
    const oldest = newPlacements[0];
    if (oldest.row === row && oldest.col === col) {
      return { ...state, pendingMove: null };
    }
    newBoard[oldest.row][oldest.col] = null;
    newPlacements.shift();
  }

  newState[playerKey] = {
    ...playerState,
    placements: newPlacements
  };

  newState.board = newBoard;
  newState.pendingMove = null;

  const { winner, winningCells } = checkWinner(newBoard);
  if (winner) {
    newState.status = "won";
    newState.winner = winner;
    newState.winningCells = winningCells;
    newState[playerKey].score += 1;
    
    try {
      audio.stopMusic();
      audio.playSound("win");
      setTimeout(() => {
        audio.playMusic("victory").catch(err => 
          console.log('Victory music will play after user interaction')
        );
      }, 500);
    } catch (err) {
      console.error('Error playing victory audio:', err);
    }
    
    return newState;
  }

  newState.currentPlayer = currentPlayer === 1 ? 2 : 1;
  audio.playSound("place");
  return newState;
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_AUDIO":
      audio.initializeAudioContext();
      return { ...state, audioInitialized: true };

    case "SELECT_CATEGORY": {
      audio.playSound("click");
      const newState = { ...state };
      if (action.player === 1) newState.player1.category = action.category;
      else newState.player2.category = action.category;

      if (newState.player1.category && newState.player2.category) {
        newState.status = "playing";
        if (!state.audioInitialized) {
          audio.initializeAudioContext();
          newState.audioInitialized = true;
        }
        audio.playMusic("main").catch(err => 
          console.log('Background music will start after user interaction')
        );
      }
      return newState;
    }

    case "INITIATE_MOVE": {
      if (state.board[action.row][action.col] !== null) {
        return state;
      }
      audio.playSound("select");
      return { ...state, pendingMove: { row: action.row, col: action.col } };
    }

    case "SELECT_EMOJI": {
      const newState = { ...state };
      const playerKey = action.player === 1 ? "player1" : "player2";
      newState[playerKey].selectedEmoji = action.emoji;
      audio.playSound("emoji");

      if (newState.pendingMove && state.currentPlayer === action.player) {
        const { row, col } = newState.pendingMove;
        return placeEmojiOnBoard(newState, row, col, action.emoji);
      }

      return newState;
    }

    case "PLACE_EMOJI":
      return placeEmojiOnBoard(state, action.row, action.col, action.emoji);

    case "NEW_ROUND":
      audio.playSound("click");
      audio.playMusic("main").catch(err => 
        console.log('Background music will resume after user interaction')
      );
      return {
        ...state,
        status: "playing",
        board: createEmptyBoard(),
        currentPlayer: 1,
        player1: { ...state.player1, selectedEmoji: null, placements: [] },
        player2: { ...state.player2, selectedEmoji: null, placements: [] },
        winner: null,
        winningCells: null,
        pendingMove: null
      };

    case "RESTART_GAME":
      audio.playSound("click");
      audio.stopMusic();
      return {
        ...initialState,
        selectedTheme: state.selectedTheme,
        audioInitialized: state.audioInitialized
      };

    case "SELECT_BOARD_THEME":
      audio.playSound("click");
      return {
        ...state,
        selectedTheme: action.theme
      };

    default:
      return state;
  }
};

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!state.audioInitialized) {
        dispatch({ type: "INITIALIZE_AUDIO" });
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [state.audioInitialized]);

  const selectCategory = (player, category) =>
    dispatch({ type: "SELECT_CATEGORY", player, category });

  const selectEmoji = (player, emoji) =>
    dispatch({ type: "SELECT_EMOJI", player, emoji });

  const initiateMove = (row, col) =>
    dispatch({ type: "INITIATE_MOVE", row, col });

  const cancelMove = () => dispatch({ type: "CANCEL_MOVE" });

  const placeEmoji = (row, col, emoji) =>
    dispatch({ type: "PLACE_EMOJI", row, col, emoji });

  const newRound = () => dispatch({ type: "NEW_ROUND" });

  const restartGame = () => dispatch({ type: "RESTART_GAME" });

  const selectBoardTheme = (theme) =>
    dispatch({ type: "SELECT_BOARD_THEME", theme });

  // Audio control methods
  const toggleMusic = () => audio.toggleMusic();
  const toggleSoundEffects = () => audio.toggleSoundEffects();
  const isMusicOn = () => audio.isMusicOn();
  const areSoundsOn = () => audio.areSoundsOn();

  return (
    <GameContext.Provider
      value={{
        state,
        selectCategory,
        selectEmoji,
        initiateMove,
        cancelMove,
        placeEmoji,
        newRound,
        restartGame,
        selectBoardTheme,
        toggleMusic,
        toggleSoundEffects,
        isMusicOn,
        areSoundsOn
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};