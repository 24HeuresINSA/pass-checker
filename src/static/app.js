import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import classNames from 'classnames';

import { authLogoutAndRedirect } from './actions/auth';
import './styles/main.scss';

class App extends React.Component {

  static propTypes = {
    isAuthenticated: React.PropTypes.bool.isRequired,
    children: React.PropTypes.shape().isRequired,
    dispatch: React.PropTypes.func.isRequired,
    pathName: React.PropTypes.string.isRequired
  };

  logout = () => {
    this.props.dispatch(authLogoutAndRedirect());
  };

  goToIndex = () => {
    this.props.dispatch(push('/'));
  };

  goToPass = () => {
    this.props.dispatch(push('/pass'));
  };

  goToProtected = () => {
    this.props.dispatch(push('/protected'));
  };

  render() {
    const homeClass = classNames({
      active: this.props.pathName === '/'
    });
    const protectedClass = classNames({
      active: this.props.pathName === '/protected'
    });
    const passClass = classNames({
      active: this.props.pathName === '/pass'
    });
    const loginClass = classNames({
      active: this.props.pathName === '/login'
    });

    return (
      <div className="app">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button"
                      className="navbar-toggle collapsed"
                      data-toggle="collapse"
                      data-target="#top-navbar"
                      aria-expanded="false"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>
              <a className="navbar-brand" tabIndex="0" onClick={this.goToIndex}>
                PassChecker
              </a>
            </div>
            <div className="collapse navbar-collapse" id="top-navbar">
              {this.props.isAuthenticated ?
                <div>
                  <ul className="nav navbar-nav navbar-left">
                    <li className={homeClass}>
                      <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
                        <i className="fa fa-home" /> Accueil
                      </a>
                    </li>
                    <li className={passClass}>
                      <a className="js-go-to-pass-button" tabIndex="1" onClick={this.goToPass}>
                        <i className="fa fa-search" /> Recherche
                      </a>
                    </li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <a className="js-logout-button" tabIndex="3" onClick={this.logout}>
                        Déconnexion
                      </a>
                    </li>
                  </ul>
                </div>
                :
                <div>
                  <ul className="nav navbar-nav navbar-left">
                    <li className={homeClass}>
                      <a className="js-go-to-index-button" tabIndex="0" onClick={this.goToIndex}>
                        <i className="fa fa-home" /> Accueil
                      </a>
                    </li>
                  </ul>
                  <ul className="nav navbar-nav navbar-right">
                    <li className={loginClass}>
                      <Link className="js-login-button" to="/login">Connexion</Link>
                    </li>
                  </ul>
                </div>
              }
            </div>
          </div>
        </nav>

        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    pathName: ownProps.location.pathname
  };
};

export default connect(mapStateToProps)(App);
export { App as AppNotConnected };
