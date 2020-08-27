<template>
  <div class="upload-cover" @click="showCoverSelect">
    <div class="cover-wrap">
      <img
        class="cover-image"
        ref="cover-image"
        :src="value"
      >
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body
      width="30%"
      >
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="first"> <image-list :is-show-add='false' :is-show-action='false' /> </el-tab-pane>
          <el-tab-pane label="上传图片" name="second">上传图片
            <input type="file" ref="file" @change="onFileChange">
            <img width="100" height="100" ref="preview-image">
          </el-tab-pane>
        </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'
import ImageList from '@/views/images/components/image-list'
export default {
  name: 'UploadCover',
  components: {
    ImageList
  },
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs['preview-image'].src = blob
    //   this.$refs.file.value = ''
    },
    onCoverConfirm () {
    //   console.log(this.$refs)
      const file = this.$refs.file.files[0]
      if (!file) {
        this.$message('请选择文件')
        return
      }
      const fd = new FormData()
      fd.append('image', file)
      uploadImage(fd).then(res => {
        this.dialogVisible = false
        this.$refs['cover-image'].src = res.data.data.url
        this.$emit('input', res.data.data.url)
      })
    }
  }
}
</script>

<style scoped lang="less">
.cover-wrap {
  width: 150px;
  height: 120px;
  border: 1px solid #000;
  .cover-image {
    height: 120px;
    max-width: 100%;
  }
}
</style>
