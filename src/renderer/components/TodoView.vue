<template>
  <div>
    <!-- header -->
    <van-nav-bar :title.sync='todotitle' id='header'>
      <van-icon name='arrow-left' slot='left' style='-webkit-app-region: no-drag;' @click='back'/>
      <van-icon name='delete' slot='right' style='-webkit-app-region: no-drag;' @click="del" :color="delColor"/>
    </van-nav-bar>
    <!-- 编辑区 -->
    <div id="container">
      <van-cell-group>
        <van-field v-model="todotitle" placeholder="请输入标题" />
      </van-cell-group>
      <van-cell-group>
        <van-field 
        v-model="todomsg" 
        placeholder="请输入内容"
        type="textarea"
        rows="20"
        autosize
         />
      </van-cell-group>
      <!-- 弹出区 -->
      <van-popup v-model="popupShow">{{popupMsg}}</van-popup>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TodoView',
  data () {
    return {
      todotitle: '',
      todomsg: '',
      todoKey:'',
      delColor:'',
      popupShow:false,
      popupMsg:''
    }
  },
  methods: {
    back () {
      if(this.todotitle==''&&this.todomsg!=''){
        this.popupMsg='请输入标题';
        this.popupShow=true;
        return;
      }
      // 保存数据
      if(this.todotitle!=''){
        let code = '';
        
        if(this.todoKey=='')
          code = new Date().getTime().toString()
        else
          code = this.todoKey

        localStorage.setItem(code,JSON.stringify({
          title:this.todotitle,
          msg:this.todomsg
        }))
      }
      
      this.$router.back('/')
    },
    del () {
      if(this.todoKey=='')return;
      
      localStorage.removeItem(this.todoKey)
      this.$router.back('/')
    }
  },
  mounted () {
    if(this.$route.params.code!=''){
      this.todoKey = this.$route.params.code
      this.todotitle =  JSON.parse(localStorage.getItem(this.todoKey)).title
      this.todomsg =  JSON.parse(localStorage.getItem(this.todoKey)).msg
    }
    this.delColor = this.todoKey==''?'#999':'#1989fa'
  }
}
</script>
<style>
#header{
  width: 100%;
  position: fixed;
  top: 0;
  -webkit-app-region: drag;
}
#container{
  margin-top: 46px;
}
</style>
