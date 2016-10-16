import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDataModelElements, deleteDataModelElement } from '../actions/index';
import { Link } from 'react-router';

class DataModelElementsIndex extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    // called the first time this component will be added to the DOM
    componentWillMount() {
        this.props.fetchDataModelElements();
    }

    onDeleteClick(id) {
        console.log(this);
        this.props.deleteDataModelElement(id).then(() => {
            // blog post successfully deleted (promised has completed, this is the callback.
            // navigate to the list view
            console.log(this.context.router);

            this.props.fetchDataModelElements();
            //this.context.router.push('/');
        });
        console.log('finished');
    }

    renderDataModelElementList() {
        return this.props.datamodelelements.map((datamodelelement) => {
            return (
               <li className="list-group-item" key={datamodelelement.id} >
                   <span>
                   <Link to={"datamodel/elements/" + datamodelelement.id} >
                   <strong>{datamodelelement.name} ({datamodelelement.units.value})</strong>
                   </Link>

                   <span style={{marginLeft: 20}}>{datamodelelement.shortDesc}</span>

                   <button
                       className="close pull-right"
                       onClick={this.onDeleteClick.bind(this, datamodelelement.id)}>
                       <span className="glyphicon glyphicon-trash"></span>
                   </button>
                   </span>
               </li>
            );
        });
    }

    render() {
        return (

            <div className="container">

                <div className="pull-right">
                    <Link to="/datamodel/elements/new" className="btn btn-primary">
                        Add a Data Model Element
                    </Link>
                </div>
                <h3>Data Model Elements</h3>
                <ul className="list-group">
                    {this.renderDataModelElementList()}
                </ul>

            </div>
        );
    }
}



// shortcut, with mapDispatchToProps
//export default connect(null, { fetchPosts: fetchPosts })(PostsIndex);

function mapStateToProps(state) {
    return { datamodelelements: state.dataModelElements.all };
}

// add ES6 syntactic sugar
export default connect(mapStateToProps, { fetchDataModelElements, deleteDataModelElement })(DataModelElementsIndex);