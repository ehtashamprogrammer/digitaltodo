export default {
  computed: {

    params() {
      return {
        ...this.filters,
        page: this.paginator.current_page,
        per_page: this.paginator.per_page
      }
    },

    paginationLinks() {
      const paginator = this.paginator;
      const current = paginator.current_page;
      const totalPages = paginator.pages;
      let links = [];


      if (current !== 1) {
        links.push({
          label: 1,
          page: 1
        })
      }

      if (current > 1) {
        for (let i = -4; i < 0; i++) {
          if (current + i <= 1)
            continue;
          if (i === -4 && current > 3) {
            links.push({
              label: '...',
              page: null
            })
          }
          else {
            links.push({
              label: current + i,
              page: current + i
            })
          }
        }
      }

      links.push({
        label: current,
        page: current
      })


      if (current < totalPages) {
        for (let i = 0; i < 4; i++) {
          if (i + current + 1 >= totalPages)
            break;
          if (i === 3) {
            links.push({
              label: '...',
              page: null
            })
          }
          else {
            links.push({
              label: i + current + 1,
              page: i + current + 1
            })
          }
        }
      }

      if (current !== totalPages) {
        links.push({
          label: paginator.pages,
          page: paginator.pages
        })
      }


      return links;

    },

  },

  watch: {
    filters:{
      handler: function (_old, _new) {
        this.paginator.current_page = 1;
        this.paginator.from = null;
        this.paginator.to = null;
      },
      deep: true,
      immediate: false
    },
    params: {
      handler: function (_old, _new) {
        this.get();
      },
      deep: true,
      immediate: false
    },
  },

  methods:{

    createPagination(response){
      const paginator = response.data.paginator;
      this.api.items = paginator.data;
      this.formats = paginator.data.format;

      Object.keys(this.paginator).forEach((key) => {
        if (paginator.hasOwnProperty(key))
          this.paginator[key] = paginator[key];
      })
      this.paginator.pages = Math.ceil(this.paginator.total / this.paginator.per_page);
    },


    nextPage() {
      if (this.paginator.current_page < this.paginator.pages) {
        this.paginator.current_page++;
      }
    },
    previousPage() {
      if (this.paginator.current_page > 1) {
        this.paginator.current_page--;
      }
    },
    updateFilters($filters){
      this.filters = $filters;
    },
  }

}
