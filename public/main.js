export const main = {
  data() {
    return {
      posts: [],
      selectedTitle: "",
      selectedContent: "",
      showModal: false,
      showPosts: true,
      showCurrent: false,
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
    closeModal() {
      this.showModal = false;
    },
    async submitPost() {
      this.showModal = false;
      const response = await axios.get('api/posts')
      this.posts = response.data
    },
    selectPost(event) {
      this.showPosts = false;
      let currentPost = this.posts[event.target.dataset.post];
      this.selectedTitle = currentPost.title;
      this.selectedContent = currentPost.content;
      this.showCurrent = true;
    },
    selectCurrent() {
      this.showCurrent = false;
      this.showPosts = true;
    },
  },
}
