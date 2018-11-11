import React, { Component } from 'react';
import * as tf from '@tensorflow/tfjs';
import { IMAGENET_CLASSES } from './imagenet_classes';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: '' };
  }

  async _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);

    console.log('loading model...');
    const model = await tf.loadModel(
      'https://gogul09.github.io/models/mobilenet/model.json'
    );
    console.log('...model loaded');

    let image = document.getElementById('test-image');
    let tensor = this.preprocessImage(image);
    // console.log(tensor);

    const predictions = await model.predict(tensor).data();
    console.log(predictions);
    let results = Array.from(predictions)
      .map(function(p, i) {
        return {
          probability: p,
          className: IMAGENET_CLASSES[i]
        };
      })
      .sort(function(a, b) {
        return b.probability - a.probability;
      })
      .slice(0, 5);
    // console.log(results);

    document.getElementById('predict-box').style.display = 'block';
    document.getElementById('prediction').innerHTML =
      'MobileNet prediction <br><b>' + results[0].className + '</b>';

    var ul = document.getElementById('predict-list');
    ul.innerHTML = '';
    results.forEach(function(p) {
      console.log(p.className + ' <--- ' + p.probability.toFixed(3));
      var li = document.createElement('LI');
      li.innerHTML = p.className + ' <--- ' + p.probability.toFixed(3);
      ul.appendChild(li);
    });
  }

  preprocessImage(image) {
    let tensor = tf
      .fromPixels(image)
      .resizeNearestNeighbor([224, 224])
      .toFloat();

    let offset = tf.scalar(127.5);
    return tensor
      .sub(offset)
      .div(offset)
      .expandDims();
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (
        <img id="test-image" src={imagePreviewUrl} alt="Test Pill" />
      );
    } else {
      $imagePreview = (
        <div className="previewText">Please, select your pill</div>
      );
    }

    return (
      <div className="container">
        <div className="col s12 m6">
          <div className="card indigo">
            <div className="card-content white-text">
              <span className="card-title">Pill Scanner</span>
              <div className="imgPreview">{$imagePreview}</div>
              <div id="predict-box" style={{ display: 'none' }}>
                <p id="prediction" />
                <p>
                  <b
                    style={{
                      color: '#c2c2c2 !important',
                      fontStyle: 'italic',
                      fontWeight: '80',
                      fontSize: '10px'
                    }}
                  >
                    Top-5 Predictions
                  </b>
                </p>
                <ul id="predict-list" />
              </div>
            </div>
            <div className="card-action">
              <input
                type="file"
                id="file-image"
                name="files[]"
                multiple=""
                onChange={e => this._handleImageChange(e)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
