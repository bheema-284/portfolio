'use client';
import { Fragment, useContext, useEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'
import { X, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';
import RootContext from './config/rootcontext';

export default function Toast() {

    const { rootContext, setRootContext } = useContext(RootContext);
    const timerID = useRef(null);

    useEffect(() => {
        if (rootContext.toast.dismiss) {
            timerID.current = setTimeout(() => {
                setRootContext((prevContext) => ({
                    ...prevContext,
                    toast: { show: false, dismiss: false, type: 'none', message: '' }
                }));
            }, 4000);

            return () => {
                clearTimeout(timerID.current);
            };
        }
    }, [rootContext.toast.dismiss, setRootContext]);

    const dismissToast = () => {
        setRootContext((prevContext) => ({
            ...prevContext,
            toast: { show: false, dismiss: false, type: 'none', message: '' }
        }));
    }

    return (
        (rootContext.toast) ? (
            <div className="fixed top-[6rem] w-full left-1/2 transform -translate-x-1/2 pointer-events-none py-10 z-50">
                <div className="flex flex-col items-center space-y-4">
                    <Transition
                        show={rootContext.toast.show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="pointer-events-auto p-3 w-full max-w-md overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
                            <div className="p-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        {rootContext.toast.type == "success" && <CheckCircle size={28} className="text-green-400" aria-hidden="true" />}
                                        {rootContext.toast.type == "error" && <AlertCircle size={28} className="text-red-400" aria-hidden="true" />}
                                        {rootContext.toast.type == "warning" && <AlertTriangle size={28} className="text-yellow-400" aria-hidden="true" />}
                                    </div>
                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                        <p className="text-lg font-medium text-gray-900">{rootContext.toast.title}</p>
                                        <p className="mt-1 text-base text-gray-500">{rootContext.toast.message}</p>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0">
                                        <button
                                            type="button"
                                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                                            onClick={() => { dismissToast() }}
                                        >
                                            <span className="sr-only">Close</span>
                                            <X size={25} aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        ) : null
    );
}