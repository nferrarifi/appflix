export interface Movie {
    backdrop_path: string,
    id: number,
    title: string,
    original_language: string,
    original_title: string,
    overview: string
    poster_path: string
    media_type: string
    genre_ids: number[]
    popularity: number
    release_date: string
    vote_average: number
    vote_count: number
    original_country: []
    name: string
}

export interface Genre {
    id: number
    name: string
}

export interface Element {
    type:
    | 'Bloopers'
    | 'Featurette'
    | 'Behind the scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser'
}