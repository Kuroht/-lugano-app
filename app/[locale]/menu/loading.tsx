import { GiFullPizza } from 'react-icons/gi';

export default function loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <GiFullPizza className="animate-spin h-20 w-20" />
        <p className="mt-2 text-gray-500 text-4xl">
          <span className="animate-loading"></span>
        </p>
    </div>
  );
}
