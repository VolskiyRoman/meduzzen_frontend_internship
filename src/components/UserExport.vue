<template>
  <div>
    <button @click="exportUser">{{ $t("export.user") }}</button>
  </div>
</template>

<script setup>
import axiosInstance from "@/api/api";

const exportUser = async () => {
  try {
    const response = await axiosInstance.get('/api/quizzes/user-export/', { responseType: 'blob' });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'user_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error exporting user:', error);
  }
};
</script>
