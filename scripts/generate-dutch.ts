import{writeFile}from'node:fs/promises';
import{cameraCraftKnowledge}from'../src/content/knowledge-camera-craft';
import{storyPostKnowledge}from'../src/content/knowledge-story-post';
import{toolsCreativeKnowledge}from'../src/content/knowledge-tools-creative';

type Pack={title:string;summary:string;theory:{heading:string;body:string}[];objectives:string[];examples:string[];mistakes:string[]};
const source={...cameraCraftKnowledge,...storyPostKnowledge,...toolsCreativeKnowledge} as Record<string,any>;
const translated:Record<string,Pack>={};
const marker='ZXQBREAKQXZ';
const pause=(ms:number)=>new Promise(r=>setTimeout(r,ms));
async function translate(values:string[]){
  const groups:string[][]=[];let group:string[]=[],size=0;
  for(const value of values){if(size+value.length>4200&&group.length){groups.push(group);group=[];size=0}group.push(value);size+=value.length+marker.length+4}if(group.length)groups.push(group);
  const result:string[]=[];
  for(const items of groups){const body=new URLSearchParams({client:'gtx',sl:'en',tl:'nl',dt:'t',q:items.join(`\n${marker}\n`)});let response:Response|undefined;for(let attempt=0;attempt<4;attempt++){response=await fetch('https://translate.googleapis.com/translate_a/single',{method:'POST',headers:{'content-type':'application/x-www-form-urlencoded;charset=UTF-8'},body});if(response.ok)break;await pause(700*(attempt+1))}if(!response?.ok)throw new Error(`Translation request failed: ${response?.status}`);const json=await response.json() as any[];const text=(json[0] as any[]).map(row=>row[0]).join('');const parts=text.split(marker).map(x=>x.trim());if(parts.length!==items.length)throw new Error(`Translation split mismatch ${parts.length}/${items.length}`);result.push(...parts);await pause(90)}return result;
}
for(const[title,entry]of Object.entries(source)){
  const theory=entry.theory as {heading:string;body:string}[];
  const flat=[title,entry.summary,...theory.flatMap(x=>[x.heading,x.body]),...entry.objectives,...entry.examples,...entry.mistakes];
  const nl=await translate(flat);let i=0;const translatedTitle=nl[i++],summary=nl[i++];const nlTheory=theory.map(()=>({heading:nl[i++],body:nl[i++]}));const objectives=(entry.objectives as string[]).map(()=>nl[i++]);const examples=(entry.examples as string[]).map(()=>nl[i++]);const mistakes=(entry.mistakes as string[]).map(()=>nl[i++]);translated[title]={title:translatedTitle,summary,theory:nlTheory,objectives,examples,mistakes};
  const output=`export type DutchLesson={title:string;summary:string;theory:{heading:string;body:string}[];objectives:string[];examples:string[];mistakes:string[]};\nexport const dutchKnowledge:Record<string,DutchLesson>=${JSON.stringify(translated,null,2)};\n`;
  await writeFile(new URL('../src/content/knowledge-nl.generated.ts',import.meta.url),output,'utf8');
  process.stdout.write(`translated ${Object.keys(translated).length}/${Object.keys(source).length}: ${title}\n`);
}
