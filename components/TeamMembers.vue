<template>
  <div class="team-members">
    <div class="team-members__heading">
      <h6>TEAM BUILDER ({{ teamBuildLength }}/10)</h6>
    </div>
    <div class="team-members__players">
      <div
        v-for="player in players"
        :key="player.name"
        class="team-members__players-player"
      >
        <div class="player-left" :id="player.name">
          <div class="player-icon">
            <img
              :src="require(`@/static/${player.icon}`)"
              :alt="`${player.name}`"
            />
            <div class="online"></div>
          </div>

          <div class="name">
            <p>
              {{ player.name }}
            </p>
            <p :id="player.icon">Online</p>
          </div>
        </div>

        <div class="player-right" :id="player.rankedWins">
          <button
            v-if="isPlayerInTeam(player.id)"
            type="submit"
            @click="$emit('add-to-team', player.id)"
            :disabled="!isButtonActive"
          >
            Add
          </button>
          <button
            v-else
            type="submit"
            :disabled="!isButtonActive"
            @click="$emit('remove-from-team', player.id)"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    players: Array,
    teamOne: Array,
    teamTwo: Array,
    isButtonActive: Boolean,
  },
  computed: {
    teamBuildLength() {
      return this.teamOne.length + this.teamTwo.length;
    },
  },
  methods: {
    isPlayerInTeam(id) {
      if (
        this.teamTwo.find(
          (user) =>
            user.id === id || this.teamOne.find((user) => user.id === id)
        )
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.team-members {
  padding: 20px 0;

  &__heading {
    background-color: rgba(2, 12, 21, 1);
    padding: 5px 20px;

    h6 {
      padding-left: 0;
      padding-bottom: 0;
    }
  }

  &__players {
    height: 100vh;
    overflow-y: auto;
    padding-bottom: 40px;
    padding: 20px;

    &-player {
      display: flex;
      justify-content: space-between;
      &:last-child {
        padding-bottom: 40px;
      }
      .player-left {
        display: flex;
        padding-bottom: 15px;
        gap: 10px;
        img {
          width: 33px;
          border-radius: 50%;
          border: 2px solid #c88e22;
        }

        p {
          color: #928f82;

          &:nth-child(2) {
            color: #0a863f;
            font-size: 14px;
          }
        }

        .player-icon {
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
      .player-right {
        button {
          padding: 8px 15px;
        }
      }
    }
  }
}
</style>