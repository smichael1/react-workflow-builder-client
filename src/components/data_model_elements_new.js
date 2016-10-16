import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {createDataModelElement, fetchDataTypes, fetchUnits} from '../actions/index';
import { Link } from 'react-router';

class DataModelElementNew extends Component {

    // lecture 89?
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        this.props.fetchDataTypes();
        this.props.fetchUnits();
    }

    onSubmit(props) {

        var metadata = {unitsEnum: this.props.unitsEnum, dataTypesEnum: this.props.dataTypesEnum};

        this.props.createDataModelElement(props, metadata)
            .then(() => {
            // blog post successfully created (promised has completed, this is the callback.
            // navigate to the list view
            this.context.router.push('/');
        });
    }


    renderUnitsOptions() {

        return this.props.unitsEnum.map((units) => {
            return (
                <option value={units.id} key={units.id}>{units.value}</option>
            );
        });
    }

    renderDataTypeOptions() {

        return this.props.dataTypesEnum.map((dataType) => {
            return (
                <option value={dataType.id} key={dataType.id}>{dataType.value}</option>
            );
        });
    }


    render() {
        const { handleSubmit } = this.props;
        // same as writing const handleSubmit = this.props.handleSubmit;
        const { fields: { name, units, dataType, shortDesc, longDesc }} = this.props;

       return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <h3>Create a New Data Model Element</h3>

                <div className={`form-group ${name.touched && name.invalid ? 'has-danger' : ''}`} >
                    <label>Name</label>
                    <input type="text" className="form-control" {...name} />
                </div>
                <div className="text-help">
                    {name.touched ? name.error : ''}
                </div>

                <div className={`form-group ${shortDesc.touched && shortDesc.invalid ? 'has-danger' : ''}`} >
                    <label>Short Description</label>
                    <input type="text" className="form-control" {...shortDesc} />
                </div>
                <div className="text-help">
                    {shortDesc.touched ? shortDesc.error : ''}
                </div>

                <div className={`form-group ${longDesc.touched && longDesc.invalid ? 'has-danger' : ''}`} >
                    <label>Full Description</label>
                    <textarea className="form-control" {...longDesc} />
                </div>
                <div className="text-help">
                    {longDesc.touched ? longDesc.error : ''}
                </div>

                <div className={`form-group ${dataType.touched && dataType.invalid ? 'has-danger' : ''}`} >
                    <label>Data Type</label>

                    <select className="form-control" {...dataType}>
                        {this.renderDataTypeOptions()}
                    </select>

                </div>
                <div className="text-help">
                    {dataType.touched ? dataType.error : ''}
                </div>

                <div className={`form-group ${units.touched && units.invalid ? 'has-danger' : ''}`} >
                    <label>Units</label>

                    <select className="form-control" {...units}>
                        {this.renderUnitsOptions()}
                    </select>

                </div>
                <div className="text-help">
                    {units.touched ? units.error : ''}
                </div>


                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.name) {
        errors.name = 'Enter a username';
    }
    if (!values.units) {
        errors.units = 'Enter units';
    }
    if (!values.dataType) {
        errors.dataType = 'Enter data type';
    }
    if (!values.shortDesc) {
        errors.shortDesc = 'Enter a short description';
    }
    if (!values.longDesc) {
        errors.longDesc = 'Enter a full description';
    }
    return errors;
}



// reduxForm also acts like connect
// connect: first arg is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: first arg is config, then mapStateToProps, 3rd is mapDispatchToProps
DataModelElementNew = reduxForm({
    form: 'PostsNewForm',
    fields:['name', 'units', 'dataType', 'shortDesc', 'longDesc'],
    validate
}, null, { createDataModelElement })(DataModelElementNew);



function mapStateToProps(state) {
    return { dataTypesEnum: state.dataModelElements.dataTypes, unitsEnum: state.dataModelElements.units };
}

// add ES6 syntactic sugar
DataModelElementNew = connect(mapStateToProps, { fetchDataTypes, fetchUnits })(DataModelElementNew);

export default DataModelElementNew;