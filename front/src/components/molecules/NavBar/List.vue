<template lang="pug">
v-list.pb-0(dense nav flat)
  ListItemWithIcon(v-for="item in items" :key="item.title" @click='gotoItemPage' :item='item')
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ListItemWithIcon from '~/components/atoms/ListItemWithIcon.vue'

@Component({
  components: {
    ListItemWithIcon,
  },
})
export default class NavBarList extends Vue {
  items = [
    {
      title: 'HOME',
      icon: 'mdi-home',
      url: '/',
      color: '#808080',
    },
    {
      title: 'ABOUT',
      icon: 'mdi-account',
      url: '/about',
      color: '#808080',
    },
  ]

  gotoItemPage(url: string) {
    this.$router.push({ path: url })
  }
}
</script>
