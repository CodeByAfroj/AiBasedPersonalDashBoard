export default function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col justify-center items-center">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
    </div>
  );
}