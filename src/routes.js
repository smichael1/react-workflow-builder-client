import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import DataModelElementsIndex from './components/data_model_elements_index';
import DataModelElementsNew from './components/data_model_elements_new';
import DataModelElementsShow from './components/data_model_elements_show';



export default (
    <Route path="/" component={App} >
        <IndexRoute component={DataModelElementsIndex} />
        <Route path="/datamodel/elements/new" component={DataModelElementsNew} />
        <Route path="datamodel/elements/:id" component={DataModelElementsShow} />
    </Route>
);

// this.props.params.id --> :id