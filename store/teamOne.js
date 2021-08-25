export const state = () => ({
    teamOne: [],
})

export const getters = {
    findIndexOne: state => {
        state.teamOne.findIndex(function(o) {
            return o.id === id;
        });
    }
}

export const mutations = {
  setTeam: (state, team) => {
    state.teamOne = team
  },
  addPlayer: (state, player) => {
    state.teamOne.push(player);
  },
  removePlayer: (state, removeIndexOne) => {
    state.teamOne.splice(removeIndexOne, 1);
  },

}