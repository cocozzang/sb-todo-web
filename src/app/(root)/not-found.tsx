import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404 Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        해당 페이지는 존재하지 않습니당
      </p>
      <p>
        <Link
          href={"/"}
          className="text-blue-500 hover:text-blue-700 font-semibold text-lg"
        >
          홈으로 가슈
        </Link>
      </p>
    </div>
  );
}
