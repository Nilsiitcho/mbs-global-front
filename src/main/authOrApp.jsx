import '../common/template/dependencies'
import React, {Component} from 'react';
import App from './app'

export default class AuthOrApp extends Component {
    render() {
        return (
            <App>{this.props.children}</App>
        );
    }
}
