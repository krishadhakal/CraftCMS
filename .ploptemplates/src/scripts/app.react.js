
import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/app.scss';

window.easings = {};
window.easings.ease = "cubicBezier(0.25, 0.46, 0.45, 0.94)";
window.easings.andrew = "cubicBezier(0.77, 0, 0.175, 1)";
window.easings.feebles1 = "cubicBezier(.8,.03,.25,1)";
window.easings.feebles2 = "cubicBezier(.72,.01,.25,1)";
window.easings.ease2 = "cubicBezier(.48,.1,.48,.9)";

// Components Import -- DO NOT REMOVE COMMENT!

// you need to add your react dom el
ReactDOM.render(<h1>Hello World!</h1>, document.getElementById('app'));
