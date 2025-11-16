export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-800 mt-16">
      <div className="container py-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} AVG Connects. All rights reserved.
        </p>

        <ul className="flex gap-4 mt-4 md:mt-0">
          <li>
            <a href="#" className="hover:text-red-400">
              Privacy
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-red-400">
              Terms
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-red-400">
              Support
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
