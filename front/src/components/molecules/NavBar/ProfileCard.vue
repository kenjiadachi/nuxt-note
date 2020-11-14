<template lang="pug">
v-card.mx-0(flat)
  v-card-title
    v-avatar.mr-2.my-1(size="40")
      v-img(:src="image")
    | だちけん
  v-card-text
    | 株式会社ムジカルを設立し、webアプリケーションの開発、webマーケティングを担当しています。
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class CardRow extends Vue {
  image = require('@/assets/img/profile.png')
}
</script>
