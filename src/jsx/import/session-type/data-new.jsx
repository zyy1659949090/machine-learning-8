/**
 * data-new.jsx: append 'data_new' fieldset.
 *
 * @DataNew, must be capitalized in order for reactjs to render it as a
 *     component. Otherwise, the variable is rendered as a dom node.
 *
 * Note: this script implements jsx (reactjs) syntax.
 *
 * Note: importing 'named export' (multiple export statements in a module),
 *       requires the object being imported, to be surrounded by { brackets }.
 */

import React, { Component } from 'react';
import SupplyDatasetFile from '../input-data/supply-dataset-file.jsx';
import SupplyDatasetUrl from '../input-data/supply-dataset-url.jsx';
import checkValidString from '../validator/valid-string.js';
import ModelType from '../model/model-type.jsx';
import { setSvButton, setLayout, setContentType } from '../redux/action/page.jsx';

class DataNew extends Component {
    // initial 'state properties'
    constructor() {
        super();
        this.state = {
            value_title: '',
            value_collection: '',
            value_dataset_type: '--Select--',
            value_model_type: '--Select--',
        };
        this.changeCollection = this.changeCollection.bind(this);
        this.changeDatasetType = this.changeDatasetType.bind(this);
        this.changeModelType = this.changeModelType.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this.getSupplyDataset = this.getSupplyDataset.bind(this);
        this.displaySubmit = this.displaySubmit.bind(this);
    }
    // update 'state properties'
    changeDatasetType(event) {
        const datasetType = event.target.value;

        if (
            datasetType && datasetType != '--Select--' &&
            checkValidString(datasetType)
        ) {
            this.setState({ value_dataset_type: event.target.value });
        } else {
            this.setState({ value_dataset_type: '--Select--' });
        }

        // update redux store
        const action = setSvButton({ button: { submit_analysis: false } });
        this.props.dispatchSvButton(action);
    }
    changeTitle(event) {
        const sessionTitle = event.target.value;

        if (sessionTitle && checkValidString(sessionTitle)) {
            this.setState({ value_title: sessionTitle });
        } else {
            this.setState({ value_title: '' });
        }

        // update redux store
        const action = setSvButton({ button: { submit_analysis: false } });
        this.props.dispatchSvButton(action);
    }
    changeCollection(event) {
        const collection = event.target.value;

        if (collection && checkValidString(collection)) {
            this.setState({ value_collection: collection });
        } else {
            this.setState({ value_collection: '' });
        }

        // update redux store
        const action = setSvButton({ button: { submit_analysis: false } });
        this.props.dispatchSvButton(action);
    }
    // update 'state properties' from child component (i.e. 'value_model_type')
    changeModelType(event) {
        const modelType = event.value_model_type;

        if (
            modelType && modelType != '--Select--' &&
            checkValidString(modelType)
        ) {
            this.setState({ value_model_type: modelType });
        } else {
            this.setState({ value_model_type: '--Select--' });
        }

        // update redux store
        const action = setSvButton({ button: { submit_analysis: false } });
        this.props.dispatchSvButton(action);
    }
    // update 'state properties' from child component
    displaySubmit(event) {
        if (event.submitted_proper_dataset) {
            // update redux store
            const action = setSvButton({
                button: { submit_analysis: event.submitted_proper_dataset },
            });
            this.props.dispatchSvButton(action);
        } else {
            // update redux store
            const action = setSvButton({ button: { submit_analysis: false } });
            this.props.dispatchSvButton(action);
        }
    }
    componentWillMount(event) {
        // update redux store
        const actionLayout = setLayout({ layout: 'analysis' });
        this.props.dispatchLayout(actionLayout);

        const actionContentType = setContentType({ layout: 'data_new' });
        this.props.dispatchContentType(actionContentType);
    }
    // triggered when 'state properties' change
    render() {
        const datasetType = this.state.value_dataset_type;
        const datasetTitle = this.state.value_title;
        const collection = this.state.value_collection;
        const modelType = this.state.value_model_type;
        const Dataset = this.getSupplyDataset(
            datasetType,
            datasetTitle,
            collection,
            modelType,
        );
        const datasetInput = Dataset ? <Dataset onChange={this.displaySubmit} /> : null;

        return (
            <fieldset className='fieldset-session-data-upload'>
                <legend>Data Upload</legend>
                <fieldset className='fieldset-dataset-type'>
                    <legend>Configurations</legend>
                    <p>Provide the <i>Session Name</i>, and dataset type</p>
                    <input
                        type='text'
                        name='session_name'
                        placeholder='Session Name'
                        onInput={this.changeTitle}
                        value={this.state.value_title}
                    />

                    <input
                        type='text'
                        name='collection'
                        placeholder='Collection'
                        onInput={this.changeCollection}
                        value={this.state.value_collection}
                    />

                    <select
                        name='dataset_type'
                        autoComplete='off'
                        onChange={this.changeDatasetType}
                        value={this.state.value_dataset_type}
                    >

                        <option value='' defaultValue>--Select--</option>
                        <option value='file_upload'>Upload file</option>
                        <option value='dataset_url'>Dataset URL</option>

                    </select>

                    <ModelType onChange={this.changeModelType} />
                </fieldset>

                {datasetInput}
            </fieldset>
        );
    }
    // call back: used for the above 'render' (return 'span' if undefined)
    getSupplyDataset(datasetType, title, collection, modelType) {
        if (
            title &&
            checkValidString(title) &&
            collection &&
            checkValidString(collection) &&
            datasetType &&
            checkValidString(datasetType) &&
            datasetType != '--Select--' &&
            modelType &&
            checkValidString(modelType) &&
            modelType != '--Select--'
        ) {
            return {
                file_upload: SupplyDatasetFile,
                dataset_url: SupplyDatasetUrl,
            }[datasetType] || null;
        }
        return null;
    }
    componentWillUnmount() {
        // update redux store
        const action = setSvButton({ button: { submit_analysis: false } });
        this.props.dispatchSvButton(action);
    }
}

// indicate which class can be exported, and instantiated via 'require'
export default DataNew;
