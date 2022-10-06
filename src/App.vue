<script setup>
import { logout } from './firebase';

</script>

<template>
  <el-container style="height: 800px; border: 1px solid #eee">
    <el-header>Stock Book</el-header>
    <el-container style="border: 1px solid #eee">
      <el-aside width="200px">
        <el-menu default-active="login" router>
          <el-menu-item index="userdata" :route="{ name: 'userdata' }">ユーザー情報</el-menu-item>
          <el-menu-item index="stockitems" :route="{ name: 'stockitems' }">在庫管理</el-menu-item>
          <el-menu-item index="register" :route="{ name: 'register' }">新規アカウント作成</el-menu-item>
          <el-menu-item index="login" :route="{ name: 'login' }">ログイン</el-menu-item>
          <el-menu-item index="logout" @click="logout" :route="{ name: 'login' }" >ログアウト</el-menu-item>                          
        </el-menu>      
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
.el-header{
  background-color: #3c64a3;
  color: whitesmoke;
  text-align: left;
  line-height: 60px;
}
.el-menu-item,

.el-aside {
  background-color: #f1f1f1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #ffffff;
  color: var(--el-text-color-primary);
  text-align: left;
  line-height: 10px;
}

body > .el-container {
  margin-bottom: 40px;
  
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
