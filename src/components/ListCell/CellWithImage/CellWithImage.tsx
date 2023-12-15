import { FC, useState } from 'react'
import { Container } from "./styles"
import ImageViewer from 'components/ImageViewer/ImageViewer'

type Props = {
  name: string;
  image: string;
}
const CellWithImage: FC<Props> = ({ image, name }) => {
  const [imageHover, setImageHover] = useState(false)


  return (
    <Container
      onMouseLeave={() => setImageHover(false)}
      onMouseEnter={() => setImageHover(true)}>
      <div className="imgWrapper">
        <img alt={name} className="listImage" src={image} />
        {imageHover &&
          <ImageViewer
            hideElement={() => setImageHover(false)}
            image={image} />
        }
      </div>
      {name ?? "N/A"}

    </Container>
  )
}

export default CellWithImage