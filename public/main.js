export const main = {
  data() {
    return {
      showModal: false,
      showCreate: false,
      showNewUser: false,
      showPosts: true,
      showCurrent: false,
      currentPostId: "",
      postRefresh: false,
    }
  },
  mounted() {
    // TBD
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
      this.refreshPostList();
    },
    submitUser() {
      this.showModal = false;
      this.showNewUser = false;
    },
    selectPost(postId) {
      this.currentPostId = postId;
    },
    closeCurrent() {
      this.showCurrent = false;
      this.currentPostId = "";
      this.refreshPostList();
      this.showPosts = true;
    },
    openCurrent() {
      this.showPosts = false;
      this.showCurrent = true;
    },
    refreshPostList() {
      // Force a change in this value to trigger the watcher
      // in the post list component.
      this.postRefresh = !this.postRefresh;
    }
  },
}
