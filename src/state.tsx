import { createContext,useContext,useEffect,useState,type ReactNode } from 'react';
import type { AppProgress,Skill,SkillProgress } from './content/model';
import { award,createInitialProgress,initialSkillProgress,masteryEligible } from './lib/progression';
import { loadProgress,saveProgress } from './lib/storage';
import { useAuth } from './auth';

type Ctx={progress:AppProgress;ready:boolean;setProgress:(p:AppProgress)=>void;activate:(s:Skill)=>void;completeTheory:(s:Skill)=>void;submitCheck:(s:Skill)=>void;submitPractice:(s:Skill)=>void;setRubric:(s:Skill,id:string,value:number)=>void;saveEvidence:(s:Skill,reflection:string,link:string)=>void;master:(s:Skill)=>void;reset:()=>void};
const Context=createContext<Ctx|null>(null);

export function ProgressProvider({children}:{children:ReactNode}){
  const{user}=useAuth();const[progress,setInner]=useState(createInitialProgress());const[ready,setReady]=useState(false);
  useEffect(()=>{if(!user){setInner(createInitialProgress());setReady(false);return}loadProgress(user).then(p=>{setInner(p);setReady(true)})},[user]);
  const setProgress=(p:AppProgress)=>{setInner(p);if(user)void saveProgress(user,p)};
  const patch=(s:Skill,fn:(p:SkillProgress)=>void,event?:keyof Skill['xp'])=>{let next={...progress,skills:{...progress.skills}};const sp={...(next.skills[s.id]??initialSkillProgress()),rubric:{...(next.skills[s.id]?.rubric??{})},xpEvents:[...(next.skills[s.id]?.xpEvents??[])]};fn(sp);next.skills[s.id]=sp;next.updatedAt=new Date().toISOString();if(event)next=award(next,s,event);setProgress(next)};
  return <Context.Provider value={{progress,ready,setProgress,activate:s=>setProgress({...progress,activeSkillId:s.id,updatedAt:new Date().toISOString()}),completeTheory:s=>patch(s,p=>{p.theory=true},'theory'),submitCheck:s=>patch(s,p=>{p.check=true},'check'),submitPractice:s=>patch(s,p=>{p.practice=true},'practice'),setRubric:(s,id,value)=>patch(s,p=>{p.rubric[id]=value}),saveEvidence:(s,reflection,link)=>patch(s,p=>{p.evidence={reflection,link:link||undefined,createdAt:new Date().toISOString()}},'evidence'),master:s=>patch(s,p=>{if(masteryEligible(s,p)){p.state='mastered';p.masteredAt=new Date().toISOString()}},'mastery'),reset:()=>setProgress(createInitialProgress())}}>{children}</Context.Provider>
}
export const useProgress=()=>{const c=useContext(Context);if(!c)throw new Error('Progress context missing');return c};
