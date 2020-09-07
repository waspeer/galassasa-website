import Link from 'next/link';

export default function Home() {
  return (
    <div>
      Home <Link href='/second'>Second</Link>
    </div>
  );
}
