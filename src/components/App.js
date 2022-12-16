import Navbar from "./Navbar/Navbar";
import cl from './App.module.scss'
import {BrowserRouter} from "react-router-dom";
import AppRoute from "./AppRoute";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {auth} from "../http/user";
import Loader from "./Loader/Loader";
import {hideLoaderAction} from "../store/appReducer";

function App() {
    const dispatch = useDispatch();
    const loader = useSelector(state => state.app.loader);

    useEffect( () => {
        if (localStorage.getItem('token')) {
            dispatch(auth());
        } else {
            dispatch(hideLoaderAction())
        }
    }, [])

    if (loader) {
        return <Loader />
    }

  return (
      <BrowserRouter>
          <div className={cl.app}>
              <Navbar/>
              <AppRoute/>
          </div>
      </BrowserRouter>
  );
}

export default App;
