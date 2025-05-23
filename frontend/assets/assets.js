import {homeIcon} from "./home.svg"

export const sidebarLinks = [
    {
      imgURL: homeIcon,
      route: "/",
      label: "Home",
    },
    {
      imgURL: "./search.svg",
      route: "/game",
      label: "Play Games",
    },
    {
      imgURL: "./heart.svg",
      route: "/online",
      label: "Online",
    },
    {
      imgURL: "./create.svg",
      route: "/leaderboard",
      label: "Leaderboard",
    },
    {
      imgURL: "./community.svg",
      route: "/help",
      label: "Help",
    },
    {
      imgURL: "./user.svg",
      route: "/profile",
      label: "Profile",
    },
  ];

export const EmojiCategory=[
  {
    name: "Animals",
    emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐻‍❄️", "🐨", "🐯", "🦁", "🐮"],
    color: "#8B5CF6" 
  },
  {
    name: "Foods",
    emojis: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍"],
    color: "#EC4899" 
  },
  {
    name: "Sports",
    emojis: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🥊"],
    color: "#3B82F6" 
  },
  {
    name: "Nature",
    emojis: ["🌸", "🌹", "🌺", "🌻", "🌼", "🌷", "🌱", "🌲", "🌳", "🌴", "🌵", "🍄", "🌿"],
    color: "#10B981" 
  },
  {
    name: "Space",
    emojis: ["🌟", "✨", "💫", "🌙", "☀️", "🌤️", "⭐", "🌠", "🌌", "🪐", "🌍", "🌕", "☄️"],
    color: "#6366F1" 
  },
  {
    name: "Faces",
    emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉"],
    color: "#F59E0B" 
  },{
  name: "Transport",
  emojis: ["🚗", "🚕", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚜", "✈️", "🚀", "🛸", "🚁"],
  color: "#F97316" 
},
{
  name: "Technology",
  emojis: ["💻", "🖥️", "🖨️", "⌨️", "🖱️", "📱", "📷", "🎥", "📺", "📡", "🔋", "🔌", "🧠"],
  color: "#0EA5E9" 
},
{
  name: "Weather",
  emojis: ["🌞", "🌝", "🌧️", "⛈️", "🌩️", "❄️", "🌪️", "🌫️", "🌈", "💨", "☁️", "🌬️", "🌀"],
  color: "#60A5FA" 
},
{
  name: "Fantasy",
  emojis: ["🧙", "🧚", "🧛", "🧜", "🧞", "🧟", "🦄", "🐉", "🐲", "🪄", "🧝", "⚔️", "🔮"],
  color: "#A855F7" 
},
{
  name: "Objects",
  emojis: ["🎁", "📦", "🕹️", "💡", "📚", "🧸", "🎈", "🔑", "💎", "📖", "🧭", "🧱", "🪑"],
  color: "#D946EF" 
}

];


export const boardThemes = [
  {
    id: "default",
    name: "Classic",
    background: "bg-black",
    cellBackground: "bg-gray-800",
    borderColor: "border-gray-700"
  },
  {
    id: "neon",
    name: "Neon",
    background: "bg-black",
    cellBackground: "bg-gray-900",
    borderColor: "border-purple-500"
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    background: "bg-black",
    cellBackground: "bg-indigo-900/50",
    borderColor: "border-cyan-500"
  },
  {
    id: "retro",
    name: "Retro",
    background: "bg-black",
    cellBackground: "bg-amber-900/30",
    borderColor: "border-yellow-600"
  },
  {
    id: "galaxy",
    name: "Galaxy",
    background: "bg-black bg-opacity-90 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black",
    cellBackground: "bg-gray-900/40 backdrop-blur-sm",
    borderColor: "border-blue-500/50"
  },
  {
    id: "aurora",
    name: "Aurora",
    background: "bg-gradient-to-b from-green-900 via-indigo-900 to-purple-900",
    cellBackground: "bg-green-800/30 backdrop-blur-sm",
    borderColor: "border-lime-400/60"
  },
  {
    id: "sunset",
    name: "Sunset",
    background: "bg-gradient-to-br from-orange-900 via-pink-900 to-purple-900",
    cellBackground: "bg-pink-900/30 backdrop-blur-md",
    borderColor: "border-red-400"
  },
  {
    id: "matrix",
    name: "Matrix",
    background: "bg-black",
    cellBackground: "bg-green-900/60",
    borderColor: "border-green-400"
  },
  {
    id: "ice",
    name: "Ice",
    background: "bg-gradient-to-b from-blue-900 via-sky-900 to-cyan-900",
    cellBackground: "bg-cyan-800/40 backdrop-blur",
    borderColor: "border-blue-300/60"
  },
  {
    id: "lava",
    name: "Lava",
    background: "bg-gradient-to-t from-red-900 via-orange-800 to-yellow-800",
    cellBackground: "bg-red-800/40",
    borderColor: "border-yellow-400"
  }
];
