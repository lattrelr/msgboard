export const createpost = {
    props: ['showModal'],
    emits: ['submitPost'],
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
    },
    watch: {
        showModal() {
            if (!this.showModal) {
                this.form.newTitle = "";
                this.form.newContent = "";
            }
        }
    },
    template: "#createpost",
  }
  