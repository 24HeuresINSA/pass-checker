import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import './style.scss';
import reactLogo from './images/react-logo.png';
import reduxLogo from './images/redux-logo.png';

class HomeView extends React.Component {

    static propTypes = {
        statusText: React.PropTypes.string,
        userName: React.PropTypes.string
    };

    static defaultProps = {
        statusText: '',
        userName: ''
    };

    render() {
        return (
            <div className="container">
                <div className="margin-top-medium text-center">
                    <img className="page-logo margin-bottom-medium"
                         src={reactLogo}
                         alt="ReactJs"
                    />
                    <img className="page-logo margin-bottom-medium"
                         src={reduxLogo}
                         alt="Redux"
                    />
                </div>
                <div className="text-center">
                    <h1>Pass Checker</h1>
                    <h4>Bienvenue, {this.props.userName || 'invité'}.</h4>
                </div>
                <div className="margin-top-medium text-center">
                    <p>Accéder à la recherche de <Link to="/pass"><b>laissez-passer</b></Link>.</p>
                </div>
                <div className="margin-top-medium">
                    {this.props.statusText ?
                        <div className="alert alert-info">
                            {this.props.statusText}
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.auth.userName,
        statusText: state.auth.statusText
    };
};

export default connect(mapStateToProps)(HomeView);
export { HomeView as HomeViewNotConnected };
