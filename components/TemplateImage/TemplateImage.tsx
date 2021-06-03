import { useRef, FC } from 'react';
import LazyLoad from 'react-lazyload';
import { ImageContainer, DefaultImage, Image } from './TemplateImage.styled';
import { PlaceholderAsset } from '../Card/Card.styled';
import { ReactComponent as DefaultIcon } from '../../public/placeholder-template-icon.svg';

type Props = {
  templateImgSrc?: string;
  fallbackImgSrc?: string;
  templateName: string;
  priceTag?: JSX.Element;
};

const TemplateImageChild = ({
  templateName,
  templateImgSrc,
  fallbackImgSrc,
}: {
  templateName: string;
  templateImgSrc: string;
  fallbackImgSrc: string;
}): JSX.Element => {
  const refPlaceholder = useRef<HTMLDivElement>();

  const removePlaceholder = () => refPlaceholder.current.remove();

  if (!templateImgSrc) {
    return (
      <DefaultImage>
        <DefaultIcon />
      </DefaultImage>
    );
  }

  return (
    <div>
      <PlaceholderAsset ref={refPlaceholder} />
      <LazyLoad height="100%" offset={100} once>
        <Image
          src={templateImgSrc}
          alt={templateName}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImgSrc;
            removePlaceholder();
          }}
          onLoad={removePlaceholder}
        />
      </LazyLoad>
    </div>
  );
};

export const TemplateImage: FC<Props> = ({
  templateName,
  templateImgSrc,
  priceTag,
  fallbackImgSrc,
}) => {
  if (!fallbackImgSrc) {
    fallbackImgSrc = '/placeholder-template-image.png';
  }

  return (
    <ImageContainer className="template-image-container">
      <TemplateImageChild
        templateName={templateName}
        fallbackImgSrc={fallbackImgSrc}
        templateImgSrc={templateImgSrc}
      />
      {priceTag}
    </ImageContainer>
  );
};