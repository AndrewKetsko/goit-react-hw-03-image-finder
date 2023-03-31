import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import {Gallery} from './Gallery.styled'

export default function ImageGallery({ images }) {

    // console.log(images);
    return <Gallery>
        {images.map(image => <ImageGalleryItem key={image.id} image={ image } />)}
    </Gallery>;
}
