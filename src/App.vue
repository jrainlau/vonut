<template>
  <div id="vonut" class="vonut">
    <navigator :showNav="showNav"></navigator>
    <main class="vonut-main">
      <transition :name="transitionName">
        <router-view class="vonut-main-view"></router-view>
      </transition>
    </main>
    <tags></tags>
  </div>
</template>

<script>
import navigator from '~components/navigator'
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
    const body = document.body
    body.onscroll = () => {
      if (body.scrollTop > 40) {
        this.showNav = false
      } else {
        this.showNav = true
      }
    }
  },
  components: {
    navigator,
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
}
</style>
