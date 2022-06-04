<template>
  <div class="home-blog">
    <div class="hero" :style="{ ...bgImageStyle }">
      <div class="motto">
        <ModuleTransition>
          <img
            class="hero-img"
            v-if="recoShowModule && $frontmatter.heroImage"
            :style="heroImageStyle || {}"
            :src="$withBase($frontmatter.heroImage)"
            alt="hero"
          />
        </ModuleTransition>

        <ModuleTransition delay="0.04" duration="0.5">
          <h1 v-if="recoShowModule && $frontmatter.heroText !== null" class="longcang">
            {{ motto.zh || $frontmatter.heroText || $title || 'zealsay' }}
          </h1>
        </ModuleTransition>

        <ModuleTransition delay="0.08" duration="0.5">
          <p v-if="recoShowModule && $frontmatter.tagline !== null" class="description">
            {{ motto.en || $frontmatter.tagline || $description || 'Welcome to your zealsay site' }}
          </p>
        </ModuleTransition>

        <a href="#anchor" class="scroll-down bounce-enter-active down-arrow"></a>
      </div>
    </div>

    <ModuleTransition delay="0.16">
      <div id="anchor" v-show="recoShowModule" class="home-blog-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <note-abstract
            :data="$recoPosts"
            :currentPage="currentPage"></note-abstract>
          <!-- 分页 -->
          <pagation
            class="pagation"
            :total="$recoPosts.length"
            :currentPage="currentPage"
            @getCurrentPage="getCurrentPage"/>
        </div>
        <div class="info-wrapper">
          <PersonalInfo/>
          <h4><i class="iconfont reco-category"></i> {{homeBlogCfg.category}}</h4>
          <ul class="category-wrapper">
            <li class="category-item" v-for="(item, index) in this.$categories.list" :key="index">
              <router-link :to="item.path">
                <span class="category-name">{{ item.name }}</span>
                <span class="post-num" :style="{ 'backgroundColor': getOneColor() }">{{ item.pages.length }}</span>
              </router-link>
            </li>
          </ul>
          <hr>
          <h4 v-if="$tags.list.length !== 0"><i class="iconfont reco-tag"></i> {{homeBlogCfg.tag}}</h4>
          <TagList @getCurrentTag="getPagesByTags"/>
          <h4 v-if="$themeConfig.friendLink && $themeConfig.friendLink.length !== 0"><i
            class="iconfont reco-friend"></i> {{homeBlogCfg.friendLink}}</h4>
          <FriendLink/>
        </div>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="home-center" custom/>
    </ModuleTransition>
  </div>
</template>

<script>
  import TagList from '@theme/components/TagList'
  import FriendLink from '@theme/components/FriendLink'
  import NoteAbstract from '@theme/components/NoteAbstract'
  import pagination from '@theme/mixins/pagination'
  import ModuleTransition from '@theme/components/ModuleTransition'
  import PersonalInfo from '@theme/components/PersonalInfo'
  import {getOneColor} from '@theme/helpers/other'
  import moduleTransitonMixin from '@theme/mixins/moduleTransiton'
  import AOS from 'aos'

  export default {
    mixins: [pagination, moduleTransitonMixin],
    components: {NoteAbstract, TagList, FriendLink, ModuleTransition, PersonalInfo},
    data() {
      return {
        recoShow: false,
        currentPage: 1,
        tags: []
      }
    },
    computed: {
      homeBlogCfg() {
        return this.$recoLocales.homeBlog
      },
      actionLink() {
        const {
          actionLink: link,
          actionText: text
        } = this.$frontmatter

        return {
          link,
          text
        }
      },
      motto() {
        return this.$themeConfig.mottos[new Date().getDay()] || {
          "zh": "愿你保持初心和善良,笑里尽是温暖与坦荡。",
          "en": "May you keep your original heart and kindness, and smile with warmth and magnanimity."
        }
      },
      heroImageStyle() {
        return this.$frontmatter.heroImageStyle || {}
      },
      bgImageStyle() {
        //   const initBgImageStyle = {
        //     textAlign: 'center',
        //     overflow: 'hidden',
        //     background: `
        //       url(${this.$frontmatter.bgImage
        // ? this.$withBase(this.$frontmatter.bgImage)
        // : require('../images/bg.svg')}) center/cover no-repeat
        //     `
        //   }
        //   const {
        //     bgImageStyle
        //   } = this.$frontmatter
        //
        //   return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
      },
      heroHeight() {
        return document.querySelector('.hero').clientHeight
      }
    },
    mounted() {
      this.recoShow = true
      this._setPage(this._getStoragePage())
      AOS.init()
    },
    methods: {
      // 获取当前页码
      getCurrentPage(page) {
        this._setPage(page)
        setTimeout(() => {
          window.scrollTo(0, this.heroHeight)
        }, 100)
      },
      // 根据分类获取页面数据
      getPages() {
        let pages = this.$site.pages
        pages = pages.filter(item => {
          const {home, date} = item.frontmatter
          return !(home == true || date === undefined)
        })
        // reverse()是为了按时间最近排序排序
        this.pages = pages.length == 0 ? [] : pages
      },
      getPagesByTags(tagInfo) {
        this.$router.push({path: tagInfo.path})
      },
      _setPage(page) {
        this.currentPage = page
        this.$page.currentPage = page
        this._setStoragePage(page)
      },
      getOneColor
    }
  }
