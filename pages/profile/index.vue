<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>
              {{profile.bio}}
            </p>
            <nuxt-link v-if="profile.username === vuexUser.username"
             class="btn btn-sm btn-outline-secondary action-btn"
             to="/settings"
             >
              <i class="ion-gear-a"></i>
              &nbsp;
              Edit Profile Settings 
            </nuxt-link>
            <button v-else class="btn btn-sm btn-outline-secondary action-btn">
              <i class="ion-plus-round"></i>
              &nbsp;
              {{profile.following ? `Follow ${profile.username}` : `UnFollow ${profile.username}` }}
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link"
                :class="{
                  active: tab === 'myTab'
                }"
                exact
                 :to="{
                  name: 'profile',
                  params: {
                    username: this.$route.params.username
                  },
                  query: {
                    tab: 'myTab'
                  }
                }">My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link"
                :class="{
                  active: tab === 'favoriteTab'
                }"
                exact
                 :to="{
                  name: 'profile',
                  params: {
                    username: this.$route.params.username
                  },
                  query: {
                    tab: 'favoriteTab'
                  }
                }">Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
              >
              <img :src="article.author.image" />
              </nuxt-link>
              <div class="info">
                <nuxt-link
                class="author"
                :to="{
                  name: 'profile',
                  params: {
                    username: article.author.username
                  }
                }"
              >
              {{ article.author.username }}
              </nuxt-link>
                <span class="date">{{ article.createdAt | date('MMMM D, YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right"
                @click="onFavorite(article)"
                :disabled="article.disabled"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{
              name: 'article',
              params: {
                slug:article.slug
              }
            }" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
              <ul class="tag-list" v-for="(tag, index) in article.tagList" :key="index">
                <li class="tag-default tag-pill tag-outline">{{tag}}</li>
              </ul>
            </nuxt-link>
          </div>


        </div>

      </div>

       <nav>
          <ul class="pagination">
            <li class="page-item"
            :class="{
                active: item === page
              }"
              v-for="item in totalPage" :key="item">
              <nuxt-link 
                class="page-link"
                :to="{
                  name: 'profile',
                  params: {
                    username: $route.params.username
                  },
                  query: {
                    page: item,
                    tab: tab
                  }
                }" 
              >
              {{item}}
              </nuxt-link>
            </li>
          </ul>
        </nav>
    </div>

   

  </div>
</template>

<script>
import { getProfile } from '@/api/profile'
import { getArticles, addFavorite, deleteFavorite } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'ProfileIndex',
  watchQuery: ['page', 'tab'],
  middleware: 'authenticated',
  computed: {
    ...mapState({
      vuexUser: state => state.user
    }),
    totalPage(){
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  async asyncData({ query, params }) {
    const limit = 2
    const page = Number.parseInt(query.page || 1)
    const tab = query.tab || 'myTab'
    const articleParam = tab === 'myTab' 
    ? {
      limit,
      offset: (page - 1) * limit,
      author: params.username 
    } : {
      limit,
      offset: (page - 1) * limit,
      favorited: params.username 
    }
    const [profileRes, articleRes] = await Promise.all([
      getProfile(params.username),
      getArticles(articleParam)
    ])

    const { profile } = profileRes.data
    const { articles,articlesCount } = articleRes.data
    return {
      limit,
      page,
      tab,
      profile,
      articles,
      articlesCount
    }
  },
  methods: {
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