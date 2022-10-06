<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="name">
      <el-input v-model="formInline.username" placeholder="name" />
    </el-form-item>
    <el-form-item label="belonging">
      <el-select v-model="formInline.belonging" placeholder="belonging">
        <el-option label="officeA" value="officeA" />
        <el-option label="officeB" value="officeB" />
        <el-option label="officeC" value="officeC" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitData(formInline)">変更</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'
import { updateData } from '../firebase';
const formInline = reactive({
  username: '',
  belonging: '',
})
const submitData = (formInline) =>{
    updateData(formInline)
}

</script>