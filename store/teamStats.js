export const state = () => ({
    teamStats: [],
})

export const mutations = {
  setTeam: (state, team) => {
    state.teamStats = team
  },
}