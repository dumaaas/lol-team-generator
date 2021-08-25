<template>
  <div class="team">
    <div class="team-heading">
      <h6 @click="$emit('open-stats', team)"><slot></slot></h6>
      <div class="team-heading__sort" @click="sortTeam">
        <fa :icon="['fas', 'sort']" />
      </div>
    </div>
    <div class="team-players">
      <Player v-for="player in team" :key="player.name" :player="player" />
      <div>
        <div v-for="index in teamLength" :key="index" class="player">
          <p class="empty" v-once>Empty</p>
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
  methods: {
    sortTeam() {
      if (!this.team.length) return;
      this.team = this.team.slice().sort(function (a, b) {
        return b.level - a.level;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/abstracts/_mixins.scss";

h6 {
  cursor: pointer;
}
.team {
  width: 50%;
  @include breakpoint($xs-to-md) {
    width: 100%;
  }
  &-heading {
    display: flex;
    justify-content: space-between;
    &__sort {
      padding-right: 20px;
      cursor: pointer;
      svg path {
        fill: #a09b8c;

        &:hover {
          fill: darken($color: #a09b8c, $amount: 20%);
        }
      }
    }
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