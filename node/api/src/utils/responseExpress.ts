import { Response } from 'express'

export const sucess = (data: any, res: Response) => (
  res.status(200).json(data)
)

export const badRequest = (error: Error, res: Response) => (
  res.status(400).json(error)
)

export const error = (res: Response) => (
  res.status(500).json({ message: { error: 'Internal server erro' } })
)
