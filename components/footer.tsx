import Link from "next/link";
export default function Footer() {
  return (
    <div className="footer">
      <p className="footer-copyright">Copyright 2022 NotTimIsReal </p>
      <Link href="https://api.yourbetterassistant.me">API</Link>
      <Link href="/">Blog(NOT ADDED YET)</Link>
    </div>
  );
}
