<script>
export default {
  name: 'Home',
  methods: {
    goToLogin() {
      this.$router.push({ name: 'Login' })  // 跳转到 Login 页
    }
  }
}
</script>

<template>
  <div class="home">
    <h2>欢迎来到主页面(成功版)</h2>
    <p>你已经成功登录！</p>
    <button @click="goToLogin">去登录</button>
  </div>
</template>

<style scoped>
</style>
