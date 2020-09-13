import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className="homeHeading">Home Page</h1>
      <Link href="/login">
        <a><button className="btn btn-primary">Login page</button></a>
      </Link>
    </div>
  )
}
