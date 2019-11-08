import { foldersdb } from './core/database.js'

const structuresRef = foldersdb.doc("structures")

export const getStructures = async () => (await structuresRef.get()).data().payload
export const updateStructures = async obj => await structuresRef.set({payload:obj})

const categoriesRef = foldersdb.doc("categories")

export const getCategories = async () => (await categoriesRef.get()).data()
