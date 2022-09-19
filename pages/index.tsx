import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'
import requests from '../utils/requests'
import { Movie } from '../typings'
import Row from '../components/Row'
interface Props {
  weeklyTrending: Movie[]
  netflixOriginals: Movie[],
  topRated: Movie[],
  actionMovies: Movie[],
  horrorMovies: Movie[],
  comedyMovies: Movie[],
  romanceMovies: Movie[],
  documentaries: Movie[]
}

const Home = ({    
  weeklyTrending,
  netflixOriginals,
  topRated,
  actionMovies,
  horrorMovies,
  comedyMovies,
  romanceMovies,
  documentaries}: Props) => {
  return (
    <div className=' relative h-screen bg-gradient-to-b from-gray900/10 to-[#010511] lg:h-[140vh]'>
      <Head>
        <title>Home - Appflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
        <Banner netflixOriginals={netflixOriginals} />
        <section className=' space-y-16'>
          <Row title="Trending Now" movies={weeklyTrending}/>
          <Row title="Top Rated" movies={topRated}/>
          <Row title="Action Thrillers" movies={actionMovies}/>
          <Row title="Comedies" movies={comedyMovies}/>
          <Row title="Horror Movies" movies={horrorMovies}/>
          <Row title="Romantic Movies" movies={romanceMovies}/>
          <Row title="Documentaries" movies={documentaries}/>
        </section>
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps() {
  const [
    weeklyTrending,
    netflixOriginals,
    topRated,
    actionMovies,
    horrorMovies,
    comedyMovies,
    romanceMovies,
    documentaries
  ] = await Promise.all ([
    fetch (requests.fetchTrending).then((res) => res.json()),
    fetch (requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch (requests.fetchTopRated).then((res) => res.json()),
    fetch (requests.fetchActionMovies).then((res) => res.json()),
    fetch (requests.fetchHorrorMovies).then((res) => res.json()),
    fetch (requests.fetchComedyMovies).then((res) => res.json()),
    fetch (requests.fetchRomanceMovies).then((res) => res.json()),
    fetch (requests.fetchDocumentaries).then((res) => res.json())
  ]) 
  return {
    props: {
      weeklyTrending: weeklyTrending.results,
      netflixOriginals: netflixOriginals.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      horrorMovies: horrorMovies.results,
      comedyMovies: comedyMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results
    }, // will be passed to the page component as props
  }
}