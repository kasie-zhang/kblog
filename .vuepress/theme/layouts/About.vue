<template>
  <!-- 公共布局 -->
  <Common :sidebar="false">
    <div class="container">

      <div class="author-social">
        <ModuleTransition delay="0.04" duration="0.5">
          <img
              class="personal-img"
              v-if="recoShowModule || $themeConfig.authorAvatar"
              :src="$withBase($themeConfig.authorAvatar)"
              alt="author-avatar"
          >
        </ModuleTransition>

        <ModuleTransition delay="0.04" duration="0.5">
          <div v-if="recoShowModule" class="socials">
            <a v-if="socials.github" :href="socials.github" title="github" target="_blank"><i
                class="iconfont big reco-github black"></i></a>
            <a v-if="socials.gitlab" :href="socials.gitlab" title="gitlab" target="_blank"><i
                class="iconfont big reco-gitlab coral"></i></a>
            <a v-if="socials.gitee" :href="socials.gitee" title="gitee" target="_blank"><i
                class="iconfont big reco-mayun crimson"></i></a>
            <a v-if="socials.jianshu" :href="socials.jianshu" title="简书" target="_blank"><i
                class="iconfont big reco-jianshu indianred"></i></a>
            <a v-if="socials.zhihu" :href="socials.zhihu" title="知乎" target="_blank"><i
                class="iconfont big reco-zhihu lightskyblue"></i></a>
            <a v-if="socials.toutiao" :href="socials.toutiao" title="头条" target="_blank"><i
                class="iconfont big reco-toutiao lightsalmon"></i></a>
            <a v-if="socials.juejin" :href="socials.juejin" title="掘金" target="_blank"><i
                class="iconfont big reco-juejin dodgerblue"></i></a>
            <a v-if="socials.segmentfault" :href="socials.segmentfault" title="思否" target="_blank"><i
                class="iconfont big reco-sf forestgreen"></i></a>
            <a v-if="socials.csdn" :href="socials.csdn" title="CSDN" target="_blank"><i
                class="iconfont big reco-csdn indianred"></i></a>
            <a v-if="socials.wechat" :href="socials.wechat" title="微信" target="_blank"><i
                class="iconfont big reco-wechat forestgreen"></i></a>
            <a v-if="socials.qq" :href="socials.qq" title="QQ" target="_blank"><i
                class="iconfont big reco-qq lightskyblue"></i></a>
            <h1 class="longcang">{{ $themeConfig.info }}</h1>
          </div>
        </ModuleTransition>
      </div>

    </div>
  </Common>
</template>

<script>
import Common from '@theme/components/Common'
import ModuleTransition from '@theme/components/ModuleTransition'
import moduleTransitonMixin from '@theme/mixins/moduleTransiton'


export default {
  name: 'About',
  mixins: [moduleTransitonMixin],
  components: {Common, ModuleTransition},

  computed: {
    socials() {
      return this.$themeConfig.socials
    }
  },


  methods: {},

  watch: {}
}
</script>

<style src="../styles/theme.styl" lang="stylus"></style>

<style lang="stylus" scoped>
@require '../styles/mode.styl'
.grey
  color grey

.orange
  color orange

.green
  color green

.blue
  color deepskyblue

.pink
  color pink

.dgreen
  color forestgreen

.black
  color black

.coral
  color coral

.crimson
  color crimson

.indianred
  color indianred

.lightskyblue
  color lightskyblue

.lightsalmon
  color lightsalmon

.dodgerblue
  color dodgerblue

.forestgreen
  color forestgreen


.author-social
  position relative;
  display: flex;
  height 100vh;
  flex-direction: column;
  text-align: center;
  margin-top -23rem

  .personal-img
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    margin: 8rem auto;

  .socials
    margin 3rem 0

    h1
      margin 3rem 0

    .big
      font-size x-large
      margin 0 .5rem

.scroll-down {
  display: block;
  margin 0 auto;
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
  border-right: 3px solid #3eaf7c;
  border-top: 3px solid #3eaf7c;
  -webkit-transform: rotate(135deg); /*箭头方向可以自由切换角度*/
  transform: rotate(135deg);
}

