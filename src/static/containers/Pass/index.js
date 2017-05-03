import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Autocomplete from 'react-autocomplete';
import * as actionCreators from '../../actions/pass';

class PassView extends React.Component {

  static defaultProps = {
    data: [],
    filteredPass: [],
    accessPoints: [],
    searchText: '',
    isFetching: false,
    isFetchingAccessPoints: false
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
    this.props.actions.accessPointFetch(token);
    this.props.actions.accessFetch(token);
  }

  createForcedAccess(accessPointName) {
    const token = this.props.token;
    const numberplate = this.props.selectedPass.vehicle.numberplate;
    this.props.actions.accessCreate(token, 2, accessPointName, numberplate);
  }

  createAllowedAccess(accessPointName) {
    const token = this.props.token;
    const numberplate = this.props.selectedPass.vehicle.numberplate;
    this.props.actions.accessCreate(token, 1, accessPointName, numberplate);
  }

  updateComment(comment) {
    const { token, createdAccess } = this.props;
    this.props.actions.accessCommentUpdate(token, createdAccess, comment);
  }

  isAccessPointAllowed(accessPoint, allowedAccessPoints) {
    let allowed = false;
    for (let i = 0; i < allowedAccessPoints.length; i++) {
      if (allowedAccessPoints[i].id == accessPoint.id) {
        allowed = true;
      }
    }
    return allowed;
  }

  render() {
    let textareaComment;

    return (
      <div className="protected">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h3>Rechercher un véhicule</h3>
              <Autocomplete
                value={this.props.searchText}
                items={this.props.filteredPass}
                getItemValue={(item) => item.vehicle.numberplate}
                renderItem={(item, isHighlighted) => (
                  <div
                    style={isHighlighted ? this.styles.highlightedItem : this.styles.item}
                    key={item.id}
                  >
                    {item.fake
                      ? <div><i className="fa fa-plus"/> Ajouter : {item.vehicle.numberplate}</div>
                      : <div>{item.vehicle.numberplate}</div>
                    }
                  </div>
                )}
                onChange={(event, value) => this.props.actions.passSearchInputChange(value)}
                onSelect={(value, item) => this.props.actions.passSearchInputSelect(item)}
                wrapperProps={{className: "form-group"}}
                wrapperStyle={{}}
                inputProps={{
                  className: "form-control",
                  placeholder: "Rechercher...",
                  autoFocus: true
                }}
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
              <h3>Fiche véhicule
                  {this.props.selectedPass !== null && this.props.selectedPass.pass_id
                      ?
                      <span>&nbsp;- PASS #{this.props.selectedPass.pass_id}</span>
                      :
                      <span/>
                  }
              </h3>
              <div className="panel panel-default">
                <div className="panel-body">
                  {this.props.selectedPass !== null ?
                    <div>
                      <div className="row">
                        <div className="col-sm-10">
                          {this.props.selectedPass.fake
                            ? <p className="lead">{this.props.selectedPass.vehicle.numberplate} (Véhicule inconnu)</p>
                            : <p className="lead">{this.props.selectedPass.vehicle.numberplate}</p>
                          }
                        </div>
                        <div className="col-sm-2">
                          <p className="text-right">
                            <a
                              className="btn btn-sm btn-default"
                              onClick={this.props.actions.passClose}
                            ><i className="fa fa-times"/>Fermer</a>
                          </p>
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
                          <table className="table table-striped table-bordered table-hover">
                            <thead>
                            <tr>
                              {this.props.accessPoints.map(item =>
                                <th
                                  key={item.id}
                                  className="text-center"
                                >
                                  <i
                                    className={this.isAccessPointAllowed(item, this.props.selectedPass.allowed_access_points)
                                      ? 'fa fa-check'
                                      : 'fa fa-times'
                                    }
                                  />
                                  {item.name}
                                </th>
                              )}
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                              {this.props.accessPoints.map(item =>
                                <td key={item.id} className="text-center">
                                  {this.isAccessPointAllowed(item, this.props.selectedPass.allowed_access_points) ?
                                    <button
                                      className="btn btn-sm btn-success"
                                      onClick={() => this.createAllowedAccess(item.name)}
                                    >Passage</button>
                                    :
                                    <div className="btn-group">
                                      <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() => this.createForcedAccess(item.name)}
                                      >Forçage</button>
                                      <button type="button" className="btn btn-sm btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span className="caret"/>
                                        <span className="sr-only">Toggle Dropdown</span>
                                      </button>
                                      <ul className="dropdown-menu">
                                        <li>
                                          <a
                                            href="#"
                                            onClick={() => this.createAllowedAccess(item.name)}
                                          >Autoriser le passage</a>
                                        </li>
                                      </ul>
                                    </div>
                                  }
                                </td>
                              )}
                            </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {this.props.selectedPass.comment
                          ?
                          <div className="row">
                            <div className="col-sm-12">
                              <h5>Commentaire</h5>
                                {this.props.selectedPass.comment.split('\n').map((item, key) => {
                                  return <span key={key}>{item}<br/></span>
                                })}
                            </div>
                          </div>
                          :
                          <div></div>
                      }
                    </div>
                    :
                    <p className="text-center">Aucun véhicule sélectionné.</p>
                  }
                  {this.props.createdAccess ?
                    <div className="alert alert-success">
                      Le passage vient d'être consigné dans la main courante.<br/>
                      <b>Commentaire :</b><br/>
                      <textarea
                        className="form-control"
                        rows="3"
                        ref={node => textareaComment = node}
                      />
                      <button
                        className="btn btn-default"
                        onClick={() => this.updateComment(textareaComment.value)}
                      >Enregistrer</button>
                      {this.props.isCommentUpdated
                        ? <span>&nbsp;Commentaire enregistré</span>
                        : <span/>}
                    </div> :
                    <div/>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <h3>Derniers accès enregistrés</h3>
              <table className="table table-bordered table-striped table-condensed">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Véhicule</th>
                    <th>Point d'accès</th>
                    <th>Action</th>
                    <th>Commentaire</th>
                  </tr>
                </thead>
                <tbody>
                {this.props.accesses.map(item =>
                  <tr key={item.id}>
                    <td>{item.created_at}</td>
                    <td>{item.numberplate}</td>
                    <td>{item.access_point}</td>
                    <td>{item.type == 1 ? 'Passage autorisé' : 'Forçage'}</td>
                    <td>{item.comment}</td>
                  </tr>
                )}
                </tbody>
              </table>
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
    filteredPass: state.pass.filteredPass,
    accessPoints: state.pass.accessPoints,
    isFetching: state.pass.isFetching,
    isFetchingAccessPoints: state.pass.isFetchingAccessPoints,
    selectedPass: state.pass.selectedPass,
    accesses: state.pass.accesses,
    createdAccess: state.pass.createdAccess,
    isCommentUpdated: state.pass.isCommentUpdated
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PassView);
export { PassView as PassViewNotConnected };
