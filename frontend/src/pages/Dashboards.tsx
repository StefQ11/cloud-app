import React, { useEffect, useState } from 'react';
import api from '../services/api';

// Definicja typu dla zadań
interface CloudTask {
  id: number;
  name: string;
  isCompleted: boolean;
}

const Dashboard = () => {
  const [items, setItems] = useState<CloudTask[]>([]);
  const [error, setError] = useState("");
  const [newTaskName, setNewTaskName] = useState("");

  const fetchTasks = () => {
    api.get('/tasks')
      .then((res: any) => {
        setItems(res.data);
      })
      .catch((err: any) => {
        console.error("Szczegóły błędu:", err);
        setError("Błąd połączenia z API. Sprawdź, czy backend działa.");
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTaskName.trim()) return;

    try {
      await api.post('/tasks', {
        name: newTaskName
      });

      setNewTaskName("");
      fetchTasks();
    } catch (err) {
      console.error("Błąd podczas dodawania zadania:", err);
      setError("Nie udało się dodać zadania. Spróbuj ponownie.");
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        minHeight: '100vh',
        background: '#121212',
        color: '#ffffff'
      }}
    >
      <h1>☁️ Cloud App Dashboard</h1>

      {/* Komunikat o błędzie */}
      {error && (
        <div style={{
          background: '#3a2f00',
          color: '#ffd966',
          padding: '10px',
          borderRadius: '5px',
          margin: '20px auto',
          maxWidth: '400px'
        }}>
          {error}
        </div>
      )}

      {/* FORMULARZ */}
      <form onSubmit={handleAddTask} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Wpisz nowe zadanie..."
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          style={{
            padding: '10px',
            width: '250px',
            borderRadius: '6px',
            border: '1px solid #444',
            background: '#1e1e1e',
            color: '#fff'
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Dodaj Zadanie
        </button>
      </form>

      {/* LISTA */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {items.length === 0 && !error && (
          <p style={{ color: '#e0e0e0' }}>Brak zadań. Czas coś zaplanować!</p>
        )}

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              style={{
                background: '#1f1f1f',
                color: '#ffffff',
                margin: '8px 0',
                padding: '12px 20px',
                borderRadius: '10px',
                borderLeft: item.isCompleted
                  ? '5px solid #22c55e'
                  : '5px solid #6c757d',
                width: '350px',
                textAlign: 'left',
                boxShadow: '0 4px 10px rgba(0,0,0,0.25)',
                opacity: item.isCompleted ? 0.7 : 1,
                textDecoration: item.isCompleted ? 'line-through' : 'none'
              }}
            >
              <strong>{item.name}</strong> {item.isCompleted ? '✅' : '⏳'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;