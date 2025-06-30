<template>
  <div class="select-wrapper" ref="wrapper">
    <div class="select-display" @click="toggleOpen">
      {{ selectedLabel }}
      <span class="arrow" :class="{ open }"
        ><svg
          data-slot="icon"
          fill="none"
          stroke-width="1.5"
          stroke="currentColor"
          style="color: gray; width: 15px; height: 15px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          ></path></svg
      ></span>
    </div>
    <transition name="fade-slide">
      <ul v-if="open" class="select-list">
        <li v-for="g in guests" :key="g" @click="select(g)">
          {{ g }} {{ g > 1 ? "s" : "" }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onBeforeUnmount, watch } from "vue";

const props = defineProps({
  modelValue: [Number, String],
  guests: Array,
});
const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const wrapper = ref(null);
const selectedLabel = computed(() =>
  props.modelValue
    ? `${props.modelValue} ${props.modelValue > 1 ? "s" : ""}`
    : "Select Guests"
);

function toggleOpen() {
  open.value = !open.value;
}

function select(value) {
  emit("update:modelValue", value);
  open.value = false;
}

function handleClickOutside(e) {
  if (wrapper.value && !wrapper.value.contains(e.target)) {
    open.value = false;
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
.select-wrapper {
  position: relative;
  width: 500px;
  font-size: 16px;
}

.select-display {
  padding: 10px;
  padding-left: 30px;
  border: 1px solid #000000;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.select-list {
  position: absolute;
  top: calc(100% + -8px);
  left: 0;
  right: 0;
  padding: 0;
  background: white;
  border: 1px solid #f2eeee;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.select-list li {
  padding: 10px;
  cursor: pointer;
  list-style: none;
  transition: background 0.2s;
}
.select-list li:hover {
  border-radius: 6px;
  background-color: #f0f0f0;
}

.arrow {
  margin-left: 10px;
  transition: transform 0.3s ease;
}
.arrow.open {
  transform: rotate(180deg);
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
