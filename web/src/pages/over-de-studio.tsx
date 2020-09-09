import { OverDeStudioSection } from 'view/sections/over-de-studio';
import type { GetStaticProps } from 'next';
import type { StudioInfo } from 'model/types';
import { getStudioInfo } from 'model/sanity/sanity-client';

interface Props {
  studioInfo: StudioInfo;
}

const OverDeStudio = ({ studioInfo }: Props) => {
  return <OverDeStudioSection studioInfo={studioInfo} />;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const studioInfo = await getStudioInfo();

  return {
    props: { studioInfo },
  };
};

export default OverDeStudio;
