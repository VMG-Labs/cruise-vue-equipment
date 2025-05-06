<template>
  <div class="min-h-screen bg-gray-50">
    <div v-if="selectedEquipment" class="py-8 px-4">
      <div class="max-w-2xl mx-auto">
        <button 
          @click="selectedEquipment = null" 
          class="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          ← Back to List
        </button>
        
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-6">Equipment Details</h2>
          
          <div v-if="detailLoading" class="text-center py-12">
            <div class="text-gray-600">Loading equipment details...</div>
          </div>
          
          <div v-else-if="detailError" class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p class="text-red-600">{{ detailError }}</p>
          </div>
          
          <div v-else class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Equipment ID</label>
              <p class="text-gray-900">{{ equipmentDetail.EQUIPMENT }}</p>
            </div>
            
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                id="description"
                v-model="equipmentDetail.DESCRIPTION"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Created By</label>
                <p class="text-gray-900">{{ equipmentDetail.CREATEDBYUSER }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Created On</label>
                <p class="text-gray-900">{{ formatDate(equipmentDetail.CREATIONDATE) }}</p>
              </div>
            </div>
            
            <div class="grid grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Changed By</label>
                <p class="text-gray-900">{{ equipmentDetail.LASTCHANGEDBYUSER }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Last Changed On</label>
                <p class="text-gray-900">{{ formatDate(equipmentDetail.LASTCHANGEDATE) }}</p>
              </div>
            </div>
            
            <div class="flex justify-end pt-4">
              <button
                @click="saveEquipment"
                :disabled="saving"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {{ saving ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="py-8 px-4">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-900 mb-8">Equipment List</h1>
        
        <div v-if="loading" class="text-center py-12">
          <div class="text-gray-600">Loading equipment data...</div>
        </div>
        
        <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
          <p class="text-red-600">{{ error }}</p>
        </div>
        
        <div v-else class="bg-white rounded-lg shadow">
          <ul class="divide-y divide-gray-200">
            <li 
              v-for="item in equipmentList" 
              :key="item.EQUIPMENT" 
              @click="viewEquipmentDetail(item.EQUIPMENT)"
              class="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">{{ item.DESCRIPTION }}</h3>
                  <p class="text-sm text-gray-500 mt-1">Equipment ID: {{ item.EQUIPMENT }}</p>
                </div>
                <span class="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                  {{ item.EQUIPMENTCATEGORY }}
                </span>
              </div>
              <div class="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>
                  <p class="mb-1">
                    <span class="font-medium">Created by:</span> {{ item.CREATEDBYUSER }}
                  </p>
                  <p>
                    <span class="font-medium">Created on:</span> {{ formatDate(item.CREATIONDATE) }}
                  </p>
                </div>
                <div>
                  <p class="mb-1">
                    <span class="font-medium">Last changed by:</span> {{ item.LASTCHANGEDBYUSER }}
                  </p>
                  <p>
                    <span class="font-medium">Last changed on:</span> {{ formatDate(item.LASTCHANGEDATE) }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

const equipment = ref([])
const loading = ref(true)
const error = ref(null)
const selectedEquipment = ref(null)
const equipmentDetail = ref(null)
const detailLoading = ref(false)
const detailError = ref(null)
const saving = ref(false)

const equipmentList = computed(() => {
  if (!equipment.value?.result?.MT_EQUIPMENT) return []
  return equipment.value.result.MT_EQUIPMENT
})

const formatDate = (dateString) => {
  if (!dateString || dateString === '00000000') return 'N/A'
  
  const year = dateString.substring(0, 4)
  const month = dateString.substring(4, 6)
  const day = dateString.substring(6, 8)
  
  return new Date(`${year}-${month}-${day}`).toLocaleDateString()
}

const fetchEquipment = async () => {
  try {
    const response = await axios.get('https://dxp24.co.za:8081/proxy/http%3A%2F%2Fvhcalabaci.saportals.com%3A50700%2Fneptune%2Fapi%2Fequipment%2FSearch%3Fsap-client%3D800%26IV_PARAMS%3D%7B%7D%26IV_SORTBY%3D%7B%7D%26IS_PAGING%3D%7B%22TAKE%22%3A2553%2C%22CURRENTPAGE%22%3A1%2C%22SKIP%22%3A0%2C%22BOTTOM%22%3A2553%2C%22TOTALPAGES%22%3A1%2C%22TOTALRECORDS%22%3A2553%2C%22SERVER_PAGINATION%22%3Afalse%7D%26IV_SERVER_PAGINATION%3Dtrue/baf7b7e4-d0a6-4467-af19-d00249e1b3af')
    equipment.value = response.data
  } catch (err) {
    error.value = 'Failed to load equipment data. Please try again later.'
    console.error('Error fetching equipment:', err)
  } finally {
    loading.value = false
  }
}

const viewEquipmentDetail = async (equipmentId) => {
  selectedEquipment.value = equipmentId
  detailLoading.value = true
  detailError.value = null
  
  try {
    const response = await axios.get(`https://dxp24.co.za:8081/proxy/http%3A%2F%2Fvhcalabaci.saportals.com%3A50700%2Fneptune%2Fapi%2Fequipment%2FRead%3Fsap-client%3D800%26IV_PARAMS%3D%7B%22EQUIPMENT%22%3A%22${equipmentId}%22%7D/baf7b7e4-d0a6-4467-af19-d00249e1b3af`)
    equipmentDetail.value = response.data.result.MS_EQUIPMENT
  } catch (err) {
    detailError.value = 'Failed to load equipment details. Please try again later.'
    console.error('Error fetching equipment details:', err)
  } finally {
    detailLoading.value = false
  }
}

const saveEquipment = async () => {
  saving.value = true
  try {
    await axios.put(
      'https://dxp24.co.za:8081/proxy/http%3A%2F%2Fvhcalabaci.saportals.com%3A50700%2Fneptune%2Fapi%2Fequipment%2FUpdate%3Fsap-client%3D800/baf7b7e4-d0a6-4467-af19-d00249e1b3af',
      { MS_EQUIPMENT: equipmentDetail.value }
    )
    // Refresh the list data
    await fetchEquipment()
    // Go back to list view
    selectedEquipment.value = null
  } catch (err) {
    alert('Failed to save changes. Please try again.')
    console.error('Error saving equipment:', err)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchEquipment()
})
</script>