<template>
  <div class="setting-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span = "16">
          <el-form ref="form" :model="user" label-width="80px">
            <el-form-item label="编号">
                {{ user.id }}
            </el-form-item>
            <el-form-item label="手机">
                {{ user.mobile }}
            </el-form-item>
            <el-form-item label="媒体名称">
                <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
                <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onUpdateUser">保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="2" :span="4">
          <!-- <p @click="$refs.file.click()">点击修该头像</p> -->
          <label for="file">
            <el-avatar shape="square" :size="150" fit=cover :src="user.photo"></el-avatar>
            <p>点击修该头像</p>
          </label>
          <input @change="onFileChange" id="file" type="file" hidden ref="file">
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    append-to-body
    @opened="onDiglogOpened"
    @closed='onDiglogClosed'
    width="30%"
    :before-close="handleClose">
    <div class="preview-image-warp"><img ref="preview-image" class="preview-image" width="150" :src="priview" alt=""></div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdatePhoto">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto, updateUserProfile } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus'
export default {
  name: 'SettingIndex',
  components: {},
  props: {},
  data () {
    return {
      dialogVisible: false,
      user: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      priview: '',
      cropper: null
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    this.loadUser()
  },
  methods: {
    loadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onFileChange () {
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.priview = blobData
      this.dialogVisible = true
      file.value = ''
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    onDiglogOpened () {
      const image = this.$refs['preview-image']
      this.cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        viewMode: 1,
        dragMode: 'none',
        crop (event) {
        }
      })
    },
    onDiglogClosed () {
      this.cropper.destroy()
    },
    onUpdatePhoto () {
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        updateUserPhoto().then(res => {
          this.dialogVisible = false
          this.user.photo = window.URL.createObjectURL(file)
        })
      })
    },
    onUpdateUser () {
      const { name, intro, email } = this.user
      updateUserProfile({
        name,
        intro,
        email
      }).then(res => {
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        globalBus.$emit('update-user', this.user)
      })
    }
  }
}
</script>

<style scoped lang="less">
.preview-image-warp {
  .preview-image {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
}
</style>
