import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import Spinner from '../layout/Spinner';

class Pills extends Component {
  render() {
    const { pills } = this.props;

    if (pills) {
      return (
        <div className="containter">
          {pills.map(pill => (
            <div key={pill.id} className="card darken-1">
              <div className="card-content">
                <span className="card-title">{pill.name}</span>
                <p>Cost: ${pill.cost}</p>
                <p className="right">{pill.id}</p>
              </div>
              <div className="card-action">
                <a href="#!">Add To Calendar</a>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

Pills.propTypes = {
  firestore: PropTypes.object.isRequired,
  pills: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'pills' }]),
  connect((state, props) => ({
    pills: state.firestore.ordered.pills
  }))
)(Pills);
