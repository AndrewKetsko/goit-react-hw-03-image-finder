import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";


export default function ImageGallery({ images }) {

    console.log(images);
    return <ul className="gallery">
        {images.map(image => <ImageGalleryItem key={image.id} image={ image } />)}
    </ul>;
}