</script>

<style lang="stylus">
  .motto {
    text-align: center
    color: white
  }

  .home-blog {
    padding: 0
    margin: 0px auto

    .hero {
      // margin $navbarHeight auto 0
      // margin-top -3rem
      position relative
      box-sizing border-box
      padding 0 20px
      height 100vh
      display flex
      align-items center
      justify-content center

      .hero-img {
        max-width: 300px;
        margin: 0 auto 1.5rem
      }

      h1 {
        margin-top: 5rem;
        font-size: 2.5rem;
      }

      .description {
        margin: 1.8rem auto;
        font-size: 1.6rem;
        line-height: 1.3;
      }
    }

    .home-blog-wrapper {
      display flex
      align-items: flex-start;
      padding 5rem 3rem
      max-width $homePageWidth
      margin 0 auto

      .blog-list {
        flex auto
        width 0

        .abstract-wrapper {
          .abstract-item:last-child {
            margin-bottom: 0px;
          }
        }
      }

      .info-wrapper {
        position -webkit-sticky;
        position sticky;
        top 70px
        overflow hidden
        transition all .3s
        margin-left 15px
        flex 0 0 300px
        height auto
        box-shadow var(--box-shadow)
        border-radius $borderRadius
        box-sizing border-box
        padding 0 15px
        background var(--background-color)

        &:hover {
          box-shadow var(--box-shadow-hover)
        }

        h4 {
          color var(--text-color)
        }

        .category-wrapper {
          list-style none
          padding-left 0

          .category-item {
            margin-bottom .4rem
            padding: .4rem .8rem;
            transition: all .5s
            border-radius $borderRadius
            box-shadow var(--box-shadow)
            background-color var(--background-color)

            &:hover {
              transform scale(1.04)

              a {
                color $accentColor
              }
            }

            a {
              display flex
              justify-content: space-between
              color var(--text-color)

              .post-num {
                width 1.6rem;
                height 1.6rem
                text-align center
                line-height 1.6rem
                border-radius $borderRadius
                background #eee
                font-size 13px
                color #fff
              }
            }
          }
        }
      }
    }
  }

  @media (max-width: $MQMobile) {
    .home-blog {
      .hero {
        // height 450px

        img {
          max-height: 210px;
          margin: 2rem auto 1.2rem;
        }

        h1 {
          margin: 0 auto 1.8rem;
          font-size: 2rem;
        }

        .description {
          font-size: 1.2rem;
        }

        .action-button {
          font-size: 1rem;
          padding: 0.6rem 1.2rem;
        }
      }

      .home-blog-wrapper {
        display block !important
        padding 5rem 0

        .blog-list {
          width auto
        }

        .info-wrapper {
          // display none!important
          margin-left 0

          .personal-info-wrapper {
            display none
          }
        }
      }
    }
  }

  @media (max-width: $MQMobileNarrow) {
    .home-blog {
      .hero {
        // height 450px

        img {
          max-height: 210px;
          margin: 2rem auto 1.2rem;
        }

        h1 {
          margin: 0 auto 1.8rem;
          font-size: 2rem;
        }

        h1, .description, .action {
          // margin: 1.2rem auto;
        }

        .description {
          font-size: 1.2rem;
        }

        .action-button {
          font-size: 1rem;
          padding: 0.6rem 1.2rem;
        }
      }

      .home-blog-wrapper {
        display block !important
        padding 2rem 0;

        .blog-list {
          width auto
        }

        .info-wrapper {
          // display none!important
          margin-left 0

          .personal-info-wrapper {
            display none
          }
        }
      }
    }
  }

  .scroll-down {
    display: block;
    margin 12rem auto 0 auto;
    bottom: 45px;
    width: 34px;
    height: 34px;
    font-size: 34px;
    text-align: center;
  }

  .bounce-enter-active {
    animation: bounce-in 5s 3s infinite;
  }

  /*.bounce-leave-active {*/
  /*  animation: bounce-in 4s 2s reverse;*/
  /*}*/
  @keyframes bounce-in {
    0% {
      transform: translateY(0);
    }
    20% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    80% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(0);
    }
  }

  .down-arrow {
    width: 20px;
    height: 20px;
  }

  .down-arrow:after {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border-right: 3px solid #ffffff;
    border-top: 3px solid #ffffff;
    -webkit-transform: rotate(135deg); /*箭头方向可以自由切换角度*/
    transform: rotate(135deg);
  }
</style>
