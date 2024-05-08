<script setup>
import { NDKEvent } from "@nostr-dev-kit/ndk"
import { BlossomClient } from "blossom-client-sdk"
import { useNdkStore } from '~/stores/Ndk'
import { useUserStore } from '~/stores/User'

const NdkStore = useNdkStore()
const UserStore = useUserStore()

const Blobs = ref()
const BlossomClientRef = ref()

/**
 *
 * @param event
 * @returns {Promise<{sig: string}>}
 */
async function signer(event) {
  return await window.nostr.signEvent(event);
}

/**
 * Init BlossomClient.
 *
 * @returns {Promise<void>}
 */
const initBlossomClient = async () => {
  BlossomClientRef.value = new BlossomClient('https://nstore.nostrver.se', signer)
}

/**
 * List all blobs.
 *
 * @returns {Promise<BlobDescriptor[]>}
 */
const listBlobs = async () => {
  try {
    if (!UserStore.signedIn) {
      throw 'You need to login first'
    }
    const blobs = await BlossomClientRef.value.listBlobs(UserStore.pubkey)
    // Sort list of blobs to the newest first.
    blobs.sort((a,b) => {
      return b.created - a.created
    })
    return blobs
  } catch (e) {
    console.log(e)
  }
}

/**
 * Upload a selected file as a blob.
 *
 * @returns {Promise<void>}
 */
const uploadBlob = async () => {
  try {
    // Trigger input file element
    const inputFile = document.createElement('input')
    inputFile.type = 'file'
    inputFile.click()
    inputFile.onchange = async e => {
      const file = e.target.files[0]
      // Using the Javascript way with NDK.
      // Create and sign an upload event with NDK
      const uploadEvent = new NDKEvent(NdkStore.ndk)
      uploadEvent.kind = 24242
      uploadEvent.created_at = Math.floor(Date.now() / 1000)
      uploadEvent.pubkey = UserStore.pubkey
      uploadEvent.content = 'Upload ' + file.name
      uploadEvent.tags = [
        ['t', 'upload'],
        ['name', file.name],
        ['size', String(file.size)],
        ['expiration', String(Math.floor(Date.now() / 1000) + 60 * 60)]
      ]
      await uploadEvent.sign(NdkStore.ndk.signer)
      const uploadEventToJSON = await uploadEvent.toNostrEvent()
      const res = await fetch('https://nstore.nostrver.se/upload', {
         method: "PUT",
         body: file,
         headers: { authorization: "Nostr " + btoa(JSON.stringify(uploadEventToJSON)) },
      });
      if (res.ok) {
        const body = await res.json()
        console.log(body)
        // Reload list with blobs after successful upload
        Blobs.value = await listBlobs()
        alert(`Upload succeeded ${body.url}`)
      } else {
        throw(res.statusText)
      }

      // Using the uploadBlob() method of the BossomClient.
      // const uploadAuthEvent = await BlossomClientRef.value.getUploadAuth(file, 'Upload ' + file.name)
      // const resBC = await BlossomClientRef.value.uploadBlob(file, uploadAuthEvent)
      // Blobs.value = await listBlobs()
      // alert(`Upload succeeded ${resBC.url}`)
    }
  } catch (e) {
    console.log(e)
    alert(e)
  }
}

/**
 * Init function.
 */
onMounted(async () => {
  await NdkStore.initNdk()
  await NdkStore.ndk.connect()
  await initBlossomClient()
  Blobs.value = await listBlobs()
})

</script>

<template>
  <div>
    <p class="mb-4">
      This is a quick demo how to get and list files with <NuxtLink to="/event/naddr1qqxkymr0wdek7mfdv3exjan9qgszv6q4uryjzr06xfxxew34wwc5hmjfmfpqn229d72gfegsdn2q3fgrqsqqqa28e4v8zy">Blossom</NuxtLink>.
      <br />
      Using the node package <a href="https://github.com/hzrd149/blossom-client-sdk" target="_blank">https://github.com/hzrd149/blossom-client-sdk</a> which you can install with <code>npm install blosson-client-sdk</code>
      <br />
      Documentation: <a href="https://hzrd149.github.io/blossom-client-sdk/index.html" target="_blank">https://hzrd149.github.io/blossom-client-sdk/index.html</a>
    </p>
    <div v-if="Blobs">
      Showing blobs stored at <a :href="`${BlossomClientRef.server}`" target="_blank">{{ BlossomClientRef.server }}</a> from your pubkey <code>{{ UserStore.pubkey }}</code>:
      <button @click="uploadBlob" class="block text-purple-500 my-6 p-2 mx-auto bg-purple-100 hover:bg-purple-200">Click here to upload a new file to {{ BlossomClientRef.server }}</button>
      <div class="grid grid-cols-3">
        <div v-for="(blob) in Blobs">
          <a :href="`${ blob.url}`" target="_blank" v-if="blob.type.startsWith('image/')">
            <img :src="`${blob.url}`" class="w-64" :alt="`${blob.sha256}`" />
          </a>
          <a href="#" target="_blank" v-else>{{ blob.sha256 }}</a>
        </div>
      </div>
    </div>
    <div v-else>
      <NuxtLink to="/login" class="block text-purple-500 mt-6 p-2 mx-auto bg-purple-100 hover:bg-purple-200">
        You need to login first to show all your blobs from https://nstore.nostrver.se
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

</style>