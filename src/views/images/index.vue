<template>
  <div class="imagesContainer">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-radio-group v-model="radio1">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <el-row :gutter="20">
        <el-col :xs='12' :sm='6' :md='6' :lg='4'>
          <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :fit="fit">
          </el-image>
        </el-col>
        <el-col :xs='12' :sm='6' :md='6' :lg='4'>
          <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :fit="fit">
          </el-image>
        </el-col>
        <el-col :xs='12' :sm='6' :md='6' :lg='4'>
         <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :fit="fit">
          </el-image>
        </el-col>
        <el-col :xs='12' :sm='6' :md='6' :lg='4'>
          <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :fit="fit">
          </el-image>
        </el-col>
        <el-col :xs='12' :sm='6' :md='6' :lg='4'>
          <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :fit="fit">
          </el-image>
        </el-col>
        <el-col :xs='12' :sm='6' :md='6' :lg='4'>
          <el-image
          style="width: 100px; height: 100px"
          :src="url"
          :fit="fit">
          </el-image>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'imagesIndex',
  components: {},
  props: {},
  data () {
    return {
      radio1: '全部'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
