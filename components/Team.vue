<template>
  <div class="team">
    <div class="team-heading">
      <h6><slot></slot></h6>
    </div>
    <div class="team-players">
      <Player v-for="player in team" :key="player.name" :player="player" />
      <div>
        <div v-for="index in teamLength" :key="index" class="player">
          <p class="empty">Empty</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Player from "@/components/Player.vue";

export default {
  components: {
    Player,
  },

  props: {
    team: Array,
  },
  computed: {
    teamLength: function () {
      return 5 - this.team.length;
    },
  },
};
</script>

<style lang="scss" scoped>
.team {
  width: 50%;

  h6 {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: #a09b8c;
    padding-left: 20px;
    padding-bottom: 5px;
  }

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
}
</style>