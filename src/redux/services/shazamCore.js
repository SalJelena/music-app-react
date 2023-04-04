import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('', '')

            return headers
        }
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () =>'/charts/world' }),
        getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${songid}`}),
        getSongsRelated: builder.query({ query: ({ songid }) => `/tracks/related?track_id=${songid}` }),
        getArtistsDetails: builder.query({ query: (artistId) =>`/artists/details?artist_id=${artistId}` })
    })
})

export const {
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
    useGetSongsRelatedQuery,
    useGetArtistsDetailsQuery
} = shazamCoreApi;