export const state = () => ({
  players: [{
      id: 1,
      name: "dumara",
      icon: "iconDuma.png",
      rank: "Silver III",
      rankedWins: "50",
      level: "103",
      mainHero: "Nocturne",
    },
    {
      id: 2,
      name: "Toma",
      icon: "iconToma.png",
      rank: "Silver II",
      rankedWins: "41",
      level: "55",
      mainHero: "Ziggs",
    },
    {
      id: 3,
      name: "opetLemi",
      icon: "iconLemi.png",
      rank: "Silver III",
      rankedWins: "32",
      level: "116",
      mainHero: "Malzahar",
    },
    {
      id: 4,
      name: "Broqlin",
      icon: "iconBogdan.png",
      rank: "Unranked",
      rankedWins: "0",
      level: "257",
      mainHero: "Karma",
    },
    {
      id: 5,
      name: "Paka",
      icon: "iconPaka.png",
      rank: "Platinum IV",
      rankedWins: "52",
      level: "82",
      mainHero: "Ahri",
    },
    {
      id: 6,
      name: "Mr Drohan",
      icon: "iconAndro.png",
      rank: "Silver IV",
      rankedWins: "8",
      level: "48",
      mainHero: "Miss Fortune",
    },
    {
      id: 7,
      name: "Visnja",
      icon: "iconVisnja.png",
      rank: "Gold IV",
      rankedWins: "21",
      level: "243",
      mainHero: "Garen",
    },
    {
      id: 8,
      name: "Matke",
      icon: "iconMatke.png",
      rank: "Gold III",
      rankedWins: "89",
      level: "121",
      mainHero: "Jarvan",
    },
    {
      id: 9,
      name: "Kakarot",
      icon: "iconFapke.png",
      rank: "Silver III",
      rankedWins: "12",
      level: "68",
      mainHero: "Kai'Sa",
    },
    {
      id: 10,
      name: "Donsi1995",
      icon: "iconBacak.png",
      rank: "Silver I",
      rankedWins: "78",
      level: "189",
      mainHero: "Morgana",
    }
  ]
})

export const mutations = { 
  addPlayer: (state, player) => {
    state.players.push(player);
  }
}
