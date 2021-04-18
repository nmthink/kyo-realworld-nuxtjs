<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }"><img :src="article.author.image" /></nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">{{article.author.username}}</nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>
    <!-- 自己就是文章发表人 显示编译与删除按钮-->
    <nuxt-link v-if="article.author.username === vuexUser.username"
      :to="{
        name: 'editor',
        params: {
          slug: article.slug
        }
      }"
      class="btn btn-sm btn-outline-secondary">
      <i class="ion-edit"></i>
      &nbsp;
      Edit Article
    </nuxt-link>
    <button v-if="article.author.username === vuexUser.username"
      @click="onDelete(article)"
      :disabled="article.disabled"
      class="btn btn-sm btn-outline-danger">
      <i class="ion-trash-a"></i>
      &nbsp;
      Delete Article
    </button>

    <button v-if="article.author.username !== vuexUser.username" class="btn btn-sm btn-outline-secondary" @click="onFollow(article)"
      :class="{
        active: article.author.following
      }"
      :disabled="article.author.disabled"
    >
      <i class="ion-plus-round"></i>
      &nbsp;
      {{ article.author.following ? `unFollow ${article.author.username}` : `Follow ${article.author.username}`  }}
    </button>
    &nbsp;&nbsp;
    <button v-if="article.author.username !== vuexUser.username" class="btn btn-sm btn-outline-primary" @click="onFavorite(article)"
      :class="{
          active: article.favorited
      }"
      :disabled="article.disabled"
      >
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{article.favoritesCount}})</span>
    </button>


  </div>
</template>

<script>
import { mapState } from 'vuex'
import { addFavorite, deleteFavorite, deleteArticle } from '@/api/article'
import { followUser, unFollowUser } from '@/api/profile'
export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState({vuexUser: state=>state.user})
  },
  methods: {
    async onDelete(article) {
      article.disabled = true
      await deleteArticle(article.slug)
      this.$router.push('/')
    },

    async onFollow (article) {
      article.author.disabled = true
      if (article.author.following) {
        await unFollowUser(article.author.username)
        article.author.following = false
      } else {
        await followUser(article.author.username)
        article.author.following = true
      }
      article.author.disabled = false
    },
    async onFavorite (article) {
      article.disabled = true
      if (article.favorited) {
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      } else {
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
      article.disabled = false
    }
  }
}
</script>

<style>

</style>