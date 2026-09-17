import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Index({ auth, items, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const { data, setData, post, reset, errors } = useForm({
        code: '',
        title: '',
        category: '',
        description: '',
        status: 'Disponible',
        location: '',
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('items.index'), { search }, { preserveState: true });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('items.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestión de Inventario y Acervos</h2>}
        >
            <Head title="Inventario" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    
                    {/* Formulario de registro */}
                    <div className="p-6 bg-white shadow sm:rounded-lg">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Registrar Nuevo Recurso</h3>
                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Código Único</label>
                                <input
                                    type="text"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                                {errors.code && <span className="text-red-600 text-sm">{errors.code}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Título / Nombre</label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                                {errors.title && <span className="text-red-600 text-sm">{errors.title}</span>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Categoría</label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    placeholder="Ej. Bibliográfico, Cómputo"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="Ej. Estante A-1"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Estado</label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                >
                                    <option value="Disponible">Disponible</option>
                                    <option value="En Préstamo">En Préstamo</option>
                                    <option value="En Mantenimiento">En Mantenimiento</option>
                                    <option value="Dado de Baja">Dado de Baja</option>
                                </select>
                            </div>

                            <div className="md:col-span-3">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Guardar Recurso
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Buscador y Tabla de resultados */}
                    <div className="p-6 bg-white shadow sm:rounded-lg">
                        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar por título, código o categoría..."
                                className="w-full rounded-md border-gray-300 shadow-sm"
                            />
                            <button type="submit" className="px-4 py-2 bg-gray-800 text-white rounded-md">
                                Buscar
                            </button>
                        </form>

                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Código</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Categoría</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Ubicación</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td className="px-4 py-2 font-mono text-sm">{item.code}</td>
                                        <td className="px-4 py-2 text-sm text-gray-900">{item.title}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{item.category}</td>
                                        <td className="px-4 py-2 text-sm text-gray-600">{item.location || 'N/A'}</td>
                                        <td className="px-4 py-2 text-sm">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                item.status === 'Disponible' ? 'bg-green-100 text-green-800' :
                                                item.status === 'En Préstamo' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {items.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-4 text-gray-500">
                                            No se encontraron recursos registrados.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}