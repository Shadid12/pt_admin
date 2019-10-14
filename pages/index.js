import React from 'react'
import Head from 'next/head'

import {FirebaseContextProvider} from '../containers/Firebase';
import Data from '../components/allData';

const Home = (props) => {
  return (
    <FirebaseContextProvider>
      <div>
        <Head>
          <title>PT Admin</title>
          <link rel='icon' href='/favicon.ico' />
        </Head>
        <Data />
      </div>
    </FirebaseContextProvider>
  )
}

export default Home
