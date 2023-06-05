import Image from 'next/image'

export default function Home() {
  const recommended = [
    {
      name:"Product 1",
      descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      photo:"/pizza.png",
      price:7.5,
    },{
      name:"Product 2",
      descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      photo:"/pizza.png",
      price:8.5,
    },{
      name:"Product 3",
      descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      photo:"/pizza.png",
      price:9.5,
    },{
      name:"Product 4",
      descrip: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      photo:"/pizza.png",
      price:10.5,
    }
  ]

  return (
    <main>
      <div className="bg-gray-900 text-white">
        <div className="container mx-auto py-16 px-4">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h1 className="text-4xl font-bold mb-6">Welcome to our website</h1>
              <p className="text-xl mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Menu
              </button>
            </div>
            <div className="md:w-1/2">
              <img
                className="w-full h-auto"
                src="/pizza.png"
                alt="Hero Image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-2xl font-bold mb-6">Recommended Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {
            recommended.map((product) => (
              <div key={product.name} className="bg-slate-800 shadow-lg rounded-lg p-6">
                <img
                  className="w-full h-48 object-cover mb-4"
                  src={product.photo}
                  alt="Product 1"
                />
                <div className='flex flex-row justify-between'>
                  <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                  <h3 className="text-xl font-bold mb-2">{product.price}€</h3>
                </div>
                <p className="text-white">{product.descrip}</p>
              </div>
            ))
          }
        </div>
      </div>
    </main>
  )
}
