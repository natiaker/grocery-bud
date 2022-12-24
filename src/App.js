import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [product, setProduct] = useState("");
  const [list, setList] = useState(JSON.parse(localStorage.getItem('listKey')) || []);
  const [isEditing, setIsEditing] = useState(false);
  const [productIndex, setProductIndex] = useState(null);
  const [alert, setAlert] = useState({show: false, type: '', msg: ''});

  useEffect(()=> {
    localStorage.setItem('listKey', JSON.stringify(list));
  }, [list])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!product) {
      showAlert(true, 'bg-red-300', 'Please Enter Value');
      return 0;
    }
    if(isEditing) {
      let editedList = JSON.parse(localStorage.getItem('listKey'));
      editedList[productIndex] = product;
      setList([...editedList])
      showAlert(true, 'bg-green-300', 'Value Changed');
    } else {
      setList([...JSON.parse(localStorage.getItem('listKey')), product]);
      showAlert(true, 'bg-green-300', 'Value Added To The List');
    }
    setProduct("");
    setIsEditing(false);
    setProductIndex(null);
  }

  const handleRemove = (itemId) => {
    let newList = list.filter((item)=>{ return itemId !== list.indexOf(item) })
    setList(newList);
    showAlert(true, 'bg-red-300', 'Value Removed');
  }

  const handleChange = (itemId) => {
    setIsEditing(true);
    let newProduct = list[itemId]
    setProduct(newProduct);
    setProductIndex(itemId);
  }

  const emptyList = () => {
    setList([]); 
    showAlert(true, 'bg-red-300', 'Empty List');
  }

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  };

  return (
    <main className="bg-[#f1f5f8] pt-32 min-h-screen flex flex-col items-center ">
      <form className="bg-white max-w-xl w-[90vw] p-8" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} list={list} removeAlert={showAlert} />}
        <h3 className="text-[#063251] mb-6 text-center text-3xl font-bold tracking-wider">Grocery Bud</h3>
        <div className="form-control flex">
          <input type="text" id="grocery" name="grocery" placeholder="e.g. eggs" className="bg-[#f1f5f8] text-[#617d98] rounded p-1 pl-4  w-full" value={product} onChange={(e)=> {setProduct(e.target.value)} }/>
          <button type="submit" className="bg-[#a5d5f8] py-1 px-2 rounded tracking-wider">{isEditing ? 'Edit' : 'Submit'}</button>
        </div>
      </form>
      {list.length > 0 && (
      <div className="grocery-container p-8 pt-3 bg-white max-w-xl w-[90vw]">
        {list.map((item, index) => {
          return (
            <List key={index} id={index} item={item} handleRemove={handleRemove} handleChange={handleChange} />
          );
        })}
        <button className="mx-auto block text-red-500 tracking-wider mt-5" onClick={emptyList}>Clear Items</button>
      </div>
      )}
    </main>
  );
}

export default App;
