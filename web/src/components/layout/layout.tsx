import classnames from '@sindresorhus/class-names';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import s from './layout.module.css';

/**
 * LAYOUT
 */

interface LayoutProps {
  children: ReactNode;
}

const MENU_ITEMS = [
  ['over ons', '/over-ons'],
  ['over de studio', '/over-de-studio'],
];

export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter();

  return (
    <div>
      <Menu forceOpen={pathname === '/'} />
      {children}
    </div>
  );
};

/**
 * MENU
 */

interface MenuProps {
  forceOpen?: boolean;
}

function Menu({ forceOpen = false }: MenuProps) {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (forceOpen) {
      setOpened(true);
    }
  }, [forceOpen]);

  const closeMenu = () => {
    if (opened) {
      setOpened(false);
    }
  };
  const toggleMenu = () => {
    setOpened(!opened);
  };

  return (
    <div className={classnames(s.menu, opened && s.open)}>
      <button
        aria-expanded={opened}
        aria-label={`${opened ? 'hide' : 'show'} menu`}
        className={classnames(forceOpen && s.hidden)}
        id='main-menu-button'
        onClick={toggleMenu}
        type='button'
      />
      <nav aria-labelledby='main-menu-button'>
        <img alt='Galassasa Logo' className={s.logo} src='/images/logo.gif' />

        <ul>
          {MENU_ITEMS.map(([name, href]) => (
            <li key={name}>
              <Link href={href}>
                <a href={href} onClick={closeMenu}>
                  {name}
                </a>
              </Link>
            </li>
          ))}

          <li>
            <a href='mailto:studio@galassasa.com'>contact</a>
          </li>

          <li aria-hidden='true'>☼</li>
        </ul>
      </nav>
    </div>
  );
}