.body {
  overflow: hidden;
  margin 0;
  padding: 0;
  background: linear-gradient(90deg, #addfff, #fff9e8);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: relative;
}

.body::after {
  position: absolute;
  width: 100%;
  content: '';
  height: calc(100% - 600px);
  z-index: 0;
  background: #efefef;
  bottom: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes off {
  to {
    transform: rotate(380deg);
  }
}

@keyframes off2 {
  to {
    transform: rotate(880deg);
  }
}

@keyframes fly {
  to {
    margin-top: 50px;
  }
}

span {
  display: block;
}

.windows {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

.window {
  flex: 1 20%;
  box-sizing: border-box;
  height: 300px;
  position: relative;
  border: 10px inset rgba(51, 51, 51, 0.2);
}

.window::after {
  position: absolute;
  height: 60%;
  width: 1px;
  border-radius: 10px;
  background: linear-gradient(
      to top,
      #0f80c7 20%,
      transparent 30%,
      transparent 50%,
      #3f7ba0 100%
  );
  opacity: 1;
  z-index: 5;
  top: 30px;
  left: 50%;
  transform: rotate(45deg);
  display: block;
  content: '';
}

.window::before {
  position: absolute;
  height: 40%;
  width: 1px;
  border-radius: 10px;
  background: linear-gradient(
      to top,
      #0f80c7 20%,
      transparent 10%,
      transparent 50%,
      #addfff 100%
  );
  opacity: 1;
  z-index: 5;
  top: 100px;
  left: 60%;
  transform: rotate(45deg);
  display: block;
  content: '';
}

.window:nth-child(5n - 3)::after,
.window:nth-child(5n - 3)::before {
  opacity: 0.8 !important;
}

.window:nth-child(5n - 2)::after,
.window:nth-child(5n - 2)::before {
  opacity: 0.4 !important;
}

.window:nth-child(5n - 1)::after,
.window:nth-child(5n -1)::before {
  opacity: 0.3 !important;
}

.window:nth-child(5n)::after,
.window:nth-child(5n)::before {
  opacity: 0.2 !important;
}

.fly {
  transition: 0.5s all cubic-bezier(0.04, 0.06, 0, 1.18), 1s transform;
  width: 10px;
  height: 6px;
  background: green;
  border-radius: 50%;
  position: absolute;
  animation: fly 5s alternate infinite ease-in-out;
}

.fly:nth-of-type(1) {
  top: -78px;
  left: -200px;
}

.fly:nth-of-type(2) {
  transform: translateY(-10px);
  animation-delay: 4s;
  top: 5px;
  right: -250px;
}

.fly:nth-of-type(3) {
  transform: translateY(0px);
  top: 400px;
  animation-delay: 2s;
  right: -400px;
}

.fly::after,
.fly::before {
  content: '';
  position: absolute;
  width: 7px;
  height: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  display: block;
  border-radius: 50%;
}

.fly::before {
  bottom: 4px;
  transform: rotate(325deg);
  left: 3px;
}

.fly::after {
  transform: rotate(45deg);
  bottom: 6px;
}

.fan {
  width: 500px;
  height: 500px;
  position: relative;
  z-index: 1;
  margin-top: 75px;
  perspective: 500px;
}

.fan::after {
  content: '';
  display: block;
  position: absolute;
  height: 364px;
  width: 200px;
  background: rgba(0, 0, 0, 0.08);
  top: calc(100% - 24px);
  left: calc(50% - 100px);
  z-index: -1;
  transform: rotateX(104deg) rotateY(-1deg) rotate(25deg);
  transform-origin: top;
}

.fan__root {
  width: 200px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.fan__root .top {
  overflow: hidden;
  width: 200px;
  height: 25px;
  position: relative;
}

.fan__root .top::after {
  content: '';
  display: block;
  width: 200px;
  height: 50px;
  background: #2f423f;
  border-radius: 50%;
}

.fan__root .top .red {
  position: absolute;
  width: 30px;
  height: 15px;
  border-radius: 15px;
  display: block;
  right: 30px;
  background: #f15249;
  cursor: pointer;
  overflow: hidden;
}

.fan__root .top .green {
  position: absolute;
  width: 30px;
  height: 15px;
  border-radius: 15px;
  display: block;
  right: 85px;
  background: #32ba7c;
  cursor: pointer;
  overflow: hidden;
}

.fan__root .top .green::after {
  content: '';
  display: block;
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  background: #0aa06e;
}

.fan__root .top .red::after {
  content: '';
  display: block;
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  background: #a00000;
}

.fan__root .top .blue {
  position: absolute;
  cursor: pointer;
  width: 30px;
  height: 15px;
  border-radius: 15px;
  display: block;
  left: 30px;
  background: #3ac2f2;
  overflow: hidden;
}

.fan__root .top .blue::after {
  content: '';
  display: block;
  width: 100%;
  height: 50%;
  position: absolute;
  bottom: 0;
  background: #009cc6;
}

.fan__root .bottom {
  overflow: hidden;
  width: 200px;
  height: 20px;
}

.fan__root .bottom::after {
  content: '';
  display: block;
  width: 200px;
  height: 40px;
  background: #2f423f;
  border-radius: 18%;
  transform: translateY(-30px);
}

.fan__staddle {
  z-index -1
  position: absolute;
  bottom: 45px;
  background: #2f423f;
  height: 270px;
  width: 13px;
  left: 50%;
  transform: translateX(-50%);
}

.fan__engine {
  z-index: -1;
  position: absolute;
  bottom: 0px;
  width: 130px;
  height: 130px;
  background: #2f423f;
  border-radius: 50%;
  left: 50%;
  transform: translateX(-50%);
}

.fan__engine::after {
  content: '';
  background: #2f423f;
  display: block;
  width: 25px;
  height: 50px;
  position: absolute;
  top: 105px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 0 0 5px 5px;
}

.fan__blades {
  z-index: -1;
  width: 230px;
  height: 230px;
  position: absolute;
  bottom: -50px;
  transition: 2s;
  transform-origin: center center;
  left: calc(50% - 115px);
  z-index: 1;
  animation: spin infinite 0.38s linear forwards;
}

.fan__blades .fan__blades {
  bottom: 0;
  animation: spin infinite 0.5s linear forwards;
}

.fan__blades .blade {
  position: absolute;
  width: 50px;
  height: 100%;
  left: 50%;
  transform: translateX(-50%) skewY(25deg);
  perspective: 500px;
  transform-style: preserve-3d;
}

.fan__blades .blade:nth-child(2) {
  transform: translateX(-50%) rotate(90deg) skewY(25deg);
}

.fan__blades .blade:nth-child(3) {
  transform: translateX(-50%) rotate(180deg) skewY(25deg);
}

.fan__blades .blade:nth-child(4) {
  transform: translateX(-50%) rotate(270deg) skewY(25deg);
}

.fan__blades .blade span {
  width: 100%;
  height: 200%;
  border-radius: 44px;
  background: #ffc114;
  position: absolute;
  top: -66px;
  display: block;
  transform-style: preserve-3d;
  transform: rotateX(81deg);
  overflow: hidden;
}

.fan__blades .blade span::after {
  width: 50%;
  height: 100%;
  content: '';
  display: block;
  background: #fca12a;
  transform: rotate(0deg);
}

.fan__blades .center {
  position: absolute;
  overflow: hidden;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background: #32ba7c;
  z-index: 2;
}

.fan__blades .center::after {
  display: block;
  content: '';
  width: 40px;
  height: 20px;
  background: #0aa06e;
}

.head {
  transition: 1s transform;
  height: auto;
  width: auto;
  position: absolute;
  width: 300px;
  height: 300px;
  bottom: 195px;
  left: calc(50% - 150px);
  /* transform: translateX(-50%);
     */
}

#engine:checked + div > div {
  animation: off2 1s ease-out forwards;
}

#engine:checked + div > span:nth-child(1) {
  transition: 5s all ease-in-out, 1s transform;
  left: 0px;
  top: 0px;
}

#engine:checked + div > span:nth-child(2) {
  transition: 5s all ease-in-out, 1s transform;
  right: 0px;
  top: 0px;
}

#engine:checked + div > span:nth-child(3) {
  transition: 7s all ease-in-out, 1s transform;
  right: -50px;
  top: 200px;
}

#engine2:checked + div {
  animation: off 1s ease-out forwards;
}

#jack:checked + div {
  transform: translateY(-115px);
}

#jack:checked + div > div:nth-child(3) > span {
  transform: translateY(115px);
}

@media screen and (max-width: 900px) {
  .window {
    flex: 1 25% !important;
  }
}

@media screen and (max-width: 800px) {
  .window {
    flex: 1 33.3333333% !important;
  }
}

@media screen and (max-width: 700px) {
  .window {
    flex: 1 50% !important;
  }
}

@media (max-width: $MQMobile)
  .tag-wrapper
    padding: 4.6rem 1rem 0;

  .body
    display none

  .scroll-down
    display none
</style>
