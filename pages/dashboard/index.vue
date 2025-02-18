<template>
  <div class="dashboard">
    <header>
      <div class="users-count flex items-center gap-4">
        <div class="addUsers">
          <Button variant="outline">Add users</Button>
        </div>
        <span>All users: <span class="count">{{ dashboardStore.users.length }}</span></span>
      </div>
    </header>
  </div>
</template>

<script setup>

const dashboardStore = useMyDashboardStore()

onMounted(() => {
  dashboardStore.getUsers()
})
definePageMeta({
  layout: "dashboard"
})
</script>

<style scoped lang="scss">
.dashboard {
  header {
    .users-count {
      .count {
        color: rgba(0, 0, 0, 0.753);
        display: inline-block;
        transform: translateY(2%);
      }
    }
  }
}
</style>