import {Suspense,useState} from 'react';
import {Route,Switch } from 'react-router-dom';

import MainPage from './views/MainPage/MainPage';
import NavBar   from './views/NavBar/NavBar';

function App() {

  // let [keyword,setKeyword] = useState('temp');

  // const getKeyword = (data) =>{
  //     console.log(data);
  //     keyword = data === ''?'temp':data;
  //     setKeyword(data);
  // }

  return (
    // 데이터를 불러올때까지 기다리도록 하는 기능
    <Suspense fallback = {(<div>Loading....</div>)}>
      <NavBar></NavBar>
      <div style={{paddingTop : '100px',minHeight : 'calc(100vh - 80px)'}}>
      <Switch>
        <Route exact path="/" component={MainPage}/>  
        <Route exact path="/:keyword" component={MainPage}/>  
      </Switch>
      </div>
    </Suspense>
  );
}

export default App;
