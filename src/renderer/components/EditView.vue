<template>
  <div>
    <!-- header -->
    <van-nav-bar :title.sync='nodetitle' id='header'>
      <van-icon name='arrow-left' slot='left' style='-webkit-app-region: no-drag;' @click='back'/>
      <van-icon name='delete' slot='right' style='-webkit-app-region: no-drag;' @click="del" v-if="nodeKey!=''"/>
    </van-nav-bar>
    <!-- 编辑区 -->
    <div id="container">
      <van-cell-group>
        <van-field v-model="nodetitle" placeholder="请输入标题" />
      </van-cell-group>
      <van-cell-group>
         <div id="editor_menu"></div>
         <div id="editor"></div>
      </van-cell-group>
      <!-- 弹出区 -->
      <van-popup v-model="popupShow">{{popupMsg}}</van-popup>
    </div>
  </div>
</template>
<script>
import E from 'wangeditor'
import editorConfig from './editor.config'
import {getDate} from '../utils/date'
import {getNode,setNode,delNode} from '../utils/localstroage'
export default {
  name: 'nodeView',
  data () {
    return {
      editor:'',
      nodetitle: getDate(),
      nodemsg: '',
      nodeKey:'',
      delColor:'',
      popupShow:false,
      popupMsg:''
    }
  },
  methods: {
    back () {
      let nodetext = this.editor.txt.text()
      let nodemsg = this.editor.txt.html()
      if(this.nodetitle==''&&nodetext!=''){
        // this.popupMsg='请输入标题';
        // this.popupShow=true;
        alert('请输入标题')
        return;
      }
      // 保存数据
      if(this.nodetitle!=''&&nodetext!=''){
        let code = '';
        
        if(this.nodeKey=='')
          code = new Date().getTime().toString()
        else
          code = this.nodeKey

        setNode({
          code:code,
          title:this.nodetitle,
          msg:nodemsg
        })
      }
      
      this.$router.back('/')
    },
    del () {
      if(this.nodeKey=='')return;
      delNode(this.nodeKey)
      this.$router.back('/')
    }
  },
  mounted () {
    // 创建editor
    this.editor = new E('#editor_menu','#editor')
    this.editor.customConfig = editorConfig
    this.editor.create()

    if(this.$route.params.code!=''){
      this.nodeKey = this.$route.params.code
      this.nodetitle =  getNode(this.nodeKey).title
      this.editor.txt.html(getNode(this.nodeKey).msg)
    }
  },
}
</script>
<style>
#editor{
  height: 781px;
}
</style>
