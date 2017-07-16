<template>
  <nav class="nav" :class="{'hide': !showNav}">
    <h3>Vonut</h3>
    <i @click="githubLink" class="fa fa-github"></i>
  </nav>
</template>

<script>
export default {
  props: [
    'showNav'
  ],
  methods: {
    githubLink () {
      window.location.href = 'https://github.com/jrainlau/vonut'
    }
  }
}
</script>

<style lang="less">
.nav {
  position: absolute;
  top: 0;
  height: 40px;
  line-height: 40px;
  width: 100%;
  background: #5E35B1;
  padding: 0 15px;
  box-sizing: border-box;
  color: #fff;
  z-index: 9000;
  box-shadow: 0 3px 12px rgba(0, 0, 0, .3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all ease .3s;
  h3 {
    margin: 0;
  }
  .fa {
    font-size: 24px;
  }
  &.hide {
    transform: translateY(-40px);
  }
}
</style>
