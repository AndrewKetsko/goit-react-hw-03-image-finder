import { Component } from 'react';
import axios from 'axios';
import Searchbar from './Searchbar/Searchbar';
import { refs } from 'refs';
import ImageGallery from './ImageGallery/ImageGallery';
import { Message, MyApp } from './App.styled';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Button from './Button/Button';
import { Dna } from 'react-loader-spinner';

export class App extends Component {
  state = {
    images: [],
    search: '',
    page: 1,
    total: 0,
    isLoading: false,
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  getPhotos = async () => {
    this.setState({ isLoading: true });
    refs.parameters.q = this.state.search;
    refs.parameters.page = this.state.page;
    const searchParameters = new URLSearchParams(refs.parameters);
    const getURL = `${refs.URL}?${searchParameters}`;

    try {
      const response = await axios.get(getURL);
      return response.data;
    } catch (error) {
      toast('Sorry, some server error. Please try again.');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  fullfillState = result => {
    this.setState(prev => {
      return {
        page: prev.page + 1,
        total: result.totalHits,
        images: prev.images.concat(
          result.hits.map(({ id, webformatURL, largeImageURL, tags }) => ({
            id,
            webformatURL,
            largeImageURL,
            tags,
          }))
        ),
      };
    });
  };

  submitForm = async e => {
    e.preventDefault();

    if (!e.target.search.value) {
      toast('Enter some word to search');
      return;
    }

    if (this.state.search === e.target.search.value.split(' ').join('+')) {
      toast('Enter new search please');
      return;
    }

    await this.setState({
      page: 1,
      images: [],
      search: e.target.search.value.split(' ').join('+'),
    });

    const result = await this.getPhotos();

    await this.fullfillState(result);
  };

  loadMore = async e => {
    const result = await this.getPhotos();

    await this.fullfillState(result);
  };

  render() {
    return (
      <MyApp>
        <ToastContainer />
        <Searchbar onSubmit={this.submitForm}></Searchbar>
        <ImageGallery images={this.state.images}></ImageGallery>
        {this.state.page > 1 &&
          this.state.isLoading === false &&
          this.state.total - this.state.page * refs.parameters.per_page > 0 && (
            <Button onClick={this.loadMore} />
          )}
        {this.state.total === 0 &&
          this.state.search.length > 0 &&
          !this.state.isLoading && (
            <Message>There are no photos for your request</Message>
          )}
        <Dna
          visible={this.state.isLoading}
          height="80"
          width="100%"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />
      </MyApp>
    );
  }
}
