<template>
  <div>
    <!-- header -->
    <van-nav-bar title='nodebook' id='header' @click-left='addnode' @click-right='closeWin'>
      <van-icon name='plus' slot='left' style='-webkit-app-region: no-drag'/>
      <van-icon name='cross' slot='right' style='-webkit-app-region: no-drag'/>
    </van-nav-bar>
    <!-- node -->
    <div id='container'>
      <div id='search'>
        <van-search v-model='searchKeyword' placeholder='search...'></van-search>
      </div>
      <div id='list'>
        <van-list v-model='loading' :finished='finished' finished-text='没有更多了' @load='onLoad'>
          <van-cell v-for='item in list' :key='item.code' :title='item.value.title' @click='listClick(item.code)'/>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import electron from 'electron'
let ipcRenderer = electron.ipcRenderer
export default {
  name: 'nodelist',
  data () {
    return {
      searchKeyword: '',
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    // 增加node
    addnode () {
      this.$router.push({
        name:'editview',
        params:{code:''}
      })
    },
    // 关闭窗口
    closeWin () {
      ipcRenderer.send('closeWin')
    },
    // list加载
    onLoad () {
      this.loading = true;
      this.finished = false

      for(let i = 0;i<localStorage.length;i++){
        this.list.push({
          code:localStorage.key(i),
          value:JSON.parse(localStorage.getItem(localStorage.key(i)))
        })
      }

      this.loading = false
      this.finished = true
    },
    // 点击list
    listClick(code){
      this.$router.push({
        name:'editview',
        params:{code:code}
      })
    }
  },
  watch:{
    searchKeyword:function(){
      this.list=[];
      for(let i = 0;i<localStorage.length;i++){
        let title = JSON.parse(localStorage.getItem(localStorage.key(i))).title
        if(new RegExp(this.searchKeyword).test(title)){
          this.list.push({
            code:localStorage.key(i),
            value:JSON.parse(localStorage.getItem(localStorage.key(i)))
          })
        }
      }
    }
  }
}
</script>
<style>
#search {
  position: fixed;
  top: 46px;
  width: 100%;
  z-index: 100;
}
#list {
  padding-top: 44px;
}
</style>
