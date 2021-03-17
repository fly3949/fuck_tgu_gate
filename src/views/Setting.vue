<template>
  <div class="setting">
    <van-nav-bar
      title="自我审批"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <van-form @submit="onSubmit">
      <van-field
        v-model="form.name"
        name="姓名"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="form.faculty"
        name="学院"
        label="学院"
        placeholder="学院"
        :rules="[{ required: true, message: '请填写学院' }]"
      />
      <van-field
        v-model="form.stuNum"
        name="学号"
        label="学号"
        placeholder="学号"
        :rules="[{ required: true, message: '请填写学号' }]"
      />
      <van-field name="uploader" label="上传照片 (3MB 内)" v-model="form.photo" :rules="[{ required: true, message: '请上传照片' }]">
        <template #input>
          <van-uploader v-model="fileList" max-count="1" max-size="3000000" :after-read="handleReadPhoto" />
        </template>
      </van-field>
      <van-field
        v-model="form.leaveTime"
        readonly
        clickable
        name="datetimePicker"
        label="出校时间"
        placeholder="点击选择出校时间"
        @click="showLeaveTimePicker = true"
        :rules="[{ required: true, message: '请选择出校时间' }]"
      />
      <van-field
        v-model="form.backTime"
        readonly
        clickable
        name="datetimePicker"
        label="返校时间"
        placeholder="点击选择返校时间"
        @click="showBackTimePicker = true"
        :rules="[{ required: true, message: '请选择出校时间' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          保存
        </van-button>
      </div>
    </van-form>

    <van-popup v-model:show="showLeaveTimePicker" position="bottom">
      <van-datetime-picker
        type="datetime"
        @confirm="handleConfirmLeaveTime"
        @cancel="showLeaveTimePicker = false"
        :min-date="new Date()"
      />
    </van-popup>
    <van-popup v-model:show="showBackTimePicker" position="bottom">
      <van-datetime-picker
        type="datetime"
        @confirm="handleConfirmBackTime"
        @cancel="showLeaveTimePicker = false"
        :min-date="new Date()"
      />
    </van-popup>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, Ref } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from '@/utils/dayjs'
import { useStore } from 'vuex'

const form = reactive({
  photo: '',
  name: '',
  faculty: '',
  stuNum: '',
  leaveTime: '',
  backTime: '',
  status: 0 // 每次保存都初始化出入校状态
})
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fileList : Ref<Array<any>> = ref([])

function usePicker () {
  const showLeaveTimePicker = ref(false)
  const showBackTimePicker = ref(false)

  function handleConfirmLeaveTime (value: Date) {
    form.leaveTime = dayjs(value).format('YYYY-MM-DD HH:mm')
    if (dayjs(form.backTime).isBefore(form.leaveTime)) {
      form.backTime = form.leaveTime
    }
    showLeaveTimePicker.value = false
  }

  function handleConfirmBackTime (value: Date) {
    form.backTime = dayjs(value).format('YYYY-MM-DD HH:mm')
    if (dayjs(form.leaveTime).isAfter(form.backTime)) {
      form.leaveTime = form.backTime
    }
    showBackTimePicker.value = false
  }

  return { showLeaveTimePicker, showBackTimePicker, handleConfirmLeaveTime, handleConfirmBackTime }
}

function useForm () {
  const router = useRouter()
  const store = useStore()

  function onSubmit () {
    console.log(form)
    store.commit('SET_INFO', form)
    router.push({ name: 'Home' })
  }

  function handleReadPhoto (res: {file: File; status: string; message: string; content: string}) {
    console.log(res)
    form.photo = res.content
  }

  return { onSubmit, handleReadPhoto }
}

export default defineComponent({
  setup () {
    const router = useRouter()
    const store = useStore()

    function onClickLeft () {
      router.back()
    }

    onMounted(() => {
      const info = store.state.info

      if (info) {
        form.photo = info.photo
        form.name = info.name
        form.faculty = info.faculty
        form.stuNum = info.stuNum
        form.leaveTime = info.leaveTime ? info.leaveTime : dayjs().format('YYYY-MM-DD HH:mm')
        form.backTime = info.backTime ? info.backTime : dayjs().format('YYYY-MM-DD HH:mm')
        if (form.photo) {
          fileList.value = [{ content: form.photo }]
        }
      }
    })

    return { ...usePicker(), ...useForm(), form, fileList, onClickLeft }
  }
})
</script>
