<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="请输入你的问题">
        <el-input v-model="form.desc" type="textarea" :rows="1" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="question_submit(form.desc)">提问</el-button>
      </el-form-item>
      <hr/>
      <el-form-item label="">
        <el-input v-html="form.answer" type="textarea" :rows="25" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { test, questionSubmit } from '@/api/questionAndAnswer'
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        answer: ''
      }
    }
  },
  methods: {
    onSubmit() {
      // this.form.answer = "<b>生态公益林</b> 包括: 防护林   特殊通途林<br>" +
      //   "<b>出处：</b>内蒙古自治区实施《中华人民共和国森林法》办法 第四章 第二十四条<br>" + "" +
      //   "<b>条款内容：</b><p>森林实行生态公益林、商品林分类经营。生态公益林包括防护林、特种用途林；商品林包括用材林、经济林和薪炭林。\n" +
      //   "　　生态公益林以各级人民政府投入为主，鼓励单位和个人投工、投劳、投资建设；商品林主要由受益者投资建设和经营，各级人民政府应当给予扶持。\n</p>" +
      //   "<button>查看全文</button>"
      this.form.answer = "<b>老顶山风景区</b><br>" + "" +
        "<p>此问题暂时无法回答</p>"
      this.test_api()
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },

    test_api() {
      test().then(res => {
        console.log(res)
      })
    },

    question_submit(question) {
      questionSubmit(question).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

