import React from "react"

import { BrowserRouter, Route, Switch} from "react-router-dom"

import Home from "./pages/Home"
import Register from "./pages/Register"
import Edit from "./pages/Edit";
import Consult from "./pages/Consult";

const Routes = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/cadastro" component={Register}/>
        <Route path="/editar" component={Edit}/>
        <Route path="/consultar" component={Consult}/>
      </Switch>
    </BrowserRouter>
    )
}

export default Routes;