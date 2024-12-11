import { getLocal } from '@/shared/utils/localstorage';
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

const URL = import.meta.env.VITE_SERVER_ADDRESS

interface ISocketContext {
    socket: Socket;
}

const SocketContext = createContext<ISocketContext | undefined>(undefined);

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const socket = io(URL, {
        extraHeaders: {
            Authorization: `Bearer ${getLocal('token')}`,
        },
    });
    const [socketInstance, setSocketInstance] = useState<Socket>(io(URL));

    useEffect(() => {
        setSocketInstance(socket);
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket: socketInstance }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocketContext = (): ISocketContext => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
};
