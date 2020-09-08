import React from 'react';
import Link from 'next/link';

import s from './over-ons-section.module.css';

const PERSONS = [
  ['Joost', 'joost'],
  ['Ruben', 'ruben'],
  ['Silvan', 'silvan'],
  ['Wannes', 'wannes'],
];

function createPersonUrl(path: string) {
  return `/over-ons/${path}`;
}

export const OverOnsSection = () => {
  return (
    <main className={s.wrapper}>
      <h1>Over Ons</h1>

      <nav>
        <ul>
          {PERSONS.map(([name, path]) => (
            <li key={path}>
              <Link href={createPersonUrl(path)}>
                <a>{name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={s.content}>
        Studio Galassasa is een samenwerking tussen deze vier muzikanten. Klik
        op een naam om meer te weten te komen.
      </div>
    </main>
  );
};
