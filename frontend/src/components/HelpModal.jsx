import React from "react";

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center text-white px-4">
      <div
        className="bg-black max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-2xl relative scrollbar-hide"
        style={{ scrollbarWidth: "none" }}
      >
        <button
            onClick={() => {
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
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-purple-400">🎮 How To Play</h2>
          <p className="text-sm text-gray-400 mt-1">
            Master the twist on classic Tic Tac Toe — now with emojis!
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6 text-sm text-gray-300">
          {/* Setup */}
          <section>
            <h3 className="font-semibold text-lg text-purple-300 mb-1">🛠️ Setup</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>Each player selects an emoji category (e.g., 🐶 Animals, 🍓 Fruits).</li>
              <li>The board is a simple 3×3 grid.</li>
              <li>Each turn gives a **random emoji** from your chosen category.</li>
            </ul>
          </section>
          <hr className="border-gray-700" />

          {/* Gameplay */}
          <section>
            <h3 className="font-semibold text-lg text-purple-300 mb-1">🎲 Gameplay</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>Players alternate turns placing emojis on the board.</li>
              <li>You cannot choose the emoji — it’s random from your set!</li>
              <li>Your goal is to form a **line of 3 emojis** (just like classic tic-tac-toe).</li>
              <li>You can strategize even with randomness — plan ahead!</li>
            </ul>
          </section>
          <hr className="border-gray-700" />

          {/* Vanishing Rule */}
          <section>
            <h3 className="font-semibold text-lg text-purple-300 mb-1">💨 The Vanishing Rule</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>You may only have **3 emojis** on the board at any time.</li>
              <li>When placing a 4th emoji, the **oldest one vanishes**.</li>
              <li>You **cannot place** a new emoji where the vanished one was.</li>
              <li>This adds tension, strategy, and no chance of a draw!</li>
            </ul>
          </section>
          <hr className="border-gray-700" />

          {/* Winning */}
          <section>
            <h3 className="font-semibold text-lg text-purple-300 mb-1">🏆 Winning</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>Win by lining up 3 of your emojis: horizontally, vertically, or diagonally.</li>
              <li>No ties — the **Vanishing Rule** ensures a winner every time!</li>
            </ul>
          </section>
          <hr className="border-gray-700" />

          {/* Tips & Fun */}
          <section className="text-center text-sm italic text-gray-400 pt-4">
            💡 Tip: Choose a category with visually unique emojis for easier tracking!<br />
            🎉 Have fun and may the emoji legends be with you!
          </section>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
