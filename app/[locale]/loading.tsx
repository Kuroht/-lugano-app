import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function loading() {
  return (
    <div className="flex items-center justify-center h-screen">
        <AiOutlineLoading3Quarters className="animate-spin h-20 w-20" />
    </div>
  );
}
