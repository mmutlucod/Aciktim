// import React from 'react'
// import Modal from "react-modal";

// import "../styles/CartSummary.css"
// import alertify from "alertifyjs"

// import { useDispatch, useSelector } from "react-redux"
// import { getCurrentUser } from '../redux/userSlice';
// import { emptyCart } from '../redux/cartSlice';

// import { useNavigate } from 'react-router-dom';

// function CartSummary({ products, isOpen, closeModal, total }) {

//     const navigate = useNavigate();
//     const dispatch = useDispatch()

//     const handleCompleteOrder = () => {
//         alertify.success("SİPARİŞİNİZ ALINMIŞTIR, AFİYET OLSUN :)",2)
//         //closeModal()    // Bunu Ana Sayfaya git ile değiştir
//         navigate("/");
//         // SEPETİ BOŞALT
//         dispatch(emptyCart())
//       };

//       const index = useSelector((state) => state.user.currentUserIndex);
//       const users = useSelector((state) => state.user.users);
//       const currentUser = users[index]

//     return (
//         <div>
//             <Modal className='CartSummary' isOpen={isOpen} onRequestClose={closeModal} contentLabel="Custom Modal">

//                 <div className='exitBtn'>
//                     <button onClick={closeModal}>X</button>
//                 </div>

//                 <div className='innerText'>
//                     <h2>SİPARİŞ ÖZETİ</h2>
//                     <h4>ÜRÜNLER</h4>

//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Ürün Adı</th>
//                                 <th>Adet</th>
//                                 <th>Fiyat</th>
//                             </tr>
//                         </thead>
//                         <tbody>

//                             {products.map((pro, index) => (
//                                 <tr key={index}>
//                                     <td>{pro.name}</td>
//                                     <td>{pro.number}</td>
//                                     <td>{pro.price}</td>
//                                 </tr>
//                             ))}

//                         </tbody>

//                         <thead>
//                             <tr>
//                                 <th>TOPLAM :   </th>
//                                 <th></th>
//                                 <th>{total} TL</th>
//                             </tr>
//                         </thead>
//                     </table>
                                
//                     <h4>ADRES</h4>
//                     <p>{currentUser.address}</p>

//                     <h4>İLETİŞİM</h4>
//                     <p>{currentUser.phoneNumber}</p>

//                     <h4>ÖDEME SEÇENEĞİ</h4>
//                     <select name='payment' >
//                         <option value="cash">Nakit</option>
//                         <option value="crediCart">Kredi Kartı</option>
//                     </select>

//                     <div className='btn'>
//                         <button onClick={handleCompleteOrder}>SİPARİŞİ TAMAMLA</button> {/*  ana sayfayaya yolla */}
//                     </div>

//                 </div>

//             </Modal>
//         </div>
//     )
// }


// export default CartSummary
