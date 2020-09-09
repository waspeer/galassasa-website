import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { imageUrlFor } from 'model/sanity/sanity-client';
import classNames from '@sindresorhus/class-names';
import BlockContent from '@sanity/block-content-to-react';

import type { StudioInfo } from '../../../model/types';

import s from './over-de-studio-section.module.css';

interface Props {
  studioInfo: StudioInfo;
}

const extractInstagramUsername = (url: string) => (url.match(/([^/]+)\/?$/) ?? [])[1];

export const OverDeStudioSection = ({ studioInfo }: Props) => {
  return (
    <main className={s.wrapper}>
      <h1>Over de Studio</h1>

      <div className={s.shortDescription}>{studioInfo.shortDescription}</div>

      {studioInfo.description.map(({ image, text, title }) => (
        <TextBlockWithImage image={image} text={text} title={title} />
      ))}

      <dl className={s.contact}>
        <dt>Mail</dt>
        <dd>
          <a href={`mailto:${studioInfo.email}`}>{studioInfo.email}</a>
        </dd>

        <dt>Instagram</dt>
        <dd>
          <a href={studioInfo.instagram}>{extractInstagramUsername(studioInfo.instagram)}</a>
        </dd>
      </dl>
    </main>
  );
};

/**
 * TEXT BLOCK WITH IMAGE
 */

interface TextBlockProps {
  image: SanityImageObject;
  text: any[];
  title: string;
}

function TextBlockWithImage({ image, text, title }: TextBlockProps) {
  const imagePortrait = imageUrlFor(image).minHeight(350).minWidth(130).url()!;
  const imageLandscape = imageUrlFor(image).height(75).width(450).url()!;

  return (
    <div className={s.textBlock}>
      <div
        className={classNames(s.image, s.portrait)}
        style={{ backgroundImage: `url(${imagePortrait})` }}
      />
      <div
        className={classNames(s.image, s.landscape)}
        style={{ backgroundImage: `url(${imageLandscape})` }}
      />

      <h2>{title}</h2>

      <div className={s.text}>
        <BlockContent blocks={text} />
      </div>
    </div>
  );
}
