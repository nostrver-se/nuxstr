<script type="module">
  useHead({
    script: [
      { src: 'https://cdn.jsdelivr.net/npm/nostr-web-components/dist/index.js' }
    ]
  })

</script>

<template>
  <div>
    <h1 class="text-3xl">Sandbox with Nostr Web Components</h1>
    <p>
      Source: <a href="https://git.fiatjaf.com/nostr-web-components">https://git.fiatjaf.com/nostr-web-components</a><br />
      Package info: <a href="https://www.npmjs.com/package/nostr-web-components">https://www.npmjs.com/package/nostr-web-components</a>
    </p>
    <hr class="my-4" />
    <!-- Sebastix: npub1qe3e5wrvnsgpggtkytxteaqfprz0rgxr8c3l34kk3a9t7e2l3acslezefe -->
    <h2>nostr-name</h2>
    <p class="text-2xl">
      <nostr-name pubkey="npub1qe3e5wrvnsgpggtkytxteaqfprz0rgxr8c3l34kk3a9t7e2l3acslezefe"></nostr-name>
    </p>
    <h2>nostr-picture</h2>
    <p>
      <nostr-picture pubkey="npub1qe3e5wrvnsgpggtkytxteaqfprz0rgxr8c3l34kk3a9t7e2l3acslezefe"></nostr-picture>
    </p>
    <h2>nostr-user-search</h2>
    <p>
      <nostr-user-search placeholder="Search for a Nostr user here"></nostr-user-search>
    </p>
    <h2>nostr-event-json</h2>
    <pre>
      <code>
        <nostr-event-json id="nevent1qvzqqqqqqypzqpnrnguxe8qszsshvgkvhn6qjzxy7xsvx03rlrtddr62haj4lrm3qyd8wumn8ghj7urewfsk66ty9enxjct5dfskvtnrdakj7qghwaehxw309aex2mrp0yh8qunfd4skctnwv46z7qpqvg002ap6nh7ylvfar5etqjphlaq092vvlwlykp0zsst2wy4t573q2r44wl"></nostr-event-json>
      </code>
    </pre>
  </div>
</template>

<style scoped>
  nostr-user-search::part(input) {
    @apply w-96 text-xl;
  }
  nostr-picture::part(img) {
    @apply w-24 h-24;
  }
</style>