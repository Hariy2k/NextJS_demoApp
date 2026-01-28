'use client'

import { useRouter, redirect } from 'next/navigation';

export default function RouteOne() {

  const router = useRouter()


  return (
     <>
        <h1>
          This is Route one
        </h1>
        <button onClick={()=>{
              router.push('route-two')
        }}>
              Click Me
        </button>
     </>
  );
}
