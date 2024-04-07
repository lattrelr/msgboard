export const main = {
  data() {
    return {
      posts: [],
      selectedPost: {
        title: "aaa",
        content: "bbbccc",
        author: "ccc",
        date: "ddd",
      },
      showModal: false,
      showCreate: false,
      showNewUser: false,
      showPosts: true,
      showCurrent: false,
      count: 0,
    }
  },
  async mounted() {
    const response = await axios.get('api/posts')
    this.posts = response.data
  },
  methods: {
    openModalCreatePost() {
      this.showCreate = true;
      this.showModal = true;
    },
    openModalNewUser() {
      this.showNewUser = true;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.showNewUser = false;
      this.showCreate = false;
    },
    async submitPost() {
      this.showModal = false;
      this.showCreate = false;
      const response = await axios.get('api/posts')
      this.posts = response.data
    },
    submitUser() {
      this.showModal = false;
      this.showNewUser = false;
    },
    async selectPost(event) {
      this.showPosts = false;
      const response = await axios.get(`api/posts/${event.currentTarget.dataset.post}`);
      this.selectedPost.title = response.data.title;
      this.selectedPost.content = response.data.content;
      this.selectedPost.author = response.data.author;
      this.selectedPost.date = response.data.date;
      this.showCurrent = true;
    },
    selectCurrent() {
      this.showCurrent = false;
      this.showPosts = true;
    },
  },
}
