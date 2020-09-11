import assert from 'assert';

/**
 * GET ENVIRONMENT VARIABLE
 */

const cache: Record<string, string> = {};

export function getEnvironmentVariable(name: string, fallback?: string): string {
  if (cache[name]) {
    return cache[name];
  }

  const variable = process.env[name] ?? fallback;

  assert(variable, `Unable to retrieve ${name} from environment variables`);

  cache[name] = variable;

  return variable;
}

/**
 * RENDER AS NATURAL LIST
 *
 * Renders a list of JSX elements as natural language
 * (eg. <a />, <a /> and <a />)
 */

export function renderAsNaturalList(list: JSX.Element[], conjunction = 'en') {
  return list.flatMap((item, index) => [
    list.length !== 1 && index === list.length - 1 && ` ${conjunction} `,
    item,
    index < list.length - 2 && ', ',
  ]);
}

/**
 * ADD POSSESSION
 *
 * Adds possession to noun (eg. Luke's thing)
 */

export function addPossession(noun: string) {
  const lastCharacter = noun[noun.length - 1];

  return `${noun}${lastCharacter === 's' ? "'" : "'s"}`;
}

/**
 * PORTABLE TEXT TO PLAIN TEXT
 *
 * Convert Sanity portable text to plain text
 */

interface PortableTextBlock {
  _type: string;
  children: {
    text: string;
  }[];
}

export function portableToPlainText(blocks: PortableTextBlock[]) {
  return blocks
    .map((block) => {
      if (block._type !== 'block' || !block.children) {
        return '';
      }
      return block.children.map((child) => child.text).join('');
    })
    .join(' ');
}
