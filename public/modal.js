export const modal = {
    data() {
      return {
        form: {
            newTitle: "",
            newContent: "",
        }
      }
    },
    methods: {
      async submitPost() {
        let response = await axios.post("/api/posts", {
          title: this.form.newTitle,
          content: this.form.newContent
        }, {});
        this.form.newTitle = "";
        this.form.newContent = "";
        this.$emit('submitPost');
      },
      async closeModal() {
        this.$emit('closeModal');
      }
    },
    template: "#modal",
  }
  