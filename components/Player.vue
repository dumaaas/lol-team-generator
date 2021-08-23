<template>
  <div class="player">
    <div class="player-name">
      <span> {{ player.level }} </span>
      <div class="player-name__icon">
        <img
          :src="require(`@/static/${player.icon}`)"
          :alt="`${player.name}`"
        />
        <div class="online"></div>
      </div>
      <span>{{ player.name }}</span>
    </div>
    <div class="player-rank">
      <p>{{ player.rank }}</p>
      <p>W: {{ player.rankedWins }} <span>(Ranked)</span></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    player: Object,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/abstracts/_mixins.scss";

.player {
  border-bottom: 1px solid #514f4d;
  padding: 0 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-name {
    display: flex;
    gap: 15px;
    align-items: center;

    span:nth-child(1) {
      width: 28px;
    }

    &__icon {
      position: relative;

      .online {
        position: absolute;
        right: 0;
        bottom: 3px;
        width: 11px;
        height: 11px;
        border: 1px solid black;
        border-radius: 50%;
        background-color: #4fe489;
      }
    }
  }

  &-rank {
    span {
      @include breakpoint($xs) {
        display: none;
      }
    }
  }

  img {
    width: 33px;
    border-radius: 50%;
    border: 2px solid #c88e22;
  }
  span {
    color: #c88e22;
  }
  p {
    text-align: right;
    color: #c88e22;
  }
  .empty {
    color: #514f4d;
  }

  &:hover {
    transition: all 0.4s ease-in;
    box-shadow: 0 0 15px rgba(205, 190, 145, 0.9);
    cursor: pointer;
    transition: all 0.5s ease;
  }
}
</style>