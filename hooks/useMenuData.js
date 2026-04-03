import { useState, useEffect, useCallback } from 'react';
import * as SQLite from 'expo-sqlite';

const MENU_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

// ── Old API: openDatabase (sync, not openDatabaseAsync) ──────────────────────
const db = SQLite.openDatabase('little_lemon.db');

function initDb() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS menu (
                    id          INTEGER PRIMARY KEY AUTOINCREMENT,
                    name        TEXT NOT NULL,
                    price       REAL NOT NULL,
                    description TEXT,
                    image       TEXT,
                    category    TEXT
                );`,
                [],
                () => resolve(),
                (_, err) => { reject(err); return false; }
            );
        });
    });
}
function getRowCount() {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT COUNT(*) AS count FROM menu;',
                [],
                (_, result) => resolve(result.rows._array[0].count),
                (_, err) => { reject(err); return false; }
            );
        });
    });
}

function insertItems(items) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            items.forEach(item => {
                tx.executeSql(
                    'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?);',
                    [
                        item.name ?? '',
                        item.price ?? 0,
                        item.description ?? '',
                        item.image ?? '',
                        item.category ?? '',
                    ],
                    null,
                    (_, err) => { reject(err); return false; }
                );
            });
        }, reject, resolve);
    });
}

function queryAll(sql, params = []) {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                sql, params,
                (_, result) => resolve(result.rows._array),
                (_, err) => { reject(err); return false; }
            );
        });
    });
}

// ─────────────────────────────────────────────────────────────────────────────

export function useMenuData() {
    const [menuItems, setMenuItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                await initDb();

                const count = await getRowCount();

                if (count === 0) {
                    // First run – fetch from network
                    const response = await fetch(MENU_URL);
                    if (!response.ok) throw new Error(`Network error: ${response.status}`);

                    const json = await response.json();
                    const items = json.menu ?? [];
                    await insertItems(items);
                }

                // Always read from SQLite
                const rows = await queryAll('SELECT * FROM menu ORDER BY name;');
                if (!cancelled) setMenuItems(rows);

            } catch (e) {
                console.error('useMenuData error:', e);
                if (!cancelled) setError(e.message);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => { cancelled = true; };
    }, []);

    const getByCategory = useCallback((category) => {
        return queryAll(
            'SELECT * FROM menu WHERE category = ? ORDER BY name;',
            [category]
        );
    }, []);

    const searchMenu = useCallback((query) => {
        return queryAll(
            'SELECT * FROM menu WHERE name LIKE ? OR description LIKE ? ORDER BY name;',
            [`%${query}%`, `%${query}%`]
        );
    }, []);

    const clearMenu = useCallback(() => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql('DELETE FROM menu;', [], () => {
                    setMenuItems([]);
                    resolve();
                }, (_, err) => { reject(err); return false; });
            });
        });
    }, []);

    return { menuItems, isLoading, error, getByCategory, searchMenu, clearMenu };
}