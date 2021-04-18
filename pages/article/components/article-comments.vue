<template>
  <div>
    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="submitComment"></textarea>
      </div>
      <div class="card-footer">
        <img :src="article.author.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
        Post Comment
        </button>
      </div>
    </form>
    
    <div class="card"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
          
        }" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username
          }
        }" class="comment-author">
          {{comment.author.username}}
        </nuxt-link>
        <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
        <!-- 删除评论 -->
        <span class="mod-options" v-if="comment.author.username === vuexUser.username">
          <i class="ion-trash-a" @click="onDeleteComment(comment)"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComments, deleteComments } from '@/api/article'
import { mapState } from 'vuex'
export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      submitComment: '',
      comments: []
    }
  },
  computed: {
    ...mapState({
      vuexUser: state => state.user
    })
  },
  async mounted() {
    const { data } = await getComments(this.article.slug)
    this.comments = data.comments
  },
  methods: {
    // 提交评论
    async onSubmit() {
      const { data } = await addComments({
        slug: this.article.slug,
        comment: {
          body: this.submitComment
        }
      })
      this.comments = [data.comment, ...this.comments]
      this.submitComment = ''
    },
    // 删除评论
    async onDeleteComment(comment) {
      await deleteComments({
        id: comment.id,
        slug: this.article.slug
      })
      const index = this.comments.findIndex(item => item.id === comment.id)
      this.comments.splice(index, 1)
    }
  }

}
</script>

<style>

</style>