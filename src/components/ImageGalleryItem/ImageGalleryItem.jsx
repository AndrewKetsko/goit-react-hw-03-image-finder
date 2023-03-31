import { Card, Image } from "./Image.styled";


export default function ImageGalleryItem({ image }) {
    return (
      <Card>
        <Image src={image.webformatURL} alt={image.tags} />
      </Card>
    );
}