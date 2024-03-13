import { NextResponse } from 'next/server'
import { prisma } from '#lib/prisma'

export async function GET() {
  const todo: Todo[] = await prisma.todo.findMany()
  return NextResponse.json(todo)
}

export async function POST(req: Request) {
  const data = await req.json()
  const response = await prisma.todo.create({ data })
  return NextResponse.json(response)
}

export async function DELETE(req: Request) {
  const data = await req.json()
  console.log(data)
  // const response = await prisma.todo.delete({ data.id })
  // return NextResponse.json(response)
  return NextResponse.json(null)
}
