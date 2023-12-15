import { FC, useState } from 'react'
import { Container } from './styles';
import ImageViewer from 'components/ImageViewer/ImageViewer'


interface ListCellImageWithNameProps {
  name: string;
  img: string;
}
const ListCellImageWithName: FC<ListCellImageWithNameProps> = ({ img, name }) => {
  const [imageHover, setImageHover] = useState(false)

  return (
    <Container>
      <div
        className="imageWrapper"
        onMouseLeave={() => setImageHover(false)}
        onMouseEnter={() => setImageHover(true)}>
        <img src={img} alt={name} className="image" />
        {imageHover &&
          <ImageViewer
            hideElement={() => setImageHover(false)}
            image={img} />
        }
      </div>
      <div className='name'>{name}</div>
    </Container>
  )
}

export default ListCellImageWithName