<template>
  <div>
    <button @click="exportUser">{{ $t("export.user") }}</button>
  </div>
</template>

<script setup>
import { exportData } from "@/services/export_data";

const exportUser = async () => {
  try {
    await exportData(null, 'quizzes/user-export', 'user', null);
  } catch (error) {
    console.error('Error exporting user:', error);
  }
};
</script>
