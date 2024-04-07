export const currentpost = {
    props: ['currentPostId'],
    emits: ['closeCurrent', 'openCurrent'],
    data() {
      return {
        selectedPost: {
            title: "",
            content: "",
            author: "",
            date: ""
        },
      }
    },
    methods: {
        closeCurrent() {
            this.$emit('closeCurrent');
        },
        openCurrent() {
            this.$emit('openCurrent');
        }
    },
    watch: {
        async currentPostId() {
            const response = await axios.get(`api/posts/${this.currentPostId}`);
            this.selectedPost.title = response.data.title;
            this.selectedPost.content = response.data.content;
            this.selectedPost.author = response.data.author;
            this.selectedPost.date = response.data.date;
            this.openCurrent();
        }
    },
    template: "#currentpost",
  }
  