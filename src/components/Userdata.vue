<script setup>
import { onMounted } from 'vue';
import { getUserData } from '../firebase'
import {ref} from 'vue'
import router from '../router'
let username=ref('')
let belonging=ref('')
let created_at=ref('')
onMounted(()=>{

  getUserData()
  .then((res)=>{
     username.value = res.username
     belonging.value = res.belonging
     created_at.value = res.created_at.toDate().toLocaleString()
    })
  
})

defineProps({
  msg: String,
  belonging: String,
  created_at: Date
});

const editUserdata = ()=>{
router.push('/update')
}

</script>

<template>
<div>
  <p>名前　{{ username }} </p>
  <p>所属　{{ belonging }}</p>
  <p>アカウント作成日時　{{ created_at }}</p>
   <el-button round @click="editUserdata">編集</el-button>
</div>

  
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
