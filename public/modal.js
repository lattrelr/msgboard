export const modal = {
    data() {
      return {

      }
    },
    methods: {
      async closeModal() {
        this.$emit('closeModal');
      }
    },
    template: "#modal",
  }
  