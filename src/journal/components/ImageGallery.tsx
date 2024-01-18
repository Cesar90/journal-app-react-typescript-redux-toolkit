import { FC } from 'react';
import { ImageListItem, ImageList } from '@mui/material';

type IProps = {
  imagesUrls: TNote['imagesUrls']
}

export const ImageGallery: FC<IProps> = ({ imagesUrls }) => {

  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      {imagesUrls.map((image) => (
        <ImageListItem key={image}>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="Image"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}