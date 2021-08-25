<template>
  <div>
    <div class="heading">
      <div class="heading-left">
        <img src="@/static/logo.png" alt="logo" width="40px" />
      </div>
      <div class="heading-right">
        <div>
          <h1 v-once>{{ data.title }}</h1>
        </div>
        <div>
          <p>{{ data.map }}</p>
          <p class="square"></p>
          <p>{{ data.mode }}</p>
          <p class="square"></p>
          <p>{{ data.pick }}</p>
        </div>
        <div class="heading-icons">
          <span> <fa :icon="['fab', 'bandcamp']" /> </span>
          <span> <fa :icon="['fas', 'broom']" /> </span>
          <span> <fa :icon="['fas', 'fire']" /> </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Object,
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/abstracts/_mixins.scss";

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

    @include breakpoint($xs) {
      padding-left: 0px;
    }
  }

  &-left {
    padding-top: 5px;
  }
  &-right {
    div:nth-child(2) {
      display: flex;
      gap: 15px;
      @include breakpoint($xs) {
        flex-direction: column;
        gap: 5px;
      }
      p {
        color: #919b8c !important;
      }

      .square {
        margin-top: 6px;
        width: 5px;
        height: 5px;
        background: #919b8c;
        transform: rotate(45deg);
        @include breakpoint($xs) {
          display: none;
        }
      }
    }
    h1 {
      color: #e1e3d2;
      text-transform: uppercase;
    }
    span {
      color: #464a43;
    }
  }
}
</style>