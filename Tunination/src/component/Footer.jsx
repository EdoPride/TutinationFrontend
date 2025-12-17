import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black text-white pt-16 pb-10">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Contact */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Salami Jafaru Johnson</h3>
                    <p className="opacity-80">daddytutination@gmail.com</p>
                    <p className="opacity-80">Recovery Phone: 06 84488453</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
                    <ul className="space-y-2 opacity-90">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/events">Events</Link></li>
                        <li><Link to="/appointment">Appointment</Link></li>
                        <li><Link to="/ticket">Get Ticket</Link></li>
                    </ul>
                </div>

                {/* Socials */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
                    <div className="flex items-center gap-6 text-2xl">
                        <a href="https://www.instagram.com/ojbrown_7bg?igsh=MXN4MzV6bGE2NGx3MA%3D%3D&utm_source=qr" className="hover:text-red-500 transition"><FaInstagram /></a>
                        <a href="https://www.tiktok.com/@ojbrown_dtn?_r=1&_t=ZG-92FmzPGhbqi" className="hover:text-red-500 transition"><FaTiktok /></a>
                        <a href="https://www.youtube.com/@ojbrown_dtn" className="hover:text-red-500 transition"><FaYoutube /></a>
                        <a href="https://www.facebook.com/share/1DU683yopn/?mibextid=wwXIfr" className="hover:text-red-500 transition"><FaFacebook /></a>

                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="text-center mt-12 opacity-70 text-sm">
                © 2025 DtNation. All rights reserved.
            </div>
        </footer>
    );
}
