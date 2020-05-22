<template>
  <div class="app-container">
    <div>
      <div style="text-align: center"><b v-html="law.name"></b></div>
      <div style="text-align: center">
        <span>颁布时间：{{law.pub_time}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>颁布机构：{{law.pub_unit}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>实施时间：{{law.implement_time}}</span>
        <el-divider direction="vertical"></el-divider>
        <span>状态：{{law.status}}</span>
      </div>
      <div style="word-break: normal; white-space: pre-wrap; margin-left: 50px; margin-right: 50px">
        <el-divider><i class="el-icon-document"></i></el-divider>
        {{law.content}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: ''
        },
        law: {}
      }
    },
    mounted() {
      // this.law = this.$route.params.info
    },
    created:function(){
      console.log(this.law = this.$route.query.info)
      this.law = this.law = this.$route.query.info
    },

    methods: {

    }
  }
</script>
