import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('header KEY', '')

            return headers
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () =>'/charts/world' }),
        getSongsByGenre: builder.query({ query: (genre) => `/charts/genre-world?genre_code=${genre}`}),
        getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${songid}`}),
        getSongsRelated: builder.query({ query: ({ songid }) => `/tracks/related?track_id=${songid}` }),
        getArtistsDetails: builder.query({ query: (artistId) =>`/artists/details?artist_id=${artistId}` }),
        getSongsByCountry: builder.query({ query: (countryCode) => `/charts/country?country_code=${countryCode}` }),
        getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}` })
    })
})

export const {
    useGetTopChartsQuery,
    useGetSongsByGenreQuery,
    useGetSongDetailsQuery,
    useGetSongsRelatedQuery,
    useGetArtistsDetailsQuery,
    useGetSongsByCountryQuery,
    useGetSongsBySearchQuery
} = shazamCoreApi;