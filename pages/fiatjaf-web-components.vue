<script type="module">
  // import all
  import './node_modules/nostr-web-components/dist/index.js'
  // or separate
  // import './node_modules/nostr-web-components/dist/nostr-name.js'
  // import './node_modules/nostr-web-components/dist/nostr-picture.js'
  // import './node_modules/nostr-web-components/dist/nostr-user-search.js'
  // import './node_modules/nostr-web-components/dist/nostr-event-json.js'
</script>

<template>
  <div>
    <h1 class="text-3xl">Sandbox with Nostr Web Components</h1>
    <p>
      Source: <a href="https://git.fiatjaf.com/nostr-web-components">https://git.fiatjaf.com/nostr-web-components</a><br />
      Package info: <a href="https://www.npmjs.com/package/nostr-web-components">https://www.npmjs.com/package/nostr-web-components</a>
      <br />
      You can install this package as a node module in your Vue project with <code>npm i nostr-web-components</code>.
      <br />
      Just import the web components like this.
    </p>
    <pre>
      <code>
        // import all
        import './node_modules/nostr-web-components/dist/index.js'
        // or separate
        //import './node_modules/nostr-web-components/dist/nostr-name.js'
        //import './node_modules/nostr-web-components/dist/nostr-picture.js'
        //import './node_modules/nostr-web-components/dist/nostr-user-search.js'
        //import './node_modules/nostr-web-components/dist/nostr-event-json.js'
      </code>
    </pre>
    <p>
      In Nuxt (or Vue) you also need to define the components as a custom element in <code>nuxt.config.js</code> or <code>vite.config.js</code>,
      otherwise you will get the Vue warning message in your browser console error <code>[Vue warn]: Failed to resolve component: [the-component-name]</code>.
      A snippet from the <code>nuxt.config.js</code> file of this Nuxt project:
    </p>
    <pre>
      <code>
        vite: {
          vue: {
            template: {
            compilerOptions: {
                // Tell Vite that all components starting with "nostr-" are web components
                isCustomElement: (tag) => tag.startsWith('nostr-')
              }
            }
          }
        }
      </code>
    </pre>
    <!-- Sebastix: nprofile1qqsqvcu68pkfcyq5y9mz9n9u7sys33835rpnuglc6mtg7j4lv40c7ugfe0raa -->
    <h2>nostr-name</h2>
    <p class="text-2xl">
      <nostr-name pubkey="nprofile1qqsqvcu68pkfcyq5y9mz9n9u7sys33835rpnuglc6mtg7j4lv40c7ugfe0raa"></nostr-name>
    </p>
    <h2>nostr-picture</h2>
    <p>
      <nostr-picture pubkey="nprofile1qqsqvcu68pkfcyq5y9mz9n9u7sys33835rpnuglc6mtg7j4lv40c7ugfe0raa"></nostr-picture>
    </p>
    <h2>nostr-user-search</h2>
    <p>
      <nostr-user-search placeholder="Search for a Nostr user here"></nostr-user-search>
    </p>
    <h2>nostr-event-json</h2>
    <pre>
      <code>
        <nostr-event-json id="nevent1qqsw33vp35955mdz00wrg9mpr93gv9ppvrvyl5unwev3ljw9w4udaws955v8h"></nostr-event-json>
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