<template>
  <div class="pagination">
    <button
      :disabled="currentPage === 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      Prev
    </button>

    <button
      v-for="page in pages"
      :key="page"
      :class="{ active: currentPage === page }"
      @click="$emit('update:currentPage', page)"
    >
      {{ page }}
    </button>

    <button
      :disabled="currentPage === totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      Next
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

// ✅ Use defineProps at top-level
const props = defineProps({
  totalItems: Number,
  itemsPerPage: Number,
  currentPage: Number,
});

const totalPages = computed(() =>
  Math.ceil(props.totalItems / props.itemsPerPage)
);

const pages = computed(() => {
  return Array.from({ length: totalPages.value }, (_, i) => i + 1);
});
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 24px;
  gap: 8px;
  flex-wrap: wrap;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination button.active,
.pagination button:hover {
  background-color: #7a42f4;
  color: white;
  border-color: #7a42f4;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
