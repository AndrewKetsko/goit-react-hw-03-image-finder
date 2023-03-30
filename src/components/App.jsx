import { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import { refs } from 'refs';
import ImageGallery from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    images: []
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  submitForm = async e => {
    e.preventDefault();
    // const a = e.target.search.value;
    const result = await axios.get(
      `${refs.URL}?key=${refs.APIKey}&q=${e.target.search.value}&image_type=photo&orientation=horizontal`
    );
    // console.log(result.data.hits.map(({id, webformatURL, largeImageURL}) => ({id, webformatURL, largeImageURL})));
    this.setState(
      prev => {
        return {
          images: prev.images.concat(
            result.data.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
              id,
              webformatURL,
              largeImageURL,
              tags,
            }))
          ),
        };
  });
    // e.currentTarget.reset();
  };

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          // alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.submitForm}></Searchbar>
        <ImageGallery images={this.state.images}></ImageGallery>
      </div>
    );
  }
}
