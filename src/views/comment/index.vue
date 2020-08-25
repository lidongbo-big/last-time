<template>
  <div class="comment-container">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>评论管理</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <el-table
            :data="articles"
            style="width: 100%">
            <el-table-column
              prop="title"
              label="标题">
            </el-table-column>
            <el-table-column
              prop="total_comment_count"
              label="总评论数">
            </el-table-column>
            <el-table-column
              prop="fans_comment_count"
              label="粉丝评论数">
            </el-table-column>
            <el-table-column
              prop="address"
              label="状态">
              <template slot-scope="scope">
                  {{ scope.row.comment_status ? '正常' : '关闭' }}
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="操作">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.comment_status"
                  @change="onStatusChange(scope.row)"
                  active-color="#13ce66"
                  inactive-color="#ff4949">
                </el-switch>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
           @size-change="handleSizeChange"
           @current-change="handleCurrentChange"
           :current-page.sync="page"
           :page-sizes="[10, 20, 30, 40]"
           :page-size.sync="pageSize"
           background
           layout="total, sizes, prev, pager, next, jumper"
           :total="totalCount">
         </el-pagination>
        </el-card>
  </div>
</template>

<script>
import { getArticle, updateCommentStatus } from '@/api/article'
export default {
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: [],
      totalCount: 0,
      pageSize: 10,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    handleSizeChange () {
      this.loadArticle(1)
    },
    handleCurrentChange (page) {
      this.loadArticle(page)
    },
    loadArticle (page = 1) {
      this.page = page
      getArticle({
        response_type: 'comment',
        page,
        per_page: this.pageSize
      }).then(res => {
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onStatusChange (article) {
      updateCommentStatus(article.id.toString(), article.comment_status).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
