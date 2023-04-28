import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import {ChakraProvider} from '@chakra-ui/react';

//
// this is the "sole purpose" of this module
// it uses ReactDOM to render the <App> component into <div id="root"> in the HTML
//

ReactDOM.render(
    <ChakraProvider>
        <App />
    </ChakraProvider>,
    document.getElementById('root')
)
