import React, { Component } from 'react';
import {
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import asyncComponent from '@utils/lazyLoadingComponent';

const Homepage = asyncComponent(() =>
    import('@container/Home').then((module) => module.default)
);

const SurveyPage = asyncComponent(() =>
    import('@container/Survey').then((module) => module.default)
);



// function isLoggedIn() {
//     return !!localStorage.getItem('PersonID');
// }
export default class RouterComponent extends Component {
    
    render() {
        return (
            <Routes>
                <Route path="/" element={<Homepage />} />
                {/*TODO: Added logging in */}
                <Route path="/survey" element={true ? <SurveyPage/> : <Navigate to="/" state={{ modalVisible: true }} />} />
                <Route path="*" element={<div >404 - Not Found</div>} />
            </Routes>
        )
    }

}