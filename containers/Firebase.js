import React from 'react';
import * as firebase from 'firebase';

// TODO put em in .evn file
const firebaseConfig = {
    apiKey: "AIzaSyAJnfn3nFpQvl7gt8yRlZ5J49EKWOGMTkI",
    authDomain: "shadid-13de0.firebaseapp.com",
    databaseURL: "https://shadid-13de0.firebaseio.com",
    projectId: "shadid-13de0",
    storageBucket: "shadid-13de0.appspot.com",
    messagingSenderId: "271658865323",
    appId: "1:271658865323:web:b005af9ed72a536b889dee"
};

const FirebaseContext = React.createContext({});

export const FirebaseContextProvider = (props) => {
    const [state, setState] = React.useState({
        app: null,
        status: 'Red',
        records: null
    });

    React.useEffect(() => {
        if(state.app === null) {
            let app = firebase.initializeApp(firebaseConfig);
            setState({...state, app})
        }
    }, []);

    const getData = async() => {
        const {app} = state;
        app.database().ref('data').once('value', (snap) => {
            setState({...state, records: snap.val()});
        })
    }

    const deleteData = async() => {
      const {app} = state;
      app.database().ref('data').remove();
    }

    return (
        <FirebaseContext.Provider
          value={{
            ...state,
            getData: getData,
            deleteData: deleteData
          }}
        >
          {props.children}
        </FirebaseContext.Provider>
    )
}

// create the consumer as higher order component
export const withFirebaseContext = ChildComponent => props => (
    <FirebaseContext.Consumer>
      {
        context => <ChildComponent {...props} firebase={context}  />
      }
    </FirebaseContext.Consumer>
  );
