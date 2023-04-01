import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Slider from "./Image-Silder";
const Routes = (props)=>{
    <Router>
        <Route exact path ="/" component={Slider} />
    </Router>
};
export default Routes;