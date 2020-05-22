<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="检索内容">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(form.name)">检索</el-button>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>

    <div style="margin-left: 50px">
      <div v-for="(item, index) in lawList" :key="index">
        <router-link :to="{path:'/search/law_detail',query:{info:item}}">
          <b v-html="item.name" style="font-size: large"></b>
        </router-link>
        <div style="font-size: smaller; margin-top: 5px">
          <span>颁布时间：{{item.pub_time}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>颁布机构：{{item.pub_unit}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>实施时间：{{item.implement_time}}</span>
          <el-divider direction="vertical"></el-divider>
          <span>状态：{{item.status}}</span>
        </div>
        <br>
        <div class="law_content">
          {{item.content}}
        </div>
        <el-divider></el-divider>
      </div>
    </div>
  </div>
</template>

<script>
import { searchLaw } from '@/api/searchLaw'
import { MessageBox, Message } from 'element-ui'
export default {
  data() {
    return {
      form: {
        name: '',
      },
      lawList: []
    }
  },
  methods: {
    onSubmit(searchContent) {
      searchLaw(searchContent).then(res => {
        if (res.code === 0) {
          this.lawList = res.data;

          for (var i = 0; i < this.lawList.length; i++) {
            var law_name = this.lawList[i].name
            var reg = new RegExp("(" + searchContent + ")", "g");
            this.lawList[i].name = law_name.replace(reg, '<b style="color:red">'+searchContent+'</b>');
            this.lawList[i].content.replace(/\n/g,"<br/>")
          }

        } else if (res.code === 1001) {
          Message({
            message: res.message,
            type: 'error',
            duration: 3 * 1000
          })
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
  .law_content{
    color: #5a5e66;
    width: 75%;
    height: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>

