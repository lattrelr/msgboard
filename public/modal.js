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
        if (this.form.newTitle != "" && this.form.newContent != "") {
          try {
            let response = await axios.post("/api/posts", {
              title: this.form.newTitle,
              content: this.form.newContent
            }, {});
            this.form.newTitle = "";
            this.form.newContent = "";
          } catch (error) {}
          this.$emit('submitPost');
        }
      },
      async closeModal() {
        this.form.newTitle = "";
        this.form.newContent = "";
        this.$emit('closeModal');
      }
    },
    template: "#modal",
  }
  