import React from 'react';
import {Box} from '@chakra-ui/react';
import Counter from './components/Counter';
import ReactDOM from 'react-dom';

export default class App extends React.Component<any, any> {
    render() {
        const reactVersion = require('./../package.json').dependencies['react'];
        return <Box margin="1.2rem">
            <Box>Serving from mf2 (React)</Box>
            <Box>
                <Counter/>
            </Box>
            <p>React version: {reactVersion}</p>
        </Box>
    }
}

class ReactMfe extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(<App/>, this);
    }
}

customElements.define('react-ts-element', ReactMfe);
