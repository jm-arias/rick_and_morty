import { CharacterModel } from 'src/models/CharacterModels';
import { openDB } from 'idb';

const dataBaseStores = {
  Favorites: 'Favorites',
} as const;

function setDB(callback: (db: IDBDatabase) => void) {
  const request = indexedDB.open(
    dataBaseStores.Favorites,
    1 /* database version, trigger onupgradeneeded event */
  );

  request.onerror = console.error;
  request.onsuccess = () => {
    callback(request.result /* the request result is the database */);
  };

  request.onupgradeneeded = () => {
    initDB(request.result);
  };
}

function initDB(db: IDBDatabase) {
  const store = db.createObjectStore(dataBaseStores.Favorites, {
    keyPath: 'id',
  });

  store.createIndex('id', 'id');
}

async function get(id: IDBValidKey | IDBKeyRange) {
  const db = await openDB(dataBaseStores.Favorites);
  const value = await db.get(dataBaseStores.Favorites, id);
  return value as { id: number; favorite: boolean };
}

async function getAll() {
  const db = await openDB(dataBaseStores.Favorites);
  const value = await db.getAll(dataBaseStores.Favorites);
  return value as { id: number; favorite: boolean }[];
}

async function set(data: { id: number; favorite: boolean }) {
  setDB(async () => {
    const _db = await openDB(dataBaseStores.Favorites);
    _db.put(dataBaseStores.Favorites, data);
  });
}

async function setBatch(data: (CharacterModel & { favorite?: boolean })[]) {
  setDB(async () => {
    const _db = await openDB(dataBaseStores.Favorites);
    const value = await _db.getAll(dataBaseStores.Favorites);

    data.forEach((item) => {
      item.favorite = !!value.find((x) => item.id === x.id)?.favorite;
    });
    for (const record of data.map((item) => ({
      id: item.id,
      favorite: item.favorite,
    }))) {
      _db.put(dataBaseStores.Favorites, record);
    }
  });
}

export const indexDb = {
  get,
  getAll,
  set,
  setBatch,
  initDB,
};
