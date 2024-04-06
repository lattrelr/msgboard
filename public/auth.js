function setAuthTokenHeader() {
    let userinfo = JSON.parse(localStorage.getItem('user'));
    if (userinfo && userinfo.accessToken) {
        axios.defaults.headers.common['x-access-token'] = userinfo.accessToken;
    }
};

export const auth = {
    emits: ['selectCreate'],
    data() {
      return {
        loggedIn: false,
        currentUser: "",
        form: {
          username: "",
          password: "",
        },
      }
    },
    async mounted() {
        let userinfo = JSON.parse(localStorage.getItem('user'));
        if (userinfo != null) {
          this.loggedIn = true;
          this.currentUser = userinfo.username;
        }
        setAuthTokenHeader();
    },
    methods: {
        selectCreate() {
            this.$emit('selectCreate');
        },
        async onLogin() {
            try {
              let response = await axios.post("/api/users/login", {
                username: this.form.username,
                password: this.form.password
              }, {});
              this.form.username = "";
              this.form.password = "";
              localStorage.setItem('user', JSON.stringify(response.data));
              this.currentUser = response.data.username;
              this.loggedIn = true;
              setAuthTokenHeader();
            } catch(error) {
              console.log("Unauthorized");
            }
        },
        onLogout() {
            localStorage.removeItem('user');
            this.loggedIn = false;
            this.currentUser = "";
        }
    },
    template: "#auth",
};