<template>
  <div class="hidden" id="animationPlayer">
    <div class="animation-player">
      <img :src="require(`@/static/${newIcon}`)" />
      <div class="name">
        <p>{{ newName }} goes to team {{ newTeam }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        newIcon: String,
        newName: String, 
        newTeam: String
    }
};
</script>

<style lang="scss" scoped>
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