# Nuxt + Nostr = Nuxstr
> Starter template for building a Nostr client with the Nuxt Vue framework and Nostr Dev Kit.

What's included in this repo?
+ Nuxt: https://nuxt.com/
+ Pinia module: https://nuxt.com/modules/pinia
+ PWA module: https://nuxt.com/modules/vite-pwa-nuxt
+ TailwindCSS: https://nuxt.com/modules/tailwindcss
+ Nostr Dev Kit (NDK): https://github.com/nostr-dev-kit/ndk
+ SVG icons used from [hericons](https://heroicons.com/)

## Demo

Visit https://nuxstr.nostrver.se

## Learning resources

Learn more about Nuxt: https://nuxt.com  
Explore Nuxt modules: https://nuxt.com/modules  
Learn more about Nostr: https://nostr.how  
NDK documentation: https://ndk.fyi/docs/ 
Nostr NIPs, kinds and tags: https://nostr-nips.com/  
Explore Nostr clients: https://nostrapp.link/apps/category/all  
Get familiar with designing for Nostr: https://nostrdesign.org

## Roadmap
- [x] State management: add NDK store with [Pinia](https://nuxt.com/modules/pinia)
- [ ] Global feed example
- [ ] Personal feed example with content from the npubs you follow
- [x] Integrate [vite-pwa-nuxt](https://nuxt.com/modules/vite-pwa-nuxt)
- [x] Integrate [TailwindCSS](https://nuxt.com/modules/tailwindcss)
- [x] Add layout / page [transitions](https://nuxt.com/docs/getting-started/transitions#layout-transitions) 
- [x] Add a basic responsive design with a header, navigation, main and footer element
- [x] State management: add a user store with Pinia
- [x] Login with extension [NIP-07](https://nostr-nips.com/nip-07)
- [ ] Login with Wallet Connect [NIP-46](https://nostr-nips.com/nip-46)
- [ ] Relay settings and preferences
- [x] A basic profile page
- [ ] Logout / disconnect
- [ ] Download / backup all your events
- [x] Kind `1` component short text note
- [x] Kind `30023` component for long-form content
- [x] Render identifiers in content fields [NIP-19](https://nostr-nips.com/nip-19) 
- [ ] Zap example
- [ ] Implement a form of state management which can be shared through Nostr events (kind 30078)
- [ ] Implement push notifications with the Web Push API
- [ ] Implement NIP-52
- [ ] Compose a note with the [Nostr WYSIWYG editor](https://github.com/cesardeazevedo/nostr-editor) made by Cesar

## PWA config
* https://dev.to/karmasakshi/make-your-pwas-look-handsome-on-ios-1o08

## Deployment

See https://nuxt.com/docs/getting-started/deployment#static-hosting
```bash
# Build as static website
npm run generate
```
You can now deploy .output/public to any static hosting!

Also make sure to read https://vite-pwa-org.netlify.app/deployment/ to setup your server correctly and benefit from all the provided PWA features. 

## How to contribute

1. Create an issue
2. Create a pull request from your forked repo
3. Just send me a message

## About the author

Sebastian Hagens is a self-employed creative technologist working as a Drupal & fullstack webdeveloper and tech consultant.

**Follow Sebastian on Nostr**  
Pubkey: `npub1qe3e5wrvnsgpggtkytxteaqfprz0rgxr8c3l34kk3a9t7e2l3acslezefe`      
Handle: `sebastian@sebastix.dev`

## License
See LICENSE.txt  
https://unlicense.org

## Donations / funding

Between my fiat mining work as a developer I spend time building things for the nostrverse.

You are free to send some sats:  
* bitcoin: `bc1p3p6jq2sxsf650lgllv57st9h97xj37fflg5t8d265saz6yqzcdyqd7pzun`  
* lightning address: `sebastian@lnd.sebastix.com`
* Nostr: `npub1qe3e5wrvnsgpggtkytxteaqfprz0rgxr8c3l34kk3a9t7e2l3acslezefe` / `sebastian@sebastix.dev`