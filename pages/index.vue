<template>
  <main class="main">
    <section class="main-left">
      <div class="overlay">
        <div class="top">
          <div class="heading">
            <div class="heading-left">
              <img src="@/static/logo.png" alt="logo" width="40px" />
            </div>
            <div class="heading-right">
              <div>
                <h1>LEAUGE OF LEGENDS TEAM GENERATOR</h1>
              </div>
              <div>
                <p>Summoner's Rift</p>
                <p class="square"></p>
                <p>5v5</p>
                <p class="square"></p>
                <p>Blind Pick</p>
              </div>
              <div class="heading-icons">
                <span> <fa :icon="['fab', 'bandcamp']" /> </span>
                <span> <fa :icon="['fas', 'broom']" /> </span>
                <span> <fa :icon="['fas', 'fire']" /> </span>
              </div>
            </div>
          </div>
          <div class="generate">
            <button type="submit" @click="generateTeam">GENERATE</button>
          </div>
        </div>
        <div class="middle">
          <Team :team="teamOne"> TEAM 1 </Team>
          <Team :team="teamTwo"> TEAM 2 </Team>
        </div>
        <div class="bottom">
          <div class="bottom-chat">
            <div class="bottom-chat__messages">
              <p v-for="player in players" :key="player.name">
                {{ player.name }} joined the lobby
              </p>
              <p v-for="message in messages" :key="message">
                <span>dumara gadna </span><span> {{ message }} </span>
              </p>
            </div>
            <input
              type="text"
              v-on:keyup.enter="addMessage"
              v-model="messageValue"
            />
          </div>
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
          <div class="bottom-spec">
            <div class="bottom-spec__heading">
              <h6>SPECTATORS (0/4)</h6>
              <button type="submit" id="show-modal" @click="showModal = true">
                New player
              </button>
            </div>
            <div class="bottom-spec__players">
              <p>No spectators</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="main-right">
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
                @click="addPlayerToTeam(player.id)"
                :disabled="!isButtonActive"
              >
                Add
              </button>
              <button
                v-else
                type="submit"
                :disabled="!isButtonActive"
                @click="removePlayerFromTeam(player.id)"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="hidden" id="animationPlayer">
      <div class="animation-player">
        <img :src="require(`@/static/${newIcon}`)" />
        <div class="name">
          <p>{{ newName }} goes to team {{ newTeam }}</p>
        </div>
      </div>
    </div>
    <Modal
      v-if="showModal"
      @close-modal="closeModal"
      @new-player="addNewPlayer"
      :icons="icons"
    />
  </main>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Team from "@/components/Team.vue";

