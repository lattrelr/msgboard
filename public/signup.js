export const signup = {
    props: ['showModal'],
    emits: ['submitUser'],
    data() {
      return {
        form: {
            username: "",
            password: "",
          },
      }
    },
    methods: {
        async submitUser() {
            if (this.form.username != "" && this.form.password != "") {
                try {
                    let response = await axios.post("/api/users/signup", {
                        username: this.form.username,
                        password: this.form.password
                }, {}); 
                this.form.username = "";
                this.form.password = "";
            } catch (error) {}
                this.$emit('submitUser');
            }
        },
    },
    watch: {
        showModal() {
            if (!this.showModal) {
                this.form.username = "";
                this.form.password = "";
            }
        }
    },
    template: "#signup",
}
  