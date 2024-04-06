export const auth = {
    emits: ['openModalCreate', 'openModalNewUser'],
    data() {
      return {
        loggedIn: false,
        authLoaded: false,
        currentUser: "",
        form: {
          username: "",
          password: "",
        },
      }
    },
    async mounted() {
        try {
            let response = await axios.get("/api/users/active");
            this.currentUser = response.data.username;
            this.loggedIn = true;
        } catch(error) {
            this.currentUser = "";
            this.loggedIn = false;
        }
        this.authLoaded = true;
    },
    methods: {
        openModalCreate() {
            this.$emit('openModalCreate');
        },
        openModalNewUser() {
            this.$emit('openModalNewUser');
        },
        async onLogin() {
            try {
              let response = await axios.post("/api/users/login", {
                username: this.form.username,
                password: this.form.password
              }, {});
              this.form.username = "";
              this.form.password = "";
              this.currentUser = response.data.username;
              this.loggedIn = true;
            } catch(error) {
              console.log("Unauthorized");
            }
        },
        async onLogout() {
            let response = await axios.get("/api/users/logout");
            this.loggedIn = false;
            this.currentUser = "";
        }
    },
    template: "#auth",
};