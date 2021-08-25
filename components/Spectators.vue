<template>
  <div class="bottom-spec">
    <div class="bottom-spec__heading">
      <h6>SPECTATORS (0/4)</h6>
      <button type="submit" id="show-modal" @click="$emit('open-modal')">
        New player
      </button>
    </div>
    <div class="bottom-spec__players">
      <p>No spectators</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/abstracts/_mixins.scss";

.bottom-spec {
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
</style>