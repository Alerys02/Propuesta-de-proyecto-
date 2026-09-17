<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $query = Item::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%")
                  ->orWhere('category', 'like', "%{$search}%");
        }

        return Inertia::render('Items/Index', [
            'items' => $query->latest()->get(),
            'filters' => $request->only(['search']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:items,code',
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'status' => 'required|in:Disponible,En Préstamo,En Mantenimiento,Dado de Baja',
            'location' => 'nullable|string|max:255',
        ]);

        Item::create($validated);

        return redirect()->back()->with('message', 'Recurso registrado exitosamente.');
    }
}
