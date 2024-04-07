export const postlist = {
  props: ['postRefresh'],
  emits: ['selectPost'],
  data() {
    return {
      posts: [],
    }
  },
  async mounted() {
    this.loadPosts();
  },
  methods: {
    async loadPosts() {
      const response = await axios.get('api/posts')
      this.posts = response.data
    },
    selectPost(event) {
      const postId = event.currentTarget.dataset.post;
      this.$emit("selectPost", postId);
    },
  },
  watch: {
    postRefresh() {
      this.loadPosts();
    }
},
  template: "#postlist",
}
