<template>
  <div class="bottom-invites">
    <div class="bottom-invites__heading">
      <h6>INVITES ({{ players.length }})</h6>
    </div>
    <div class="bottom-invites__players">
      <div v-for="player in players" :key="player.name" class="player">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <p>
          {{ player.name }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: Array,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/abstracts/_mixins.scss";

.bottom-invites {

  width: 33.33%;
  @include breakpoint($xs) {
    width: 100%;
  }
  &__players {
    height: 200px;
    overflow-y: auto;
    padding-left: 27px;
    .player {
      padding-top: 2px;
      .dot {
        display: inline-block;
        border-radius: 50%;
        width: 4px;
        height: 4px;
        background-color: #f0e6d2;
      }
      p {
        display: inline-block;
        padding-left: 10px;
        color: #a09b8c;
        font-size: 14px;
        padding-top: 2px;
      }
    }
  }
}
</style>