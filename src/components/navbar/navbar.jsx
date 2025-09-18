import React from 'react'
import './navbar.css'
import logoPildonitas from '../../assets/logo_pildonitas.png'

function navbar() {
 return (
    <nav className="bg-[#ECF0F1] mb-8 rounded-md">
        <div className="max-w-7xl m-15 p-5">
            <div className="flex flex-col md:flex-row md:justify-evenly md:items-center space-y-4 md:space-y-0 min-h-16">
                <div className="flex items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <div className="w-20 h-20 bg-[#CEE3DB] rounded-full flex items-center justify-center mr-3">
                            <img src={logoPildonitas} alt="Logo_pildonitas" className="w-15 h-14"/>
                        </div>
                        <h1 className="text-[#00AEEF] text-l font-semibold">Pildonitas</h1>
                    </div>
                </div>
                <div className="block">
                    <div className="flex flex-col md:flex-row md:items-baseline space-y-2 md:space-y-0 md:space-x-4">
                        <a href="#" className="text-[#005F9E] hover:text-white px-3 py-4 rounded-md text-md font-bold">Agregar</a>
                        <a href="#" className="text-[#005F9E] hover:text-white px-3 py-4 rounded-md text-md font-bold">Historial</a>
                        <a href="#" className="text-[#005F9E] hover:text-white px-3 py-4 rounded-md text-sm font-bold">Perfil</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default navbar