export const main = {
  data() {
    return {
      posts: [],
      selectedTitle: "",
      selectedContent: "",
      showPosts: true,
      showCurrent: false,
    }
  },
  async mounted() {
    const response = await axios.get('api/posts')
    this.posts = response.data
  },
  methods: {
    createPost() {
      
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
    }
  },
}

/*
const checkbox = {
  data() {
    return { checked: false, title: 'Check me' }
  },
  methods: {
    check() { this.checked = !this.checked; }
  }
}
*/