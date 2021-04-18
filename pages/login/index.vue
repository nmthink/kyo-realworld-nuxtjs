<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sigin in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="isLogin" to="/register">need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">{{ field }} {{ message }}</li>
            </template>

            
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input v-model="user.username"  class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" required minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sigin in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name:'LoginIndex',
  middleware: 'noAuthenticated',
  data() {
    return {
      "user":{
        "username": "",
        "email": "",
        "password": ""
      },
      errors: {}
    }
  },
  computed: {
    isLogin() {
      return this.$route.name === 'login'
    }
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = this.isLogin ? await login({
         user: this.user
        })
        : await register({
         user: this.user
        }) 
        // 保存用户登录状态
        this.$store.commit('setUser', data.user)
        // 数据持久化
        Cookie.set('user', data.user)
        // 跳转到首页
        this.$router.push('/')
      } catch (error) {
        console.dir(error);
        this.errors = error.response.data.errors
        console.log(this.errors);
      }
    }
  }
}
</script>

<style>

</style>