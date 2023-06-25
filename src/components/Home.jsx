import React, { useState } from 'react';

const ordersData = [
  {id: 1, name: "John Smith", product_name: "BlueShield Pro", deliveryType: 'Regular'},
  {id: 2, name: "Sarah Thompson", product_name: "SightProtector Ultra", deliveryType: 'Express'},
  {id: 3, name: "Emma Johnson", product_name: "VisionGuard Elite", deliveryType: 'Regular'},
  {id: 4, name: "Michael Davis", product_name: "EyeShield X5", deliveryType: 'Regular'},
  {id: 5, name: "David Wilson", product_name: "OptiGuard Max",  deliveryType: 'Express'},
];

const App = () => {
  const [orders, setOrders] = useState(ordersData);
  const [selectedTab, setSelectedTab] = useState('All');
  const [newOrder, setNewOrder] = useState({ name: '', product_name: '', deliveryType: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); 

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    setCurrentPage(1); 
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleAddOrder = () => {
    if (newOrder.name && newOrder.product_name && newOrder.deliveryType) {
      const updatedOrders = [...orders, { ...newOrder, id: orders.length + 1 }];
      setOrders(updatedOrders);
      setNewOrder({ name: '', product_name: '', deliveryType: '' });
    }
  };

  // Get current orders based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const filteredOrders = selectedTab === 'All' ? orders : orders.filter(order => order.deliveryType === selectedTab);
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div className="tabs flex flex-row gap-5 justify-center mb-2 mt-3 text-xl text-slate-600">
        <button aria-current="page"
          className={selectedTab === 'All' ? 'active  inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500' : ''}
          onClick={() => handleTabClick('All')}
        >
          All Orders
        </button>
        <button
          className={selectedTab === 'Regular' ? 'active inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500' : ''}
          onClick={() => handleTabClick('Regular')}
        >
          Regular Delivery
        </button>
        <button
          className={selectedTab === 'Express' ? 'active inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500' : ''}
          onClick={() => handleTabClick('Express')}
        >
          Express Delivery
        </button>
      </div>
      <table className="table-auto w-3/4 mx-auto mt-4 mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Product Name</th>
            <th className="px-4 py-2">Delivery Type</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map(order => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.name}</td>
              <td className="border px-4 py-2">{order.product_name}</td>
              <td className="border px-4 py-2">{order.deliveryType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="pagination relative flex justify-center items-center mt-2">
        {filteredOrders.length > itemsPerPage && (
          <ul className="flex">
            {Array.from({ length: Math.ceil(filteredOrders.length / itemsPerPage) }).map((_, index) => (
              <li key={index}>
                <button
                  className={`pagination-link ${currentPage === index + 1 ? 'active text-2xl bg-gray-200   ml-4 p-2 rounded-lg border-' : 'text-2xl bg-gray-200 ml-4 p-2 rounded-lg border-'}`}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="add-order mt-2 mx-auto">
      <div class="flex flex-col justify-center items-center gap-3 -mx-3 mb-2">
          <h2 className='mt-4 font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-neutral-600'>Add New Order</h2>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="grid-city">
              Name:
            </label>
            <input class="  w-full bg-gray-200 text-gray-700 border border-gray-200 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500  py-2 px-2 " placeholder="Customer Name"
              type="text"
              id="name"
              name="name"
              value={newOrder.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-3 md:mb-0 ">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="grid-city">
              Product Name:
            </label>
            <input class=" block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 " placeholder="Product Name"
              type="text"
              id="product"
              name="product_name"
              value={newOrder.product_name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 text-left" for="grid-state">
              Delivery Type:
            </label>
            <div class="relative">
              <select class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700  py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="deliveryType"
                name="deliveryType"
                value={newOrder.deliveryType}
                onChange={handleInputChange}
                required
              >
                <option>Select Delivery Type</option>
                <option>Regular</option>
                <option>Express</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
              </div>
            </div>
          </div>

        </div>
        <button onClick={handleAddOrder} className=' py-2 px-2 text-white rounded-lg w-1/4 mb-4 mt-1 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-gray-400 via-neutral-500 to-zinc-400'>Add Order</button>
      </div>
      </div>
    
  );
};

export default App;
