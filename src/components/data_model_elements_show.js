import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchDataModelElement } from '../actions/index';
import { deleteDataModelElement } from '../actions/index';
import { Link } from 'react-router';

class DataModelElementsShow extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchDataModelElement(this.props.params.id);
    }

    onDeleteClick() {
        console.log('deleting data model element');
        this.props.deleteDataModelElement(this.props.params.id).then(() => {
            // blog post successfully deleted (promised has completed, this is the callback.
            // navigate to the list view
            console.log('callback');
            this.context.router.push('/');
        });
    }

    render() {

        const { dataModelElement } = this.props;

        if (!this.props.dataModelElement) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <Link to="/">Back to Index</Link>
                <button
                    className="btn btn-danger pull-right"
                    onClick={this.onDeleteClick.bind(this)}>
                    Delete Data Model Element
                </button>
                <h3>{dataModelElement.name}</h3>
                <h6>Units: {dataModelElement.units.value}</h6>
                <h6>Data Type: {dataModelElement.dataType.value}</h6>
                <p>Description: {dataModelElement.shortDesc}</p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { dataModelElement: state.dataModelElements.element };
}

export default connect(mapStateToProps, { fetchDataModelElement, deleteDataModelElement })(DataModelElementsShow);
