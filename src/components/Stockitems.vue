<template>

  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="itemName" label="品名" width="200" />
    <el-table-column :prop="mybelonging_at" label="在庫数" width="120" />
    <el-table-column label="編集" width="400">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">増減</el-button>
        <el-input-number v-model="edit" :min="-10" :max="10" size="small" />
        <el-button type="text" size="small" @click="orderItems(scope.$index, scope.row)">オーダー</el-button>
        <el-input-number v-model="order" :min="-10" :max="10" size="small" />


      </template>

    </el-table-column>
    <el-table-column label="オーダー状態" width="600">
      <template #default="scope">
        <el-button type="warning" plain v-if="scope.row.officeAOrder>0">officeAオーダー{{scope.row.officeAOrder}}</el-button>
        <el-button type="warning" plain v-if="scope.row.officeBOrder>0">officeBオーダー{{scope.row.officeBOrder}}</el-button>
        <el-button type="warning" plain v-if="scope.row.officeCOrder>0">officeCオーダー{{scope.row.officeCOrder}}</el-button>

      </template>

    </el-table-column>
  </el-table>
</template>

<script setup>
import { getUserData } from '../firebase'
import { updateStockItems, editStockItem } from '../firebase';
import { ref, onMounted } from 'vue'
const isOerdered = true
let mybelonging_at = ref('')
let edit = ref(1)
let order = ref(1)
let editData = ref('')
const tableData = updateStockItems();
const handleEdit = (index, row) => {
  switch (mybelonging_at.value) {
    case 'officeAStock':
      console.log(row.itemId, row.officeAStock + edit.value)
      editData = {
        itemId: row.itemId,
        itemName: row.itemName,
        officeAStock: row.officeAStock + edit.value,
        officeBStock: row.officeBStock,
        officeCStock: row.officeCStock,
        officeAOrder: row.officeAOrder,
        officeBOrder: row.officeBOrder,
        officeCOrder: row.officeCOrder,
      }
      editStockItem(row.itemId, editData)
      break;
    case 'officeBStock':
      console.log(row.itemId, row.officeBStock + edit.value)
      editData = {
        itemId: row.itemId,
        itemName: row.itemName,
        officeAStock: row.officeAStock,
        officeBStock: row.officeBStock + edit.value,
        officeCStock: row.officeCStock,
        officeAOrder: row.officeAOrder,
        officeBOrder: row.officeBOrder,
        officeCOrder: row.officeCOrder,
      }
      editStockItem(row.itemId, editData)
      break;
    case 'officeCStock':
      console.log(row.itemId, row.officeCStock + edit.value)
      editData = {
        itemId: row.itemId,
        itemName: row.itemName,
        officeAStock: row.officeAStock,
        officeBStock: row.officeBStock,
        officeCStock: row.officeCStock + edit.value,
        officeAOrder: row.officeAOrder,
        officeBOrder: row.officeBOrder,
        officeCOrder: row.officeCOrder,
      }
      editStockItem(row.itemId, editData)
      break;
  }
}
const orderItems = (index, row) => {
  switch (mybelonging_at.value) {
    case 'officeAStock':
      
      editData = {
        itemId: row.itemId,
        itemName: row.itemName,
        officeAStock: row.officeAStock,
        officeBStock: row.officeBStock,
        officeCStock: row.officeCStock,
        officeAOrder: row.officeAOrder + order.value,
        officeBOrder: row.officeBOrder,
        officeCOrder: row.officeCOrder,

      }
      editStockItem(row.itemId, editData)
      break;
    case 'officeBStock':
       console.log(row.itemId, row.officeBOrder)
      editData = {
        itemId: row.itemId,
        itemName: row.itemName,
        officeAStock: row.officeAStock,
        officeBStock: row.officeBStock,
        officeCStock: row.officeCStock,
        officeAOrder: row.officeAOrder,
        officeBOrder: row.officeBOrder + order.value,
        officeCOrder: row.officeCOrder,
      }
      editStockItem(row.itemId, editData)
      break;
    case 'officeCStock':
      
      editData = {
        itemId: row.itemId,
        itemName: row.itemName,
        officeAStock: row.officeAStock,
        officeBStock: row.officeBStock,
        officeCStock: row.officeCStock,
        officeAOrder: row.officeAOrder,
        officeBOrder: row.officeBOrder,
        officeCOrder: row.officeCOrder + order.value,
      }
      editStockItem(row.itemId, editData)
      break;
  }

}
onMounted(() => {

  getUserData()
    .then((res) => {

      mybelonging_at.value = res.belonging + 'Stock'

    })
})

</script>