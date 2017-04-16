import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autocomplete from 'react-autocomplete';
import * as actionCreators from '../../actions/pass';

class PassView extends React.Component {

  static defaultProps = {
    data: [],
    searchText: '',
    isFetching: false
  };

  styles = {
    item: {
      padding: '2px 6px',
      cursor: 'default'
    },

    highlightedItem: {
      color: 'white',
      background: 'hsl(200, 50%, 50%)',
      padding: '2px 6px',
      cursor: 'default'
    },

    menu: {
      border: 'solid 1px #ccc'
    }
  };

  // Note: have to use componentWillMount, if I add this in constructor will get error:
  // Warning: setState(...): Cannot update during an existing state transition (such as within `render`).
  // Render methods should be a pure function of props and state.
  componentWillMount() {
    const token = this.props.token;
    this.props.actions.passFetch(token);
  }

  render() {
    return (
      <div className="protected">
        <div className="container">
          <h1 className="margin-bottom-medium">Recherche d'un pass</h1>
          <Autocomplete
            value={this.props.searchText}
            items={this.props.data}
            getItemValue={(item) => item.vehicle.numberplate}
            renderItem={(item, isHighlighted) => (
              <div
                style={isHighlighted ? this.styles.highlightedItem : this.styles.item}
                key={item.id}
              >{item.vehicle.numberplate}</div>
            )}
            onChange={(event, value) => this.props.actions.passSearchInputChange(value)}
            onSelect={(value, item) => this.props.actions.passSearchInputSelect(item)}
          />
          {this.props.isFetching === true ?
            <p className="text-center">Chargement des données...</p>
            :
            <div>
              <p>Données reçues du serveur</p>
              <div className="margin-top-small">
                <div className="alert alert-info">
                </div>
              </div>
              <div className="margin-top-medium">
                <h5 className="margin-bottom-small"><b>How does this work?</b></h5>
                <p className="margin-bottom-small">
                  On the <code>componentWillMount</code> method of the
                  &nbsp;<code>ProtectedView</code> component, the action
                  &nbsp;<code>dataFetchProtectedData</code> is called. This action will first
                  dispatch a <code>DATA_FETCH_PROTECTED_DATA_REQUEST</code> action to the Redux
                  store. When an action is dispatched to the store, an appropriate reducer for
                  that specific action will change the state of the store. After that it will then
                  make an asynchronous request to the server using
                  the <code>isomorphic-fetch</code> library. On its
                  response, it will dispatch the <code>DATA_RECEIVE_PROTECTED_DATA</code> action
                  to the Redux store. In case of wrong credentials in the request, the&nbsp;
                  <code>AUTH_LOGIN_USER_FAILURE</code> action will be dispatched.
                </p>
                <p>
                  Because the <code>ProtectedView</code> is connected to the Redux store, when the
                  value of a property connected to the view is changed, the view is re-rendered
                  with the new data.
                </p>
              </div>
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchText: state.pass.searchText,
    data: state.pass.data,
    isFetching: state.data.isFetching
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PassView);
export { PassView as PassViewNotConnected };
