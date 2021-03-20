<template>
  <div class="content" v-if="info" :class="{['no-photo']: !((state == 'pass' || state == 'out') && info.photo)}">
    <div class="con">
      <div class="pic"><img v-if="(state == 'pass' || state == 'out') && info.photo" id="zpimg" :src="info.photo"></div>
      <div class="title name">姓名：<span name="xm">{{info.name}}</span></div>
      <div class="title xy">学院：<span name="xy">{{info.faculty}}</span></div>
      <div class="title xh">学号：<span name="gh">{{info.stuNum}}</span></div>
      <div class="title starttime" v-if="state != 'forbidden'">出发时间：<span name="qjkssj">{{info.leaveTime}}</span></div>
      <div class="title endtime" v-if="state != 'forbidden'">返回时间：<span name="qjjssj">{{info.backTime}}</span></div>
      <div class="title sk">现在时刻：<span name="sj" style="color:red">{{nowTime}}</span></div>
      <div class="statues" id='cx_btn' v-if="state == 'pass'" @click="handleOutSchool">我要出校</div>
      <div class="statues" id='jx_btn' v-if="state == 'out'" @click="handleEnterSchool">我要回校</div>
      <div class="und" id="jzlogo" v-if="state == 'forbidden'"><img src="@/assets/und.png"></div>
      <div class="undtitle" v-if="state == 'forbidden'">暂无出校权限</div>
      <div class="undtext" v-if="state == 'forbidden'">
        <p><span class="num">1.</span><span class="text">请您去学生外出报备申请中进行出校申请。</span></p>
        <p><span class="num">2.</span><span class="text">使用过程中如出现误点请联系辅导员进行沟通。</span></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, PropType } from 'vue'
import { IForm } from '@/types/form'
import dayjs from '@/utils/dayjs'

export default defineComponent({
  props: {
    state: {
      type: String as PropType<'forbidden' | 'pass' | 'out'>,
      default: 'forbidden'
    }
  },
  emits: ['out', 'enter'],
  setup (props, { emit }) {
    const info : undefined | IForm = inject('info')

    const nowTime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

    setInterval(() => {
      nowTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }, 1000)

    function handleOutSchool () {
      emit('out')
    }

    function handleEnterSchool () {
      emit('enter')
    }

    return { info, nowTime, handleOutSchool, handleEnterSchool }
  }
})
</script>

<style lang="scss" scoped>
.content {
  padding: 0 46px 122px 46px;
  position: relative;
  margin: 0 28px;

  &.no-photo {
    &:before {
      top: 0;
    }
  }

  &:before {
    position: absolute;
    background: #fff;
    content: "";
    left: 0;
    right: 0;
    top: 97px;
    bottom: 5px;
    border-radius: 25px;
    box-shadow: 0 0 6px #9f9f9f;
  }

  .con {
    position: relative;
    z-index: 3;
  }

  .pic {
    text-align: center;
    width: 100%;
    margin-bottom: 17px;

    #zpimg {
      width: 60%;
      max-width: 150px;
      border-radius: 25px;
    }
  }

  .title {
    font-size: 26px;
    color: #3b3b3b;
    line-height: 69px;
    border-bottom: 1px solid #e3e3e3;
  }

  .und {
    text-align: center;
    margin: 30px 0 15px;
  }

  .undtitle {
    padding-left: 42px;
    background: url("../assets/wr.png") no-repeat left center;
    font-size: 22px;
    line-height: 30px;
    color: #e03636;
  }

  .undtext {
    font-size: 22px;
    line-height: 36px;
    color: #454545;
    margin-top: 17px;

    p {
      margin-top: 12px;
    }

    span {
      display: inline-block;
      vertical-align: top;

      &.num {
        width: 5%;
      }

      &.text {
        width: 95%;
      }
    }
  }

  .statues {
    width: 235px;
    height: 72px;
    line-height: 73px;
    text-align: center;
    border-radius: 36px;
    color: #fff;
    margin: 76px auto 0;
    font-size: 28px;

    &#cx_btn {
      background: #4daa40;
    }

    &#jx_btn {
      background: #e03636;
    }
  }
}

@media screen and (max-width: 479px) {
  .content {
    overflow: hidden;
    padding: 0 20px 50px;

    .undtitle {
      font-size: 14px;
    }
    .undtext {
      font-size: 14px;
    }
    .title {
      font-size: 13px;
      line-height: 49px;
    }
    .statues {
      margin-top: 40px;
      width: 70%;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      margin-top: 40px;
      width: 70%;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
    }
  }
}
</style>
