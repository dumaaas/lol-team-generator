<template>
  <main class="main">
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
            <div>
              <span> Few icons </span>
              <span> Few icons </span>
              <span> Few icons </span>
            </div>
          </div>
        </div>
        <div class="generate">
          <button type="submit" @click="generateTeam">GENERATE</button>
        </div>
      </div>
      <div class="middle">
        <div class="middle-left">
          <div class="middle-left__heading">
            <h6>TEAM 1</h6>
          </div>
          <div class="middle-left__team">
            <div v-for="player in teamOne" :key="player.name" class="item">
              <div v-if="generatedTeam" class="item-name">
                <span> {{ player.level }} </span>
                <div class="item-name__icon">
                  <img
                    :src="require(`@/static/${player.icon}`)"
                    :alt="`${player.name}`"
                  />
                  <div class="online"></div>
                </div>
                <span>{{ player.name }}</span>
              </div>
              <div class="item-rank">
                <p>{{ player.rank }}</p>
                <p>W: {{ player.rankedWins }} (Ranked)</p>
              </div>
            </div>
            <div v-if="!generatedTeam">
              <div v-for="index in 5" :key="index" class="item">
                <p class="empty">Empty</p>
              </div>
            </div>
          </div>
        </div>
        <div class="middle-right">
          <div class="middle-right__heading">
            <h6>TEAM 2</h6>
          </div>
          <div class="middle-right__team">
            <div v-for="player in teamTwo" :key="player.name" class="item">
              <div v-if="generatedTeam" class="item-name">
                <span> {{ player.level }} </span>
                <div class="item-name__icon">
                  <img
                    :src="require(`@/static/${player.icon}`)"
                    :alt="`${player.name}`"
                  />
                  <div class="online"></div>
                </div>
                <span>{{ player.name }}</span>
              </div>
              <div class="item-rank">
                <p>{{ player.rank }}</p>
                <p>W: {{ player.rankedWins }} (Ranked)</p>
              </div>
            </div>
            <div v-if="!generatedTeam">
              <div v-for="index in 5" :key="index" class="item">
                <p class="empty">Empty</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-chat">
          <div class="bottom-chat__messages">
            <p v-for="player in players" :key="player.name">
              {{ player.name }} joined the lobby
            </p>
          </div>
          <input type="text" />
        </div>
        <div class="bottom-invites">
          <div class="bottom-invites__heading">
            <h6>INVITES (10)</h6>
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
            <button type="submit">Spectate</button>
          </div>
          <div class="bottom-spec__players">
            <p>No spectators</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      generatedTeam: false,
      teamOne: [],
      teamTwo: [],
      shufflePlayers: [],
      players: [
        {
          name: "dumara gadna",
          icon: "iconDuma.png",
          rank: "Silver III",
          rankedWins: "50",
          level: "103",
        },
        {
          name: "Hakuna Tomata",
          icon: "iconToma.png",
          rank: "Silver II",
          rankedWins: "41",
          level: "55",
        },
        {
          name: "opetLemi",
          icon: "iconLemi.png",
          rank: "Silver III",
          rankedWins: "32",
          level: "116",
        },
        {
          name: "Broqlin",
          icon: "iconBogdan.png",
          rank: "Unranked",
          rankedWins: "0",
          level: "257",
        },
        {
          name: "Luigi Vampa",
          icon: "iconPaka.png",
          rank: "Platinum IV",
          rankedWins: "52",
          level: "82",
        },
        {
          name: "Mr Drohan",
          icon: "iconAndro.png",
          rank: "Silver IV",
          rankedWins: "8",
          level: "48",
        },
        {
          name: "Visnja",
          icon: "iconVisnja.png",
          rank: "Gold IV",
          rankedWins: "21",
          level: "243",
        },
        {
          name: "Matke",
          icon: "iconMatke.png",
          rank: "Gold III",
          rankedWins: "89",
          level: "121",
        },
        {
          name: "Fapke",
          icon: "iconFapke.png",
          rank: "Silver III",
          rankedWins: "12",
          level: "68",
        },
        {
          name: "Bacak",
          icon: "iconBacak.png",
          rank: "Silver I",
          rankedWins: "78",
          level: "189",
        },
      ],
    };
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
      var playersCopy = this.players;
      this.shufflePlayers = this.shuffle(playersCopy);
      this.teamOne = this.shufflePlayers.slice(0, 5);
      console.log("teamOne", this.teamOne);
      console.log("teamTwo", this.teamTwo);
      this.teamTwo = this.shufflePlayers.slice(5, 10);
      this.generatedTeam = true;
    },
  },
};
</script>

<style lang="scss" scoped>
main {
  background: url("~@/static/cover3.jpeg") no-repeat center center scroll;
  height: 100vh;
  width: 100%;
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
  .overlay {
    position: relative;
    display: flex;
    flex-direction: column;
    flex: 1;
    width: 100%;
    height: 100%;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7));
    padding: 50px;

    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .heading {
        display: flex;
        gap: 20px;

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
    }

    .middle {
      padding-left: 20px;
      padding-top: 50px;
      display: flex;
      gap: 15px;

      .item {
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
      }

      &-left {
        width: 50%;
      }

      &-right {
        width: 50%;
      }
    }

    .bottom {
      padding-top: 30px;
      padding-left: 20px;
      display: flex;
      margin-top: auto;
      gap: 30px;
      &-chat {
        width: 33.33%;

        input {
          width: 100%;
          height: 38px;
          border-radius: 0;
          border: 2px solid #775928;
          background-color: #010a13;
          margin-top: 15px;
        }

        &__messages {
          padding-left: 20px;

          p {
            color: #4e4d4a;
            font-size: 14px;
            padding-top: 2px;
          }
        }
      }

      &-invites {
        width: 33.33%;
        &__players {
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

        p {
          padding-left: 20px;
          color: #a09b8c;
          font-size: 16px;
          padding-top: 10px;
        }

        &__heading {
          display: flex;
          justify-content: space-between;
          h6 {
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