export default {
  components: {
    Modal,
    Team,
  },
  data() {
    return {
      isButtonActive: true,
      newName: "",
      newIcon: "iconDuma.png",
      newTeam: "",
      teamOne: [],
      teamTwo: [],
      shufflePlayers: [],
      messages: [],
      messageValue: "",
      showModal: false,
      icons: [
        "iconDuma.png",
        "iconPaka.png",
        "iconAndro.png",
        "iconBacak.png",
        "iconBogdan.png",
        "iconFapke.png",
        "iconLemi.png",
        "iconMatke.png",
        "iconToma.png",
        "iconVisnja.png",
      ],
      players: [
        {
          id: 1,
          name: "dumara gadna",
          icon: "iconDuma.png",
          rank: "Silver III",
          rankedWins: "50",
          level: "103",
        },
        {
          id: 2,
          name: "Hakuna Tomata",
          icon: "iconToma.png",
          rank: "Silver II",
          rankedWins: "41",
          level: "55",
        },
        {
          id: 3,
          name: "opetLemi",
          icon: "iconLemi.png",
          rank: "Silver III",
          rankedWins: "32",
          level: "116",
        },
        {
          id: 4,
          name: "Broqlin",
          icon: "iconBogdan.png",
          rank: "Unranked",
          rankedWins: "0",
          level: "257",
        },
        {
          id: 5,
          name: "Luigi Vampa",
          icon: "iconPaka.png",
          rank: "Platinum IV",
          rankedWins: "52",
          level: "82",
        },
        {
          id: 6,
          name: "Mr Drohan",
          icon: "iconAndro.png",
          rank: "Silver IV",
          rankedWins: "8",
          level: "48",
        },
        {
          id: 7,
          name: "Visnja",
          icon: "iconVisnja.png",
          rank: "Gold IV",
          rankedWins: "21",
          level: "243",
        },
        {
          id: 8,
          name: "Matke",
          icon: "iconMatke.png",
          rank: "Gold III",
          rankedWins: "89",
          level: "121",
        },
        {
          id: 9,
          name: "Kakarot",
          icon: "iconFapke.png",
          rank: "Silver III",
          rankedWins: "12",
          level: "68",
        },
        {
          id: 10,
          name: "Donsi1995",
          icon: "iconBacak.png",
          rank: "Silver I",
          rankedWins: "78",
          level: "189",
        },
      ],
      playersCopy: [],
    };
  },
  computed: {
    teamBuildLength: function () {
      return this.teamOne.length + this.teamTwo.length;
    },
  },
  methods: {
    shuffle(array) {
      var tmp,
        current,
        top = array.length;
      if (top)
        while (--top) {
          current = Math.floor(Math.random() * (top + 1));
          tmp = array[current];
          array[current] = array[top];
          array[top] = tmp;
        }
      return array;
    },
    generateTeam() {
      this.teamOne = [];
      this.teamTwo = [];
      this.playersCopy = this.players.map((o) => ({ ...o }));
      this.shufflePlayers = this.shuffle(this.playersCopy);
      this.teamOne = this.shufflePlayers.slice(0, 5);
      this.teamTwo = this.shufflePlayers.slice(5, 10);
    },
    addToArray(array, item) {
      setTimeout(() => {
        array.push(item);
        var centerAnimation = document.getElementById("animationPlayer");
        centerAnimation.classList.remove("centerAnimation");
        centerAnimation.classList.add("hidden");
        this.isButtonActive = true;
      }, 2500);
    },
    addPlayerToTeam(id) {
      this.isButtonActive = false;
      this.playersCopy = this.players.map((o) => ({ ...o }));
      var player = this.playersCopy.find((user) => user.id === id);
      var randomTeams = ["one", "two"];
      var centerAnimation = document.getElementById("animationPlayer");
      this.newIcon = player.icon;
      this.newName = player.name;

      var randomTeam =
        randomTeams[Math.floor(Math.random() * randomTeams.length)];
      this.newTeam = "???";
      setTimeout(() => {
        this.newTeam = randomTeam;
      }, 1500);
      if (
        randomTeam === "one" &&
        this.teamOne.length < 5 &&
        !this.teamOne.find((user) => user.id === player.id) &&
        !this.teamTwo.find((user) => user.id === player.id)
      ) {
        this.addToArray(this.teamOne, player);
      } else if (
        this.teamTwo.length < 5 &&
        !this.teamTwo.find((user) => user.id === player.id) &&
        !this.teamOne.find((user) => user.id === player.id)
      ) {
        this.addToArray(this.teamTwo, player);
      }
      centerAnimation.classList.add("centerAnimation");
      centerAnimation.classList.remove("hidden");
    },
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
    removePlayerFromTeam(id) {
      if (this.teamOne.find((user) => user.id === id)) {
        let removeIndexOne = this.teamOne.findIndex(function (o) {
          return o.id === id;
        });
        if (removeIndexOne !== -1) this.teamOne.splice(removeIndexOne, 1);
        console.log("index", removeIndexOne);
      } else {
        let removeIndexTwo = this.teamTwo.findIndex(function (o) {
          return o.id === id;
        });
        if (removeIndexTwo !== -1) this.teamTwo.splice(removeIndexTwo, 1);
        console.log("index", removeIndexTwo);
      }
    },
    addMessage() {
      this.messages.push(this.messageValue);
      this.messageValue = "";
    },
    addNewPlayer(newPlayer) {
      this.players.push(newPlayer);
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/abstracts/_mixins.scss";

.main {
  display: flex;
  flex-direction: row;
  position: relative;

  input {
    width: 100%;
    height: 38px;
    border-radius: 0;
    border: 2px solid #775928;
    background-color: #010a13;
    margin-top: 15px;
  }
  button {
    display: inline-block;
    background-color: #1e2328;
    color: #cdbe91;
    border: 2px solid #c8a356;
    padding: 8px 40px;
    font-weight: 700;
    letter-spacing: 1.2px;
    cursor: pointer;
    &:hover {
      border: 2px solid #cdbe91;
      transition: all 0.4s ease-in;
      box-shadow: 0 5px 15px rgba(205, 190, 145, 0.4);
    }
  }
  h6 {
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 1.2px;
    color: #a09b8c;
    padding-left: 20px;
    padding-bottom: 5px;
  }

  &-left {
    background: url("~@/static/cover3.jpeg") no-repeat center center scroll;
    height: 100%;

    width: calc(100% - 350px);
    @include breakpoint($xs) {
      width: 100%;
    }

    @include breakpoint($sm-only) {
      width: 100%;
    }
    .overlay {
      position: relative;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      flex: 1;
      width: 100%;
      height: 100vh;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
      padding: 50px;

      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include breakpoint($xs-to-md) {
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
        }
        .heading {
          display: flex;
          gap: 20px;
          &-icons {
            padding-top: 10px;
            padding-left: 20px;
            display: flex;
            gap: 15px;
            svg path {
              fill: #454742;
            }
          }

          &-left {
            padding-top: 5px;
          }
          &-right {
            div:nth-child(2) {
              display: flex;
              gap: 15px;
              p {
                color: #919b8c !important;
              }

              .square {
                margin-top: 6px;
                width: 5px;
                height: 5px;
                background: #919b8c;
                transform: rotate(45deg);
              }
            }
            h1 {
              color: #e1e3d2;
            }
            span {
              color: #464a43;
            }
          }
        }

        .generate {
          @include breakpoint($xs-to-md) {
            margin-left: 60px;
          }
        }
      }

      .middle {
        padding-left: 20px;
        padding-top: 30px;
        display: flex;
        gap: 15px;
        @include breakpoint($xs-to-md) {
          flex-direction: column;
          gap: 50px;
        }
      }

      .bottom {
        padding-top: 60px;
        padding-left: 20px;
        display: flex;
        margin-top: auto;
        gap: 30px;

        @include breakpoint($xs) {
          flex-direction: column;
        }

        &-chat {
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

        &-invites {
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

        &-spec {
          width: 33.33%;
          height: 200px;
          overflow-y: auto;
          @include breakpoint($xs) {
            width: 100%;
          }
          p {
            display: none;
            @include breakpoint($xl) {
              padding-left: 20px;
              color: #a09b8c;
              font-size: 16px;
              padding-top: 10px;
              display: block;
            }
          }

          &__heading {
            display: flex;
            justify-content: space-between;
            h6 {
              display: none;
              @include breakpoint($xl) {
                display: inline-block;
              }
            }
          }
        }
      }
    }
  }
  &-right {
    width: 350px;
    height: 100vh;
    position: fixed;
    right: 0;
    background: linear-gradient(
      0deg,
      rgba(2, 12, 21, 1) 0%,
      rgba(13, 30, 41, 1) 100%
    );

    @include breakpoint($xs) {
      display: none;
    }

    @include breakpoint($sm-only) {
      display: none;
    }

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
  }
}

.centerAnimation {
  position: absolute;
  display: block;
  top: calc(50% - 80px);
  left: calc(50% - 200px);
  animation: centerAnimation 3s forwards;
  background-color: black;
  padding: 20px 40px;
  background: linear-gradient(
    0deg,
    rgba(2, 12, 21, 1) 0%,
    rgba(13, 30, 41, 1) 100%
  );
  border: 2px solid #c88e22;
}

@-webkit-keyframes centerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    transform: scale3d(2, 1, 0.3);
  }
  100% {
    opacity: 0;
  }
}

@keyframes centerAnimation {
  0% {
    opacity: 1;
  }
  50% {
    transform: scale3d(2.5, 2.5, 0.3);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.hidden {
  display: none;
}

.animation-player {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  gap: 10px;
  img {
    width: 33px;
    border-radius: 50%;
    border: 2px solid #c88e22;
  }

  p {
    color: #928f82;
  }
}
</style>
