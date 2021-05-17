<template>
    <div>
        <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" :class="{'disabled':!pages.has_pre}">
                    <a class="page-link" href="#" aria-label="Previous" @click.prevent="emitPage(pages.current_page-1)">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                    </li>
                    <li :class="{'active':pages.current_page === page}" class="page-item" v-for="page in pages.total_pages" :key="page">
                        <a class="page-link" href="#" @click.prevent="emitPage(page)">{{page}}</a>
                    </li>
                    <li class="page-item" :class="{'disabled':!pages.has_next}"
                     @click.prevent="emitPage(pages.current_page+1)">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                    </li>
                </ul>
        </nav>
    </div>
</template>
<script>
export default {
  props: ['pages'],
  methods: {
    emitPage (page) {
      this.$emit('handle', page)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
