export default {
  head() {
    const head = { meta: [] }
    if (this.meta.title) {
      const title = this.meta.title
      head.title = title
      head.meta.push({ hid: 'og:title', property: 'og:title', content: title })
    }
    if (this.meta.description) {
      head.meta.push({ hid: 'description', name: 'description', content: this.meta.description })
      head.meta.push({ hid: 'og:description', property: 'og:description', content: this.meta.description })
    }
    if (this.meta.image) {
      head.meta.push({ hid: 'og:image', property: 'og:image', content: this.meta.image })
    }
    return head
  },
}
