<template>
  <div class="room-card placeholder">
    <div class="image-wrapper">
      <div class="skeleton skeleton-img"></div>
    </div>
    <div class="room-info">
      <div class="skeleton skeleton-text title"></div>
      <div class="skeleton skeleton-text short"></div>
      <div class="skeleton skeleton-text short"></div>
      <div class="skeleton skeleton-text short"></div>
      <div class="skeleton skeleton-button"></div>
    </div>
  </div>
</template>

<style scoped>
.room-info {
  padding: 2px 10px 12px 10px;
}

.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e2e2e2 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.2s infinite;
  border-radius: 6px;
}

.skeleton-img {
  height: 180px;
  width: 100%;
}

.skeleton-text {
  height: 14px;
  margin: 8px 0;
}

.skeleton-text.title {
  height: 18px;
  width: 60%;
}

.skeleton-text.short {
  width: 80%;
}

.skeleton-button {
  height: 32px;
  width: 40%;
  margin-top: 12px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
