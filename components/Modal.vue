<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <form class="modal-container" @submit.prevent="addNewPlayer">
          <div class="modal-close" @click="$emit('close-modal')">
            X
          </div>
          <div class="modal-header">
            <h6 name="header">Add new player</h6>
          </div>

          <div class="modal-body">
            <label for="username"> Username: </label>
            <input
              type="text"
              name="username"
              v-model="newPlayerUsername"
              @keyup="checkForm = false"
            />
            <label for="rank"> Rank: </label>
            <input
              type="text"
              name="rank"
              v-model="newPlayerRank"
              @keyup="checkForm = false"
            />
            <label for="rankedWins"> Ranked wins: </label>
            <input
              type="text"
              name="rankedWins"
              v-model="newPlayerRankedWins"
              @keyup="checkForm = false"
            />
            <label for="level"> Level: </label>
            <input
              type="text"
              name="level"
              v-model="newPlayerLevel"
              @keyup="checkForm = false"
            />
            <div v-if="checkForm" class="modal-error">
              You must enter all fields!
            </div>
            <div v-if="playerAdded" class="modal-added">
              Player is successfully added!
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button">Add</button>
            </slot>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    icons: Array,
  },
  data() {
    return {
      playerAdded: false,
      checkForm: false,
      newPlayerUsername: "",
      newPlayerRank: "",
      newPlayerRankedWins: "",
      newPlayerLevel: "",
    };
  },
  methods: {
    addNewPlayer() {
      if (
        this.newPlayerUsername == "" ||
        this.newPlayerRank == "" ||
        this.newPlayerRankedWins == "" ||
        this.newPlayerLevel == ""
      ) {
        this.checkForm = true;
        return;
      }
      var randomIcon =
        this.icons[Math.floor(Math.random() * this.icons.length)];
      var randomId = Math.floor(Math.random() * 91) + 11;
      var newPlayer = {
        name: this.newPlayerUsername,
        rank: this.newPlayerRank,
        rankedWins: this.newPlayerRankedWins,
        level: this.newPlayerLevel,
        icon: randomIcon,
        id: randomId,
      };
      this.$emit("new-player", newPlayer);
      this.playerAdded = true;
      setTimeout(() => {
        this.playerAdded = false;
      }, 2000);
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
</style>