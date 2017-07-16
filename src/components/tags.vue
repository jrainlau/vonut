<template>
  <div class="tags">
    <div class="tags-wrapper">
      <transition name="list">
        <ul class="tags-wrapper-list" v-if="showTags">
          <li class="tags-wrapper-list-item" @click="selectTag(null)">All</li>
          <li v-for="(tag, key) in tags" :key="key" class="tags-wrapper-list-item" @click="selectTag(tag)">{{tag}}</li>
        </ul>
      </transition>
      <button class="tags-wrapper-btn" @click="onClick">
        <i class="fa" :class="iconName"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      showTags: false
    }
  },
  mounted () {
    document.addEventListener('click', (e) => {
      const target = e.target.className
      if (target !== 'tags-wrapper-list-item' && target !== 'tags-wrapper-btn' && target !== 'fa fa-bars') {
        this.showTags = false
      }
    })
  },
  computed: {
    ...mapGetters([
      'tags'
    ]),
    routeName () {
      return this.$route.path
    },
    iconName () {
      return this.routeName === '/' ? 'fa-bars' : 'fa-chevron-left'
    }
  },
  methods: {
    selectTag (tag) {
      this.$store.dispatch('selectTag', tag)
      this.showTags = !this.showTags
    },
    onClick () {
      if (this.routeName === '/') {
        this.showTags = !this.showTags
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@transition: all ease .3s;

.tags {
  position: fixed;
  right: 2vw;
  bottom: 100px;
  z-index: 9999;
  .tags-wrapper {
    position: relative;
    min-width: 120px;
    &-list {
      margin: 0;
      padding: 0;
      position: relative;
      bottom: 15px;
      list-style: none;
      &-item {
        width: 80px;
        padding: 5px 15px;
        margin-bottom: 5px;
        background: #fff;
        box-shadow: 0 3px 12px rgba(0, 0, 0, .1);
        transition: @transition;
        cursor: default;
        &:last-child {
          margin: 0;
        }
        &:hover {
          box-shadow: 0 6px 15px rgba(0, 0, 0, .2);
        }
        &:active {
          box-shadow: 0 9px 15px rgba(0, 0, 0, .3);
        }
      }
    }
    &-btn {
      background: #E53935;
      border: none;
      width: 60px;
      height: 60px;
      padding: 0;
      border-radius: 60px;
      text-align: center;
      outline: none;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -55px;
      box-shadow: 2px 3px 12px rgba(0, 0, 0, .1);
      transition: @transition;
      color: #fff;
      font-size: 24px;
      &:hover {
        box-shadow: 2px 6px 15px rgba(0, 0, 0, .2);
      }
      &:active {
        box-shadow: 2px 9px 15px rgba(0, 0, 0, .3);
      }
    }
  }
}
</style>

