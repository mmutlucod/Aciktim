import React from 'react'
import "../styles/Footer.css"
import location from "../images/Location.png"
import takip from "../images/TakipEt.jpeg"

function Footer() {
    return (
        <div className='Footer'>

            <div className="row">
                <div className="col">
                    <text>Bizi takip edin !</text>
                    <img src={takip} alt="takip" style={{ width: "75%" }} />
                </div>
                <div className="col">
                    <text>Adres</text> 
                    : Akıncılar, Adnan Kahveci Blv. Kale Outlet Center No:89, 34160 Güngören/Istanbul - Avrupa
                    <br/>
                    <text>Tel no</text>
                    : 0212 557 36 44
                </div>
                <div className="col-4">
                    <img src={location} alt="location" style={{ width: "75%" }} />
                </div>
            </div>

    

            <p>
                TM & © 2023 Acıktım Corporation. Tüm Hakları saklıdır. Acıktım Corporation, Acıktım markası ve ambleminin tek sahibidir. TAB GIDA "Acıktım" markasının Türkiye’de münhasır lisans hakkı sahibi ve restoranlarının Türkiye’deki işletmecisi ve geliştirme ortağıdır. TAB Gıda, Ne Yediğini Bil markası ve ambleminin tek hak sahibidir. Yasal bilgiler için tıklayınız.
                TAB Gıda Sanayi ve Ticaret A.Ş. markaları; Ara Gelsin sipariş hattı, Tıkla Gelsin web sitesi, Sodexo Plus, Acıktım Türkiye ve Popeyes Türkiye Facebook Messenger Bot, Tıkla Gelsin Mobil Uygulama ve Yemek Sepeti uygulaması dışında hiçbir platformdan sipariş almamaktadır. Farklı platformlardan verilen siparişlerle ilgili sorumluluk TAB Gıda Sanayi ve Ticaret A.Ş.'ye ait değildir.
                Arby's | Popeyes | Sbarro | Usta Dönerci | Tab Gıda Yatırımları (TFI)
            </p>
        </div>
    )
}

export default Footer
