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
                <span className="card-title">{pill.outcome}</span>
                <p className="right">{pill.id}</p>
                <br />
                <p className="right">
                  {new Date(pill.date.seconds * 1000).toString()}
                </p>
                <br />
                {console.log(pill.location)}
                <p className="right">
                  Latitude: {pill.location._lat} Longitude:{' '}
                  {pill.location._long}
                </p>
                <iframe
                  title="Pill Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2171.7889085742554!2d9.882619565463026!3d57.02091988091149!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464933addff74447%3A0xc71f16aa0b5f28a7!2sSofiendal%2C+9200+Aalborg%2C+Denmark!5e0!3m2!1sen!2suk!4v1541937723965"
                  width="100%"
                  height="500px"
                  frameBorder="0"
                  allowFullScreen
                />
              </div>
              <div className="card-action">
                <a href="#!">Add To Calendar</a>
                <a href="#!">Emergency</a>
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
