<template>
  <div class="dropdown-container" ref="dropdown" @click.stop>
    <button class="dropdown-toggle" @click="toggleDropdown">
      <span style="color: gray">Sort By</span>: {{ selectedLabel }}
      <span :class="{ rotated: isOpen }"
        ><svg
          data-slot="icon"
          fill="none"
          stroke-width="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style="width: 20px; height: 20px; color: gray"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
          ></path></svg
      ></span>
    </button>

    <transition name="fade-slide">
      <ul v-if="isOpen" class="dropdown-list">
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: String,
  options: Array,
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
const selectedLabel = ref("");

const dropdown = ref(null);

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function selectOption(option) {
  selectedLabel.value = option.label;
  emit("update:modelValue", option.value);
  isOpen.value = false;
}

function handleClickOutside(event) {
  if (dropdown.value && !dropdown.value.contains(event.target)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
  z-index: 20;
}
.dropdown-toggle {
  padding: 8px 14px;
  background: white;
  font-size: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}
.dropdown-toggle:hover {
  background: #f9f9f9;
  border-color: #999;
}
.dropdown-toggle span.rotated {
  transform: rotate(180deg);
  transition: transform 0.3s ease;
}
.dropdown-list {
  position: absolute;
  top: 90%;
  right: 0;
  max-width: 160px;
  background: white;
  border-radius: 8px;
  border: 1px solid lightgray;
  padding: 6px 0;
  box-shadow: 0 10px 16px rgba(0, 0, 0, 0.08);
  z-index: 10;
}
.dropdown-list li {
  padding: 10px 16px;
  cursor: pointer;
  list-style: none;
  font-size: 10px;
  transition: background 0.2s ease;
}
.dropdown-list li:hover {
  background-color: #f0f0f0;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
