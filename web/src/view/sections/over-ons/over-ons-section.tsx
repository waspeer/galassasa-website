import BlockContent from '@sanity/block-content-to-react';
import classNames from '@sindresorhus/class-names';
import { imageUrlFor } from 'model/sanity/sanity-client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobeEurope, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { renderAsNaturalList, addPossession } from 'lib/utils';

import type { Person, PersonId, Persons, PersonSocialLink } from '../../../model/types';

import s from './over-ons-section.module.css';

/**
 * SECTION
 */

interface SectionProps {
  persons: Persons;
}

function createPersonUrl(path: string) {
  return `/over-ons/${path}`;
}

export const OverOnsSection = ({ persons }: SectionProps) => {
  const router = useRouter();
  const selectedPerson = router.query.personId as PersonId | undefined;

  return (
    <main className={s.wrapper}>
      <h1>Over Ons</h1>

      <nav>
        <ul>
          {Object.values(persons).map(({ id, firstName }) => {
            const url = createPersonUrl(id);

            return (
              <li className={classNames(selectedPerson === id && s.active)} key={id}>
                <Link href={url}>
                  <a href={url}>{firstName}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={s.content}>
        {!selectedPerson &&
          'Studio Galassasa is een samenwerking tussen deze vier muzikanten. Klik op een naam om meer te weten te komen.'}

        {selectedPerson && <PersonDetails person={persons[selectedPerson]} />}
      </div>
    </main>
  );
};

/**
 * PERSON DETAILS
 */

interface PersonDetailsProps {
  person: Person;
}

function SocialLinkIcon({ type }: { type: PersonSocialLink['type'] }): JSX.Element {
  switch (type) {
    case 'facebook':
      return <FontAwesomeIcon icon={faFacebook} />;
    case 'instagram':
      return <FontAwesomeIcon icon={faInstagram} />;
    case 'other':
      return <FontAwesomeIcon icon={faGlobeEurope} />;
  }
}

function PersonDetails({ person }: PersonDetailsProps) {
  const photoUrlSmall = imageUrlFor(person.photo).width(300).height(225).url()!;
  const photoUrlLarge = imageUrlFor(person.photo).width(700).height(250).url()!;

  return (
    <div className={s.details}>
      <img alt={`${person.firstName} ${person.lastName}`} className={s.small} src={photoUrlSmall} />
      <img alt={`${person.firstName} ${person.lastName}`} className={s.large} src={photoUrlLarge} />

      {person.socialLinks && (
        <ul className={s.socialLinks}>
          {person.socialLinks.map(({ url, type }) => (
            <li key={url}>
              <a aria-label={type} href={url}>
                <SocialLinkIcon type={type} />
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className={s.detailsContent}>
        <BlockContent blocks={person.bio} />

        {person.projectLinks && (
          <>
            <h2>Projecten</h2>
            {renderAsNaturalList(
              person.projectLinks.map(({ name, url }) => (
                <a href={url} key={`projectLink-${name}`}>
                  {name}
                </a>
              )),
            )}
          </>
        )}

        {person.portfolioLink && (
          <a className={s.portfolioLink} href={person.portfolioLink}>
            Beluister {addPossession(person.firstName)} portfolio{' '}
            <FontAwesomeIcon icon={faExternalLinkAlt} />
          </a>
        )}
      </div>
    </div>
  );
}
