<template>
  <div class="bottom-chat">
    <div class="bottom-chat__messages">
      <p v-for="player in players" :key="player.name">
        {{ player.name }} joined the lobby
      </p>
      <p v-for="message in messages" :key="message">
        <span>dumara </span><span> {{ message }} </span>
      </p>
    </div>
    <input type="text" v-on:keyup.enter="addMessage" v-model="messageValue" />
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    players: Array,
  },
  computed: {
      ...mapState({
      messages: (state) => state.messages.messages,
    }),
  },
  data() {
    return {
      messageValue: '',
    };
  },
  methods: {
    addMessage() {
      this.$store.commit('messages/addMessage', this.messageValue)
      this.messageValue = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/abstracts/_mixins.scss";

.bottom-chat {
  width: 33.33%;
  @include breakpoint($xs) {
    width: 100%;
  }
  &__messages {
    padding-left: 20px;
    height: 200px;
    overflow-y: auto;
    span:nth-child(1) {
      color: #c8a356;
    }
    p {
      color: #4e4d4a;
      font-size: 14px;
      padding-top: 2px;
    }
  }
}
</style>