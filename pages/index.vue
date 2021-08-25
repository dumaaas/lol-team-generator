<template>
  <main class="main">
    <!-- Left part of page -->
    <section class="main-left">
      <div class="overlay">
        <!-- Top part -->
        <div class="top">
          <!-- Heading component -->
          <Heading :data="headingData" />
          <!-- Generate team button -->
          <div class="generate">
            <button type="submit" @click="generateTeam">GENERATE</button>
          </div>
        </div>
        <!-- Middle part -->
        <div class="middle">
          <!-- Teams -->
          <Team :team="teamOne" @open-stats="openStats"> TEAM 1 </Team>
          <Team :team="teamTwo" @open-stats="openStats"> TEAM 2 </Team>
        </div>
        <!-- Bottom part -->
        <div class="bottom">
          <!-- Chat component -->
          <Chat :players="players" />
          <!-- Invites component -->
          <Invites :players="players" />
          <!-- Spectators component -->
          <Spectators @open-modal="openModal" />
        </div>
      </div>
    </section>
    <!-- Right part of page -->
    <section class="main-right">
      <!-- TeamMembers component with players data -->
      <TeamMembers
        :players="players"
        :teamOne="teamOne"
        :teamTwo="teamTwo"
        :isButtonActive="isButtonActive"
        @add-to-team="addPlayerToTeam"
        @remove-from-team="removePlayerFromTeam"
      />
    </section>
    <!-- AnimatedPlayer component that appears when new player is added in team -->
    <AnimatedPlayer :newIcon="newIcon" :newName="newName" :newTeam="newTeam" />
    <!-- Modal component which is showing when we press 'New player' button -->
    <Modal
      v-if="showModal"
      @close-modal="closeModal"
      @new-player="addNewPlayer"
      :icons="icons"
    />
    <TeamStats v-if="showStats" @close-stats="closeStats" :team="teamStats" />
  </main>
</template>

<script>
import Modal from "@/components/Modal.vue";
import Team from "@/components/Team.vue";
import Heading from "@/components/Heading.vue";
import Chat from "@/components/Chat.vue";
import Invites from "@/components/Invites.vue";
import Spectators from "@/components/Spectators.vue";
import TeamMembers from "@/components/TeamMembers.vue";
import AnimatedPlayer from "@/components/AnimatedPlayer.vue";
import TeamStats from "@/components/TeamStats.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    Modal,
    Team,
    Heading,
    Chat,
    Invites,
    Spectators,
    TeamMembers,
    AnimatedPlayer,
    TeamStats,
  },
  data() {
    return {
      isButtonActive: true,
      newName: "",
      newIcon: "iconDuma.png",
      newTeam: "",
      showStats: false,
      showModal: false,
      playersCopy: [],
    };
  },
  computed: {
    ...mapState({
      players: (state) => state.players.players,
      icons: (state) => state.icons.icons,
      headingData: (state) => state.headingData.headingData,
      teamOne: (state) => state.teamOne.teamOne,
      teamTwo: (state) => state.teamTwo.teamTwo,
      teamStats: (state) => state.teamStats.teamStats,
    }),
    ...mapGetters({
      findIndexOne: (getters) => getters.teamOne.findIndex,
      findIndexTwo: (getters) => getters.teamTwo.findIndex,
    }),
  },
  methods: {
    // shuffle array
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
    // generate team 5v5
    generateTeam() {
      this.playersCopy = this.shuffle(this.players.map((o) => ({ ...o })));
      this.$store.commit("teamOne/setTeam", this.playersCopy.slice(0, 5));
      this.$store.commit("teamTwo/setTeam", this.playersCopy.slice(5, 10));
    },
    // add item to array and animate new player
    addToArray(array, item) {
      setTimeout(() => {
        this.$store.commit(array, item);
        var centerAnimation = document.getElementById("animationPlayer");
        centerAnimation.classList.remove("centerAnimation");
        centerAnimation.classList.add("hidden");
        this.isButtonActive = true;
      }, 2500);
    },
    // add player to random team
    addPlayerToTeam(id) {
      // disable all buttons
      this.isButtonActive = false;
      // make copy of players array
      this.playersCopy = this.players.map((o) => ({ ...o }));
      // find player that we want to add in new team
      var player = this.playersCopy.find((user) => user.id === id);
      // random teams
      var randomTeams = ["one", "two"];
      // get doc element for player animation
      var centerAnimation = document.getElementById("animationPlayer");
      // add properties for player animation
      this.newIcon = player.icon;
      this.newName = player.name;
      this.newTeam = "???";
      // pick a random team
      var randomTeam =
        randomTeams[Math.floor(Math.random() * randomTeams.length)];
      // declare random team to newTeam prop after 1.5s becouse of animation
      setTimeout(() => {
        this.newTeam = randomTeam;
      }, 1500);

      if (
        randomTeam === "one" &&
        this.teamOne.length < 5 &&
        !this.teamOne.find((user) => user.id === player.id) &&
        !this.teamTwo.find((user) => user.id === player.id)
      ) {
        this.addToArray("teamOne/addPlayer", player);
      } else if (
        this.teamTwo.length < 5 &&
        !this.teamTwo.find((user) => user.id === player.id) &&
        !this.teamOne.find((user) => user.id === player.id)
      ) {
        this.addToArray("teamTwo/addPlayer", player);
      }
      centerAnimation.classList.add("centerAnimation");
      centerAnimation.classList.remove("hidden");
    },
    // method for removing player from team
    removePlayerFromTeam(id) {
      if (this.teamOne.find((user) => user.id === id)) {
        let removeIndexOne = this.findIndexOne;
        if (removeIndexOne !== -1)
          this.$store.commit("teamOne/removePlayer", removeIndexOne);
      } else {
        let removeIndexTwo = this.findIndexTwo;
        if (removeIndexTwo !== -1)
          this.$store.commit("teamTwo/removePlayer", removeIndexTwo);
      }
    },
    // method for adding new player to players
    addNewPlayer(newPlayer) {
      this.$store.commit("players/addPlayer", newPlayer);
    },
    // method for closing modal
    closeModal() {
      this.showModal = false;
    },
    // method for opening modal
    openModal() {
      this.showModal = true;
    },
    // method for openings stats
    openStats(team) {
      if (!team.length) return;
      this.$store.commit("teamStats/setTeam", team);
      this.showStats = true;
    },
    // method for closing stats
    closeStats() {
      this.showStats = false;
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

      @include breakpoint($xs) {
        padding: 20px;
      }
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        @include breakpoint($xs-to-md) {
          flex-direction: column;
          gap: 20px;
          align-items: flex-start;
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
  }
}
</style>
