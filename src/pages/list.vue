<template>
  <div class="list">
    <ul class="list-wrapper">
      <transition-group name="list">
        <li
          v-for="(item, key) in shownArticles"
          :key="key"
          @click="$router.push(`/${shownArticles[key].name.replace(/\.md/, '')}`)">
          <section class="head">
            <img v-if="item.cover" :src="require(`~articles/imgs/${item.cover}`)" alt="">
            <h1>{{item.title}}</h1>
          </section>
          <section class="desc">{{item.desc}}</section>
          <section class="info">
            <div>{{item.date}}</div>
            <div class="tags">
              <span v-for="tag in item.tags">{{tag}}</span>
            </div>
          </section>
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'shownArticles'
    ])
  },
  mounted () {
    this.$store.dispatch('getArticles')
  }
}
</script>

<style lang="less" scoped>
@transition: all ease .3s;

.list-enter-active,
.list-leave-active {
  transition: all, .5s;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}

.list {
  margin: 0 auto;
  width: 100%;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  &-wrapper {
    margin-top: 10px;
    padding: 0 10px;
    list-style: none;
    li {
      background: #fff;
      margin-bottom: 15px;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 3px 12px rgba(0, 0, 0, .1);
      transition: @transition;
      &:hover {
        box-shadow: 0 6px 15px rgba(0, 0, 0, .2);
      }
      &:active {
        box-shadow: 0 9px 15px rgba(0, 0, 0, .3);
      }
      .head {
        position: relative;
        height: 240px;
        &:after {
          content: '';
          display: block;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background: rgba(0, 0, 0, .3);
          z-index: 15;
        }
        img {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 10;
        }
        h1 {
          position: absolute;
          left: 15px;
          bottom: 15px;
          margin: 0;
          z-index: 20;
          color: #fff;
          font-size: 32px;
        }
      }
      .desc {
        position: relative;
        padding: 15px;
        border-bottom: 1px solid #eee;
        max-height: 130px;
        overflow: hidden;
        &:after {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 15px;
          background: #fff;
          right: 0;
          left: 0;
          bottom: 0;
        }
      }
      .info {
        padding: 15px;
        font-size: 12px;
        color: #9E9E9E;
        display: flex;
        justify-content: space-between;
        .tags {
          span {
            padding: 2px 10px;
            margin-left: 10px;
            border: 1px solid #eee;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
