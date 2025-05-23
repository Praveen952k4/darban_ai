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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #0f172a, #000)",
        color: "white",
        padding: "2rem",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "2rem",
          }}
        >
          <button
            onClick={() => {
              audioService.playSound("click");
              window.history.back();
            }}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid white",
              backgroundColor: "transparent",
              color: "white",
              borderRadius: "0.25rem",
              cursor: "pointer",
            }}
          >
            Back
          </button>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, #3b82f6, #f43f5e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
            }}
          >
            Leaderboard
          </h1>
          <div style={{ width: "80px" }}></div>
        </div>

        <div
          style={{
            backgroundColor: "#1f2937",
            borderRadius: "0.5rem",
            overflow: "hidden",
            boxShadow: "0 0 10px #000",
          }}
        >
          <div style={{ padding: "1.5rem" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <Trophy size={24} color="#facc15" />
              Top Players
            </h2>
            <hr style={{ margin: "1rem 0", borderColor: "#374151" }} />
          </div>

          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "10rem",
              }}
            >
              <div
                style={{
                  height: "3rem",
                  width: "3rem",
                  border: "4px solid white",
                  borderBottom: "4px solid transparent",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }}
              />
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead style={{ backgroundColor: "#374151" }}>
                  <tr>
                    <th style={{ padding: "0.75rem", textAlign: "center" }}>Rank</th>
                    <th style={{ padding: "0.75rem", textAlign: "left" }}>Player</th>
                    <th style={{ padding: "0.75rem", textAlign: "right" }}>Wins</th>
                    <th style={{ padding: "0.75rem", textAlign: "right" }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr
                      key={entry.id}
                      style={{
                        borderBottom: "1px solid #4b5563",
                        backgroundColor: index % 2 === 0 ? "#1f2937" : "#111827",
                      }}
                    >
                      <td style={{ padding: "0.75rem", textAlign: "center" }}>
                        {getRankIcon(index)}
                        <div style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>
                          {index + 1}
                        </div>
                      </td>
                      <td style={{ padding: "0.75rem" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                          }}
                        >
                          <span style={{ fontSize: "1.25rem" }}>{entry.emoji}</span>
                          <span style={{ fontWeight: index < 3 ? "bold" : "normal" }}>
                            {entry.name}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          padding: "0.75rem",
                          textAlign: "right",
                          fontWeight: "bold",
                        }}
                      >
                        {entry.wins}
                      </td>
                      <td
                        style={{ padding: "0.75rem", textAlign: "right", color: "#9ca3af" }}
                      >
                        {entry.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div
            style={{
              padding: "1.5rem",
              textAlign: "center",
              color: "#9ca3af",
              fontSize: "0.875rem",
            }}
          >
            Win more games to climb the leaderboard!
          </div>
        </div>
      </div>

      {/* Spinner animation */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Leaderboard;
