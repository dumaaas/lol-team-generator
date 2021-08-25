export const state = () => ({
    teamTwo: [],
})

export const getters = {
    findIndexTwo: state => {
        state.teamTwo.findIndex(function(o) {
            return o.id === id;
        });
    }
}

export const mutations = {
  setTeam: (state, team) => {
    state.teamTwo = team
  },
  addPlayer: (state, player) => {
    state.teamTwo.push(player);
  },
  removePlayer: (state, removeIndexTwo) => {
    state.teamTwo.splice(removeIndexTwo, 1);
  }
}
