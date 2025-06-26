<template>
  <div class="login">
    <h2>登录</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">用户名：</label>
        <input type="text" v-model="username" id="username" />
      </div>
      <div>
        <label for="password">密码：</label>
        <input type="password" v-model="password" id="password" />
      </div>
      <button type="submit">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin() {
      if (this.username === 'admin' && this.password === '1234') {
        this.$router.push('/home');
      } else {
        alert('用户名或密码错误');
      }
    }
  }
}
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  text-align: center;
}

input {
  width: 100%;
  padding: 8px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
}

button:hover {
  background-color: #218838;
}
</style>
