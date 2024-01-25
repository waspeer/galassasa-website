import classnames from '@sindresorhus/class-names';
import { createMediaQuery } from '@solid-primitives/media';

import { For, createEffect, createMemo, createSignal, onMount } from 'solid-js';

import { addClientNavigationEventListener } from '../lib/client-navigation-event';
import s from './menu.module.css';

interface MenuProps {
  initialPathname: string;
}

const MENU_ITEMS = [
  ['over ons', '/over-ons'],
  ['over de studio', '/over-de-studio'],
];

export function Menu(props: MenuProps) {
  let $menu: HTMLDivElement | undefined;
  let $nav: HTMLDivElement | undefined;

  const pathname = typeof window === 'undefined' ? props.initialPathname : window.location.pathname;

  const [forceOpen, setForceOpen] = createSignal(pathname === '/');
  const [preferOpened, setPreferOpened] = createSignal(false);
  const [navIsAnimating, setNavIsAnimating] = createSignal(false);

  const opened = createMemo(() => forceOpen() || preferOpened());

  const isPortrait = createMediaQuery('(orientation: portrait)');

  if (typeof window !== 'undefined') {
    document.addEventListener('astro:page-load', () => {
      setForceOpen(window.location.pathname === '/');
    });
  }

  const closeMenu = () => {
    setPreferOpened(false);
  };

  const toggleMenu = () => {
    setPreferOpened((previousValue) => !previousValue);
  };

  let isInitialRender = true;

  onMount(() => {
    addClientNavigationEventListener((event) => {
      setForceOpen(event.detail.pathname === '/');
      setPreferOpened(false);
    });
  });

  createEffect(() => {
    if (!$menu?.animate || !$nav?.animate) return;

    $menu.animate(
      opened()
        ? {
            top: isPortrait() ? '-50vh' : '-50vw',
            right: isPortrait() ? '-50vh' : '-50vw',
            width: isPortrait() ? '200vh' : '200vw',
            height: isPortrait() ? '200vh' : '200vw',
          }
        : {
            top: 'var(--menu-closed-offset)',
            right: 'var(--menu-closed-offset)',
            width: 'var(--menu-closed-size)',
            height: 'var(--menu-closed-size)',
          },
      {
        duration: isInitialRender ? 0 : 500,
        easing: 'ease-in-out',
        fill: 'forwards',
      },
    );

    setNavIsAnimating(true);

    $nav
      .animate(opened() ? { opacity: 1 } : { opacity: 0 }, {
        duration: isInitialRender ? 0 : 200,
        easing: 'ease-in-out',
        fill: 'forwards',
      })
      .addEventListener('finish', () => {
        setNavIsAnimating(false);
      });

    isInitialRender = false;
  });

  return (
    <div class={classnames(s.menu, opened() && s.open)} ref={$menu}>
      <button
        aria-expanded={opened() ? 'true' : 'false'}
        aria-label={`${opened() ? 'hide' : 'show'} menu`}
        class={classnames(forceOpen() && s.hidden)}
        id="main-menu-button"
        onClick={toggleMenu}
        type="button"
      />
      <nav
        class={classnames(!navIsAnimating() && !opened() && s.hidden)}
        aria-labelledby="main-menu-button"
        ref={$nav}
      >
        <img alt="Galassasa Logo" class={s.logo} src="/images/logo.gif" />

        <ul>
          <For each={MENU_ITEMS}>
            {([name, href]) => (
              <li>
                <a href={href} onClick={closeMenu}>
                  {name}
                </a>
              </li>
            )}
          </For>

          <li>
            <a href="mailto:studio@galassasa.com">contact</a>
          </li>

          <li aria-hidden="true">☼</li>
        </ul>
      </nav>
    </div>
  );
}
