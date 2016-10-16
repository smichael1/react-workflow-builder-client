import { combineReducers } from 'redux';
import DataModelElementsReducer from './reducer_data_model_elements';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  dataModelElements: DataModelElementsReducer,
  form: formReducer
});

export default rootReducer;
