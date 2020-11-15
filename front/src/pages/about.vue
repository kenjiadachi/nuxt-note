<template lang="pug">
v-container.pt-0(fluid)
  Profile
  TimeLine
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TimeLine from '~/components/organisms/TimeLine.vue'
import Profile from '~/components/organisms/Profile.vue'
import headMeta from '~/mixins/headMeta.js'

@Component({
  components: {
    TimeLine,
    Profile,
  },

  mixins: [headMeta],
})
export default class About extends Vue {
  meta = {
    title: 'ABOUT',
    description:
      '株式会社ムジカルで取締役をしています。学生時代に立ち上げたサービスのmusicalu、LiveDeliを通して音楽家の仕事のインフラを作っています。 ほかにも、副業的にフリーランスエンジニアとしても活動しています。 個人のエンパワメントができる仕組み造りに興味があります。',
  }

  async asyncData({ $content, store }) {
    const tagsObj = await $content('articles')
      .where({ isDraft: { $eq: false } })
      .only(['tags'])
      .fetch()
    const alltags = tagsObj
      .map(function(obj) {
        return obj.tags
      })
      .flat()
    const tags = [...new Set(alltags)]
    await store.dispatch('fetchTags', tags)
  }
}
</script>
