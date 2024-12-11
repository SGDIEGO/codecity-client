import React from 'react';

export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8 relative min-h-screen flex items-center justify-center">
            <div className="relative bg-white dark:bg-slate-800 bg-opacity-75 dark:bg-opacity-75 shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-center">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-4xl font-bold text-center md:text-left mb-6 text-slate-900 dark:text-slate-100">
                        Bienvenido a CodeCity
                    </h1>
                    <div className=" inset-0">
                        <img
                            src="https://www.computing.es/wp-content/uploads/2022/12/81204_07.jpg.webp"
                            alt="Tecnología"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <p className="text-lg text-center md:text-left text-slate-700 dark:text-slate-300 mb-6">
                        CodeCity es una plataforma de foros dedicada a los desarrolladores de software. Aquí puedes encontrar y participar en discusiones sobre una variedad de temas relacionados con el desarrollo de software, incluyendo desarrollo web, desarrollo backend, desarrollo móvil y mucho más.
                    </p>
                    <p className="text-lg text-center md:text-left text-slate-700 dark:text-slate-300 mb-6">
                        Únete a nuestra comunidad para compartir tus conocimientos, aprender de otros desarrolladores y mantenerte al día con las últimas tendencias y tecnologías en el mundo del desarrollo de software.
                    </p>
                    <p className="text-lg text-center md:text-left text-slate-700 dark:text-slate-300">
                        ¡Esperamos verte en los foros!
                    </p>
                </div>
            </div>
        </div>
    );
}