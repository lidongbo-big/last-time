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
     <el-form ref="publish-form" :model="article" :rules="publishRules" label-width="80px">
       <el-form-item label="标题:" prop="title">
           <el-input v-model="article.title"></el-input>
       </el-form-item>
        <el-form-item label="内容:" prop="content">
           <el-tiptap v-model="article.content" :extensions="extensions"></el-tiptap>
       </el-form-item>
       <el-form-item label="封面:">
           <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
           </el-radio-group>
           <template v-if="article.cover.type > 0">
             <upload-cover v-model="article.cover.images[index]"  v-for="(cover, index) in article.cover.type" :key="cover">
             <!-- <upload-cover @update-cover='onUpdateCover(index, $event)'  v-for="(cover, index) in article.cover.type" :key="cover" :cover-image='article.cover.images[index]'> -->
             </upload-cover>
           </template>
       </el-form-item>
        <el-form-item label="频道:" prop="channel_id">
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
import UploadCover from './components/upload-cover'
import { getArticleChannels, addArticle, getAssignArticle, updateArticle } from '@/api/article'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import { uploadImage } from '@/api/image'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap,
    UploadCover
  },
  props: {},
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 1,
          images: []
        },
        channel_id: null
      },
      channels: [],
      extensions: [
        // editor extensions
        // they will be added to menubar and bubble menu by the order you declare.
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        })
      ],
      publishRules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入内容'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入标题', trigger: 'change' }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'change' }
        ]
      }
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
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return
        }
        const articleID = this.$route.query.id
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
      })
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
    },
    onUpdateCover (index, url) {
      this.article.cover.images[index] = url
    }
  }
}
</script>

<style scoped lang="less"></style>
