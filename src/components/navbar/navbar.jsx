import React from 'react'
import './navbar.css'
import logoPildonitas from '../../assets/logo_pildonitas.png'

function navbar() {
  return (
    <nav class="bg-[#ECF0F1] mb-8 rounded-md">
        <div class="max-w-7xl m-3 p-4">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0 flex items-center">
                        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mr-3">
                            <img src={logoPildonitas} alt="Logo_pildonitas" />
                        </div>
                        <h1 class="text-[#008B7A] text-xl font-semibold">Pildonitas</h1>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-4">
                        <a href="#" class="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium">Dashboard</a>
                        <a href="#" class="text-blue-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Proyectos</a>
                        <a href="#" class="text-blue-200 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Equipo</a>
                    </div>
                </div>
                <div class="hidden md:block">
                    <div class="ml-4 flex items-center md:ml-6">
                        <button class="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200">
                            Iniciar Sesión
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default navbar