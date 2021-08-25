export const state = () => ({
  messages: ['Welcome to the our generator', 'Press Generate button and enjoy your random teams'],
})

export const mutations = {
  addMessage: (state, message) => {
    state.messages.push(message);
  },
}
