<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form @submit.prevent="onSubmit">
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="article.title">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="What's this article about?" v-model="article.description">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="article.body"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags" v-model="article.tagStr"><div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import  { getArticle, addArticle, updateArticle } from '@/api/article'
export default {
  name: 'EditorIndex',
  middleware: 'authenticated',
  data() {
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagStr: '',
        tagList: []
      }
    }
  },
  async asyncData({ params, query }) {
    if (params.slug) {
      const { data } = await getArticle(params.slug)
      const { article } = data
      article.tagStr = article.tagList.toString()
      return {
        article
      }
    }
    return {
      article: {
        title: '',
        description: '',
        body: '',
        tagStr: '',
        tagList: []
      }
    }
  },
  computed: {
    ...mapState({vuexUser: state=>state.user})
  },
  methods: {
    async onSubmit () {
      this.article.tagList = this.article.tagStr.split(',')
      const slug = this.$route.params.slug || ''
      const localArticle = slug ? updateArticle : addArticle
      const { data } = await localArticle({
        slug,
        article: this.article
      })
      this.$router.push({
        name: 'article',
        params: {
          slug: data.article.slug
        }
      })
    }
  }
}
</script>

<style>

</style>