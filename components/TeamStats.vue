<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-close" @click="$emit('close-stats')">X</div>
          <div class="modal-header">
            <h6 name="header">Team stats</h6>
          </div>

          <div class="modal-body">
            <div class="modal-body__item">
              <label for="level"> Average level: </label>
              <p>{{ averageLevel }}</p>
            </div>
            <div class="modal-body__item">
              <label for="rankedWins"> Average ranked wins: </label>
              <p>{{ averageRankedWins }}</p>
            </div>
            <div class="modal-body__item">
              <label for="bestPlayer"> Best player: </label>
              <p>{{ bestPlayer.name }}</p>
            </div>
            <div class="modal-body__item">
              <label for="mainHero"> Champ to watch: </label>
              <p>{{ bestPlayer.mainHero }}</p>
            </div>
          </div>

          <div class="modal-footer">
            <div class="square" :class="teamStrength">
              <div class="triangle"></div>
              <span class="tooltip">
                {{ teamStrength }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    team: Array,
  },
  computed: {
    averageLevel() {
      let sum = 0;
      sum = this.team.reduce((sum, item) => sum + parseInt(item.level), 0);
      return sum / this.team.length;
    },
    averageRankedWins() {
      let sum = 0;
      sum = this.team.reduce((sum, item) => sum + parseInt(item.rankedWins), 0);
      return sum / this.team.length;
    },
    bestPlayer() {
      if (this.team.length == 0) return;
      return this.team.reduce((a, b) =>
        Number(a.rankedWins) > Number(b.rankedWins) ? a : b
      );
    },
    teamStrength() {
      let teamStrength = this.averageLevel + this.averageRankedWins;
      if (teamStrength < 100) {
        return "low";
      } else if (teamStrength >= 100 && teamStrength < 170) {
        return "normal";
      } else {
        return "strong";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;

  label {
    color: #a09b8c;
  }

  h6 {
    padding-left: 0;
    text-align: center;
    text-transform: uppercase;
    color: #c88e22;
  }
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: 300px;
  margin: 0px auto;
  padding: 20px 40px;
  background: linear-gradient(
    0deg,
    rgba(2, 12, 21, 1) 0%,
    rgba(13, 30, 41, 1) 100%
  );
  border: 2px solid #c88e22;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;

  .modal-close {
    position: absolute;
    right: 4px;
    top: -18px;
    background-color: #1e2328;
    padding: 5px 10px 5px 10px;
    text-align: center;
    color: #b0a480;
    border: 2px solid #b58a33;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      background-color: darken($color: #1e2328, $amount: 5%);
      color: darken($color: #b0a480, $amount: 10%);
      transition: all 0.3s ease-out;
    }
  }

  .modal-error {
    text-align: center;
    color: #ed4337;
  }
  .modal-added {
    text-align: center;
    color: #42b983;
  }
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;

  &__item {
    padding-bottom: 20px;
  }
}

.modal-default-button {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.modal-footer {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  border: 2px solid #ffa500;
  cursor: pointer;
  text-transform: uppercase;
 
  .square {
    width: 40px;
    height: 40px;
    position: relative;
  }
  .normal {
    background: linear-gradient(45deg, #ffe5b4, #ffa500);
  }
  .low {
    background: linear-gradient(45deg, #ed4337, #800000);
  }
  .strong {
    background: linear-gradient(45deg, #42b983, #006400);
  }
  .triangle {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #c88e22;
    position: absolute;
    top: 50px;
    left: 50%;
    visibility: hidden;
    transform: translate(-50%, 0);
  }
  .tooltip {
    visibility: hidden;

    width: 120px;
    top: 55px;
    left: 50%;
    margin-left: -60px;
    background: linear-gradient(
      0deg,
      rgba(2, 12, 21, 1) 0%,
      rgba(13, 30, 41, 1) 100%
    );
    border: 2px solid #c88e22;
    color: #f5f5f5;
    text-align: center;
    border-radius: 6px;
    padding: 5px 10px;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;
  }

  &:hover {
    .tooltip,
    .triangle {
      visibility: visible;
      transition: all 0.7s ease-in;
    }
  }
}
</style>