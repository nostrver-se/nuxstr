<script setup>
  import { useNdkStore } from '~/stores/Ndk'
  import { NDKEvent } from "@nostr-dev-kit/ndk";
  // @todo Create NDKPlace class...
  // NIP: https://github.com/nostr-protocol/nips/pull/927

  const NdkStore = useNdkStore()

  /**
   * Components properties.
   *
   * @type {Prettify<Readonly<ExtractPropTypes<{id: NumberConstructor, event: {}}>>>}
   */
  let props = defineProps({
    id: Number,
    event: {}
  })

  const place = ref()
  const checkins = ref()

  const getContent = () => {
    return place.value.content;
  }

  /**
   * These content features are fetched from the content field of the event.
   * This stringified JSON string is decoded to a JSON.
   * It's a GeoJSON, see https://geojson.org/ and https://datatracker.ietf.org/doc/html/rfc7946 to learn more about this standard.
   * Example:
   *
   *  {
   *        "type": "FeatureCollection",
   *        "features": [{
   *            "type": "Feature",
   *            "geometry": {
   *                "type": "Point",
   *                "coordinates": [102.0, 0.5]
   *            },
   *            "properties": {
   *                "prop0": "value0"
   *            }
   *        }, {
   *            "type": "Feature",
   *            "geometry": {
   *                "type": "LineString",
   *                "coordinates": [
   *                    [102.0, 0.0],
   *                    [103.0, 1.0],
   *                    [104.0, 0.0],
   *                    [105.0, 1.0]
   *                ]
   *            },
   *            "properties": {
   *                "prop0": "value0",
   *                "prop1": 0.0
   *            }
   *        }, {
   *            "type": "Feature",
   *            "geometry": {
   *                "type": "Polygon",
   *                "coordinates": [
   *                    [
   *                        [100.0, 0.0],
   *                        [101.0, 0.0],
   *                        [101.0, 1.0],
   *                        [100.0, 1.0],
   *                        [100.0, 0.0]
   *                    ]
   *                ]
   *            },
   *            "properties": {
   *                "prop0": "value0",
   *                "prop1": {
   *                    "this": "that"
   *                }
   *            }
   *        }]
   *    }
   *
   */
  const getType = () => {

  }

  const getFeatures = () => {

  }

  const getGeometry = () => {
    // fields:
    // - type:string
    // - coordinates[]
  }

  const getProperties = () => {

  }

  const getName = () => {
    return place.value.dTag; // return the unique identifier of this place
  }

  const getNameUrlSlug = () => {
    const name = place.value.dTag;
    return name.toLowerCase();
  }

  const getgTag = () => {
    // return geohash of place
  }

  /**
   *
   * @param {NDKEvent} place
   * @returns {Promise<void>}
   */
  const fetchCheckIns = async (place) => {
    NdkStore.setExplicitRelays([
      'wss://khatru.nostrver.se',
      'wss://nostr.sebastix.dev'
    ])
    // Get d-tag from place.
    let dTag = '';
    place.tags.forEach((tag) => {
      if (tag[0] === 'd') {
        dTag = tag[1];
      }
    })
    if (dTag !== '') {
      const filter = {
        kinds: [13811],
        // filter on d tag (unique identifier for this specific place) which can be extracted from the a tag
        // or with the provided d tag
        ['#d']: [dTag],
        //['#a']: ['37515:29216785f7b241a6ebbb0f58f3ef882b544dafa3f60cca666aa845c12a636a70:Sebastix']
      }
      /** @var {Set} res */
      const res  = await NdkStore.ndk.fetchEvents(filter)
      checkins.value = res
    }
  }

  onMounted(async () => {
    place.value = new NDKEvent(NdkStore.ndk, props.event)
    await fetchCheckIns(place.value)
  })
</script>

<template>
  <div>
    <div v-if="place">
      <h1>{{ getName() }} (place)</h1>
      Created at: <code>{{ place.created_at }}</code>
      <br />
      <a :href="`https://go.yondar.me/place/${ place.encode() }`" target="_blank">View place with Yondar (Nostr client)</a>
      <br />
      Content:
      <pre>
        <code>{{ getContent() }}</code>
      </pre>
      <br />
      <NuxtLink :to="`/places/${getName()}/checkin`" class="inline-block p-2 bg-purple-100 text-purple-500">Go to check-in page</NuxtLink>
      <br />
      <strong>Latest checkins on this place fetched from <code>wss://khatru.nostrver.se</code></strong>
      <br />
      <div v-if="checkins">
        <div v-for="(checkin) in checkins">
          {{ checkin.created_at }} -
          {{ checkin.content }} by {{ checkin.pubkey }}
        </div>
      </div>
      <div v-else>
        No check-ins found.
      </div>
    </div>
    <div v-else>
      Loading place...
    </div>
  </div>
</template>

<style scoped>
  h1 {
    @apply text-3xl font-bold
  }
</style>