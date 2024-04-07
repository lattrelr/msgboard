export const main = {
  data() {
    return {
      posts: [],
      showModal: false,
      showCreate: false,
      showNewUser: false,
      showPosts: true,
      showCurrent: false,
      currentPostId: "",
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
      this.currentPostId = event.currentTarget.dataset.post;
      console.log( `Opening ${this.currentPostId}`);
    },
    closeCurrent() {
      this.showCurrent = false;
      this.currentPostId = "";
      this.showPosts = true;
    },
    openCurrent() {
      this.showPosts = false;
      this.showCurrent = true;
    }
  },
}
