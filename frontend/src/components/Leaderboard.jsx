import React, { useEffect, useState } from "react";
import { Trophy, Medal, Award } from "lucide-react";
import AudioService from "../Music/AudioService";

const audioService = AudioService.getInstance();

const mockLeaderboard = [
  { id: 1, name: "Player 1", wins: 25, emoji: "🏆", date: "2023-05-15" },
  { id: 2, name: "Emoji Master", wins: 20, emoji: "🥈", date: "2023-05-14" },
  { id: 3, name: "Game Pro", wins: 18, emoji: "🥉", date: "2023-05-13" },
  { id: 4, name: "Tic Tac Star", wins: 15, emoji: "✨", date: "2023-05-12" },
  { id: 5, name: "Player 5", wins: 12, emoji: "🎮", date: "2023-05-11" },
  { id: 6, name: "Player 6", wins: 10, emoji: "🎯", date: "2023-05-10" },
  { id: 7, name: "Player 7", wins: 8, emoji: "🎲", date: "2023-05-09" },
  { id: 8, name: "Player 8", wins: 5, emoji: "🎭", date: "2023-05-08" },
  { id: 9, name: "Player 9", wins: 3, emoji: "🎪", date: "2023-05-07" },
  { id: 10, name: "Player 10", wins: 1, emoji: "🎨", date: "2023-05-06" },
];

const getRankIcon = (index) => {
  switch (index) {
    case 0:
      return <Trophy size={20} color="#facc15" />;
    case 1:
      return <Medal size={20} color="#d1d5db" />;
    case 2:
      return <Medal size={20} color="#d97706" />;
    default:
      return <Award size={20} color="#93c5fd" />;
  }
};

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLeaderboard(mockLeaderboard);
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-900 to-black text-white px-4 sm:px-8 py-8">
      <div className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <button
            onClick={() => {
              audioService.playSound("click");
              window.history.back();
            }}
            className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
          >
            Back
          </button>
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-8 gap-4 text-center">
          <h1 className="w-full text-center text-xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
            Leaderboard
          </h1>



          <div className="w-[80px]" />
        </div>

        {/* Leaderboard Box */}
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy size={24} color="#facc15" />
              Top Players
            </h2>
            <hr className="my-4 border-gray-600" />
          </div>

          {/* Loading Spinner */}
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-12 h-12 border-4 border-white border-b-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead className="bg-gray-700 text-left">
                  <tr>
                    <th className="px-4 py-3 text-center">Rank</th>
                    <th className="px-4 py-3">Player</th>
                    <th className="px-4 py-3 text-right">Wins</th>
                    <th className="px-4 py-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr
                      key={entry.id}
                      className={`${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                      } border-b border-gray-700`}
                    >
                      <td className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center">
                          {getRankIcon(index)}
                          <span className="text-xs mt-1">{index + 1}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 flex items-center gap-2">
                        <span className="text-xl">{entry.emoji}</span>
                        <span className={`${index < 3 ? "font-bold" : ""}`}>
                          {entry.name}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-bold">{entry.wins}</td>
                      <td className="px-4 py-3 text-right text-gray-400">
                        {entry.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="p-6 text-center text-gray-400 text-sm">
            Win more games to climb the leaderboard!
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
