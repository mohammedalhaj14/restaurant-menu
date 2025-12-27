import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MENU_DATA = [
  // BURGERS
  { id: 1, name: "Truffle Mushroom Burger", price: 12.50, category: "Burgers", desc: "Angus beef, truffle aioli, sautéed mushrooms, swiss cheese." },
  { id: 2, name: "Spicy Zinger XL", price: 9.50, category: "Burgers", desc: "Crispy spicy chicken breast, jalapeños, red cabbage slaw." },
  { id: 3, name: "Classic Cheeseburger", price: 8.00, category: "Burgers", desc: "Classic beef patty, cheddar, pickles, mustard, and ketchup." },
  
  // PIZZA
  { id: 4, name: "Margherita di Bufala", price: 11.00, category: "Pizza", desc: "Fresh basil, buffalo mozzarella, San Marzano tomatoes." },
  { id: 5, name: "Pepperoni Passion", price: 14.00, category: "Pizza", desc: "Double pepperoni, mozzarella, chili flakes, honey drizzle." },
  { id: 6, name: "BBQ Chicken Pizza", price: 13.50, category: "Pizza", desc: "Grilled chicken, red onions, smoked BBQ sauce." },
  
  // SALADS
  { id: 7, name: "Chicken Caesar", price: 9.00, category: "Salads", desc: "Grilled chicken, romaine, parmesan, garlic croutons." },
  { id: 8, name: "Greek Quinoa Salad", price: 8.50, category: "Salads", desc: "Feta, olives, cucumbers, quinoa, lemon vinaigrette." },

  // SIDES & DRINKS
  { id: 9, name: "Cheesy Loaded Fries", price: 6.00, category: "Sides", desc: "Crispy fries topped with melted cheddar and bacon bits." },
  { id: 10, name: "Fresh Lemonade", price: 3.50, category: "Drinks", desc: "Homemade chilled mint lemonade." }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [category, setCategory] = useState('All');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const restaurantNumber = "96176724176";
  const categories = ['All', ...new Set(MENU_DATA.map(i => i.category))];

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const onlyNums = value.replace(/[^0-9]/g, '');
    setCustomerPhone(onlyNums);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists 
        ? prev.map(i => i.id === product.id ? {...i, qty: i.qty + 1} : i)
        : [...prev, {...product, qty: 1}];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.map(i => i.id === id ? {...i, qty: i.qty - 1} : i).filter(i => i.qty > 0));
  };

  const sendOrder = () => {
    if (cart.length === 0) return alert("Your cart is empty!");
    if (!customerPhone || !customerAddress) return alert("Phone and Address are mandatory!");

    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    const itemsText = cart.map(i => `✅ ${i.qty}x ${i.name}`).join('%0A');
    
    const message = `*--- NEW ORDER ---*%0A%0A` +
                    `*📞 Phone:* ${customerPhone}%0A` +
                    `*📍 Address:* ${customerAddress}%0A%0A` +
                    `*🛒 Items:*%0A${itemsText}%0A%0A` +
                    `*💰 TOTAL: $${total.toFixed(2)}*`;

    window.open(`https://wa.me/${restaurantNumber}?text=${message}`);
  };

  return (
    <div style={{ backgroundColor: '#f4f7f6', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* HEADER SECTION */}
      <div className="bg-dark text-white py-5 mb-4 shadow text-center">
        <h1 className="fw-bold display-4">GOURMET KITCHEN</h1>
        <p className="lead opacity-75">Quality Food Delivered to Your Door</p>
      </div>

      <div className="container flex-grow-1">
        {/* CATEGORY BAR */}
        <div className="d-flex justify-content-center gap-2 mb-5 overflow-auto pb-2">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} 
              className={`btn rounded-pill px-4 py-2 fw-bold transition-all shadow-sm ${category === c ? 'btn-primary' : 'btn-white bg-white text-dark border'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="row">
          {/* MENU LIST */}
          <div className="col-lg-8">
            <div className="row g-4">
              {MENU_DATA.filter(i => category === 'All' || i.category === category).map(item => (
                <div key={item.id} className="col-md-6">
                  <div className="card h-100 border-0 shadow-sm hover-up p-3" style={{ borderRadius: '15px' }}>
                    <div className="d-flex justify-content-between align-items-start">
                      <h5 className="fw-bold text-dark mb-1">{item.name}</h5>
                      <span className="badge bg-success-subtle text-success border border-success px-3 py-2 rounded-pill">${item.price.toFixed(2)}</span>
                    </div>
                    <p className="text-muted small mt-2 mb-4">{item.desc}</p>
                    <button onClick={() => addToCart(item)} className="btn btn-outline-dark rounded-pill fw-bold mt-auto">
                      + Add to Plate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CHECKOUT SIDEBAR */}
          <div className="col-lg-4">
            <div className="card p-4 shadow border-0 sticky-top mt-4 mt-lg-0" style={{ top: '20px', borderRadius: '20px' }}>
              <h4 className="fw-bold mb-4">Checkout</h4>
              
              <div className="mb-4">
                <label className="small fw-bold text-uppercase text-muted mb-2">Phone Number *</label>
                <input type="text" className="form-control rounded-3 py-2 border-light-subtle" placeholder="Enter your number" value={customerPhone} onChange={handlePhoneChange} />
                
                <label className="small fw-bold text-uppercase text-muted mt-3 mb-2">Delivery Address *</label>
                <textarea className="form-control rounded-3 border-light-subtle" placeholder="Street, Building, Floor..." rows="2" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)}></textarea>
              </div>

              <div className="order-summary mb-3">
                {cart.length === 0 ? (
                  <div className="text-center py-4 text-muted border border-dashed rounded-3">Your plate is empty</div>
                ) : (
                  <>
                    {cart.map(i => (
                      <div key={i.id} className="d-flex justify-content-between align-items-center mb-3">
                        <span className="small fw-semibold">{i.qty}x {i.name}</span>
                        <div className="d-flex align-items-center gap-2">
                           <button onClick={() => removeFromCart(i.id)} className="btn btn-sm btn-light border rounded-circle" style={{ width: '28px', height: '28px', padding: '0' }}>-</button>
                           <button onClick={() => addToCart(i)} className="btn btn-sm btn-light border rounded-circle" style={{ width: '28px', height: '28px', padding: '0' }}>+</button>
                        </div>
                      </div>
                    ))}
                    <div className="border-top pt-3 d-flex justify-content-between align-items-center h4 fw-bold">
                      <span>Total</span>
                      <span className="text-primary">${cart.reduce((s, i) => s + (i.price * i.qty), 0).toFixed(2)}</span>
                    </div>
                    <button onClick={sendOrder} className="btn btn-success w-100 mt-4 py-3 fw-bold rounded-pill shadow-lg">
                      SEND ORDER (WHATSAPP)
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER SECTION */}
      <footer className="bg-dark text-white pt-5 pb-3 mt-5">
        <div className="container text-center">
          <div className="row border-bottom border-secondary pb-4 mb-4">
            <div className="col-md-4 mb-3">
              <h6 className="text-uppercase fw-bold text-primary">Location</h6>
              <p className="small text-secondary">Beirut, Lebanon<br/>Hamra Street, Building 404</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6 className="text-uppercase fw-bold text-primary">Hours</h6>
              <p className="small text-secondary">Mon - Sun: 12:00 PM - 12:00 AM</p>
            </div>
            <div className="col-md-4 mb-3">
              <h6 className="text-uppercase fw-bold text-primary">Contact</h6>
              <p className="small text-secondary">WhatsApp: +961 76 724 176<br/>Email: info@gourmetkitchen.com</p>
            </div>
          </div>
          <p className="small text-secondary">&copy; 2024 Gourmet Kitchen. Powered by React.</p>
        </div>
      </footer>

      {/* CUSTOM STYLES */}
      <style>{`
        .hover-up { transition: transform 0.2s ease, shadow 0.2s ease; cursor: pointer; }
        .hover-up:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
        .transition-all { transition: all 0.3s ease; }
        .btn-primary { background-color: #007bff; border: none; }
        .text-primary { color: #007bff !important; }
      `}</style>
    </div>
  );
}