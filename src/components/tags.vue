<template>
  <div class="tags">
    <transition name="list">
       <ul class="tags-list" v-if="showTags">
        <li class="tags-list-item" @click="selectTag(null)">All</li>
        <li v-for="(tag, key) in tags" :key="key" class="tags-list-item" @click="selectTag(tag)">{{tag}}</li>
      </ul>
    </transition>
    <button class="tags-btn" @click="onClick">{{btnContent}}</button>
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
      if (e.target.className !== 'tags-list-item' && e.target.className !== 'tags-btn') {
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
    btnContent () {
      return this.routeName === '/' ? '+' : '<'
    }
  },
  methods: {
    selectTag (tag) {
      this.$store.dispatch('selectTag', tag).then(() => {
        this.showTags = !this.showTags
        this.$emit('select')
      })
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
      margin-bottom: 15px;
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
    width: 55px;
    height: 55px;
    border-radius: 100%;
    outline: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -55px;
    box-shadow: 2px 3px 12px rgba(0, 0, 0, .1);
    transition: @transition;
    color: #fff;
    font-size: 26px;
    &:hover {
      box-shadow: 2px 6px 15px rgba(0, 0, 0, .2);
    }
    &:active {
      box-shadow: 2px 9px 15px rgba(0, 0, 0, .3);
    }
  }
}
</style>

