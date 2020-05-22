<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="请输入你的问题">
        <el-input v-model="form.desc" type="input" :rows="1" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="question_submit(form.desc)">提问</el-button>
      </el-form-item>

      <el-divider content-position="left">提问结果</el-divider>

      <el-collapse accordion v-model="activeNames" @change="handleChange" v-show="isShow">
        <el-collapse-item title="--实体及关系信息--" name="1">
          <div>实体类型：<span v-text="answer.entity_type"></span></div>
          <div>识别实体：<span v-text="answer.entity"></span></div>
          <div>关系识别：<span v-text="answer.relation_type"></span></div>
        </el-collapse-item>

        <el-collapse-item title="--答案及出处--" name="2">
          <div>
            <b>答案涉及实体：</b>
            <ul>
              <li v-for="obj in answer.relation_object">{{obj}}</li>
            </ul>
          </div>

          <div style="width: 90%;">
            <el-collapse accordion>
              <el-collapse-item v-for="(item, index) in answer.origin_info" :key="index" :title="'出处' + (parseInt(index) + parseInt('1'))" :name="item.law_id">
                <div>
                  <b>来源法律：</b>
                  <span>{{item.law_name}}</span>
                </div>

                <div>
                  <b>来源条款：</b>
                  <span>{{item.chap_data.chapter_key + ' ' + item.chap_data.chapter_name + ' ' + item.article_data.article_key}}</span>
                </div>

                <div>
                  <b>详细内容：</b>
                  <p v-html="item.article_data.article_content"></p>
                </div>

                <div>
                  <el-popover placement="right" width="950" height="1000" trigger="click" @show="law_info(item.law_name)">
                    <div>
                      <div style="text-align: center"><b v-text="lawInfo.name"></b></div>
                      <div style="text-align: center">
                        <span>颁布时间：{{lawInfo.pub_time}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>颁布机构：{{lawInfo.pub_unit}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>实施时间：{{lawInfo.implement_time}}</span>
                        <el-divider direction="vertical"></el-divider>
                        <span>状态：{{lawInfo.status}}</span>
                      </div>
                      <div style="word-break: normal; white-space: pre-wrap;">
                        <el-divider><i class="el-icon-document"></i></el-divider>
                        {{lawInfo.content}}
                      </div>
                    </div>

                    <el-button type="primary" slot="reference" icon="el-icon-search" size="mini" round>查看全文</el-button>
                  </el-popover>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>

        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>

<script>
import { questionSubmit, get_law_info } from '@/api/questionAndAnswer'
import { MessageBox, Message } from 'element-ui'
export default {
  data() {
    return {
      form: {
        delivery: false,
        desc: ''
      },
      answer: {
        origin_info: "",
        entity_type: "",
        entity:"",
        relation_type: "",
        relation_object: []
      },
      lawInfo: {},
      activeNames: ['1'],
      isShow: false
    }
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },

    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },

    question_submit(question) {
      questionSubmit(question).then(res => {
        if (res.code === 0) {
          this.answer = res.data
          this.answer.relation_object = [...new Set(res.data.relation_object)]

          for (var i = 0; i < this.answer.origin_info.length; i++) {
            var info = this.answer.origin_info[i]
            var article_content = info.article_data.article_content
            var origin_content = info.article_data.origin_content
            var reg = new RegExp("(" + origin_content + ")", "g");
            this.answer.origin_info[i].article_data.article_content =
              article_content.replace(reg, '<b style="color:red">'+origin_content+'</b>');
          }
          this.isShow = true

        } else if (res.code === 1001) {
          this.isShow = false
          Message({
            message: error.message,
            type: 'error',
            duration: 3 * 1000
          })
        }
      })
    },

    law_info(law_name) {
      get_law_info(law_name).then(res => {
        if (res.code === 0) {
          this.lawInfo = res.law_info
          this.lawInfo.content.replace(/\n/g,"<br/>")
          console.log(this.lawInfo.content)
          console.log(this.lawInfo)
        } else if (res.code === 1001) {

        }
      })
    }
  }
}
</script>

<style>
  .el-popover{
    width: 100%;
    height: 100%;
    overflow: scroll;
  }
</style>


