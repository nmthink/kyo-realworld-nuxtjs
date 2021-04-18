<template>
  <div class="settings-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Your Settings</h1>

        <form @submit.prevent="onSubmit">
          <fieldset>
              <fieldset class="form-group">
                <input class="form-control" type="text" placeholder="URL of profile picture" v-model="user.image">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
              </fieldset>
              <fieldset class="form-group">
                <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="user.bio"></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
              </fieldset>
              <fieldset class="form-group">
                <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" required minlength="8">
              </fieldset>
              <button class="btn btn-lg btn-primary pull-xs-right">
                Update Settings
              </button>
          </fieldset>
        </form>
        <hr>
        <button class="btn btn-outline-danger" @click="onLogout">
          Or click here to logout.
        </button>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { update } from '@/api/user'
import { mapState } from 'vuex'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: 'SettingsIndex',
  middleware: 'authenticated',
  data () {
    return {
      user: {
        image: '',
        bio: '',
        email: '',
        username: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState({vuexUser: state=>state.user})
  },
  mounted() {
    // const { user } = this.$store.state
    this.user = {...this.user, ...this.vuexUser}
  },
  methods: {
    async onSubmit () {
      const {data} = await update({
        user: this.user
      })
      // 刚更新的信息返回，更新相应的vuex与cookie
      Cookie.set('user', data.user)
      this.$store.commit('setUser', data.user)
      this.$router.push(`/profile/${this.$store.state.user.username}`)
    },
    async onLogout() {
      this.$store.commit('setUser', null)
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>