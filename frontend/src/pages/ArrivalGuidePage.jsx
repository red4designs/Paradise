import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Clock,
    MapPin,
    Car,
    Info,
    Phone,
    Wifi,
    Coffee,
    AlertTriangle,
    CheckCircle,
    Bus,
    ParkingCircle,
    Mountain
} from 'lucide-react';

const ArrivalGuidePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Arrival Guide | Paradise Resort Vattavada</title>
                <meta name="description" content="Important details for your stay at Paradise Resort Vattavada including check-in times, directions, parking, and house rules." />
            </Helmet>

            <div className="min-h-screen pt-24 pb-12 px-4 md:px-8 lg:px-16 container mx-auto">
                <div className="max-w-6xl mx-auto space-y-12">

                    {/* Header Section */}
                    <div className="text-center space-y-4 mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 animate-pulse">
                            Arrival Guide
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Everything you need to know before your arrival at Paradise Resort Vattavada.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Check-in / Check-out */}
                        <div className="glass-panel p-6 space-y-6 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-shadow duration-300">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <Clock className="w-8 h-8 text-cyan-400" />
                                <h2 className="text-2xl font-semibold text-white">Timings</h2>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                    <span className="text-gray-300">Check-in</span>
                                    <span className="font-mono text-cyan-300 text-lg">14:00 - 18:00</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                    <span className="text-gray-300">Check-out</span>
                                    <span className="font-mono text-cyan-300 text-lg">11:00</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded-lg bg-white/5">
                                    <span className="text-gray-300">Reception</span>
                                    <span className="font-mono text-cyan-300 text-lg">06:00 - 23:59</span>
                                </div>

                                <div className="text-sm text-gray-400 space-y-2 mt-4">
                                    <p>
                                        <strong className="text-gray-200">Early check-in:</strong> Yes, if available (extra fee may apply).
                                    </p>
                                    <p>
                                        <strong className="text-gray-200">Late check-out:</strong> Yes, if available (extra fee may apply).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Check-in Instructions */}
                        <div className="glass-panel p-6 space-y-6 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-shadow duration-300 md:col-span-2">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                                <h2 className="text-2xl font-semibold text-white">Check-in Instructions</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-medium text-cyan-200">Arrival at Property</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        You can reach directly to Paradise Resort Vattavada, located 1.5 km before Vattavada town.
                                        Ample parking is available.
                                    </p>

                                    <h3 className="text-lg font-medium text-cyan-200 mt-4">Reception Desk</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        Our staff will assist you at the reception. Please have your booking confirmation
                                        (Agoda/Website/Direct) and a valid government ID ready.
                                    </p>
                                </div>

                                <div className="space-y-4 bg-white/5 p-4 rounded-xl border border-white/10">
                                    <div className="flex items-start gap-3">
                                        <Phone className="w-5 h-5 text-cyan-400 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-white">Contact on Arrival</h4>
                                            <p className="text-sm text-gray-300 mt-1">
                                                If reception is unattended, call or WhatsApp: <br />
                                                <a href="tel:9074902424" className="text-cyan-300 hover:underline">9074902424</a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Wifi className="w-5 h-5 text-cyan-400 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-white">Amenities</h4>
                                            <p className="text-sm text-gray-300 mt-1">
                                                Free WiFi & Hot Water used.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Coffee className="w-5 h-5 text-cyan-400 mt-1" />
                                        <div>
                                            <h4 className="font-semibold text-white">Extras</h4>
                                            <p className="text-sm text-gray-300 mt-1">
                                                Campfire, BBQ, and jeep trekking available at extra cost.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Directions */}
                        <div className="glass-panel p-6 space-y-6 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-shadow duration-300 md:col-span-2 lg:col-span-2">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <MapPin className="w-8 h-8 text-red-400" />
                                <h2 className="text-2xl font-semibold text-white">Directions</h2>
                            </div>

                            <div className="space-y-6 relative pl-4 border-l-2 border-dashed border-white/20">
                                <div className="relative">
                                    <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-cyan-500 box-glow" />
                                    <h3 className="text-lg font-bold text-white mb-2">1. Start from Munnar Town</h3>
                                    <p className="text-gray-400">Drive towards Mattupetty – Kundala – Top Station road.</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-cyan-500 box-glow" />
                                    <h3 className="text-lg font-bold text-white mb-2">2. Proceed to Top Station</h3>
                                    <p className="text-gray-400">Enjoy scenic views, but please drive carefully on hill roads.</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-yellow-500 box-glow" />
                                    <h3 className="text-lg font-bold text-yellow-400 mb-2">3. Forest Check Post (Important ⚠️)</h3>
                                    <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg">
                                        <p className="text-yellow-200">Timings: 6:00 AM – 6:00 PM</p>
                                        <p className="text-sm text-yellow-200/80 mt-1">You must cross before 6:00 PM. Entry is not allowed after.</p>
                                    </div>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-cyan-500 box-glow" />
                                    <h3 className="text-lg font-bold text-white mb-2">4. Continue Towards Vattavada</h3>
                                    <p className="text-gray-400">Pass the check post. The nearest bus stand is Koviloor.</p>
                                </div>

                                <div className="relative">
                                    <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-green-500 box-glow" />
                                    <h3 className="text-lg font-bold text-green-400 mb-2">5. Arrive at Paradise Resort</h3>
                                    <p className="text-gray-400">Look for the private access road. It is well-maintained and suitable for all cars, bikes, and 49-seater buses.</p>
                                    <a
                                        href="https://maps.app.goo.gl/pY8AWboWhFHvTGEA6"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 mt-3 text-cyan-400 hover:text-cyan-300 hover:underline"
                                    >
                                        <MapPin size={16} /> Open Google Maps Location
                                    </a>
                                </div>

                                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg mt-4">
                                    <h4 className="flex items-center gap-2 text-blue-300 font-semibold mb-2">
                                        <Info size={18} /> Arrival Notes
                                    </h4>
                                    <ul className="list-disc list-inside text-sm text-blue-100 space-y-1">
                                        <li>Mobile network is weak; Jio & BSNL work reliably.</li>
                                        <li>Night arrival requires extra caution due to visibility.</li>
                                        <li>Contact: <span className="font-mono">9074902424, 8848019414</span></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Parking */}
                        <div className="glass-panel p-6 space-y-6 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-shadow duration-300">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <ParkingCircle className="w-8 h-8 text-blue-400" />
                                <h2 className="text-2xl font-semibold text-white">Parking</h2>
                            </div>

                            <div className="space-y-4">
                                <p className="text-gray-300">
                                    Spacious on-site parking available for all guests comfortably accommodating:
                                </p>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Bus size={18} /> <span>3 large buses (49-seater)</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-400">
                                        <Car size={18} /> <span>Multiple cars & jeeps</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                                    <p className="text-green-300 font-bold">Free Parking</p>
                                    <p className="text-xs text-green-200/70">24/7 CCTV Surveillance</p>
                                </div>
                            </div>
                        </div>

                        {/* House Rules */}
                        <div className="glass-panel p-6 space-y-6 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-shadow duration-300 md:col-span-3">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <AlertTriangle className="w-8 h-8 text-yellow-400" />
                                <h2 className="text-2xl font-semibold text-white">House Rules & Regulations</h2>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                                <div className="space-y-2">
                                    <h3 className="font-bold text-cyan-300">Reservation & Payment</h3>
                                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                                        <li>Advance payment mandatory.</li>
                                        <li>Full payment at check-in.</li>
                                        <li>UPI and Cash only.</li>
                                        <li>Strictly non-refundable bookings.</li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-cyan-300">Quiet Hours</h3>
                                    <p className="text-gray-400">
                                        10:00 PM to 6:00 AM. Guests are expected to be considerate. Misconduct may result in termination of stay.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-cyan-300">Prohibited</h3>
                                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                                        <li>Smoking inside rooms.</li>
                                        <li>Plucking flowers/fruits.</li>
                                        <li>Unauthorized campfires.</li>
                                        <li>Moving furniture.</li>
                                    </ul>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-cyan-300">Room Occupancy</h3>
                                    <p className="text-gray-400">
                                        Max occupancy enforced. Extra guests incur charges. Valid ID required for all guests.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-cyan-300">Damages</h3>
                                    <p className="text-gray-400">
                                        Guests are responsible for property damage. Costs will be charged accordingly.
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-bold text-cyan-300">Maintenance</h3>
                                    <p className="text-gray-400">
                                        Please maintain cleanliness. Daily housekeeping provided. Contact desk for extra cleaning.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Local Recommendations */}
                        <div className="glass-panel p-6 space-y-6 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)] transition-shadow duration-300 md:col-span-3">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <Mountain className="w-8 h-8 text-purple-400" />
                                <h2 className="text-2xl font-semibold text-white">Local Recommendations via Jeep Trekking</h2>
                            </div>

                            <div className="flex flex-col md:flex-row gap-8 items-center">
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm border border-purple-500/30">
                                            ₹2,500 per jeep
                                        </span>
                                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                                            Max 8 guests
                                        </span>
                                        <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm border border-green-500/30">
                                            3+ hours (28 km)
                                        </span>
                                    </div>

                                    <p className="text-gray-300 italic">
                                        "A perfect experience to explore the scenic beauty, nature, and local life of Vattavada."
                                    </p>

                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
                                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>Shooting Point</div>
                                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>Chilanthiyar Waterfall</div>
                                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>Tiger Cave</div>
                                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>Tribal Village View</div>
                                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>Vegetable Farms</div>
                                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>Silver Falls</div>
                                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>Strawberry Farm</div>
                                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>Honey Museum</div>
                                    </div>
                                </div>

                                <div className="flex-shrink-0">
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                                        <p className="text-sm text-gray-400 mb-2">For bookings & assistance</p>
                                        <a href="tel:9074902424" className="block w-full py-2 px-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-colors">
                                            Contact Front Desk
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="text-center text-gray-500 text-sm mt-12">
                        <p>We wish you a pleasant and comfortable stay at Paradise Resort Vattavada.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ArrivalGuidePage;
