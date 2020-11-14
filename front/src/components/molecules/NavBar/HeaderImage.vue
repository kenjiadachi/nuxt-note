<template lang="pug">
v-card.mx-0(flat)
  v-layout.pt-4(justify-center)
    v-img(:src="image" max-width='10rem')
  v-layout.py-2(justify-center)
    p.caption.text--secondary.text-center 
      | ロキソニンとカフェインから
      br
      | これらの記事は錬成されています
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class NavBarHeaderImage extends Vue {
  image = require('@/assets/img/cpx.png')
}
</script>
