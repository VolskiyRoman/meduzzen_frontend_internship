<template>
  <div>
    <p>
      {{ $t("inviteDetail.inviteId") }}: {{ invite.id }}<br>
      {{ $t("inviteDetail.companyId") }}: {{ invite.company }}<br>
    </p>
  </div>
</template>

<script setup>
defineProps(['invite']);
</script>