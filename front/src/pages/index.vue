<template lang="pug">
v-container.pt-0(fluid)
  Cards(:articles='articles')
  Pagenation(:hasPrevPage='hasPrevPage', :hasNextPage='hasNextPage', @gotoPrevPage='gotoPrevPage', @gotoNextPage='gotoNextPage')
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Cards from '~/components/organisms/Cards.vue'
import Pagenation from '~/components/organisms/Pagenation.vue'
import headMeta from '~/mixins/headMeta.js'

@Component({
  components: {
    Cards,
    Pagenation,
  },
  watchQuery: ['page', 'tag'],
  mixins: [headMeta],
})
export default class Index extends Vue {
  meta = {
    title: 'HOME',
    description: 'ロキソニンとカフェインからこれらの記事は錬成されています',
  }

  async asyncData({ $content, query, store }) {
    const PER_PAGE = 24
    const PAGE = parseInt(query.page) || 1
    const articles = query.tag
      ? await $content('articles')
          .only(['title', 'path', 'tags', 'image', 'description'])
          .sortBy('createdAt', 'desc')
          .where({ tags: { $contains: query.tag }, isDraft: { $eq: false } })
          .skip(PER_PAGE * (PAGE - 1))
          .limit(PER_PAGE)
          .fetch()
      : await $content('articles')
          .only(['title', 'path', 'tags', 'image', 'description'])
          .sortBy('createdAt', 'desc')
          .where({ isDraft: { $eq: false } })
          .skip(PER_PAGE * (PAGE - 1))
          .limit(PER_PAGE)
          .fetch()
    const tagsObj = await $content('articles')
      .only(['tags'])
      .fetch()
    const alltags = tagsObj
      .map(function(obj) {
        return obj.tags
      })
      .flat()
    const tags = [...new Set(alltags)]
    await store.dispatch('fetchTags', tags)
    const hasPrevPage = PAGE !== 1
    const hasNextPage = articles.length === PER_PAGE

    return { articles, hasPrevPage, hasNextPage }
  }

  gotoPrevPage() {
    this.$router.push({ path: '/', query: { page: parseInt(this.$route.query.page) - 1 } })
  }

  gotoNextPage() {
    if (this.$route.query.page) {
      this.$router.push({ path: '/', query: { page: parseInt(this.$route.query.page) + 1 } })
    } else {
      this.$router.push({ path: '/', query: { page: 2 } })
    }
  }
}
</script>
