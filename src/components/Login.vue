<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="email">
      <el-input v-model="formInline.email" placeholder="email address"></el-input>
    </el-form-item>
    <el-form-item label="password">
      <el-input type="password" v-model="formInline.password" placeholder="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">ログイン</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import { loginUser } from '../firebase'
const formInline = reactive({
  email: '',
  password: '',
})

const onSubmit = () => {
  //ログイン
  loginUser(formInline.email,formInline.password)
}
</script>
