<template>
  <div class="home">
    <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
import { getDictByType } from '@/common/api/index'
export default {
  name: 'Home',
  components: {},
  created() {
    getDictByType('1').then((res) => {
      console.log(res)
    })
  },
}
</script>
