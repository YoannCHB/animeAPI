# animeAPI
animeAPI is a js file to get some information on any anime, source: https://kitsu.io

```js
//Simple function
animeAPI(name, function)

//Example
animeAPI('konosuba', function(res){
  console.log(res)
});
```

## All variable
- anime_name
- anime_synopsis
- createdAt
- updatedAt
- endDate
- nextRelease
- anime_type
- anime_status
- anime_pop : popularity
- anime_age : restriction age
- anime_subtype : "TV" for example
- posterImage
- coverImage
- anime_nsfw
- anime_ep : episode count
- anime_youtube
- anime_genre : for example "Magic"
