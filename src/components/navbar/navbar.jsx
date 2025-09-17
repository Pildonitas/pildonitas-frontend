import React from 'react'
import './navbar.css'
import logoPildonitas from '../../assets/logo_pildonitas.png'

function navbar() {
  return (
    <nav class="bg-[#ECF0F1] mb-8 rounded-md">
        <div class="max-w-7xl m-3 p-4">
            <div class="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0 min-h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-3">
                            <img src={logoPildonitas} alt="Logo_pildonitas" />
                        </div>
                        <h1 class="text-[#00AEEF] text-l font-semibold">Pildonitas</h1>
                    </div>
                </div>
                <div class="block">
                    <div class="flex flex-col md:flex-row md:items-baseline space-y-2 md:space-y-0 md:space-x-4">
                        <a href="#" class="text-[#005F9E] hover:text-white px-3 py-4 rounded-md text-md font-bold">Agregar</a>
                        <a href="#" class="text-[#005F9E] hover:text-white px-3 py-4 rounded-md text-md font-bold">Historial</a>
                        <a href="#" class="text-[#005F9E] hover:text-white px-3 py-4 rounded-md text-sm font-bold">Perfil</a>
                    </div>
                </div>
                
            </div>
        </div>
    </nav>
  )
}

export default navbar