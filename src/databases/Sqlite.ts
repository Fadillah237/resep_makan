import SQLite from 'react-native-sqlite-storage';
import { Recipe } from '../types/types';

const db = SQLite.openDatabase(
  {
    name: 'recipeapp.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  error => {
    console.error('Error opening database: ', error);
  },
);

export const initDatabase = () => {
  db.transaction(
    tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS recipes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT,
          category TEXT,
          ingredients TEXT,
          steps TEXT,
          imageUrl TEXT,
          rating INTEGER,
          favorites BOOLEAN,
          reviews TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        [],
        () => {
          console.log('Table created successfully');
        },
        (tx, error) => {
          console.error('Error creating table: ', error);
        },
      );
    },
    error => {
      console.error('Transaction error: ', error);
    },
    () => {
      console.log('Transaction successful');
    },
  );
};

export const addRecipe = (recipe: Omit<Recipe, 'id' | 'created_at'>) => {
  return new Promise<number>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO recipes (title, category, ingredients, steps, imageUrl, rating, favorites, reviews) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [recipe.title, recipe.category, recipe.ingredients, recipe.steps, recipe.imageUrl, recipe.rating, recipe.favorites, recipe.reviews],
        (_, { insertId }) => resolve(insertId as number),
        (_, error) => reject(error),
      );
    });
  });
};

export const getRecipes = () => {
  return new Promise<Recipe[]>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM recipes ORDER BY created_at DESC',
        [],
        (_, { rows }) => resolve(rows.raw()),
        (_, error) => reject(error),
      );
    });
  });
};

export const updateRecipe = (id: number, updates: Partial<Omit<Recipe, 'id' | 'created_at'>>) => {
  const fields = Object.keys(updates).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updates);
  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE recipes SET ${fields} WHERE id = ?`,
        [...values, id],
        () => resolve(),
        (_, error) => reject(error),
      );
    });
  });
};

export const deleteRecipe = (id: number) => {
  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM recipes WHERE id = ?',
        [id],
        () => resolve(),
        (_, error) => reject(error),
      );
    });
  });
};