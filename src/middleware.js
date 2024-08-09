import { NextResponse } from 'next/server'

export function middleware(req){
if(req.nextUrl.pathname.includes('/form')){
    console.log('validate form')
}
    return NextResponse.next()
}