import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import Orphanage from './pages/Orphanage';
import OrphanageCreate from './pages/CreateOrphanage';
import OrphanagesMap from './pages/OrphanagesMap'
import Login from './pages/Login';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanage/create" component={OrphanageCreate} />
                <Route path="/orphanage/:id" component={Orphanage} />
                
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;