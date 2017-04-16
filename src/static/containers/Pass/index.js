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
          <div className="row">
            <div className="col-md-4">
              <h3>Zone de recherche</h3>
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
                wrapperProps={{className: "form-group"}}
                wrapperStyle={{}}
                inputProps={{className: "form-control", placeholder: "Rechercher..."}}
              />
              <div className="alert alert-info">
                <b>Aide - Recherches possibles</b><br/>
                <ul>
                  <li>ED-098-NG</li>
                  <li>ed098ng</li>
                  <li>ed 098 NG</li>
                </ul>
              </div>
            </div>
            <div className="col-md-8">
              <h3>Résultats</h3>
              <div className="panel panel-default">
                <div className="panel-body">
                  {this.props.selectedPass !== null ?
                    <div>
                      <div className="row">
                        <div className="col-sm-12">
                          <p className="lead">{this.props.selectedPass.vehicle.numberplate}</p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <h5>Conducteurs autorisés</h5>
                          <ul>
                            {this.props.selectedPass.allowed_drivers.map((driver, index) =>
                              <li key={index}>
                                {driver.first_name} {driver.last_name}<br/>
                                <mark>{driver.entity_name}</mark>
                              </li>
                            )}
                          </ul>
                        </div>
                        <div className="col-md-6">
                          <h5>Plages horaires d'admission</h5>
                          <ul>
                            {this.props.selectedPass.allowed_time_slots.map((time_slot, index) =>
                              <li key={index}>{time_slot.name}</li>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <h5>Points d'accès</h5>
                        </div>
                      </div>
                    </div>
                  :
                    <p className="text-center">Aucun résultat</p>
                  }
                </div>
              </div>
            </div>
          </div>
          {this.props.isFetching === true ?
            <p className="text-center">Chargement des données...</p>
            :
            <div>
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
    isFetching: state.pass.isFetching,
    selectedPass: state.pass.selectedPass
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PassView);
export { PassView as PassViewNotConnected };
