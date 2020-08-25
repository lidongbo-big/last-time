<template>
  <div class="imagesContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="action-head">
        <el-radio-group @change="loadImages(1)" v-model="collect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button @click="dialogUpdateVisible=true" type='success'>上传素材</el-button>
      </div>
      <el-row :gutter="20">
        <el-col v-for="(image, index) in images" :key="index" :xs='12' :sm='6' :md='6' :lg='4'>
          <el-image
          style="width: 100px; height: 100px"
          :src="image.url"
          fit="cover">
          </el-image>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change='onCurrentChange'
        :total="1000">
      </el-pagination>
    </el-card>
    <el-dialog :append-to-body='true' title="上传素材" :visible.sync="dialogUpdateVisible">
      <el-upload
        class="upload-demo"
        drag
        :headers='uploadHeaders'
        :on-success='onUploadSuccess'
        name='image'
        action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
        :show-file-list='false'
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImage } from '@/api/image'
export default {
  name: 'imagesIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: 'false',
      images: [],
      dialogUpdateVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      flag: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(1, false)
  },
  mounted () {},
  methods: {
    loadImages (page) {
      getImage({
        page,
        per_page: 10,
        flag: this.flag
      }).then(res => {
        this.images = res.data.data.results
      })
    },
    onCollcetChange (value) {
      this.loadImages(value)
    },
    onUploadSuccess () {
      this.loadImages(1, false)
      this.dialogUpdateVisible = false
    },
    onCurrentChange (page) {
      console.log(page)
      this.loadImages(page)
    }
  }
}
</script>

<style scoped lang="less">
.action-head {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
</style>
