export const currentpost = {
    props: ['currentPostId'],
    emits: ['closeCurrent', 'openCurrent'],
    data() {
      return {
        selectedPost: {
            title: "",
            content: "",
            author: "",
            date: "",
            replies: []
        },
        form: {
            newContent: ""
        }
      }
    },
    methods: {
        closeCurrent() {
            this.$emit('closeCurrent');
            this.selectedPost.title = "";
            this.selectedPost.content = "";
            this.selectedPost.author = "";
            this.selectedPost.date = "";
            this.selectedPost.replies = [];
        },
        async submitReply() {
            try {
                let response = await axios.post("/api/replies", {
                    postId: this.currentPostId,
                    content: this.form.newContent
                }, {});
                this.form.newContent = "";
                this.loadPost();
              } catch (error) {}
        },
        async loadPost() {
            const response = await axios.get(`api/posts/${this.currentPostId}`);
            this.selectedPost.title = response.data.title;
            this.selectedPost.content = response.data.content;
            this.selectedPost.author = response.data.author;
            this.selectedPost.date = response.data.date;
            this.selectedPost.replies = response.data.replies;
        }
    },
    watch: {
        currentPostId() {
            if (this.currentPostId != "") {
                this.loadPost();
                this.$nextTick(() => {
                    this.$emit('openCurrent');
                });
            }
        }
    },
    template: "#currentpost",
  }
  