<template>
  <div id="vonut" class="vonut">
    <nav class="vonut-nav" :class="{'hide': !showNav}">
      <span>Vonut</span>
      <span @click="githubLink"><i class="fa fa-github"></i></span>
    </nav>
    <main class="vonut-main">
      <transition :name="transitionName">
        <router-view class="vonut-main-view"></router-view>
      </transition>
    </main>
    <section class="vonut-tags">
      <tags></tags>
    </section>
  </div>
</template>

<script>
import tags from '~components/tags'

export default {
  data () {
    return {
      nav: false,
      transitionName: '',
      showNav: true
    }
  },
  watch: {
    $route (to, from) {
      to.path === '/' ? this.transitionName = 'slide-left' : this.transitionName = 'slide-right'
    }
  },
  mounted () {
    this.$store.dispatch('getArticles')
    const body = document.body
    body.onscroll = (e) => {
      if (body.scrollTop > 40) {
        this.showNav = false
      } else {
        this.showNav = true
      }
    }
  },
  methods: {
    showNav () {
      this.nav = !this.nav
    },
    githubLink () {
      window.location.href = 'https://github.com/jrainlau/vonut'
    }
  },
  components: {
    tags
  }
}
</script>

<style lang="less">
@transition: all ease .4s;
@import '~assets/style.less';
@import '~assets/markdown.less';
@import '~assets/transition.less';

.vonut {
  position: relative;
  min-height: 100%;
  overflow: scroll;
  padding-top: 40px;
  &-nav {
    position: fixed;
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
    transition: all ease .3s;
    .fa {
      font-size: 18px;
    }
    &.hide {
      transform: translateY(-40px);
    }
  }
  &-main {
    position: relative;
    max-width: 1024px;
    margin: 0 auto;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    &-view {
      transition: all ease .5s;
    }
    &> section {
      background: #fff;
      width: 100%;
      margin-top: 15px;
      padding: 15px;
      box-sizing: border-box;
      box-shadow: 0 3px 12px rgba(0, 0, 0, .3);
      p:first-child {
        display: none;
      }
      img {
        max-width: 100%;
      }
    }
  }
  &-tags {
    position: fixed;
    right: 2vw;
    bottom: 100px;
    z-index: 9999;
  }
}
</style>
