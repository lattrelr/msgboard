export const main = {
  data() {
    return {
      posts: [],
      selectedTitle: "",
      selectedContent: "",
      showModal: false,
      showPosts: true,
      showCurrent: false,
      newTitle: "",
      newContent: "",
    }
  },
  async mounted() {
    const response = await axios.get('api/posts')
    this.posts = response.data
  },
  methods: {
    selectCreate() {
      this.showModal = true;
    },
    // TODO post create in new component for modal!
    async submitPost() {
      let response = await axios.post("/api/posts", {
        title: this.newTitle,
        content: this.newContent
      }, {});
      this.showModal = false;
      this.newTitle = "";
      this.newContent = "";
      response = await axios.get("api/posts");
      this.posts = response.data;
    },
    selectPost(event) {
      this.showPosts = false;
      let currentPost = this.posts[event.target.dataset.post - 1];
      this.selectedTitle = currentPost.title;
      this.selectedContent = currentPost.content;
      this.showCurrent = true;
    },
    selectCurrent() {
      this.showCurrent = false;
      this.showPosts = true;
    },
    closeModal() {
      this.showModal = false;
    }
  },
}
