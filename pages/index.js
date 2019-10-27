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
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <Data />
      </div>
    </FirebaseContextProvider>
  )
}

export default Home
