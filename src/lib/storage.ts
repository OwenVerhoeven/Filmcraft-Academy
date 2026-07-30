import Dexie, { type EntityTable } from 'dexie';
import type { AppProgress } from '../content/model';
import { createInitialProgress } from './progression';

type RecordRow={id:string;data:AppProgress};
const db=new Dexie('filmcraft-academy') as Dexie&{progress:EntityTable<RecordRow,'id'>};
db.version(1).stores({progress:'id'});
export async function loadProgress(account:string){const own=await db.progress.get(`account:${account}`);if(own)return own.data;if(account==='SinbodWayne'){const legacy=await db.progress.get('primary');if(legacy){await db.progress.put({id:`account:${account}`,data:legacy.data});return legacy.data}}return createInitialProgress()}
export async function saveProgress(account:string,data:AppProgress){await db.progress.put({id:`account:${account}`,data})}
export function exportProgress(data:AppProgress){const blob=new Blob([JSON.stringify({format:'filmcraft-backup',exportedAt:new Date().toISOString(),data},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`filmcraft-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();URL.revokeObjectURL(a.href)}
export async function importProgress(file:File){const parsed=JSON.parse(await file.text());if(parsed.format!=='filmcraft-backup'||parsed.data?.version!==1)throw new Error('Not a FilmCraft V1 backup');return parsed.data as AppProgress}
