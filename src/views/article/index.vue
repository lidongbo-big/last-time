<template>
  <div class="article-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
    <!-- 面包屑路径导航 -->
       <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>内容管理</el-breadcrumb-item>
       </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间">
           <el-date-picker
             v-model="form.data1"
             type="datetimerange"
             start-placeholder="开始日期"
             end-placeholder="结束日期"
             :default-time="['12:00:00']">
           </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="box-card">
    <!-- 数据表单 -->
    <div slot="header" class="clearfix">
        根据筛选条件共查询到 46147 条结果
    </div>
    <el-table
      :data="articles"
      stripe
      style="width: 100%">
      <el-table-column
        prop=""
        label="封面">
        <template slot-scope="scope">
          <img v-if="scope.row.cover.images[0]" class="article-cover" :src="scope.row.cover.images[0]" alt="">
          <img v-else src="./error.gif" class="article-cover" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题">
      </el-table-column>4
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
        <el-tag :type = "articleList[scope.row.status].type">{{ articleList[scope.row.status].text }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button
            size="mini"
            circle
            type="primary"
            icon="el-icon-edit"
            ></el-button>
          <el-button
            size="mini"
            circle
            icon="el-icon-delete"
            type="danger"
            ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      background
      @current-change='onCurrentChange'
      :page-size="pageSize"
      :total="totalCount">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticle } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: [],
      articleList: [
        { status: 0, text: '草稿', type: '' },
        { status: 1, text: '待审核', type: 'info' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],
      totalCount: 0,
      pageSize: 10
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    loadArticle (page = 1) {
      getArticle({
        page,
        per_page: this.pageSize
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
      })
    },
    onCurrentChange (page) {
      this.loadArticle(page)
    }
  }
}
</script>

<style scoped lang="less">
.article-cover {
  width: 100px;
  height: 100px;
  background-size: cover;
}
</style>
