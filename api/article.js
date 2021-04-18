import { request } from '@/plugins/request'

// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}
// 获取关注的文章列表
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

// 添加点赞
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}
// 取消点赞
export const deleteFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}
// 获取文章详情
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}
// 获取文章评论
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}
// 给文章增加评论
export const addComments = params => {
  return request({
    method: 'POST',
    url: `/api/articles/${params.slug}/comments`,
    data: params.comment
  })
}
// 给文章删除评论
export const deleteComments = params => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${params.slug}/comments/${params.id}`,
  })
}
// 删除文章
export const deleteArticle = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`,
  })
}
// 新增文章
export const addArticle = data => {
  return request({
    method: 'POST',
    url: `/api/articles`,
    data: data
  })
}
// 修改文章
export const updateArticle = data => {
  return request({
    method: 'PUT',
    url: `/api/articles/${data.slug}`,
    data: data.article
  })
}
