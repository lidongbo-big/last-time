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
        <el-col class="image-item"  v-for="(image, index) in images" :key="index" :xs='12' :sm='6' :md='6' :lg='4'>
          <el-image
          style="height: 100px"
          :src="image.url"
          fit="cover">
          </el-image>
          <div class="image-action">
            <i @click="onCollect(image)" :class="{'el-icon-star-off': image.is_collected, 'el-icon-star-on': !image.is_collected}"></i>
            <el-button size="small" type="danger" icon="el-icon-delete-solid" circle @click="onDelete(image)"></el-button>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change='onCurrentChange'
        :current-page.sync="page"
        :total="totalCount">
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
import { getImage, collectImage, deleteImage } from '@/api/image'
export default {
  name: 'ImagesIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      dialogUpdateVisible: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0,
      pageSize: 5
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
      this.page = page
      getImage({
        page,
        per_page: this.pageSize,
        collect: this.collect
      }).then(res => {
        const results = res.data.data.results
        results.forEach(img => {
          // img 对象本来没有 loading 数据
          // 我们这里收到的往里面添加该数据是用来控制每个收藏按钮的 loading 状态
          img.loading = false
        })
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onCollcetChange (value) {
      this.loadImages(value)
    },
    onUploadSuccess () {
      this.loadImages(this.page)
      this.dialogUpdateVisible = false
    },
    onCurrentChange (page) {
      this.loadImages(page)
    },
    onCollect (img) {
      collectImage(img.id, !img.is_collected).then(res => {
        img.is_collected = !img.is_collected
      })
    },
    onDelete (img) {
      console.log(img)
      deleteImage(img.id).then(res => {
        this.loadImages(this.page)
      })
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
.image-item {
  position: relative;
}

.image-action {
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #fff;
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  bottom: 4px;
  left: 5px;
  right: 5px;
}
</style>
