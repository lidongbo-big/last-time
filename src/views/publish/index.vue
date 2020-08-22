<template>
  <div class="publish-container">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <!-- 表单 -->
     <el-form ref="form" :model="article" label-width="80px">
       <el-form-item label="标题:">
           <el-input v-model="article.title"></el-input>
       </el-form-item>
        <el-form-item label="内容:">
           <el-input type="textarea" v-model="article.content"></el-input>
       </el-form-item>
       <el-form-item label="封面:">
           <el-radio-group v-model="article.cover.type">
           <el-radio :label="1">单图</el-radio>
           <el-radio :label="3">三图</el-radio>
           <el-radio :label="0">无图</el-radio>
           <el-radio :label="-1">自动</el-radio>
           </el-radio-group>
       </el-form-item>
        <el-form-item label="频道:">
           <el-select v-model="article.channel_id" placeholder="请选择">
           <el-option v-for="(channel, index) in channels" :key="index" :label="channel.name" :value="channel.id"></el-option>
           </el-select>
       </el-form-item>
       <el-form-item>
           <el-button type="primary" @click="onPublish(false)">{{ $route.query.id ? '修改' : '发布' }}</el-button>
           <el-button @click="onPublish(true)">存入草稿</el-button>
       </el-form-item>
     </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle, getAssignArticle, updateArticle } from '@/api/article'

export default {
  name: 'publishIndex',
  components: {},
  props: {},
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    onPublish (draft = false) {
      var articleID = this.$route.query.id
      if (articleID) {
        updateArticle(articleID, this.article, draft).then(res => {
          console.log(res)
          this.$message({
            message: '修该成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
      } else {
        addArticle(this.article, draft).then(res => {
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
      }
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    loadArticle () {
      getAssignArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>

<style scoped lang="less"></style>