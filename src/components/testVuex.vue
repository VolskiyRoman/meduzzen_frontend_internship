<template>
  <div>
    <p>{{ testString }}</p>
    <button @click="changeTestString">Change Test String</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState({
      testString: (state) => state.testModule.testString,
    }),
    ...mapGetters({
      getTestString: 'getTestString',
    }),
  },
  methods: {
    ...mapActions({
      updateTestString: 'updateTestString',
    }),
    changeTestString() {
      const newString = 'New test string';
      this.updateTestString(newString);
    },
  },
};
</script>
